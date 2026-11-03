import Image from "next/image";
import impactContent from "../../content/impact.json";
import Heading from "../../components/ui/Heading";
import styles from "./ImpactPage.module.css";

export default function ImpactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader} aria-labelledby="impact-page-title">
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="impact-page-title">{impactContent.pageTitle}</span>
        </Heading>
      </section>

      <section
        id={impactContent.introduction.id}
        className={styles.introduction}
        aria-labelledby="impact-introduction-title"
      >
        <div className={styles.introductionCopy}>
          <div className={styles.introductionSection}>
            <h2
              id="impact-introduction-title"
              className={styles.introductionTitle}
            >
              {impactContent.introduction.title}
            </h2>
            <div className={styles.introductionBody}>
              {impactContent.introduction.body.map((paragraph) => (
                <p key={paragraph} className={styles.introductionParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className={styles.introductionMedia}
          style={{
            backgroundImage: `url("${impactContent.introduction.image.src}")`,
          }}
        >
          <Image
            className={styles.introductionImage}
            src={impactContent.introduction.image.src}
            alt={impactContent.introduction.image.alt}
            width={2800}
            height={2800}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1919px) calc(55vw - 44px), (max-width: 2559px) calc(55vw - 62px), calc(55vw - 70px)"
            loading="eager"
          />
        </div>
      </section>

      <section
        id={impactContent.introduction.approachInformation.id}
        className={styles.introduction}
        aria-labelledby="approach-information-title"
      >
        <div className={styles.introductionCopy}>
          <div className={styles.introductionSection}>
            <h2
              id="approach-information-title"
              className={styles.introductionTitle}
            >
              {impactContent.introduction.approachInformation.title}
            </h2>
            <div className={styles.introductionBody}>
              {impactContent.introduction.approachInformation.body.map(
                (paragraph) => (
                  <p key={paragraph} className={styles.introductionParagraph}>
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>

        <div
          className={styles.introductionMedia}
          style={{
            backgroundImage: `url("${impactContent.introduction.imageApproach.src}")`,
          }}
        >
          <Image
            className={styles.introductionImage}
            src={impactContent.introduction.imageApproach.src}
            alt=""
            width={2800}
            height={2800}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1919px) calc(55vw - 44px), (max-width: 2559px) calc(55vw - 62px), calc(55vw - 70px)"
          />
        </div>
      </section>
    </div>
  );
}
