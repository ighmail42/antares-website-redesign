"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { primaryAction, siteNavigation } from "@/lib/site-navigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The header floats over the hero at the top of a page and gains a solid
  // background once the reader scrolls past it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the page behind the open drawer from scrolling.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined} data-open={menuOpen || undefined}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>

      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="Antares, Team 6962 home">
          <Image
            className={styles.logo}
            src="/brand/icon-yellow.png"
            alt=""
            width={302}
            height={390}
            priority
          />
          <span className={styles.brandText}>
            Antares
            <span className={styles.brandNumber}>6962</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {siteNavigation.map((item) => (
            <Link
              key={item.href}
              className={styles.link}
              href={item.href}
              data-active={isActive(item.href) || undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className={styles.cta} href={primaryAction.href}>
            {primaryAction.label}
          </Link>
        </nav>

        <button
          className={styles.toggle}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.toggleBars} aria-hidden="true" />
          <span className={styles.toggleLabel}>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      <div className={styles.drawer} id="mobile-navigation" hidden={!menuOpen}>
        <nav aria-label="Primary mobile">
          {siteNavigation.map((item, index) => (
            <Link
              key={item.href}
              className={styles.drawerLink}
              href={item.href}
              data-active={isActive(item.href) || undefined}
              style={{ "--drawer-index": index } as React.CSSProperties}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={`${styles.drawerLink} ${styles.drawerCta}`}
            href={primaryAction.href}
            style={{ "--drawer-index": siteNavigation.length } as React.CSSProperties}
            onClick={() => setMenuOpen(false)}
          >
            {primaryAction.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
