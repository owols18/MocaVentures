import homeContent from "../../content/home.json";
import Heading from "../ui/Heading";
import styles from "./Hero.module.css";

const pagesBasePath = process.env.NEXT_PUBLIC_PAGES_BASE_PATH ?? "";

export default function Hero() {
  const videoSrc = `${pagesBasePath}${homeContent.hero.video}`;

  return (
    <section
      className={styles.hero}
      aria-labelledby="home-hero-title"
    >
      <div className={styles.media} aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.video}
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </video>
      </div>

      <Heading
        level="h1"
        variant="display"
        className={styles.title}
      >
        <span id="home-hero-title">
          {homeContent.hero.title}
        </span>
      </Heading>
    </section>
  );
}
