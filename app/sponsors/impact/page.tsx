import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { site } from "@/content/site";
import { budgetBreakdown } from "@/content/sponsors";
import styles from "./page.module.css";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Sponsor impact",
  description:
    "Where sponsorship money goes at Antares: robot parts, registration, travel, meals and the shop where students learn to build.",
};

/** What a sponsor's contribution actually buys, in plain terms. */
const whatItBuys = [
  {
    title: "The robot",
    body: "Motors, gearboxes, wheels, belts, pneumatics, control electronics and the aluminium and polycarbonate it is all bolted to. More than half the budget goes here.",
  },
  {
    title: "A place at the event",
    body: "FIRST registration and district event fees have to be paid months before the robot exists. Without them there is no season at all.",
  },
  {
    title: "Getting there and staying fed",
    body: "Competition weekends are long. Travel and meals keep a large team of students working from load-in to the last match.",
  },
  {
    title: "The shop",
    body: "The CNC router, the tooling and the stock materials students practise on before they cut a real part.",
  },
];

export default function SponsorImpactPage() {
  const largest = Math.max(...budgetBreakdown.map((item) => item.percent));

  return (
    <main>
      <PageHero
        eyebrow="Sponsor impact"
        title="Where the money goes"
        lede="Antares publishes its budget split so sponsors can see exactly what their contribution funds. These are the planned shares of the 2025-26 expense budget."
      />

      {/* -------------------------------------------------------------- */}
      {/* Budget breakdown                                                */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.chartLayout}>
            <Reveal className={styles.chartIntro}>
              <p className="eyebrow">2025-26 expense budget</p>
              <h2 className={styles.title}>Fifty-five percent of it is the robot</h2>
              <p className="lede">
                Robot parts, stock materials and equipment together account for 55% of planned
                spending. The rest keeps students registered, fed, travelling, practising and
                reaching the community.
              </p>
              <p className={styles.note}>
                Rounded percentages, totalling 100%. Gifts are unrestricted unless Khan Lab School
                approves a written designation.
              </p>
            </Reveal>

            {/* A single-series horizontal bar chart: one measure, one colour,
                every bar directly labelled, sorted largest first. */}
            <Reveal delay={120} className={styles.chart}>
              <ul className={styles.bars}>
                {budgetBreakdown.map((item, index) => (
                  <li className={styles.barRow} key={item.label}>
                    <div className={styles.barHead}>
                      <span className={styles.barLabel}>{item.label}</span>
                      <span className={styles.barValue}>{item.percent}%</span>
                    </div>
                    <div className={styles.barTrack}>
                      <span
                        className={styles.barFill}
                        style={
                          {
                            "--bar-width": `${(item.percent / largest) * 100}%`,
                            "--bar-delay": `${index * 90}ms`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <p className={styles.barNote}>{item.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* What it buys                                                    */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">In practice</p>
            <h2 className={styles.title}>What a contribution buys</h2>
          </Reveal>

          <div className={styles.buysGrid}>
            {whatItBuys.map((item, index) => (
              <Reveal as="article" key={item.title} delay={index * 80} className={styles.buysCard}>
                <h3 className={styles.buysTitle}>{item.title}</h3>
                <p className={styles.buysBody}>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Employee experience                                             */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.offsiteLayout}>
            <Reveal>
              <p className="eyebrow">Proposed for Mission Partners</p>
              <h2 className={styles.title}>A hands-on employee robot experience</h2>
              <p className="lede">
                A Mission Partner could host a supervised team offsite built around the Antares
                robot: a student briefing on how it works and what failed, a safety orientation and
                supervised driving practice, then short driving and scoring challenges for
                employees.
              </p>
              <p className={styles.note}>
                This is a proposed concept. Final scope depends on venue, robot availability, a
                partner team for any second robot, adult supervision and school safety approval.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href="/sponsors#levels">
                  Partnership levels
                </Link>
                <a className="button button-ghost" href={`mailto:${site.email.general}`}>
                  Ask about an offsite
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className={styles.offsiteMedia}>
              <Image
                src={asset("/team-photos/6962-stands.jpg")}
                alt="Antares students cheering from the stands at a competition"
                width={1817}
                height={757}
                sizes="(min-width: 960px) 520px, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Support the team"
        title="Fund a season"
        body="Partnership levels start at $1,000, and in-kind tools, machining, fabrication and expertise are just as useful as cash."
        primary={{ href: "/sponsors#levels", label: "See the levels" }}
        secondary={{ href: "/donate", label: "Ways to donate" }}
      />
    </main>
  );
}
