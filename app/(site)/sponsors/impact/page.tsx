import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { site } from "@/content/site";
import { mailto } from "@/lib/mailto";
import { budgetBreakdown } from "@/content/sponsors";
import { page } from "@/content/pages";
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
    body: "Motors, gearboxes, wheels, belts, pneumatics, control electronics and the aluminum and polycarbonate it is all bolted to. More than half the budget goes here.",
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
    body: "The CNC router, the tooling and the stock materials students practice on before they cut a real part.",
  },
];

export default function SponsorImpactPage() {
  const copy = page("impact");
  const largest = Math.max(...budgetBreakdown.map((item) => item.percent));

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={copy.hero.lede}
      />

      {/* -------------------------------------------------------------- */}
      {/* Budget breakdown                                                */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.chartLayout}>
            <Reveal className={styles.chartIntro}>
              <p className="eyebrow">{copy.chart.eyebrow}</p>
              <h2 className={styles.title}>{copy.chart.title}</h2>
              <p className="lede">{copy.chart.lede}</p>
              <p className={styles.note}>{copy.chart.note}</p>
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
            <p className="eyebrow">{copy.buys.eyebrow}</p>
            <h2 className={styles.title}>{copy.buys.title}</h2>
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
              <p className="eyebrow">{copy.offsite.eyebrow}</p>
              <h2 className={styles.title}>{copy.offsite.title}</h2>
              <p className="lede">{copy.offsite.lede}</p>
              <p className={styles.note}>{copy.offsite.note}</p>
              <div className="button-row">
                <Link className="button button-primary" href="/sponsors#levels">
                  {copy.offsite.primaryCta}
                </Link>
                <a
                  className="button button-ghost"
                  href={mailto({ to: site.email.general, subject: site.email.subjects.sponsorship })}
                >
                  {copy.offsite.secondaryCta}
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
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{ href: "/sponsors#levels", label: copy.cta.primaryCta ?? "" }}
        secondary={{ href: "/donate", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
