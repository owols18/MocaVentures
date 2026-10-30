import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Heading from "../../../components/ui/Heading";
import CTA from "../../../components/ui/CTA";
import detailContent from "../../../content/project-detail.json";
import portfolioContent from "../../../content/portfolio.json";
import {
  getFollowingPortfolioCards,
  getProjectBySlug,
  getPublishedProjects,
} from "../../../data/projects";
import ProjectGallery from "./ProjectGallery";
import ProjectMaterials from "./ProjectMaterials";
import styles from "./ProjectDetail.module.css";

function getPublishedProject(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project || project.status !== "published") notFound();
  return project;
}

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  // Published projects can adopt the detail template as their content becomes ready.
  if (!project.detail) return null;
  const { hero, overview, gallery, initialMaterialId } = project.detail;
  const projectName = project.portfolio?.projectName?.trim() || project.title;
  const projectAddress = project.portfolio?.address?.trim() || project.title;
  const otherProjects = getFollowingPortfolioCards(
    portfolioContent.grid,
    project.slug,
    detailContent.otherProjects.limit,
  );

  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-labelledby="project-title">
        <Image
          src={project.images.hero}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          sizes="100vw"
          preload
          className={styles.heroImage}
          style={{ objectPosition: `${hero.focalPoint.x}% ${hero.focalPoint.y}%` }}
        />
        <div className={styles.heroCopy}>
          <p className={styles.heroMeta}>{projectAddress}</p>
          <h1 id="project-title" className={styles.projectTitle}>{projectName}</h1>
          <p className={styles.heroMeta}>{project.location}</p>
          <p className={styles.summary}>{project.summary}</p>
        </div>
        <a className={styles.readMore} href="#project-overview">
          <span>{detailContent.hero.readMoreLabel}</span>
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
            <path d="m3 4 9 10 9-10" stroke="currentColor" strokeWidth="1" />
          </svg>
        </a>
      </section>

      <section
        id="project-overview"
        className={styles.overview}
        aria-labelledby="project-overview-title"
        tabIndex={-1}
      >
        <Heading level="h2" variant="h3" className={styles.overviewTitle}>
          <span id="project-overview-title">{detailContent.overview.title}</span>
        </Heading>
        <ul className={styles.overviewBody}>
          {overview.map((item) => (
            <li key={item.label}>
              <span className={styles.overviewLabel}>{item.label}</span>{" "}
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <ProjectGallery
        key={project.slug}
        items={gallery}
        content={detailContent.gallery}
      />

      {project.materials.length > 0 && (
        <section className={styles.materials} aria-labelledby="project-materials-title">
          <h2 id="project-materials-title" className={styles.overviewTitle}>
            {detailContent.materials.titleTemplate.replace("{project}", projectName)}
          </h2>
          <ProjectMaterials
            key={project.slug}
            items={project.materials}
            initialId={initialMaterialId ?? project.materials[0].id}
          />
        </section>
      )}

      {otherProjects.length > 0 && (
        <section className={styles.otherProjects} aria-labelledby="other-projects-title">
          <CTA
            href={detailContent.otherProjects.backToPortfolioHref}
            className={styles.backToPortfolio}
          >
            {detailContent.otherProjects.backToPortfolioLabel}
          </CTA>

          <h2 id="other-projects-title" className={styles.otherProjectsTitle}>
            {detailContent.otherProjects.title}
          </h2>

          <ul className={styles.otherProjectsGrid} role="list">
            {otherProjects.map((otherProject) => {
              const image = otherProject.relatedImage ?? otherProject.image;

              return (
                <li key={otherProject.id} className={styles.otherProjectCard}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 48px)"
                    className={styles.otherProjectImage}
                  />
                  <div className={styles.otherProjectOverlay} aria-hidden="true" />
                  <div className={styles.otherProjectCopy}>
                    {otherProject.projectName && (
                      <h3 className={styles.otherProjectName}>{otherProject.projectName}</h3>
                    )}
                    <p className={styles.otherProjectAddress}>{otherProject.address}</p>
                    <p className={styles.otherProjectLocation}>{otherProject.location}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </article>
  );
}
