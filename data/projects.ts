import "server-only";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";

interface PortfolioDetails {
  address: string;
  projectName?: string;
  image: { src: string; alt: string };
}

interface PreviewProject extends PortfolioDetails {
  id: string;
  location: string;
  visible?: boolean;
}

export interface PortfolioCard extends PortfolioDetails {
  id: string;
  location: string;
  slug?: string;
}

export interface Project {
  slug: string;
  status: "draft" | "published";
  visible?: boolean;
  publishedAt: string;
  location: string;
  title: string;
  summary: string;
  description: string[];
  portfolio?: PortfolioDetails;
  images: {
    home: string;
    hero: string;
    gallery: string[];
  };
  materials: string[];
  client: string;
  teamMembers: string[];
  cta: {
    label: string;
  };
}

const projectsDirectory = join(process.cwd(), "content", "projects");
const publicDirectory = join(process.cwd(), "public");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertString(value: unknown, field: string, nonEmpty = false): asserts value is string {
  if (typeof value !== "string" || (nonEmpty && value.trim().length === 0)) {
    throw new Error(`${field} must be ${nonEmpty ? "a non-empty string" : "a string"}.`);
  }
}

function assertStringArray(value: unknown, field: string): asserts value is string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} must be an array of strings.`);
  }
}

function assertPublishedAt(value: unknown, field: string): asserts value is string {
  assertString(value, field);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`${field} must use a valid YYYY-MM-DD value.`);

  const [, year, month, day] = match;
  const date = new Date(`${value}T00:00:00Z`);
  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() + 1 !== Number(month) ||
    date.getUTCDate() !== Number(day)
  ) {
    throw new Error(`${field} must use a valid YYYY-MM-DD value.`);
  }
}

function validateProject(value: unknown, fileName: string): Project {
  const field = (name: string) => `Invalid project data in ${fileName}: ${name}`;
  if (!isRecord(value)) throw new Error(`Invalid project data in ${fileName}: expected an object.`);

  assertString(value.slug, field("slug"), true);
  assertVisibility(value.visible, field("visible"));
  if (value.status !== "draft" && value.status !== "published") {
    throw new Error(`${field("status")} must be exactly "draft" or "published".`);
  }
  assertString(value.publishedAt, field("publishedAt"));
  if (value.status === "published" || value.publishedAt !== "") {
    assertPublishedAt(value.publishedAt, field("publishedAt"));
  }
  assertString(value.location, field("location"));
  assertString(value.title, field("title"), true);
  assertString(value.summary, field("summary"));
  assertStringArray(value.description, field("description"));
  if (value.portfolio !== undefined) {
    assertPortfolioDetails(value.portfolio, field("portfolio"));
  }

  if (!isRecord(value.images)) throw new Error(`${field("images")} must be an object.`);
  assertString(value.images.home, field("images.home"), value.status === "published");
  assertString(value.images.hero, field("images.hero"));
  assertStringArray(value.images.gallery, field("images.gallery"));

  if (value.status === "published") {
    const assetPath = resolve(publicDirectory, value.images.home.replace(/^\/+/, ""));
    const relativeAssetPath = relative(publicDirectory, assetPath);
    const isInsidePublic = relativeAssetPath !== "" && !relativeAssetPath.startsWith("..") && !isAbsolute(relativeAssetPath);
    if (!isInsidePublic || !existsSync(assetPath)) {
      throw new Error(
        `Invalid project data in ${fileName}: images.home "${value.images.home}" referenced asset was not found under public/.`,
      );
    }
  }

  assertStringArray(value.materials, field("materials"));
  assertString(value.client, field("client"));
  assertStringArray(value.teamMembers, field("teamMembers"));

  if (!isRecord(value.cta)) throw new Error(`${field("cta")} must be an object.`);
  assertString(value.cta.label, field("cta.label"), true);

  return value as unknown as Project;
}

function loadProjects(): Project[] {
  const fileNames = readdirSync(projectsDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort();
  const slugs = new Map<string, string>();

  return fileNames.map((fileName) => {
    const filePath = join(projectsDirectory, fileName);
    let value: unknown;

    try {
      value = JSON.parse(readFileSync(filePath, "utf8"));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Unable to parse project file ${fileName}: ${message}`);
    }

    const project = validateProject(value, fileName);
    const duplicateFile = slugs.get(project.slug);
    if (duplicateFile) {
      throw new Error(
        `Duplicate project slug "${project.slug}" found in ${duplicateFile} and ${fileName}.`,
      );
    }
    slugs.set(project.slug, fileName);
    return project;
  });
}

const projects = loadProjects();

function assertVisibility(value: unknown, field: string): void {
  if (value !== undefined && typeof value !== "boolean") {
    throw new Error(`${field} must be a boolean when provided.`);
  }
}

function assertPortfolioDetails(value: unknown, field: string): asserts value is PortfolioDetails {
  if (!isRecord(value)) throw new Error(`${field} must be an object.`);
  assertString(value.address, `${field}.address`, true);
  if (value.projectName !== undefined) assertString(value.projectName, `${field}.projectName`);
  if (!isRecord(value.image)) throw new Error(`${field}.image must be an object.`);
  assertString(value.image.src, `${field}.image.src`, true);
  assertString(value.image.alt, `${field}.image.alt`, true);

  const assetPath = resolve(publicDirectory, value.image.src.replace(/^\/+/, ""));
  const relativeAssetPath = relative(publicDirectory, assetPath);
  if (
    !value.image.src.startsWith("/") ||
    value.image.src.startsWith("//") ||
    relativeAssetPath === "" ||
    relativeAssetPath.startsWith("..") ||
    isAbsolute(relativeAssetPath) ||
    !existsSync(assetPath)
  ) {
    throw new Error(`${field}.image.src "${value.image.src}" must reference an existing asset under public/.`);
  }
}

function loadPreviewProjects(): PreviewProject[] {
  const fileName = "preview/portfolio.json";
  let value: unknown;
  try {
    value = JSON.parse(readFileSync(join(projectsDirectory, fileName), "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to parse ${fileName}: ${message}`);
  }
  if (!Array.isArray(value)) throw new Error(`${fileName} must contain an array.`);
  const ids = new Set<string>();

  return value.map((item: unknown, index) => {
    const field = `${fileName}[${index}]`;
    if (!isRecord(item)) throw new Error(`${field} must be an object.`);
    assertString(item.id, `${field}.id`, true);
    assertString(item.location, `${field}.location`, true);
    assertVisibility(item.visible, `${field}.visible`);
    assertPortfolioDetails(item, field);
    if (ids.has(item.id)) throw new Error(`Duplicate preview project id "${item.id}".`);
    ids.add(item.id);
    return item as unknown as PreviewProject;
  });
}

function toPortfolioCard(project: Project, id: string): PortfolioCard {
  if (!project.portfolio) {
    throw new Error(`Project "${project.slug}" is missing its portfolio card data.`);
  }
  return { ...project.portfolio, id, location: project.location, slug: project.slug };
}

export function getPortfolioCards(config: unknown): PortfolioCard[] {
  if (!isRecord(config) || (config.mode !== "preview" && config.mode !== "published")) {
    throw new Error('Portfolio grid.mode must be "preview" or "published".');
  }

  if (config.mode === "published") {
    return getVisiblePublishedProjects()
      .filter((project) => project.portfolio !== undefined)
      .map((project) => toPortfolioCard(project, project.slug));
  }

  // The PDF mockup is explicit: no fabricated publication dates or detail routes.
  if (!Array.isArray(config.previewOrder)) throw new Error("Portfolio grid.previewOrder must be an array.");
  const previews = new Map(loadPreviewProjects().map((project) => [project.id, project]));
  const slotIds = new Set<string>();

  return config.previewOrder.flatMap((slot: unknown, index): PortfolioCard[] => {
    const field = `Portfolio grid.previewOrder[${index}]`;
    if (!isRecord(slot)) throw new Error(`${field} must be an object.`);
    assertString(slot.id, `${field}.id`, true);
    assertString(slot.ref, `${field}.ref`, true);
    if (slotIds.has(slot.id)) throw new Error(`Duplicate portfolio slot id "${slot.id}".`);
    slotIds.add(slot.id);

    if (slot.source === "project") {
      const project = getProjectBySlug(slot.ref);
      if (!project) throw new Error(`${field} references unknown project "${slot.ref}".`);
      if (project.status !== "published" || project.visible === false) return [];
      return [toPortfolioCard(project, slot.id)];
    }

    if (slot.source === "preview") {
      const preview = previews.get(slot.ref);
      if (!preview) throw new Error(`${field} references unknown preview "${slot.ref}".`);
      if (preview.visible === false) return [];
      return [{
        id: slot.id,
        location: preview.location,
        address: preview.address,
        projectName: preview.projectName,
        image: preview.image,
      }];
    }

    throw new Error(`${field}.source must be "project" or "preview".`);
  });
}

export function getAllProjects(): Project[] {
  return [...projects];
}

export function getPublishedProjects(): Project[] {
  return projects
    .filter((project) => project.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getLatestProjects(limit: number): Project[] {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new RangeError("Project limit must be a non-negative integer.");
  }
  return getVisiblePublishedProjects().slice(0, limit);
}

export function getVisiblePublishedProjects(): Project[] {
  // Visibility controls listings only; published detail routes remain available.
  return getPublishedProjects().filter((project) => project.visible !== false);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
