import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { blogPosts, blogSeasons } from "@/lib/blog";
import { page } from "@/content/pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Build blog",
  description:
    "Every Antares build blog, written by students during the season: what we designed, what broke, and what changed as a result.",
};

export default function BlogIndexPage() {
  const copy = page("blog");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={`${blogPosts.length} posts covering what the team designed each week, what broke, and what changed as a result.`}
      />

      <section className="section">
        <div className="shell">
          {blogSeasons.map((entry, index) => (
            <Reveal key={entry.season.year} delay={index * 70} className={styles.season}>
              <div className={styles.seasonHead}>
                <h2 className={styles.seasonTitle}>
                  <span className={styles.seasonYear}>{entry.season.year}</span> {entry.season.game}
                </h2>
                <Link className={styles.seasonLink} href="/history">
                  About this season
                </Link>
              </div>

              <ul className={styles.postList}>
                {entry.posts.map((post) => (
                  <li key={post.slug}>
                    <Link className={styles.post} href={`/blog/${post.slug}`}>
                      <span className={styles.postLabel}>{post.label}</span>
                      <span className={styles.postArrow} aria-hidden="true">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{ href: "/season", label: copy.cta.primaryCta ?? "" }}
        secondary={{ href: "/sponsors", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
