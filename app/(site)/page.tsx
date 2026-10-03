import Image from "next/image";
import Link from "next/link";

import { Constellation } from "@/components/constellation/constellation";
import { CtaBand } from "@/components/cta-band/cta-band";
import { HeroMedia } from "@/components/hero-media/hero-media";
import { LogoMarquee } from "@/components/logo-marquee/logo-marquee";
import { Reveal } from "@/components/reveal/reveal";
import { StatGrid } from "@/components/stat-grid/stat-grid";
import { Starfield } from "@/components/starfield/starfield";
import { heroMedia } from "@/content/media";
import { currentSeason } from "@/content/seasons";
import { featuredSponsors } from "@/content/sponsors";
import { communities, headlineStats, leadershipLadder, matchPhases } from "@/content/team";
import { page } from "@/content/pages";
import styles from "./page.module.css";
import { asset } from "@/lib/asset";

export default function HomePage() {
  const copy = page("home");

  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className={styles.hero} data-scheme="dark">
        <HeroMedia media={heroMedia} intensity={0.62} priority />
        <Starfield density={110} />

        <div className="shell-wide">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={`eyebrow ${styles.heroEyebrow}`}>{copy.hero.eyebrow}</p>
              <h1 className={styles.heroTitle}>
                {copy.hero.title}
                <br />
                <span className={styles.heroAccent}>{copy.hero.note}</span>
              </h1>
              <p className={styles.heroLede}>{copy.hero.lede}</p>
              <div className="button-row">
                <Link className="button button-primary" href="/sponsors">
                  {copy.hero.primaryCta}
                </Link>
                <Link className="button button-ghost" href="/season">
                  {copy.hero.secondaryCta}
                </Link>
              </div>
            </div>

            {/* The full constellation, not just the icon: Antares is the bright
                star in Scorpius, and clicking it opens the team's story. */}
            <Link className={styles.heroConstellation} href="/about" aria-label="How the team works">
              <Constellation labelled />
            </Link>
          </div>
        </div>

        <a className={styles.scrollCue} href="#who-we-are">
          <span>Scroll</span>
        </a>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Who we are                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" id="who-we-are" data-tone="raised">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{copy.communities.eyebrow}</p>
            <h2 className={styles.sectionTitle}>{copy.communities.title}</h2>
            <p className="lede">{copy.communities.lede}</p>
          </Reveal>

          <div className={styles.communityGrid}>
            {communities.map((community, index) => (
              <Reveal as="article" key={community.id} delay={index * 120} className={styles.communityCard}>
                <p className={styles.cardKicker}>{community.kicker}</p>
                <h3 className={styles.cardTitle}>{community.title}</h3>
                <p className={styles.cardBody}>{community.body}</p>
                {community.external ? (
                  <a className={styles.cardLink} href={community.href} target="_blank" rel="noopener noreferrer">
                    {community.linkLabel}
                  </a>
                ) : (
                  <Link className={styles.cardLink} href={community.href}>
                    {community.linkLabel}
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Numbers                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" data-tight>
        <div className="shell">
          <StatGrid items={headlineStats} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sponsors, high on the page where they are visible                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" data-tight data-tone="raised">
        <div className="shell">
          <Reveal className={styles.sponsorHead}>
            <div>
              <p className="eyebrow">{copy.sponsors.eyebrow}</p>
              <h2 className={styles.sponsorTitle}>{copy.sponsors.title}</h2>
            </div>
            <Link className="button button-ghost" href="/sponsors">
              {copy.sponsors.primaryCta}
            </Link>
          </Reveal>
        </div>
        <div className={styles.marquee}>
          <LogoMarquee sponsors={featuredSponsors} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Team photo                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className={styles.photoSection} data-scheme="dark">
        <Image
          className={styles.photo}
          src={asset("/team-photos/antares-stands.jpg")}
          alt="Antares students in the stands at a competition, sponsor logos on the backs of their shirts"
          width={2560}
          height={1700}
          sizes="100vw"
        />
        <div className={styles.photoCaption}>
          <div className="shell">
            <Reveal>
              <p className={styles.photoText}>{copy.photo.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How a match works                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <div className={styles.splitHead}>
            <Reveal>
              <p className="eyebrow">{copy.match.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{copy.match.title}</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{copy.match.lede}</p>
            </Reveal>
          </div>

          <ol className={styles.phaseList}>
            {matchPhases.map((phase, index) => (
              <Reveal as="li" key={phase.step} delay={index * 120} className={styles.phase}>
                <span className={styles.phaseStep}>{phase.step}</span>
                <h3 className={styles.phaseTitle}>{phase.title}</h3>
                <p className={styles.phaseBody}>{phase.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Student led                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="shell">
          <div className={styles.ladderLayout}>
            <Reveal className={styles.ladderIntro}>
              <p className="eyebrow">{copy.studentLed.eyebrow}</p>
              <h2 className={styles.sectionTitle}>{copy.studentLed.title}</h2>
              <p className="lede">{copy.studentLed.lede}</p>
              <div className="button-row">
                <Link className="button button-ghost" href="/about">
                  {copy.studentLed.primaryCta}
                </Link>
              </div>
            </Reveal>

            <ol className={styles.ladder}>
              {leadershipLadder.map((rung, index) => (
                <Reveal as="li" key={rung.step} delay={index * 100} className={styles.rung}>
                  <span className={styles.rungStep}>{rung.step}</span>
                  <div>
                    <h3 className={styles.rungTitle}>{rung.title}</h3>
                    <p className={styles.rungBody}>{rung.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* This season                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" data-tone="deep" data-scheme="dark">
        <div className="shell">
          <div className={styles.seasonLayout}>
            <Reveal className={styles.seasonCopy}>
              <p className="eyebrow">Season {currentSeason.year}</p>
              <h2 className={styles.sectionTitle}>{currentSeason.game}</h2>
              <p className="lede">{currentSeason.summary}</p>
              <div className="button-row">
                <Link className="button button-primary" href="/season">
                  {copy.season.primaryCta}
                </Link>
                <Link className="button button-ghost" href="/history">
                  {copy.season.secondaryCta}
                </Link>
              </div>
            </Reveal>

            {currentSeason.image && (
              <Reveal delay={140} className={styles.seasonMedia}>
                <Image
                  src={asset(currentSeason.image.src)}
                  alt={currentSeason.image.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 960px) 520px, 100vw"
                />
              </Reveal>
            )}
          </div>
        </div>
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
