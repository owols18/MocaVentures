"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ProjectMaterial } from "../../../data/projects";
import styles from "./ProjectMaterials.module.css";

interface ProjectMaterialsProps {
  items: ProjectMaterial[];
  initialId: string;
}

export default function ProjectMaterials({ items, initialId }: ProjectMaterialsProps) {
  const [activeId, setActiveId] = useState(initialId);
  const activeIndex = items.findIndex((material) => material.id === activeId);
  const accordionId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % items.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    buttons.current[nextIndex]?.focus();
  }

  return (
    <div className={styles.accordion}>
      {items.map((material, index) => {
        const isOpen = material.id === activeId;
        const buttonId = `${accordionId}-${material.id}-button`;
        const panelId = `${accordionId}-${material.id}-panel`;

        return (
          <div
            key={material.id}
            className={styles.item}
            data-open={isOpen}
            data-after-active={index > activeIndex}
          >
            <h3 className={styles.heading}>
              <button
                ref={(node) => { buttons.current[index] = node; }}
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-disabled={isOpen}
                onClick={() => setActiveId(material.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={isOpen ? "m3 7 9 10 9-10" : "m7 3 10 9-10 9"} stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className={styles.label}>{material.label}</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <Image
                src={material.image.src}
                alt={material.image.alt}
                width={material.image.width}
                height={material.image.height}
                sizes="(max-width: 767px) calc(100vw - 48px), (orientation: landscape) and (max-height: 500px) calc(100vw - 48px), (max-width: 1279px) 75vw, 80vw"
                className={styles.image}
                style={{ objectPosition: `${material.image.focalPoint.x}% ${material.image.focalPoint.y}%` }}
              />
              <div className={styles.caption}>
                <p>{material.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
