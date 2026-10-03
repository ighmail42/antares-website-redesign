import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { asset } from "@/lib/asset";
import { allEntries, embedUrl, entryBySlug, neighbours, type BlogEntry } from "@/lib/blog";
import { formatDate, parseBody, type PostSection } from "@/content/posts";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

/** Every entry is a page at build time, since the site is a static export. */
export function generateStaticParams() {
  return allEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = entryBySlug(slug);
  if (!entry) return { title: "Build blog" };
  return {
    title: `${entry.title} — ${entry.seasonYear} ${entry.seasonGame}`,
    description:
      entry.summary ??
      `Antares build blog: ${entry.title}, from the ${entry.seasonYear} ${entry.seasonGame} season.`,
    /* A draft has a page so it can be previewed, but should not be indexed. */
    robots: entry.draft ? { index: false, follow: false } : undefined,
  };
}

/** A section of a post written here: heading, text, and an optional photo. */
function Section({ section }: { section: PostSection }) {
  return (
    <Reveal as="section" className={styles.section}>
      {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}

      {section.body &&
        parseBody(section.body).map((block, index) =>
          block.kind === "list" ? (
            <ul key={index} className={styles.list}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          ) : (
            <p key={index}>{block.text}</p>
          ),
        )}

      {section.image && (
        <figure className={styles.figure}>
          <Image
            src={asset(section.image)}
            alt={section.imageAlt ?? ""}
            width={1600}
            height={1000}
          />
          {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
        </figure>
      )}
    </Reveal>
  );
}

/** An older post that lives in a Google Doc or a PDF, shown inside the site. */
function EmbeddedDocument({ entry }: { entry: BlogEntry }) {
  const src = entry.kind === "pdf" ? asset(embedUrl(entry)) : embedUrl(entry);
  return (
    <>
      <div className={styles.reader}>
        <iframe className={styles.frame} src={src} title={entry.title} loading="lazy" />
      </div>
      {entry.kind === "doc" && (
        <p className={styles.note}>
          Nothing showing? This post lives in a Google Doc, and it only embeds here if the document
          is shared with <strong>anyone with the link</strong>. Use &ldquo;Open on its own&rdquo;
          above, or ask the team to change the sharing setting.
        </p>
      )}
    </>
  );
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const entry = entryBySlug(slug);
  if (!entry) notFound();

  const { previous, next } = neighbours(entry);
  const written = entry.kind === "post" && entry.post;

  return (
    <main>
      <PageHero
        eyebrow={`${entry.seasonYear} ${entry.seasonGame}`}
        title={entry.title}
        lede={entry.summary}
      >
        {written && (
          <p className={styles.byline}>
            {formatDate(entry.post!.date)}
            {entry.post!.authors ? ` · ${entry.post!.authors}` : ""}
            {entry.draft ? " · Draft" : ""}
          </p>
        )}
        <div className="button-row">
          <Link className="button button-ghost" href="/blog">
            All build blogs
          </Link>
          {!written && (
            <a
              className="button button-ghost"
              href={entry.kind === "pdf" ? asset(embedUrl(entry)) : embedUrl(entry)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on its own
            </a>
          )}
        </div>
      </PageHero>

      <section className="section" data-tight>
        <div className="shell">
          {written ? (
            <article className={styles.article}>
              {entry.post!.image && (
                <Reveal className={styles.cover}>
                  <Image
                    src={asset(entry.post!.image)}
                    alt={entry.post!.imageAlt ?? ""}
                    width={1600}
                    height={900}
                    priority
                  />
                </Reveal>
              )}
              {entry.post!.sections.map((section, index) => (
                <Section key={index} section={section} />
              ))}
            </article>
          ) : (
            <EmbeddedDocument entry={entry} />
          )}

          <nav className={styles.pager} aria-label="Other posts this season">
            {previous ? (
              <Link className={styles.pagerLink} href={`/blog/${previous.slug}`}>
                <span className={styles.pagerDirection}>Previous</span>
                <span className={styles.pagerLabel}>{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link className={`${styles.pagerLink} ${styles.pagerNext}`} href={`/blog/${next.slug}`}>
                <span className={styles.pagerDirection}>Next</span>
                <span className={styles.pagerLabel}>{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </main>
  );
}
