"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeWhoWeWorkWithSection.module.css";


type PickerItem = {
  id: string;
  label: string;
};

type WhoWeWorkWithPickerProps = {
  items: PickerItem[];
  label: string;
};

const WHEEL_THRESHOLD = 18;
const WHEEL_LOCK_MS = 450;
const SWIPE_THRESHOLD = 36;

export default function WhoWeWorkWithPicker({
  items,
  label,
}: WhoWeWorkWithPickerProps) {
  const initialIndex = items.findIndex(
    (item) => item.id === "architects",
  );
  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );
  const wheelDelta = useRef(0);
  const wheelLockedUntil = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const move = (direction: 1 | -1) => {
    if (items.length < 2) return;

    setActiveIndex((current) =>
      (current + direction + items.length) % items.length,
    );
  };

  useEffect(() => {
    const picker = pickerRef.current;
    if (!picker) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const now = Date.now();

      if (now < wheelLockedUntil.current) return;

      wheelDelta.current += event.deltaY;

      if (Math.abs(wheelDelta.current) < WHEEL_THRESHOLD) return;

      move(wheelDelta.current > 0 ? 1 : -1);

      wheelDelta.current = 0;
      wheelLockedUntil.current = now + WHEEL_LOCK_MS;
    };

    picker.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      picker.removeEventListener("wheel", handleWheel);
    };
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.changedTouches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startY = touchStartY.current;
    const endY = event.changedTouches[0]?.clientY;
    touchStartY.current = null;

    if (startY === null || endY === undefined) return;

    const distance = endY - startY;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) move(distance < 0 ? 1 : -1);
  };

  const activeItem = items[activeIndex];

  return (
    <div
      className={styles.picker}
      tabIndex={0}
      role="group"
      aria-label={label}
      ref={pickerRef}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ul className={styles.pickerList} aria-hidden="true">
        {items.map((item, index) => {
          const forwardDistance = (index - activeIndex + items.length) % items.length;
          let position = "hiddenBelow";

          if (forwardDistance === 0) position = "current";
          else if (forwardDistance === 1) position = "next";
          else if (forwardDistance === items.length - 1) position = "previous";
          else if (forwardDistance > items.length / 2) position = "hiddenAbove";

          return (
            <li
              key={item.id}
              className={`${styles.pickerItem} ${styles[position]}`}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
      <span className={styles.visuallyHidden} aria-live="polite">
        {activeItem?.label}
      </span>
    </div>
  );
}
