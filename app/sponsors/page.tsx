import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { StatGrid } from "@/components/stat-grid/stat-grid";
import { site } from "@/content/site";
import { firstImpactStats, partnershipLevels, sponsorTiers, sponsorValue } from "@/content/sponsors";
import { studentQuotes } from "@/content/team";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "The companies and foundations behind Antares, what sponsorship pays for, and the 2026-27 partnership levels starting at $1,000.",
};

export default function SponsorsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Sponsors"
        title="Thank you to the people who fund this"
        lede="Sponsorship buys the aluminium, the motors, the registration fees and the shop time. It is the reason a sixth grader at Khan Lab School can learn to build a competition robot."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/sponsors/impact">
            Where the money goes
          </Link>
          <a className="button button-ghost" href={`mailto:${site.email.general}`}>
            Talk to the team
          </a>
        </div>
      </PageHero>

      {/* -------------------------------------------------------------- */}
      {/* Current sponsors, by tier                                       */}
      {/* -------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Our partners</p>
            <h2 className={styles.title}>Every sponsor, by tier</h2>
          </Reveal>

          {sponsorTiers.map((tier, tierIndex) => (
            <Reveal key={tier.id} delay={tierIndex * 80} className={styles.tier}>
              <div className={styles.tierHead}>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierBlurb}>{tier.blurb}</p>
              </div>

              <ul className={styles.logoGrid} data-tier={tier.id}>
                {tier.sponsors.map((sponsor) => (
                  <li key={sponsor.name} className={styles.logoCell}>
                    {sponsor.logo ? (
                      <Image
                        className={styles.logo}
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.width ?? 200}
                        height={sponsor.height ?? 60}
                      />
                    ) : (
                      <span className={styles.textSponsor}>{sponsor.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Why sponsor                                                     */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Why sponsor Antares</p>
            <h2 className={styles.title}>Repeated visibility with future technical talent</h2>
            <p className="lede">
              Sponsorship reaches STEM-focused students, their families, and the wider technology
              community around the team.
            </p>
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
            <p>
              Recognition varies by tier and by event policy. A recent example: sponsor-supplied
              cutting mats and gloves went into gift bags for other teams at regional competitions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* FIRST outcomes                                                  */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tight>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">The wider program</p>
            <h2 className={styles.title}>FIRST builds technical talent at scale</h2>
            <p className="lede">
              Antares turns a national program into a local team your employees can meet, follow and
              support during the season.
            </p>
          </Reveal>
          <div className={styles.statsWrap}>
            <StatGrid items={firstImpactStats} tone="quiet" />
          </div>
          <Reveal className={styles.footnote}>
            <p>Source: FIRST.</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Partnership levels                                              */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="deep" id="levels">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">2026-27 partnership levels</p>
            <h2 className={styles.title}>Pick a level, or design one with us</h2>
            <p className="lede">
              Each level adds to the one before it. Multi-year, in-kind, matching and
              employee-expertise partnerships are all welcome.
            </p>
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
            <p>Final benefits follow sponsor, team, school and event requirements.</p>
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
              <p className="eyebrow">In their words</p>
              <h2 className={styles.title}>What students say</h2>
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
              <p className="eyebrow">How to sponsor</p>
              <h2 className={styles.title}>Two steps</h2>
              <ol className={styles.steps}>
                <li>
                  <strong>Choose a level with the team.</strong> Email{" "}
                  <a href={`mailto:${site.email.general}`}>{site.email.general}</a> and a student
                  will walk you through what each level includes.
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
                Partnership discussion: <a href={`mailto:${site.email.general}`}>{site.email.general}</a>
                <br />
                Giving and in-kind: <a href={`mailto:${site.email.donate}`}>{site.email.donate}</a>
                <br />
                KLS gift administration:{" "}
                <a href={`mailto:${site.email.schoolGiving}`}>{site.email.schoolGiving}</a>
              </p>
              <Link className={`button button-ghost ${styles.legalLink}`} href="/donate">
                All the ways to give
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start a conversation"
        title="A student will answer your email"
        body="Tell us what your company cares about and we will come back with a proposal that fits. In-kind tools, machining and mentorship count too."
        primary={{ href: `mailto:${site.email.general}`, label: "Email the team" }}
        secondary={{ href: "/sponsors/impact", label: "See the impact" }}
      />
    </main>
  );
}
