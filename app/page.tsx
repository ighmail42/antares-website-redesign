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
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className={styles.hero}>
        <HeroMedia media={heroMedia} intensity={0.22} priority />
        <Starfield density={110} />

        <div className="shell-wide">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={`eyebrow ${styles.heroEyebrow}`}>
                FRC Team 6962 &middot; Khan Lab School &middot; Mountain View, CA
              </p>
              <h1 className={styles.heroTitle}>
                Students build the robot.
                <br />
                <span className={styles.heroAccent}>Students run the team.</span>
              </h1>
              <p className={styles.heroLede}>
                Antares is a FIRST Robotics Competition team of sixth through twelfth graders. Every
                January we get six weeks to design, build, wire and program a 120-pound robot, then
                take it to the field.
              </p>
              <div className="button-row">
                <Link className="button button-primary" href="/sponsors">
                  Partner with us
                </Link>
                <Link className="button button-ghost" href="/season">
                  See this season
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
            <p className="eyebrow">Who we are</p>
            <h2 className={styles.sectionTitle}>Three communities, one team</h2>
            <p className="lede">
              If you are meeting Antares for the first time, these are the pieces worth knowing.
            </p>
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
      <section className="section" data-tight data-tone="deep">
        <div className="shell">
          <Reveal className={styles.sponsorHead}>
            <div>
              <p className="eyebrow">Our partners</p>
              <h2 className={styles.sponsorTitle}>
                Companies and foundations that make the season possible
              </h2>
            </div>
            <Link className="button button-ghost" href="/sponsors">
              All sponsors
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
      <section className={styles.photoSection}>
        <Image
          className={styles.photo}
          src="/team-photos/antares-stands.jpg"
          alt="Antares students in the stands at a competition, sponsor logos on the backs of their shirts"
          width={2560}
          height={1700}
          sizes="100vw"
        />
        <div className={styles.photoCaption}>
          <div className="shell">
            <Reveal>
              <p className={styles.photoText}>
                Sponsor logos travel with us. They are on the shirts in the stands, on the pit
                display, and on the robot itself at every event we attend.
              </p>
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
              <p className="eyebrow">How a match works</p>
              <h2 className={styles.sectionTitle}>Three robots against three robots</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">
                Each team brings one student-built robot. Every match pairs three red-alliance teams
                against three blue-alliance teams, and lasts two minutes and thirty seconds.
              </p>
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
              <p className="eyebrow">Student led</p>
              <h2 className={styles.sectionTitle}>Seven years to become the person who teaches it</h2>
              <p className="lede">
                FRC mostly serves grades 9 through 12. Antares starts in grade 6, so students have
                enough seasons to learn a discipline, lead it, and hand it on before they graduate.
                Mentors provide safety, technical context and coaching. Students make the decisions.
              </p>
              <div className="button-row">
                <Link className="button button-ghost" href="/about">
                  How the team works
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
      <section className="section" data-tone="deep">
        <div className="shell">
          <div className={styles.seasonLayout}>
            <Reveal className={styles.seasonCopy}>
              <p className="eyebrow">Season {currentSeason.year}</p>
              <h2 className={styles.sectionTitle}>{currentSeason.game}</h2>
              <p className="lede">{currentSeason.summary}</p>
              <div className="button-row">
                <Link className="button button-primary" href="/season">
                  Follow the season
                </Link>
                <Link className="button button-ghost" href="/history">
                  Every robot since 2018
                </Link>
              </div>
            </Reveal>

            {currentSeason.image && (
              <Reveal delay={140} className={styles.seasonMedia}>
                <Image
                  src={currentSeason.image.src}
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
        eyebrow="Support the team"
        title="Back a team that hands the tools to students"
        body="Sponsorship funds robot parts, registration, travel and the shop where sixth graders learn to build. Partnership levels start at $1,000, and in-kind support and employer matching are welcome."
        primary={{ href: "/sponsors", label: "Partnership levels" }}
        secondary={{ href: "/donate", label: "Ways to donate" }}
      />
    </main>
  );
}
