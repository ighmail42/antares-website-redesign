import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { StatGrid } from "@/components/stat-grid/stat-grid";
import { awards, headlineStats } from "@/content/team";
import { pastSeasons } from "@/content/seasons";
import { SeasonCard } from "./season-card";
import { page } from "@/content/pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "History",
  description:
    "Every Antares season since 2018: the robots, the awards, the things that broke, and the build blogs students wrote along the way.",
};

export default function HistoryPage() {
  const copy = page("history");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={copy.hero.lede}
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

      <section className="section" data-tone="deep" data-scheme="dark">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.awards.eyebrow}</p>
            <h2 className={styles.awardsTitle}>{copy.awards.title}</h2>
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
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{ href: "/sponsors", label: copy.cta.primaryCta ?? "" }}
        secondary={{ href: "/season", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
