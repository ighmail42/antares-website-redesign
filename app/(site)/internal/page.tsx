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
          {/* This sits above the frame rather than inside it, because the
              frame cannot be trusted to explain itself. Signed out, Google
              fills it with a sign-in card, which is clear enough. Signed in
              to an account the document was not shared with, Google serves a
              bare "400. That's an error" instead, which reads as a broken
              site rather than a closed door. Naming that error here is the
              point of this block. The way out of both is the same, and it is
              not inside the frame: Google's full sign-in and request-access
              pages send X-Frame-Options: DENY, so they only work once you
              leave for Google Docs. */}
          <Reveal className={styles.access}>
            <h2 className={styles.accessTitle}>{copy.access.title}</h2>
            <p className={styles.accessBody}>{copy.access.body}</p>
            <p className={styles.accessBody}>{copy.access.note}</p>
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
            {/* The frame is 680px tall, so anyone who scrolls to it has
                already passed the note above. Repeat the way out here. */}
            <p className={styles.panelFoot}>
              Seeing a Google error or a sign-in card above instead of the document?{" "}
              <a href={internalDoc.openUrl} target="_blank" rel="noopener noreferrer">
                Open it in Google Docs
              </a>{" "}
              to request access or switch accounts.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
