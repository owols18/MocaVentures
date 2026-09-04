import type { Metadata } from "next";
import Heading from "../../components/ui/Heading";
import teamContent from "../../content/team.json";
import TeamProfiles from "./TeamProfiles";
import styles from "./TeamPage.module.css";

export const metadata: Metadata = teamContent.metadata;

export default function TeamPage() {
  return (
    <div className={styles.page}>
      <section className={styles.pageHeader} aria-labelledby="team-page-title">
        <Heading level="h1" variant="h2" className={styles.title}>
          <span id="team-page-title">{teamContent.pageTitle}</span>
        </Heading>
      </section>

      <p className={styles.introduction}>{teamContent.introduction}</p>

      <TeamProfiles
        members={teamContent.members}
        labels={teamContent.labels}
      />
    </div>
  );
}
