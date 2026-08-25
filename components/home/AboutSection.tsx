import homeContent from "../../content/home.json";
import CTA from "../ui/CTA";
import Heading from "../ui/Heading";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.section} aria-labelledby="home-about-title">
      <Heading level="h2" variant="h2" className={styles.title}>
        <span id="home-about-title">{homeContent.about.title}</span>
      </Heading>
      <p className={styles.text}>{homeContent.about.text}</p>
      <CTA href={homeContent.about.cta.href} className={styles.cta}>
        {homeContent.about.cta.label}
      </CTA>
    </section>
  );
}
