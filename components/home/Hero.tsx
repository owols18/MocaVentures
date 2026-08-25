import homeContent from "../../content/home.json";
import Heading from "../ui/Heading";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.media} aria-hidden="true" />
      <Heading level="h1" variant="display" className={styles.title}>
        <span id="home-hero-title">{homeContent.hero.title}</span>
      </Heading>
    </section>
  );
}
