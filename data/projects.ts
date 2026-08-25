import "server-only";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";

export interface Project {
  slug: string;
  status: "draft" | "published";
  publishedAt: string;
  location: string;
  title: string;
  summary: string;
  description: string[];
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
  return getPublishedProjects().slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
