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
          {/* The frame below cannot explain itself, and often cannot let a
              member in at all.

              Google's session cookie is third-party inside this frame, and
              browsers increasingly refuse to send it. When that happens the
              member sees the sign-in card no matter how many times they
              sign in, because signing in happens first-party in another tab
              and the frame never sees the result. Signed in to an account
              the document was not shared with, Google serves a bare "400.
              That's an error" instead, which reads as a broken site.

              Nothing on this side can tell those apart: Google sends no
              Timing-Allow-Origin, so the frame's response status reads as 0,
              and a cross-origin document is otherwise opaque. So the frame
              always renders, this note always shows, and the note sends
              people to Google Docs, which works in every case.

              The fixes that would actually work both have a cost the team
              declined: embedding the document's published-to-web form makes
              its contents public, and dropping the frame means reading it on
              Google Docs instead of here. */}
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
