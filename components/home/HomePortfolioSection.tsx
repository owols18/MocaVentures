import Image from "next/image";
import homeContent from "../../content/home.json";
import { getLatestProjects } from "../../data/projects";
import CTA from "../ui/CTA";
import Heading from "../ui/Heading";
import styles from "./HomePortfolioSection.module.css";
import PortfolioCardReveal from "./PortfolioCardReveal";

export default function HomePortfolioSection() {
  const projects = getLatestProjects(4);

  return (
    <section className={styles.section} aria-labelledby="home-portfolio-title">
      <div className={styles.intro}>
        <Heading level="h2" variant="h2" className={styles.title}>
          <span id="home-portfolio-title">{homeContent.portfolio.title}</span>
        </Heading>
        <p className={styles.introText}>{homeContent.portfolio.text}</p>
      </div>

      <div className={styles.stack}>
        {projects.map((project) => (
          <PortfolioCardReveal key={project.slug}>
            <Image
              src={project.images.home}
              alt={`${project.title} project in ${project.location}`}
              fill
              sizes="(orientation: landscape) and (max-height: 500px) calc(100vw - 48px), (min-width: 1280px) calc(100vw - 30px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <div className={styles.overlayContent}>
                <div className={styles.projectInfo}>
                  <p className={styles.location}>{project.location}</p>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <p className={styles.summary}>{project.summary}</p>
                <div className={styles.action}>
                  <CTA variant="project" href={`/portfolio/${project.slug}`} className={styles.cta}>
                    {project.cta.label}
                  </CTA>
                </div>
              </div>
            </div>
          </PortfolioCardReveal>
        ))}
      </div>
    </section>
  );
}
