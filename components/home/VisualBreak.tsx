"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import homeContent from "../../content/home.json";
import styles from "./VisualBreak.module.css";

export default function VisualBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { images } = homeContent.visualBreak;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`${styles.collage} ${isVisible ? styles.isVisible : ""}`}>
        <div className={`${styles.imageFrame} ${styles.leftSmall}`}>
          <Image src={images.leftSmall.src} alt={images.leftSmall.alt} fill sizes="200px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.left}`}>
          <Image src={images.left.src} alt={images.left.alt} fill sizes="280px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.center}`}>
          <Image src={images.center.src} alt={images.center.alt} fill sizes="370px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.right}`}>
          <Image src={images.right.src} alt={images.right.alt} fill sizes="280px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.rightSmall}`}>
          <Image src={images.rightSmall.src} alt={images.rightSmall.alt} fill sizes="200px" className={styles.image} />
        </div>
      </div>
    </section>
  );
}
