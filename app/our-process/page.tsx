import type { Metadata } from "next";
import Heading from "../../components/ui/Heading";
import ourProcessContent from "../../content/our-process.json";
import OurProcessTimeline from "./OurProcessTimeline";
import styles from "./OurProcessPage.module.css";

export const metadata: Metadata = ourProcessContent.metadata;

export default function OurProcessPage() {
  return (
    <div className={styles.page}>
      <section
        className={styles.pageHeader}
        aria-labelledby="our-process-page-title"
      >
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="our-process-page-title">
            {ourProcessContent.pageTitle}
          </span>
        </Heading>
      </section>

      <OurProcessTimeline content={ourProcessContent.process} />
    </div>
  );
}
