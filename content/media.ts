/**
 * Background video and photography used in page headers.
 *
 * The values live in `content/data/media.json`.
 *
 * ADDING A COMPETITION VIDEO
 * --------------------------
 * 1. Export a short, quiet clip: 10-25 seconds, no audio track, 1920x1080 or
 *    smaller, H.264 MP4, ideally under 6 MB so phones are not punished.
 * 2. Save it as `public/video/hero.mp4`.
 * 3. Save a single frame from it as `public/video/hero-poster.jpg`.
 * 4. Set `src` to "/video/hero.mp4" in the data file, or through /admin.
 *
 * With `src` empty, the hero falls back to `poster` and nothing breaks.
 */

import data from "./data/media.json";

export type BackgroundMedia = {
  /** Path to an MP4 in `public/`, or empty to use the still image only. */
  src: string | null;
  /** Still image shown while the video loads, and instead of it on slow links. */
  poster: string;
  alt: string;
};

export const heroMedia: BackgroundMedia = data.heroMedia;
export const seasonMedia: BackgroundMedia = data.seasonMedia;
