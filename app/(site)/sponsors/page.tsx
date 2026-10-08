import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { StatGrid } from "@/components/stat-grid/stat-grid";
import { SponsorWall } from "./sponsor-wall";
import { site } from "@/content/site";
import { mailto } from "@/lib/mailto";
import { firstImpactStats, partnershipLevels, sponsorTiers, sponsorValue } from "@/content/sponsors";
import { studentQuotes } from "@/content/team";
import { page } from "@/content/pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "The companies and foundations behind Antares, what sponsorship pays for, and the 2026-27 partnership tiers starting at $1,000.",
};

export default function SponsorsPage() {
  const copy = page("sponsors");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={copy.hero.lede}
      >
        <div className="button-row">
          <a className="button button-primary" href="#levels">
            {copy.hero.primaryCta}
          </a>
          <a
            className="button button-ghost"
            href={mailto({ to: site.email.general, subject: site.email.subjects.sponsorship })}
          >
            {copy.hero.secondaryCta}
          </a>
        </div>
      </PageHero>

      {/* -------------------------------------------------------------- */}
      {/* Why sponsor                                                     */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.value.eyebrow}</p>
            <h2 className={styles.title}>{copy.value.title}</h2>
            <p className="lede">{copy.value.lede}</p>
          </Reveal>

          <div className={styles.valueGrid}>
            {sponsorValue.map((value, index) => (
              <Reveal as="article" key={value.title} delay={index * 90} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueBody}>{value.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.footnote}>
            <p>{copy.value.note}</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* FIRST outcomes                                                  */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tight>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.first.eyebrow}</p>
            <h2 className={styles.title}>{copy.first.title}</h2>
            <p className="lede">{copy.first.lede}</p>
          </Reveal>
          <div className={styles.statsWrap}>
            <StatGrid items={firstImpactStats} tone="quiet" />
          </div>
          <Reveal className={styles.footnote}>
            <p>{copy.first.note}</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Current sponsors, by tier                                       */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.wall.eyebrow}</p>
            <h2 className={styles.title}>{copy.wall.title}</h2>
          </Reveal>

          <SponsorWall tiers={sponsorTiers} />
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Partnership tiers (anchor stays #levels: /donate links to it)   */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="deep" data-scheme="dark" id="levels">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.levels.eyebrow}</p>
            <h2 className={styles.title}>{copy.levels.title}</h2>
            <p className="lede">{copy.levels.lede}</p>
          </Reveal>

          <div className={styles.levelGrid}>
            {partnershipLevels.map((level, index) => (
              <Reveal
                as="article"
                key={level.name}
                delay={index * 90}
                className={styles.levelCard}
              >
                <div data-highlight={level.highlight || undefined} className={styles.levelInner}>
                  {level.highlight && <span className={styles.levelFlag}>Most popular</span>}
                  <p className={styles.levelAmount}>{level.amount}</p>
                  <h3 className={styles.levelName}>{level.name}</h3>
                  <p className={styles.levelSummary}>{level.summary}</p>
                  <ul className={styles.levelBenefits}>
                    {level.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.footnote}>
            <p>{copy.levels.note}</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Student voices                                                  */}
      {/* -------------------------------------------------------------- */}
      {studentQuotes.length > 0 && (
        <section className="section">
          <div className="shell">
            <Reveal>
              <p className="eyebrow">{copy.quotes.eyebrow}</p>
              <h2 className={styles.title}>{copy.quotes.title}</h2>
            </Reveal>
            <div className={styles.quoteGrid}>
              {studentQuotes.map((quote, index) => (
                <Reveal as="figure" key={quote.name} delay={index * 100} className={styles.quote}>
                  <blockquote>{quote.quote}</blockquote>
                  <figcaption>
                    <span className={styles.quoteName}>{quote.name}</span>
                    <span className={styles.quoteRole}>{quote.role}</span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- */}
      {/* How to sponsor                                                  */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised" id="how-to-sponsor">
        <div className="shell">
          <div className={styles.howLayout}>
            <Reveal>
              <p className="eyebrow">{copy.how.eyebrow}</p>
              <h2 className={styles.title}>{copy.how.title}</h2>
              <ol className={styles.steps}>
                <li>
                  <strong>Choose a tier with the team.</strong> Email{" "}
                  <a href={mailto({ to: site.email.general, subject: site.email.subjects.sponsorship })}>
                    {site.email.general}
                  </a>{" "}
                  and a student will walk you through what each tier includes.
                </li>
                <li>
                  <strong>Make the contribution through Khan Lab School.</strong> KLS is a{" "}
                  {site.legal.status} and issues the donation acknowledgment.
                </li>
              </ol>
            </Reveal>

            <Reveal delay={120} className={styles.legalCard}>
              <h3 className={styles.legalTitle}>Legal recipient</h3>
              <p className={styles.legalBody}>
                {site.legal.recipient}
                <br />
                {site.legal.status}
                <br />
                Federal tax ID {site.legal.ein}
              </p>
              <h3 className={styles.legalTitle}>Designate the gift</h3>
              <p className={styles.legalBody}>
                Put &ldquo;{site.legal.memo}&rdquo; in the memo or notes so the gift reaches the
                team.
              </p>
              <h3 className={styles.legalTitle}>Contacts</h3>
              <p className={styles.legalBody}>
                Partnership discussion:{" "}
                <a href={mailto({ to: site.email.general, subject: site.email.subjects.sponsorship })}>
                  {site.email.general}
                </a>
                <br />
                Giving and in-kind:{" "}
                <a href={mailto({ to: site.email.donate, subject: site.email.subjects.donation })}>
                  {site.email.donate}
                </a>
                <br />
                KLS gift administration:{" "}
                <a href={`mailto:${site.email.schoolGiving}`}>{site.email.schoolGiving}</a>
              </p>
              <Link className={`button button-ghost ${styles.legalLink}`} href="/donate">
                {copy.how.primaryCta}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{
          href: mailto({ to: site.email.general, subject: site.email.subjects.sponsorship }),
          label: copy.cta.primaryCta ?? "",
        }}
        secondary={{ href: "/sponsors/impact", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
