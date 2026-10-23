import Image from "next/image";
import aboutContent from "../../content/about.json";
import Heading from "../../components/ui/Heading";
import AboutProcess from "./AboutProcess";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader} aria-labelledby="about-page-title">
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="about-page-title">{aboutContent.pageTitle}</span>
        </Heading>
      </section>

      <section
        id={aboutContent.introduction.id}
        className={styles.introduction}
        aria-labelledby="about-introduction-title"
      >
        <div className={styles.introductionCopy}>
          <h2 id="about-introduction-title" className={styles.introductionTitle}>
            {aboutContent.introduction.title}
          </h2>
          <p className={styles.introductionBody}>
            {aboutContent.introduction.body}
          </p>
        </div>

        {/*
        <Image
          className={styles.introductionImage}
          src={aboutContent.introduction.image.src}
          alt={aboutContent.introduction.image.alt}
          width={2800}
          height={2800}
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1919px) calc(55vw - 44px), (max-width: 2559px) calc(55vw - 62px), calc(55vw - 70px)"
          loading="eager"
        />
        */}
      </section>

      <section
        id={aboutContent.featureImage.id}
        className={styles.featureImageSection}
        aria-label={aboutContent.featureImage.alt}
      >
        <Image
          className={styles.featureImage}
          src={aboutContent.featureImage.src}
          alt={aboutContent.featureImage.alt}
          width={4200}
          height={1280}
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 64px), (max-width: 1919px) calc(100vw - 80px), (max-width: 2559px) calc(100vw - 112px), calc(100vw - 128px)"
        />
      </section>

      <section
        id={aboutContent.expertise.id}
        className={styles.expertise}
        aria-labelledby="about-expertise-title"
      >
        <Image
          className={styles.expertiseImage}
          src={aboutContent.expertise.image.src}
          alt={aboutContent.expertise.image.alt}
          width={1800}
          height={2520}
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1919px) calc(30vw - 24px), (max-width: 2559px) calc(30vw - 34px), calc(30vw - 38px)"
        />

        <div className={styles.expertiseCopy}>
          <h2 id="about-expertise-title" className={styles.expertiseTitle}>
            {aboutContent.expertise.title}
          </h2>
          <p className={styles.expertiseBody}>
            {aboutContent.expertise.body}
          </p>
        </div>
      </section>

      <AboutProcess content={aboutContent.process} />

      <section
        id={aboutContent.sustainability.id}
        className={styles.sustainability}
        aria-labelledby="about-sustainability-title"
      >
        <Image
          className={styles.sustainabilityImage}
          src={aboutContent.sustainability.image.src}
          alt={aboutContent.sustainability.image.alt}
          width={4200}
          height={1741}
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 64px), (max-width: 1919px) calc(100vw - 80px), (max-width: 2559px) calc(100vw - 112px), calc(100vw - 128px)"
        />

        <div className={styles.sustainabilityCopy}>
          <h2
            id="about-sustainability-title"
            className={styles.sustainabilityTitle}
          >
            {aboutContent.sustainability.title}
          </h2>
          <p className={styles.sustainabilityBody}>
            {aboutContent.sustainability.body}
          </p>
        </div>
      </section>
    </div>
  );
}
