import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { announcementsDoc, calendarEmbedUrl, internalLinks } from "@/content/internal";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Team internal",
  description: "Announcements, the team calendar and internal tools for Antares members.",
  robots: { index: false, follow: false },
};

export default function InternalPage() {
  return (
    <main>
      <PageHero
        eyebrow="Team internal"
        title="Announcements and the calendar"
        lede="Everything current members need in one place. Announcements are the source of truth; if it is not written down, it did not happen."
      />

      <section className="section" data-tight>
        <div className="shell-wide">
          <div className={styles.layout}>
            {/* -------------------------------------------------------- */}
            {/* Announcements                                             */}
            {/* -------------------------------------------------------- */}
            <Reveal as="section" className={styles.panel}>
              <header className={styles.panelHead}>
                <h2 className={styles.panelTitle}>Announcements</h2>
                <a
                  className={styles.panelAction}
                  href={announcementsDoc.editUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit
                </a>
              </header>
              <div className={styles.frameWrap}>
                <iframe
                  className={styles.frame}
                  title="Antares announcements"
                  src={announcementsDoc.embedUrl}
                  loading="lazy"
                />
              </div>
            </Reveal>

            {/* -------------------------------------------------------- */}
            {/* Calendar                                                  */}
            {/* -------------------------------------------------------- */}
            <Reveal as="section" delay={120} className={styles.panel}>
              <header className={styles.panelHead}>
                <h2 className={styles.panelTitle}>Calendar</h2>
              </header>
              {calendarEmbedUrl ? (
                <div className={styles.frameWrap}>
                  <iframe
                    className={styles.frame}
                    title="Antares team calendar"
                    src={calendarEmbedUrl}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className={styles.placeholder}>
                  <p>
                    The team calendar is not embedded yet. Paste the Google Calendar embed URL into{" "}
                    <code>content/internal.ts</code> and it will appear here.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Quick links                                                    */}
      {/* ------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell-wide">
          <Reveal>
            <p className="eyebrow">Tools</p>
            <h2 className={styles.sectionTitle}>Quick links</h2>
          </Reveal>

          <ul className={styles.linkGrid}>
            {internalLinks.map((link, index) => {
              const external = link.href.startsWith("http");
              return (
                <Reveal as="li" key={link.title} delay={index * 80}>
                  <a
                    className={styles.linkCard}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <h3 className={styles.linkTitle}>{link.title}</h3>
                    <p className={styles.linkBody}>{link.description}</p>
                    <span className={styles.linkArrow} aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className={styles.help}>
            <p>
              Something missing or out of date? Email{" "}
              <a href={`mailto:${site.email.general}`}>{site.email.general}</a> or open an issue on
              the website repository.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
