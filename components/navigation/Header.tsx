"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "../../data/navigation";
import BrandMark from "./BrandMark";
import styles from "./Navigation.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const logoSrc = pathname === "/" || pathname.startsWith("/portfolio/")
    ? "/logos/moca-ventures-header-logo.svg"
    : "/logos/moca-ventures-header-logo-graphite.svg";

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const logo = logoRef.current;
      if (!logo) return;
      logo.style.setProperty(
        "--logo-opacity",
        String(Math.max(0, 1 - window.scrollY / 350)),
      );
      logo.style.pointerEvents = window.scrollY >= 250 ? "none" : "auto";
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div ref={logoRef} className={styles.logoWrap}>
        <BrandMark className={styles.logo} src={logoSrc} />
      </div>
      <div className={`${styles.desktopMenu} ${isOpen ? styles.menuOpen : ""}`}>
        <nav className={styles.menuPanel} aria-label="Primary navigation" aria-hidden={!isOpen}>
          <div className={styles.menuLinks}>
            {primaryNavigation.map((item, index) => (
              <Link key={item.href} ref={index === 0 ? firstLinkRef : undefined} href={item.href} className={item.desktopMenuVariant === "compact" ? styles.compactMenuLink : undefined} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <button ref={toggleRef} type="button" className={styles.menuToggle} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
          <span className={styles.menuIcon} aria-hidden="true"><span /><span /><span /></span>
        </button>
      </div>
    </header>
  );
}
