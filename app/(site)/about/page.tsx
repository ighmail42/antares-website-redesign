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
import styles from "./page.module.css";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "About the team",
  description:
    "Antares is student led: students make the engineering decisions, run the budget, find the sponsors and teach the next group. Based at Khan Lab School in Mountain View, California.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Antares"
        title="Students make the decisions"
        lede="Mentors bring safety, technical context and coaching. Students do the rest: they make the engineering calls, run the budget, find the sponsors, and teach the group coming up behind them."
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
            <p className="eyebrow">Leadership development</p>
            <h2 className={styles.title}>Knowledge that carries forward</h2>
            <p className="lede">
              FRC mostly serves grades 9 through 12. Because Antares starts in grade 6, a student
              can spend seven years on the team: long enough to learn a discipline properly, lead
              it, and train a replacement before they leave.
            </p>
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
            <p className="eyebrow">What students lead</p>
            <h2 className={styles.title}>Eight disciplines, all student run</h2>
            <p className="lede">
              Every one of these has a student lead, a training curriculum and a job to do before
              the robot ships.
            </p>
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
              <p className="eyebrow">Our school</p>
              <h2 className={styles.title}>Khan Lab School</h2>
              <p className="lede">
                Antares is based at Khan Lab School, a nonprofit school built to test what
                mastery-based, student-directed learning looks like in practice. The team extends
                that model into an engineering program with real deadlines, public performance and
                student ownership.
              </p>
              <div className="button-row">
                <a className="button button-ghost" href={site.links.school} target="_blank" rel="noopener noreferrer">
                  Visit Khan Lab School
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
            <p className="eyebrow">The competition</p>
            <h2 className={styles.title}>What FIRST Robotics Competition is</h2>
            <p className="lede">
              Every January, FIRST reveals a brand-new game. Teams get six weeks to build a robot
              for it, then compete at district events and regionals. Matches last two minutes and
              thirty seconds and pair three teams against three.
            </p>
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
            <p className="eyebrow">Recognition</p>
            <h2 className={styles.title}>A growing record</h2>
            <p className="lede">
              Antares awards span technical performance, imagery, team culture and individual
              student leadership.
            </p>
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
        eyebrow="Get involved"
        title="Support the next seven years of students"
        body="Sponsorship and donations pay for the parts, the registration fees and the shop time that make this program possible."
        primary={{ href: "/sponsors", label: "Partner with us" }}
        secondary={{ href: "/donate", label: "Donate" }}
      />
    </main>
  );
}
