/**
 * The members-only page. Not in the main navigation; linked from the footer.
 *
 * The values live in `content/data/internal.json`.
 *
 * TWO ADDRESSES FOR THE SAME DOCUMENT
 * -----------------------------------
 * `embedUrl` ends in `/preview`. That is the only form of a Google Docs link
 * that is allowed to appear inside a frame on another site; `/edit` refuses to
 * be framed at all.
 *
 * `openUrl` is the normal share link, used by the buttons that leave the site.
 * Google's own "you need access" and "request access" screens live there, and
 * they are the reason the buttons exist: a reader who is not signed in to an
 * account with access gets redirected to Google's sign-in page, which sends
 * `X-Frame-Options: DENY`, so the frame below stays blank rather than
 * explaining itself. The page says so in its own words and sends them to
 * `openUrl`, where Google can.
 *
 * SWAPPING THE DOCUMENT
 * ---------------------
 * Both addresses are editable at /admin. Paste the share link into the "Open
 * address" field, then the same link with `/edit?usp=sharing` replaced by
 * `/preview` into "Embed address". Sharing stays Google's job: whoever the
 * document is shared with is exactly who can read it here.
 */

import data from "./data/internal.json";

export type InternalDoc = {
  /** Heading on the panel that holds the frame. */
  label: string;
  /** The `/preview` address, for the frame. */
  embedUrl: string;
  /** The normal share link, for the buttons that open Google Docs. */
  openUrl: string;
};

export const internalDoc: InternalDoc = data.doc;
