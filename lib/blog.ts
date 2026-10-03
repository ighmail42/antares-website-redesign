/**
 * The build blog index, derived from the seasons in `content/data/seasons.json`.
 *
 * Each season lists its posts as a label and a link. Those links point either
 * at a PDF in `public/blog-PDFs/` or at a Google Doc. Rather than sending a
 * reader out of the site to a raw file, every post also gets a page of its own
 * that shows it inside the site, with the season around it and a way to move
 * to the next one.
 */

import { seasons, type Season, type SeasonLink } from "@/content/seasons";

export type BlogPost = {
  slug: string;
  label: string;
  href: string;
  /** "pdf" renders in the browser's own viewer; "doc" is an embedded Google Doc. */
  kind: "pdf" | "doc";
  seasonYear: string;
  seasonGame: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function kindOf(href: string): BlogPost["kind"] {
  return href.toLowerCase().endsWith(".pdf") ? "pdf" : "doc";
}

/**
 * A Google Doc link opens in the Docs UI. The `/preview` form is the one that
 * embeds cleanly, so normalise whatever was pasted into the content file.
 */
export function embedUrl(post: BlogPost): string {
  if (post.kind === "pdf") return post.href;
  return post.href.replace(/\/(edit|view|preview)(\?[^#]*)?(#.*)?$/, "/preview");
}

function postsForSeason(season: Season): BlogPost[] {
  return (season.blogPosts ?? []).map((entry: SeasonLink) => ({
    slug: `${season.year}-${slugify(entry.label)}`,
    label: entry.label,
    href: entry.href,
    kind: kindOf(entry.href),
    seasonYear: season.year,
    seasonGame: season.game,
  }));
}

/** Every post, newest season first and in the order each season lists them. */
export const blogPosts: BlogPost[] = seasons.flatMap(postsForSeason);

export const blogSeasons = seasons
  .map((season) => ({ season, posts: postsForSeason(season) }))
  .filter((entry) => entry.posts.length > 0);

/** The slug a season's post lives at, for linking from elsewhere. */
export function slugFor(seasonYear: string, label: string): string {
  return `${seasonYear}-${slugify(label)}`;
}

export function postBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** The posts either side of this one, within the same season. */
export function neighbours(post: BlogPost): { previous?: BlogPost; next?: BlogPost } {
  const within = blogPosts.filter((entry) => entry.seasonYear === post.seasonYear);
  const index = within.findIndex((entry) => entry.slug === post.slug);
  return { previous: within[index - 1], next: within[index + 1] };
}
