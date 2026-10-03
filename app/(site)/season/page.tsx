import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { seasonMedia } from "@/content/media";
import { currentSeason, pastSeasons } from "@/content/seasons";
import { page } from "@/content/pages";
import styles from "./page.module.css";
import { asset } from "@/lib/asset";
import { slugFor } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Season ${currentSeason.year}`,
  description: `Follow Antares through the ${currentSeason.year} FIRST Robotics Competition season: build blogs, the robot, and the events we are competing at.`,
};

/** The shape of every FRC season, for visitors who have never followed one. */
const seasonRhythm = [
  {
    when: "Autumn",
    title: "Pre-season",
    body: "New students train in design, build, electrical, code and fabrication. Returning leads prototype mechanisms and rebuild the shop.",
  },
  {
    when: "January",
    title: "Kickoff",
    body: "FIRST reveals the game. The whole team reads the manual, scores the strategy, and picks what the robot has to be good at.",
  },
  {
    when: "Six weeks",
    title: "Build season",
    body: "Design reviews, CAD, fabrication, wiring and code, all at once. Sixteen-plus hours a week per student, and a weekly blog documenting it.",
  },
  {
    when: "Feb to April",
    title: "Competition",
    body: "District events and regionals, then the district championship if we qualify. Three robots against three, all weekend.",
  },
  {
    when: "Spring onward",
    title: "Off-season",
    body: "Fix what broke, run off-season events like Sunset Showdown, and start teaching the next group.",
  },
];

export default function SeasonPage() {
  const copy = page("season");
  const previous = pastSeasons[0];

  return (
    <main>
      <PageHero
        eyebrow={`Season ${currentSeason.year}`}
        title={currentSeason.game}
        lede={currentSeason.summary}
        media={seasonMedia}
      />

      {currentSeason.highlights && currentSeason.highlights.length > 0 && (
        <section className="section" data-tight>
          <div className="shell">
            <ul className={styles.highlights}>
              {currentSeason.highlights.map((highlight, index) => (
                <Reveal as="li" key={highlight} delay={index * 90} className={styles.highlight}>
                  {highlight}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- */}
      {/* Build blogs                                                     */}
      {/* -------------------------------------------------------------- */}
      {currentSeason.blogPosts && currentSeason.blogPosts.length > 0 && (
        <section className="section" data-tone="raised">
          <div className="shell">
            <Reveal>
              <p className="eyebrow">{copy.blogs.eyebrow}</p>
              <h2 className={styles.title}>{copy.blogs.title}</h2>
              <p className="lede">{copy.blogs.lede}</p>
            </Reveal>

            <ul className={styles.blogGrid}>
              {currentSeason.blogPosts.map((post, index) => (
                <Reveal as="li" key={post.href} delay={index * 70}>
                  <Link
                    className={styles.blogCard}
                    href={`/blog/${slugFor(currentSeason.year, post.label)}`}
                  >
                    <span className={styles.blogLabel}>{post.label}</span>
                    <span className={styles.blogArrow} aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- */}
      {/* Season rhythm                                                   */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.rhythm.eyebrow}</p>
            <h2 className={styles.title}>{copy.rhythm.title}</h2>
          </Reveal>

          <ol className={styles.rhythm}>
            {seasonRhythm.map((phase, index) => (
              <Reveal as="li" key={phase.title} delay={index * 80} className={styles.phase}>
                <span className={styles.phaseWhen}>{phase.when}</span>
                <div>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                  <p className={styles.phaseBody}>{phase.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Last season                                                     */}
      {/* -------------------------------------------------------------- */}
      {previous && (
        <section className="section" data-tone="deep" data-scheme="dark">
          <div className="shell">
            <div className={styles.previousLayout}>
              <Reveal>
                <p className="eyebrow">{copy.previous.eyebrow}</p>
                <h2 className={styles.title}>
                  {previous.year} {previous.game}
                  {previous.robot ? ` — ${previous.robot}` : ""}
                </h2>
                <p className="lede">{previous.summary}</p>
                {previous.highlights && (
                  <ul className={styles.previousList}>
                    {previous.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <div className="button-row">
                  <Link className="button button-ghost" href="/history">
                    {copy.previous.primaryCta}
                  </Link>
                  {previous.techBinder && (
                    <a
                      className="button button-ghost"
                      href={asset(previous.techBinder)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {previous.year} tech binder
                    </a>
                  )}
                </div>
              </Reveal>

              {previous.image && (
                <Reveal delay={120} className={styles.previousMedia}>
                  <Image
                    src={asset(previous.image.src)}
                    alt={previous.image.alt}
                    width={1200}
                    height={900}
                    sizes="(min-width: 960px) 520px, 100vw"
                  />
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{ href: "/sponsors", label: copy.cta.primaryCta ?? "" }}
        secondary={{ href: "/history", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
