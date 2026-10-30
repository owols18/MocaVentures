"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { ProjectGalleryItem } from "../../../data/projects";
import styles from "./ProjectGallery.module.css";

interface GalleryContent {
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  playLabel: string;
  pauseLabel: string;
  slideLabelTemplate: string;
  autoplayIntervalMs: number;
}

interface ProjectGalleryProps {
  items: ProjectGalleryItem[];
  content: GalleryContent;
}

type GalleryStyle = CSSProperties & {
  "--gallery-duration": string;
};

export default function ProjectGallery({ items, content }: ProjectGalleryProps) {
  const intervalMs = Math.max(1000, content.autoplayIntervalMs);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingMs, setRemainingMs] = useState(intervalMs);
  const [cycle, setCycle] = useState(0);
  const startedAt = useRef(0);

  const selectSlide = useCallback(
    (index: number) => {
      const normalizedIndex = (index + items.length) % items.length;
      setActiveIndex(normalizedIndex);
      setRemainingMs(intervalMs);
      setCycle((current) => current + 1);
    },
    [intervalMs, items.length],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      setRemainingMs(intervalMs);
      setCycle((current) => current + 1);
      setIsPlaying(!reducedMotion.matches);
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () => reducedMotion.removeEventListener("change", syncMotionPreference);
  }, [intervalMs]);

  useEffect(() => {
    if (!isPlaying || items.length < 2) return;

    startedAt.current = performance.now();
    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % items.length);
      setRemainingMs(intervalMs);
      setCycle((current) => current + 1);
    }, remainingMs);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, cycle, intervalMs, isPlaying, items.length, remainingMs]);

  const togglePlayback = () => {
    if (isPlaying) {
      const elapsed = performance.now() - startedAt.current;
      setRemainingMs((current) => Math.max(1, current - elapsed));
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };

  const galleryStyle: GalleryStyle = {
    "--gallery-duration": `${intervalMs}ms`,
  };

  return (
    <section
      className={styles.gallery}
      aria-label={content.ariaLabel}
      aria-roledescription="carousel"
      style={galleryStyle}
    >
      <div className={styles.viewport} aria-live={isPlaying ? "off" : "polite"}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className={styles.slide}
              data-active={isActive}
              aria-hidden={!isActive}
            >
              <Image
                src={item.image.src}
                alt={isActive ? item.image.alt : ""}
                width={item.image.width}
                height={item.image.height}
                sizes="100vw"
                className={styles.image}
                style={{
                  objectPosition: `${item.image.focalPoint.x}% ${item.image.focalPoint.y}%`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => selectSlide(activeIndex - 1)}
          aria-label={content.previousLabel}
          disabled={items.length < 2}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 4-8 8 8 8" />
          </svg>
        </button>

        <div className={styles.indicators}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const label = content.slideLabelTemplate
              .replace("{index}", String(index + 1))
              .replace("{total}", String(items.length));

            return (
              <button
                key={item.id}
                type="button"
                className={styles.indicator}
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={label}
                onClick={() => selectSlide(index)}
              >
                {isActive && (
                  <span
                    key={`${activeIndex}-${cycle}`}
                    className={styles.progress}
                    data-playing={isPlaying}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.iconButton}
          onClick={togglePlayback}
          aria-label={isPlaying ? content.pauseLabel : content.playLabel}
          disabled={items.length < 2}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14M16 5v14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path className={styles.playIcon} d="m8 5 11 7-11 7Z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={() => selectSlide(activeIndex + 1)}
          aria-label={content.nextLabel}
          disabled={items.length < 2}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 4 8 8-8 8" />
          </svg>
        </button>
      </div>
    </section>
  );
}
