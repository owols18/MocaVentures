"use client";

import Image from "next/image";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./TeamPage.module.css";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: {
    src: string;
    alt: string;
  };
  biography: string[];
};

type TeamLabels = {
  teamSection: string;
  openProfile: string;
  closeProfile: string;
};

type TeamProfilesProps = {
  members: TeamMember[];
  labels: TeamLabels;
};

export default function TeamProfiles({
  members,
  labels,
}: TeamProfilesProps) {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeMember) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [activeMember]);

  const openProfile = (
    member: TeamMember,
    event: ReactMouseEvent<HTMLButtonElement>,
  ) => {
    lastTriggerRef.current = event.currentTarget;
    setActiveMember(member);
  };

  const closeProfile = () => {
    dialogRef.current?.close();
  };

  const handleDialogClose = () => {
    setActiveMember(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const titleId = activeMember
    ? `team-profile-${activeMember.id}-title`
    : undefined;
  const descriptionId = activeMember
    ? `team-profile-${activeMember.id}-description`
    : undefined;

  return (
    <section
      className={styles.teamSection}
      aria-label={labels.teamSection}
    >
      <ul className={styles.teamGrid}>
        {members.map((member, index) => (
          <li key={member.id} className={styles.profileItem}>
            <button
              type="button"
              className={styles.profileTrigger}
              aria-haspopup="dialog"
              aria-label={`${labels.openProfile} ${member.name}`}
              onClick={(event) => openProfile(member, event)}
            >
              <span className={styles.profileImageFrame}>
                <Image
                  className={styles.profileImage}
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 425px"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </span>
              <span className={styles.profileName}>{member.name}</span>
              <span className={styles.profileRole}>{member.role}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.profileDialog}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={handleDialogClose}
      >
        {activeMember ? (
          <>
            <button
              type="button"
              className={styles.closeButton}
              aria-label={labels.closeProfile}
              onClick={closeProfile}
            />

            <div className={styles.dialogPanel}>
              <h2 id={titleId} className={styles.dialogTitle}>
                {activeMember.name}
              </h2>
              <div id={descriptionId} className={styles.dialogBiography}>
                {activeMember.biography.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </section>
  );
}
