import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Heading from "../../../components/ui/Heading";
import detailContent from "../../../content/project-detail.json";
import { getProjectBySlug, getPublishedProjects } from "../../../data/projects";
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
  const { hero, sections, initialMaterialId } = project.detail;

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
          <p className={styles.location}>{project.location}</p>
          <h1 id="project-title" className={styles.projectTitle}>{project.title}</h1>
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
        <div className={styles.overviewBody}>
          {project.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </section>

      {sections?.map((section) => (
        <section
          key={section.id}
          className={styles.feature}
          data-panel-side={section.panelSide}
          aria-labelledby={`project-section-${section.id}`}
        >
          <Image
            className={styles.featureImage}
            src={section.image.src}
            alt={section.image.alt}
            width={section.image.width}
            height={section.image.height}
            sizes="100vw"
            style={{ objectPosition: `${section.image.focalPoint.x}% ${section.image.focalPoint.y}%` }}
          />
          <div className={styles.featurePanel}>
            <h2 id={`project-section-${section.id}`} className={styles.featureTitle}>
              {section.title}
            </h2>
            <p className={styles.featureBody}>{section.body}</p>
          </div>
        </section>
      ))}

      {project.materials.length > 0 && (
        <section className={styles.materials} aria-labelledby="project-materials-title">
          <h2 id="project-materials-title" className={styles.overviewTitle}>
            {detailContent.materials.titleTemplate.replace("{project}", project.portfolio?.address ?? project.title)}
          </h2>
          <ProjectMaterials
            key={project.slug}
            items={project.materials}
            initialId={initialMaterialId ?? project.materials[0].id}
          />
        </section>
      )}
    </article>
  );
}
