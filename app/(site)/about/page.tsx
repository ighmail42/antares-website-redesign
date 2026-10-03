import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { StatGrid } from "@/components/stat-grid/stat-grid";
import { site } from "@/content/site";
import {
  awards,
  headlineStats,
  leadershipLadder,
  matchPhases,
  schoolTimeline,
  subteams,
} from "@/content/team";
import { page } from "@/content/pages";
import styles from "./page.module.css";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "About the team",
  description:
    "Antares is student led: students make the engineering decisions, run the budget, find the sponsors and teach the next group. Based at Khan Lab School in Mountain View, California.",
};

export default function AboutPage() {
  const copy = page("about");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={copy.hero.lede}
      />

      <section className="section" data-tight>
        <div className="shell">
          <StatGrid items={headlineStats} />
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* The ladder                                                      */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.ladder.eyebrow}</p>
            <h2 className={styles.title}>{copy.ladder.title}</h2>
            <p className="lede">{copy.ladder.lede}</p>
          </Reveal>

          <ol className={styles.ladder}>
            {leadershipLadder.map((rung, index) => (
              <Reveal as="li" key={rung.step} delay={index * 100} className={styles.rung}>
                <span className={styles.rungStep}>{rung.step}</span>
                <h3 className={styles.rungTitle}>{rung.title}</h3>
                <p className={styles.rungBody}>{rung.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Subteams                                                        */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.subteams.eyebrow}</p>
            <h2 className={styles.title}>{copy.subteams.title}</h2>
            <p className="lede">{copy.subteams.lede}</p>
          </Reveal>

          <div className={styles.subteamGrid}>
            {subteams.map((subteam, index) => (
              <Reveal as="article" key={subteam.name} delay={index * 60} className={styles.subteam}>
                <h3 className={styles.subteamName}>{subteam.name}</h3>
                <p className={styles.subteamBody}>{subteam.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Khan Lab School                                                 */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="deep" data-scheme="dark">
        <div className="shell">
          <div className={styles.schoolLayout}>
            <Reveal>
              <p className="eyebrow">{copy.school.eyebrow}</p>
              <h2 className={styles.title}>{copy.school.title}</h2>
              <p className="lede">{copy.school.lede}</p>
              <div className="button-row">
                <a className="button button-ghost" href={site.links.school} target="_blank" rel="noopener noreferrer">
                  {copy.school.primaryCta}
                </a>
              </div>
            </Reveal>

            <ol className={styles.timeline}>
              {schoolTimeline.map((entry, index) => (
                <Reveal as="li" key={entry.marker} delay={index * 90} className={styles.timelineItem}>
                  <span className={styles.timelineMarker}>{entry.marker}</span>
                  <p className={styles.timelineBody}>{entry.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* What FRC is                                                     */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.frc.eyebrow}</p>
            <h2 className={styles.title}>{copy.frc.title}</h2>
            <p className="lede">{copy.frc.lede}</p>
          </Reveal>

          <ol className={styles.phaseList}>
            {matchPhases.map((phase, index) => (
              <Reveal as="li" key={phase.step} delay={index * 100} className={styles.phase}>
                <span className={styles.phaseStep}>{phase.step}</span>
                <h3 className={styles.phaseTitle}>{phase.title}</h3>
                <p className={styles.phaseBody}>{phase.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className={styles.frcNote}>
            <p>
              More than 93,000 students competed in FRC in 2025, and over 200 Fortune 500 companies
              sponsor FIRST.{" "}
              <a href={site.links.first} target="_blank" rel="noopener noreferrer">
                Read more about the program
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Awards                                                          */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.awards.eyebrow}</p>
            <h2 className={styles.title}>{copy.awards.title}</h2>
            <p className="lede">{copy.awards.lede}</p>
          </Reveal>

          <ul className={styles.awards}>
            {awards.map((award, index) => (
              <Reveal as="li" key={`${award.year}-${award.name}`} delay={index * 40} className={styles.award}>
                <span className={styles.awardYear}>{award.year}</span>
                <span className={styles.awardName}>{award.name}</span>
                {(award.event || award.note) && (
                  <span className={styles.awardMeta}>{award.event ?? award.note}</span>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.photoSection}>
        <Image
          className={styles.photo}
          src={asset("/team-photos/team-2026.webp")}
          alt="The full Antares team, students and mentors, in team shirts"
          width={2432}
          height={1536}
          sizes="100vw"
        />
      </section>

      <CtaBand
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{ href: "/sponsors", label: copy.cta.primaryCta ?? "" }}
        secondary={{ href: "/donate", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
