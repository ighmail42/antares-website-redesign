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
          {/* The frame cannot explain itself, so this note does it.

              Right now the frame does not work at all for this document.
              `/preview` is the only form of a private Doc allowed to load
              inside another site, and for this one it does not render even
              when opened directly, first-party, by a member who can open
              `/edit` perfectly well. Checked against the document this page
              showed before, which does render: same account, same browser,
              both documents "Restricted", both returning an identical
              sign-in page to anyone signed out. So it is not sharing, not
              cookies and not the frame. Previews are closed off for this
              one document, and a Workspace admin has been asked to turn
              them on.

              Once that happens the frame works, and the note still earns
              its place. Signed out, Google fills the frame with a sign-in
              card. Signed in to an account the document was not shared
              with, it serves a bare "400. That's an error", which reads as
              a broken site rather than a closed door. Nothing on this side
              can tell those apart: a cross-origin frame is opaque, and
              Google sends no Timing-Allow-Origin, so even the frame's
              response status reads as 0. The note therefore always shows,
              and always points at Google Docs, which works in every
              case. */}
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
