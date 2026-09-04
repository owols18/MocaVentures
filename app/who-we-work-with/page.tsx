import type { Metadata } from "next";
import Heading from "../../components/ui/Heading";
import whoWeWorkWithContent from "../../content/who-we-work-with.json";
import WhoWeWorkWithProcess from "./WhoWeWorkWithProcess";
import styles from "./WhoWeWorkWithPage.module.css";

export const metadata: Metadata = whoWeWorkWithContent.metadata;

export default function WhoWeWorkWithPage() {
  return (
    <div className={styles.page}>
      <section
        className={styles.pageHeader}
        aria-labelledby="who-we-work-with-page-title"
      >
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="who-we-work-with-page-title">
            {whoWeWorkWithContent.pageTitle}
          </span>
        </Heading>
      </section>

      <p className={styles.introduction}>
        {whoWeWorkWithContent.introduction}
      </p>

      <WhoWeWorkWithProcess content={whoWeWorkWithContent.process} />
    </div>
  );
}
