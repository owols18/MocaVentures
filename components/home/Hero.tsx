import homeContent from "../../content/home.json";
import Heading from "../ui/Heading";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.media} aria-hidden="true"> <Image src={homeContent.hero.image} alt="" fill preload sizes="100vw"/></div>
      <Heading level="h1" variant="display" className={styles.title}>
        <span id="home-hero-title">{homeContent.hero.title}</span>
      </Heading>
    </section>
  );
}
