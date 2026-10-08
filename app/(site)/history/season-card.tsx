import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal/reveal";
import type { Season } from "@/content/seasons";
import styles from "./season-card.module.css";
import { asset } from "@/lib/asset";
import { slugFor } from "@/lib/blog";

/**
 * One season in the history timeline. Sections collapse gracefully when a
 * season has no robot image, no awards or no blog posts yet.
 */
export function SeasonCard({ season, index }: { season: Season; index: number }) {
  return (
    <Reveal as="article" className={styles.card} delay={60}>
      <div className={styles.yearRail} aria-hidden="true">
        <span className={styles.year}>{season.year}</span>
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <h2 className={styles.game}>{season.game}</h2>
          {(season.robot || season.students) && (
            <p className={styles.robot}>
              {season.robot && <span>Robot: {season.robot}</span>}
              {season.robot && season.students ? <span aria-hidden="true"> · </span> : null}
              {season.students && <span>{season.students} students</span>}
            </p>
          )}
        </header>

        <p className={styles.summary}>{season.summary}</p>

        {season.highlights && season.highlights.length > 0 && (
          <ul className={styles.highlights}>
            {season.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        {season.awards && season.awards.length > 0 && (
          <ul className={styles.awards}>
            {season.awards.map((award) => (
              <li key={award} className={styles.awardChip}>
                {award}
              </li>
            ))}
          </ul>
        )}

        {(season.blogPosts?.length || season.techBinder) && (
          <div className={styles.links}>
            {season.techBinder && (
              <a
                className={styles.binder}
                href={asset(season.techBinder)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tech binder
              </a>
            )}
            {season.blogPosts?.map((post) => (
              <Link
                key={post.href}
                className={styles.blogLink}
                href={`/blog/${slugFor(season.year, post.label)}`}
              >
                {post.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {season.image && (
        <div className={styles.media}>
          <Image
            src={asset(season.image.src)}
            alt={season.image.alt}
            width={1200}
            height={900}
            sizes="(min-width: 1000px) 420px, 100vw"
            /* The first two cards are usually above the fold. */
            priority={index < 2}
          />
        </div>
      )}
    </Reveal>
  );
}
