/**
 * Build blog posts written on the site itself, rather than linked out to a
 * Google Doc or a PDF.
 *
 * A post is a handful of sections. Each section has an optional heading, a
 * body, and an optional photo. The body is plain text with two conventions,
 * both of which survive being typed into a form:
 *
 *   - a blank line starts a new paragraph
 *   - a line beginning with "- " is a bullet
 *
 * That is the whole format. There is no markdown parser to go wrong, and
 * everything in it can be edited at /admin.
 */

import data from "./data/posts.json";

export type PostSection = {
  heading?: string;
  /** Paragraphs separated by blank lines. Lines starting with "- " are bullets. */
  body?: string;
  /** A photo in `public/blog-images/`. */
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type Post = {
  /** The last part of the address, e.g. "2027-week-1". Lowercase, no spaces. */
  slug: string;
  title: string;
  /** The year of the season this belongs to, matching an entry in Seasons. */
  season: string;
  /** ISO date, e.g. 2027-01-17. */
  date: string;
  /** Who wrote it. */
  authors?: string;
  /** One or two sentences, shown on the blog index. */
  summary: string;
  image?: string;
  imageAlt?: string;
  /** Kept off the blog index and out of search engines until this is off. */
  draft?: boolean;
  sections: PostSection[];
};

export const posts: Post[] = data.posts as Post[];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Formatted without Intl, so the server and the browser always agree. */
export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

/** Splits a section body into paragraphs and bullet lists. */
export type BodyBlock = { kind: "paragraph"; text: string } | { kind: "list"; items: string[] };

export function parseBody(body: string): BodyBlock[] {
  const blocks: BodyBlock[] = [];
  for (const chunk of body.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    if (lines.every((line) => line.startsWith("- "))) {
      blocks.push({ kind: "list", items: lines.map((line) => line.slice(2).trim()) });
    } else {
      blocks.push({ kind: "paragraph", text: lines.join(" ") });
    }
  }
  return blocks;
}
