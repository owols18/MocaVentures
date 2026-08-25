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
          <Image src={images.leftSmall.src} alt={images.leftSmall.alt} fill sizes="(min-width: 2560px) 310px, (min-width: 1920px) calc(7.8125vw + 110px), (min-width: 1280px) calc(12.5vw + 20px), (min-width: 1024px) 167px, (min-width: 768px) 112px, 76px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.left}`}>
          <Image src={images.left.src} alt={images.left.alt} fill sizes="(min-width: 2560px) 435px, (min-width: 1920px) calc(10.9375vw + 155px), (min-width: 1280px) calc(17.7083vw + 25px), (min-width: 1024px) 234px, (min-width: 768px) 158px, 166px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.center}`}>
          <Image src={images.center.src} alt={images.center.alt} fill sizes="(min-width: 2560px) 580px, (min-width: 1920px) calc(14.84375vw + 200px), (min-width: 1280px) calc(23.9583vw + 25px), (min-width: 1024px) 308px, (min-width: 768px) 210px, 180px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.right}`}>
          <Image src={images.right.src} alt={images.right.alt} fill sizes="(min-width: 2560px) 435px, (min-width: 1920px) calc(10.9375vw + 155px), (min-width: 1280px) calc(17.7083vw + 25px), (min-width: 1024px) 234px, (min-width: 768px) 158px, 166px" className={styles.image} />
        </div>
        <div className={`${styles.imageFrame} ${styles.rightSmall}`}>
          <Image src={images.rightSmall.src} alt={images.rightSmall.alt} fill sizes="(min-width: 2560px) 310px, (min-width: 1920px) calc(7.8125vw + 110px), (min-width: 1280px) calc(12.5vw + 20px), (min-width: 1024px) 167px, (min-width: 768px) 112px, 76px" className={styles.image} />
        </div>
      </div>
    </section>
  );
}
