import Image from "next/image";
import homeContent from "../../content/home.json";
import CTA from "../ui/CTA";
import styles from "./HomeImpactSection.module.css";

export default function HomeImpactSection() {
  const { impact } = homeContent;

  return (
    <section
      id={impact.id}
      className={styles.section}
      aria-labelledby="home-impact-title"
    >
      <Image
        className={styles.image}
        src={impact.image.src}
        alt={impact.image.alt}
        width={4200}
        height={1741}
        sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 64px), (max-width: 1919px) calc(100vw - 80px), (max-width: 2559px) calc(100vw - 112px), calc(100vw - 128px)"
      />

      <div className={styles.copy}>
        <h2 id="home-impact-title" className={styles.title}>
          {impact.title}
        </h2>
        <p className={styles.body}>{impact.body}</p>
        <CTA href={impact.cta.href} className={styles.cta}>
          {impact.cta.label}
        </CTA>
      </div>
    </section>
  );
}
