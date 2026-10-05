import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { internalDoc } from "@/content/internal";
import { page } from "@/content/pages";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Team internal",
  description: "The internal document for Antares team members.",
  robots: { index: false, follow: false },
};

export default function InternalPage() {
  const copy = page("internal");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={copy.hero.lede}
      />

      <section className="section" data-tight>
        <div className="shell-wide">
          {/* ----------------------------------------------------------- */}
          {/* Access note                                                  */}
          {/* ----------------------------------------------------------- */}
          {/* This sits above the frame rather than inside it. Signed out,
              Google fills the frame with its own "Sign in to your Google
              Account" card, so that case explains itself. Signed in to the
              wrong account it does not, and signing in from inside a frame
              often fails anyway, because Google's full sign-in pages send
              X-Frame-Options: DENY and cannot load here. So the way out of
              every case is the same: leave for Google Docs. */}
          <Reveal className={styles.access}>
            <h2 className={styles.accessTitle}>{copy.access.title}</h2>
            <p className={styles.accessBody}>{copy.access.body}</p>
            <p className={styles.accessBody}>
              Not sure which account the document was shared with? Email{" "}
              <a href={`mailto:${site.email.general}`}>{site.email.general}</a>.
            </p>
            <div className={styles.accessActions}>
              <a
                className="button button-primary"
                href={internalDoc.openUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.access.primaryCta}
              </a>
            </div>
          </Reveal>

          {/* ----------------------------------------------------------- */}
          {/* The document                                                 */}
          {/* ----------------------------------------------------------- */}
          <Reveal as="section" delay={120} className={styles.panel}>
            <header className={styles.panelHead}>
              <h2 className={styles.panelTitle}>{internalDoc.label}</h2>
              <a
                className={styles.panelAction}
                href={internalDoc.openUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Docs
              </a>
            </header>
            <div className={styles.frameWrap}>
              <iframe
                className={styles.frame}
                title={internalDoc.label}
                src={internalDoc.embedUrl}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
