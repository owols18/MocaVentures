import homeContent from "../../content/home.json";
import CTA from "../ui/CTA";
import Heading from "../ui/Heading";
import styles from "./HomeLetsTalkSection.module.css";

export default function HomeLetsTalkSection() {
  const { letsTalk } = homeContent;

  return (
    <section className={styles.section} aria-labelledby="home-lets-talk-title">
      <Heading level="h2" variant="h2" className={styles.title}>
        <span id="home-lets-talk-title">{letsTalk.title}</span>
      </Heading>
      <p className={styles.text}>{letsTalk.text}</p>
      <CTA href={letsTalk.cta.href} className={styles.cta}>
        {letsTalk.cta.label}
      </CTA>
    </section>
  );
}
