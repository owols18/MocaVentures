"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./WhoWeWorkWithPage.module.css";

type PartnerImage = {
  src: string;
  alt: string;
};

type PartnerStep = {
  id: string;
  number: string;
  title: string;
  body: string;
  image: PartnerImage;
};

type WhoWeWorkWithProcessProps = {
  content: {
    id: string;
    label: string;
    steps: PartnerStep[];
  };
};

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

export default function WhoWeWorkWithProcess({
  content,
}: WhoWeWorkWithProcessProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

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
            "--partners-visible-rows",
          ),
        ) || 1;
      track.style.transform = `translate3d(0, ${
        -progress * trackTravel
      }px, 0)`;

      const markerInset = stageHeight / (visibleRows * 2);
      const markerCenter =
        markerInset +
        progress * Math.max(0, stageHeight - markerInset * 2);

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
      aria-label={content.label}
    >
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
                {content.steps.map((step, index) => {
                  const titleId = `partner-${step.id}-title`;
                  const shouldPreload =
                    index === 0 || index === content.steps.length - 1;

                  return (
                    <li key={step.id} className={styles.processStep}>
                      <article
                        className={styles.partner}
                        aria-labelledby={titleId}
                      >
                        <div className={styles.imageFrame}>
                          <Image
                            src={step.image.src}
                            alt={step.image.alt}
                            width={2200}
                            height={1800}
                            className={styles.partnerImage}
                            sizes="(max-width: 767px) calc(100vw - 112px), (max-height: 500px) calc(50vw - 100px), (max-width: 1023px) calc(50vw - 104px), (max-width: 1439px) 485px, (max-width: 1919px) 550px, (max-width: 2559px) 640px, 720px"
                            preload={shouldPreload}
                            loading={shouldPreload ? undefined : "eager"}
                            unoptimized={index === content.steps.length - 1}
                          />
                        </div>

                        <div className={styles.partnerCopy}>
                          <span className={styles.partnerNumber}>
                            {step.number}
                          </span>
                          <h2 id={titleId} className={styles.partnerTitle}>
                            {step.title}
                          </h2>
                          <p className={styles.partnerBody}>{step.body}</p>
                        </div>
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
