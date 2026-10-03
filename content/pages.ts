/**
 * The words on each page: headings, intros, and button labels.
 *
 * Everything a reader sees that is not a season, a sponsor or a lesson lives
 * here, in `content/data/pages.json`, so marketing can change the site's voice
 * at /admin without touching a component.
 *
 * A page is a set of named blocks. Each block uses whichever of these it
 * needs, and anything left empty is simply not rendered.
 */

import data from "./data/pages.json";

export type Block = {
  /** The small uppercase label above a heading. */
  eyebrow?: string;
  title?: string;
  /** The larger intro paragraph under a heading. */
  lede?: string;
  /** Body copy, for blocks that carry a paragraph rather than an intro. */
  body?: string;
  /** Small print under a block. */
  note?: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export type PageCopy = Record<string, Block>;

export const pages = data as unknown as Record<string, PageCopy>;

/** The blocks for one page. */
export function page(id: string): PageCopy {
  const copy = pages[id];
  if (!copy) throw new Error(`No page copy for "${id}". Add it to content/data/pages.json.`);
  return copy;
}
