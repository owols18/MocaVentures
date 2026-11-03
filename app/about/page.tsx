import Image from "next/image";
import aboutContent from "../../content/about.json";
import sharedContent from "../../content/shared.json";
import CTA from "../../components/ui/CTA";
import Heading from "../../components/ui/Heading";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader} aria-labelledby="about-page-title">
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="about-page-title">{aboutContent.pageTitle}</span>
        </Heading>
        <Image
          className={styles.headerCertification}
          src={sharedContent.certifications.mwbeNewYork.src}
          alt={sharedContent.certifications.mwbeNewYork.alt}
          width={sharedContent.certifications.mwbeNewYork.width}
          height={sharedContent.certifications.mwbeNewYork.height}
          sizes="(max-width: 767px) 64px, (max-width: 1023px) 76px, (max-width: 1279px) 84px, (max-width: 1919px) 8vw, 112px"
        />
      </section>

      <section
        id={aboutContent.introduction.id}
        className={styles.introduction}
        aria-labelledby="about-introduction-title"
      >
        <div className={styles.introductionCopy}>
          <div className={styles.introductionSection}>
            <h2 id="about-introduction-title" className={styles.introductionTitle}>
              {aboutContent.introduction.title}
            </h2>
            <div className={styles.introductionBody}>
              {aboutContent.introduction.body.map((paragraph) => (
                <p key={paragraph} className={styles.introductionParagraph}>
                  {paragraph}
                </p>
              ))}
              <CTA
                href={aboutContent.introduction.cta.href}
                variant="text"
                className={styles.introductionCta}
              >
                {aboutContent.introduction.cta.label}
              </CTA>
            </div>
          </div>
        </div>

        <div
          className={styles.introductionMedia}
          style={{
            backgroundImage: `url("${aboutContent.introduction.image.src}")`,
          }}
        >
          <Image
            className={styles.introductionImage}
            src={aboutContent.introduction.image.src}
            alt={aboutContent.introduction.image.alt}
            width={2800}
            height={2800}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1919px) calc(55vw - 44px), (max-width: 2559px) calc(55vw - 62px), calc(55vw - 70px)"
            loading="eager"
          />
        </div>
      </section>

      <section
        id="who-we-work-with"
        className={styles.introduction}
        aria-labelledby="about-who-we-work-with-title"
      >
        <div className={styles.introductionCopy}>
          <div className={styles.introductionSection}>
            <h2
              id="about-who-we-work-with-title"
              className={styles.introductionTitle}
            >
              {aboutContent.introduction.whoWeWorkWith.title}
            </h2>
            <div className={styles.introductionBody}>
              {aboutContent.introduction.whoWeWorkWith.body.map((paragraph) => (
                <p key={paragraph} className={styles.introductionParagraph}>
                  {paragraph}
                </p>
              ))}
              <CTA
                href={aboutContent.introduction.whoWeWorkWith.cta.href}
                variant="text"
                className={styles.introductionCta}
              >
                {aboutContent.introduction.whoWeWorkWith.cta.label}
              </CTA>
            </div>
          </div>
        </div>

        <div
          className={styles.introductionMedia}
          style={{
            backgroundImage: `url("${aboutContent.introduction.imagewhoWeWorkWith.src}")`,
          }}
        >
          <Image
            className={styles.introductionImage}
            src={aboutContent.introduction.imagewhoWeWorkWith.src}
            alt=""
            width={2800}
            height={2800}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1919px) calc(55vw - 44px), (max-width: 2559px) calc(55vw - 62px), calc(55vw - 70px)"
          />
        </div>
      </section>

      {/*
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
      */}
    </div>
  );
}
