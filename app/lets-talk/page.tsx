import type { Metadata } from "next";
import Image from "next/image";
import Heading from "../../components/ui/Heading";
import letsTalkContent from "../../content/lets-talk.json";
import ContactPanel from "./ContactPanel";
import styles from "./LetsTalkPage.module.css";

export const metadata: Metadata = letsTalkContent.metadata;

export default function LetsTalkPage() {
  return (
    <div className={styles.page}>
      <section
        className={styles.pageHeader}
        aria-labelledby="lets-talk-page-title"
      >
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="lets-talk-page-title">{letsTalkContent.pageTitle}</span>
        </Heading>
      </section>

      <section
        className={styles.contactLayout}
        aria-label={letsTalkContent.sectionLabel}
      >
        <ContactPanel form={letsTalkContent.form} />

        <div
          className={styles.mediaColumn}
          aria-label={letsTalkContent.media.label}
        >
          <div className={styles.imageFrame}>
            <Image
              src={letsTalkContent.media.image.src}
              alt={letsTalkContent.media.image.alt}
              fill
              className={styles.contactImage}
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) min(calc(100vw - 64px), 615px), (max-width: 1439px) calc(38.22vw + 65px), (max-width: 1919px) calc(21.875vw + 300px), (max-width: 2559px) calc(15.625vw + 420px), 820px"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
