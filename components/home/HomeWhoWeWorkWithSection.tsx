import Image from "next/image";
import homeContent from "../../content/home.json";
import CTA from "../ui/CTA";
import Heading from "../ui/Heading";
import styles from "./HomeWhoWeWorkWithSection.module.css";
import WhoWeWorkWithPicker from "./WhoWeWorkWithPicker";

export default function HomeWhoWeWorkWithSection() {
  const { whoWeWorkWith } = homeContent;

  return (
    <section
      className={styles.section}
      aria-labelledby="home-who-we-work-with-title"
    >
      <div className={styles.editorial}>
        <Heading level="h2" variant="h2" className={styles.title}>
          <span id="home-who-we-work-with-title">
            {whoWeWorkWith.title}
          </span>
        </Heading>
        <WhoWeWorkWithPicker
          items={whoWeWorkWith.items}
          label={whoWeWorkWith.title}
        />
      </div>

      <div className={styles.photo}>
        <Image
          src={whoWeWorkWith.image.src}
          alt={whoWeWorkWith.image.alt}
          fill
          sizes="(min-width: 768px) 40vw, calc(100vw - 48px)"
          className={styles.image}
        />
      </div>

      <CTA href={whoWeWorkWith.cta.href} className={styles.cta}>
        {whoWeWorkWith.cta.label}
      </CTA>
    </section>
  );
}
