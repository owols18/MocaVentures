"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./HomePortfolioSection.module.css";

type PortfolioCardRevealProps = {
  children: ReactNode;
};

export default function PortfolioCardReveal({ children }: PortfolioCardRevealProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <article ref={cardRef} className={`${styles.card} ${isVisible ? styles.isVisible : ""}`}>
        <div className={styles.cardSurface}>
          <div className={styles.revealLayer}>{children}</div>
        </div>
      </article>
      <div className={styles.runway} aria-hidden="true" />
    </>
  );
}
