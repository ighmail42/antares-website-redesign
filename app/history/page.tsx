import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { StatGrid } from "@/components/stat-grid/stat-grid";
import { awards, headlineStats } from "@/content/team";
import { pastSeasons } from "@/content/seasons";
import { SeasonCard } from "./season-card";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "History",
  description:
    "Every Antares season since 2018: the robots, the awards, the things that broke, and the build blogs students wrote along the way.",
};

export default function HistoryPage() {
  return (
    <main>
      <PageHero
        eyebrow="History"
        title="Every season since 2018"
        lede="One new robot a year, built in six weeks by students. These are the machines, the awards, and the lessons that shaped the program."
      />

      <section className="section" data-tight>
        <div className="shell">
          <StatGrid items={headlineStats} tone="quiet" />
        </div>
      </section>

      <section className="section" data-tight>
        <div className="shell">
          <div className={styles.timeline}>
            {pastSeasons.map((season, index) => (
              <SeasonCard key={season.year} season={season} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-tone="deep">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">The full list</p>
            <h2 className={styles.awardsTitle}>FIRST awards, 2018 to today</h2>
          </Reveal>
          <ul className={styles.awardList}>
            {awards.map((award, index) => (
              <Reveal as="li" key={`${award.year}-${award.name}`} delay={index * 40} className={styles.awardRow}>
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

      <CtaBand
        eyebrow="What comes next"
        title="Help fund the next robot"
        body="Every season on this page was paid for by sponsors, families and in-kind support. The next one needs the same."
        primary={{ href: "/sponsors", label: "Partnership levels" }}
        secondary={{ href: "/season", label: "This season" }}
      />
    </main>
  );
}
