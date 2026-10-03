/**
 * The build blog index.
 *
 * Two kinds of post sit side by side. Newer ones are written on the site and
 * live in `content/data/posts.json`. Older ones are a link to a Google Doc or
 * a PDF, listed against their season in `content/data/seasons.json`, and are
 * shown embedded rather than sending a reader out to a bare file.
 */

import { posts, type Post } from "@/content/posts";
import { seasons, type Season, type SeasonLink } from "@/content/seasons";

export type BlogEntry = {
  slug: string;
  title: string;
  seasonYear: string;
  seasonGame: string;
  /** "post" is written here; the others are embedded documents. */
  kind: "post" | "pdf" | "doc";
  /** Set for documents. */
  href?: string;
  /** Set for posts written here. */
  date?: string;
  summary?: string;
  draft?: boolean;
  post?: Post;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The slug a season's document post lives at, for linking from elsewhere. */
export function slugFor(seasonYear: string, label: string): string {
  return `${seasonYear}-${slugify(label)}`;
}

/**
 * A Google Doc link opens in the Docs UI. The `/preview` form is the one that
 * embeds cleanly, so normalise whatever was pasted into the content file.
 */
export function embedUrl(entry: BlogEntry): string {
  if (!entry.href) return "";
  if (entry.kind === "pdf") return entry.href;
  return entry.href.replace(/\/(edit|view|preview)(\?[^#]*)?(#.*)?$/, "/preview");
}

const seasonByYear = new Map(seasons.map((season) => [season.year, season]));

function gameFor(year: string): string {
  return seasonByYear.get(year)?.game ?? "";
}

function documentEntries(season: Season): BlogEntry[] {
  return (season.blogPosts ?? []).map((entry: SeasonLink) => ({
    slug: slugFor(season.year, entry.label),
    title: entry.label,
    seasonYear: season.year,
    seasonGame: season.game,
    kind: entry.href.toLowerCase().endsWith(".pdf") ? "pdf" : "doc",
    href: entry.href,
  }));
}

const writtenEntries: BlogEntry[] = posts.map((post) => ({
  slug: post.slug,
  title: post.title,
  seasonYear: post.season,
  seasonGame: gameFor(post.season),
  kind: "post",
  date: post.date,
  summary: post.summary,
  draft: post.draft,
  post,
}));

/** Everything, drafts included. Used to build a page for each. */
export const allEntries: BlogEntry[] = [
  ...writtenEntries,
  ...seasons.flatMap(documentEntries),
];

/** What a reader sees: no drafts. */
export const blogEntries: BlogEntry[] = allEntries.filter((entry) => !entry.draft);

/** Grouped by season, newest season first, posts before documents. */
export const blogSeasons = seasons
  .map((season) => ({
    season,
    entries: blogEntries.filter((entry) => entry.seasonYear === season.year),
  }))
  .filter((group) => group.entries.length > 0);

export function entriesForSeason(year: string): BlogEntry[] {
  return blogEntries.filter((entry) => entry.seasonYear === year);
}

export function entryBySlug(slug: string): BlogEntry | undefined {
  return allEntries.find((entry) => entry.slug === slug);
}

/** The entries either side of this one, within the same season. */
export function neighbours(entry: BlogEntry): { previous?: BlogEntry; next?: BlogEntry } {
  const within = blogEntries.filter((other) => other.seasonYear === entry.seasonYear);
  const index = within.findIndex((other) => other.slug === entry.slug);
  if (index === -1) return {};
  return { previous: within[index - 1], next: within[index + 1] };
}
