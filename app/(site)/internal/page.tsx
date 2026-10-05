import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { internalDoc } from "@/content/internal";
import { page } from "@/content/pages";
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
          {/* The frame below cannot explain itself. Signed out, Google
              fills it with a sign-in card; signed in to an account the
              document was not shared with, with a bare "400. That's an
              error", which reads as a broken site rather than a closed
              door. Nothing on this side can tell those apart: Google sends
              no Timing-Allow-Origin, so the frame's response status reads
              as 0, and a cross-origin document is otherwise opaque. So the
              frame always renders and this note always shows. */}
          <Reveal className={styles.access}>
            <p className={styles.accessBody}>{copy.access.body}</p>
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
              Not showing?{" "}
              <a href={internalDoc.openUrl} target="_blank" rel="noopener noreferrer">
                Open it in Google Docs
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
