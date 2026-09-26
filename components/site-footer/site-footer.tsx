import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { site } from "@/content/site";
import { internalNavigation, primaryAction, siteNavigation } from "@/lib/site-navigation";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <Link className={styles.brand} href="/">
              <Image src="/brand/transparent-logo.png" alt="Antares 6962" width={1027} height={600} />
            </Link>
            <p className={styles.tagline}>
              FIRST Robotics Competition Team {site.teamNumber}, based at Khan Lab School in {site.city}.
            </p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <h2 className={styles.columnTitle}>Explore</h2>
            {siteNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Contact</h2>
            <a href={`mailto:${site.email.general}`}>{site.email.general}</a>
            <a href={`mailto:${site.email.donate}`}>{site.email.donate}</a>
            <address className={styles.address}>
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.line3}
            </address>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Elsewhere</h2>
            <a href={site.links.school} target="_blank" rel="noopener noreferrer">
              Khan Lab School
            </a>
            <a href={site.links.first} target="_blank" rel="noopener noreferrer">
              About FRC
            </a>
            <a href={site.links.blueAlliance} target="_blank" rel="noopener noreferrer">
              Team 6962 on The Blue Alliance
            </a>
            {internalNavigation.map((item) => (
              <Link key={item.href} href={item.href as Route}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} Antares, FRC Team {site.teamNumber}. Gifts are received by{" "}
            {site.legal.recipient}, a {site.legal.status}.
          </p>
          <p className={styles.built}>Built and maintained by Antares students.</p>
        </div>
      </div>
    </footer>
  );
}
