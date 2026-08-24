"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mobileMoreNavigation, mobilePrimaryNavigation } from "../../data/navigation";
import styles from "./Navigation.module.css";

type IconName = "home" | "portfolio" | "about" | "talk" | "more";

function NavIcon({ name }: { name: IconName }) {
  if (name === "home") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3Z" /></svg>;
  if (name === "portfolio") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
  if (name === "about") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 10v7M12 7h.01" /></svg>;
  if (name === "talk") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v13H8l-5 3Z" /><path d="m4 6 8 7 8-7" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>;
}

const icons: IconName[] = ["home", "portfolio", "about", "talk"];

export default function MobileNavigation() {
  const pathname = usePathname();
  const [moreOpenedAt, setMoreOpenedAt] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstMoreLinkRef = useRef<HTMLAnchorElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const isMoreOpen = moreOpenedAt === pathname;

  useEffect(() => {
    if (!isMoreOpen) return;
    firstMoreLinkRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setMoreOpenedAt(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpenedAt(null);
        moreButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMoreOpen]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isMoreActive = mobileMoreNavigation.some(({ href }) => isActive(href));

  return (
    <div ref={rootRef} className={styles.mobileNavigationRoot}>
      <div className={`${styles.morePanel} ${isMoreOpen ? styles.morePanelOpen : ""}`} aria-hidden={!isMoreOpen}>
        {mobileMoreNavigation.map((item, index) => <Link key={item.href} ref={index === 0 ? firstMoreLinkRef : undefined} href={item.href} tabIndex={isMoreOpen ? 0 : -1} onClick={() => setMoreOpenedAt(null)}>{item.label}</Link>)}
      </div>
      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        {mobilePrimaryNavigation.map((item, index) => (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? styles.activeNavItem : ""} aria-current={isActive(item.href) ? "page" : undefined}>
            <NavIcon name={icons[index]} /><span>{item.label}</span>
          </Link>
        ))}
        <button ref={moreButtonRef} type="button" className={isMoreOpen || isMoreActive ? styles.activeNavItem : ""} aria-label="More navigation options" aria-expanded={isMoreOpen} onClick={() => setMoreOpenedAt(isMoreOpen ? null : pathname)}>
          <NavIcon name="more" /><span>MORE</span>
        </button>
      </nav>
    </div>
  );
}
