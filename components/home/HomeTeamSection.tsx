import Image from "next/image";
import homeContent from "../../content/home.json";
import CTA from "../ui/CTA";
import Heading from "../ui/Heading";
import styles from "./HomeTeamSection.module.css";

export default function HomeTeamSection() {
  const { team } = homeContent;

  return (
    <section className={styles.section} aria-labelledby="home-team-title">
      <div className={styles.editorial}>
        <Heading level="h2" variant="h2" className={styles.title}>
          <span id="home-team-title">{team.title}</span>
        </Heading>
      </div>

      <div className={styles.photo}>
        <Image
          src={team.image.src}
          alt={team.image.alt}
          fill
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.content}>
          <p className={styles.text}>{team.text}</p>
          <CTA href={team.cta.href} className={styles.cta}>
            {team.cta.label}
          </CTA>
        </div>
      </div>
    </section>
  );
}
