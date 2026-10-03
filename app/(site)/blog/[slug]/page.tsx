import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero/page-hero";
import { asset } from "@/lib/asset";
import { blogPosts, embedUrl, neighbours, postBySlug } from "@/lib/blog";
import styles from "./page.module.css";

type Params = { params: Promise<{ slug: string }> };

/** Every post is a page at build time, since the site is a static export. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Build blog" };
  return {
    title: `${post.label} — ${post.seasonYear} ${post.seasonGame}`,
    description: `Antares build blog: ${post.label}, from the ${post.seasonYear} ${post.seasonGame} season.`,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const { previous, next } = neighbours(post);
  const src = post.kind === "pdf" ? asset(embedUrl(post)) : embedUrl(post);

  return (
    <main>
      <PageHero eyebrow={`${post.seasonYear} ${post.seasonGame}`} title={post.label}>
        <div className="button-row">
          <Link className="button button-ghost" href="/blog">
            All build blogs
          </Link>
          <a className="button button-ghost" href={src} target="_blank" rel="noopener noreferrer">
            Open on its own
          </a>
        </div>
      </PageHero>

      <section className="section" data-tight>
        <div className="shell">
          {/*
            The posts were written as PDFs and Google Docs. Rather than sending
            a reader out to a raw file, the document is shown here with the site
            around it. The link above is the way out for anyone who would rather
            have the file itself, or whose browser will not embed it.
          */}
          <div className={styles.reader}>
            <iframe className={styles.frame} src={src} title={post.label} loading="lazy" />
          </div>

          {post.kind === "doc" && (
            <p className={styles.note}>
              Nothing showing? This post lives in a Google Doc, and it only embeds here if the
              document is shared with <strong>anyone with the link</strong>. Use &ldquo;Open on its
              own&rdquo; above, or ask the team to change the sharing setting.
            </p>
          )}

          <nav className={styles.pager} aria-label="Other posts this season">
            {previous ? (
              <Link className={styles.pagerLink} href={`/blog/${previous.slug}`}>
                <span className={styles.pagerDirection}>Previous</span>
                <span className={styles.pagerLabel}>{previous.label}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link className={`${styles.pagerLink} ${styles.pagerNext}`} href={`/blog/${next.slug}`}>
                <span className={styles.pagerDirection}>Next</span>
                <span className={styles.pagerLabel}>{next.label}</span>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </main>
  );
}
