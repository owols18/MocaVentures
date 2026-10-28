"use client";

import { useEffect, useRef } from "react";
import styles from "./OurProcessPage.module.css";

type ProcessStep = {
  id: string;
  number: string;
  title: string;
  body: string;
};

type OurProcessTimelineProps = {
  content: {
    id: string;
    title: string;
    steps: ProcessStep[];
  };
};

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

export default function OurProcessTimeline({
  content,
}: OurProcessTimelineProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const marker = markerRef.current;
    if (!runway || !sticky || !viewport || !track || !marker) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMotion = window.matchMedia("(min-width: 1280px)");
    let frame = 0;
    let stageHeight = viewport.clientHeight;
    let trackTravel = 0;
    let stickyTop = 0;
    let lastScrollPosition = window.scrollY;

    const resetStyles = () => {
      runway.style.removeProperty("height");
      track.style.removeProperty("transform");
      marker.style.removeProperty("transform");
      marker.dataset.direction = "down";
    };

    const updateProgress = () => {
      frame = 0;
      if (reducedMotion.matches) return;

      const scrollPosition = window.scrollY;
      if (Math.abs(scrollPosition - lastScrollPosition) > 1) {
        marker.dataset.direction =
          scrollPosition < lastScrollPosition ? "up" : "down";
        lastScrollPosition = scrollPosition;
      }

      if (!desktopMotion.matches) return;

      const scrollDistance = Math.max(1, runway.offsetHeight - stageHeight);
      const progress = clampProgress(
        (stickyTop - runway.getBoundingClientRect().top) / scrollDistance,
      );
      const visibleRows =
        Number.parseFloat(
          getComputedStyle(viewport).getPropertyValue(
            "--process-visible-rows",
          ),
        ) || 1;

      track.style.transform = `translate3d(0, ${
        -progress * trackTravel
      }px, 0)`;

      const markerInset = stageHeight / (visibleRows * 2);
      const markerCenter =
        markerInset + progress * Math.max(0, stageHeight - markerInset * 2);
      marker.style.transform = `translate3d(-50%, ${
        markerCenter - marker.offsetHeight / 2
      }px, 0)`;
    };

    const requestUpdate = () => {
      if (frame === 0) frame = requestAnimationFrame(updateProgress);
    };

    const measure = () => {
      if (reducedMotion.matches || !desktopMotion.matches) {
        resetStyles();
        return;
      }

      stageHeight = viewport.clientHeight;
      trackTravel = Math.max(0, track.scrollHeight - stageHeight);
      stickyTop = Number.parseFloat(getComputedStyle(sticky).top) || 0;
      runway.style.height = `${stageHeight + trackTravel}px`;
      requestUpdate();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    desktopMotion.addEventListener("change", measure);
    measure();

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
      desktopMotion.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section
      id={content.id}
      className={styles.processSection}
      aria-labelledby="our-process-section-title"
    >
      <h2 id="our-process-section-title" className={styles.processTitle}>
        {content.title}
      </h2>

      <div ref={runwayRef} className={styles.processRunway}>
        <div ref={stickyRef} className={styles.processSticky}>
          <div ref={viewportRef} className={styles.processViewport}>
            <span
              ref={markerRef}
              className={styles.processMarker}
              data-direction="down"
              aria-hidden="true"
            >
              <svg viewBox="0 0 21 17" role="presentation">
                <path d="M10.5 1.5v13M4.5 8.5l6 6 6-6" />
              </svg>
            </span>

            <div ref={trackRef} className={styles.processTrack}>
              <span className={styles.processLine} aria-hidden="true" />
              <ol className={styles.processList}>
                {content.steps.map((step) => {
                  const titleId = `our-process-${step.id}-title`;

                  return (
                    <li key={step.id} className={styles.processStep}>
                      <article
                        className={styles.processCard}
                        aria-labelledby={titleId}
                      >
                        <span className={styles.processNumber}>
                          {step.number}
                        </span>
                        <h3 id={titleId} className={styles.processCardTitle}>
                          {step.title}
                        </h3>
                        <p className={styles.processCardBody}>{step.body}</p>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
