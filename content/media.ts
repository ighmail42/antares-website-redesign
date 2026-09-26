/**
 * Background video and photography used in page headers.
 *
 * ADDING A COMPETITION VIDEO
 * --------------------------
 * 1. Export a short, quiet clip: 10-25 seconds, no audio track, 1920x1080 or
 *    smaller, H.264 MP4, ideally under 6 MB so phones are not punished.
 * 2. Save it as `public/video/hero.mp4`.
 * 3. Save a single frame from it as `public/video/hero-poster.jpg`.
 * 4. Set `src` below to "/video/hero.mp4".
 *
 * Until `src` is set, the hero falls back to `poster` and nothing breaks.
 */

export type BackgroundMedia = {
  /** Path to an MP4 in `public/`, or null to use the still image only. */
  src: string | null;
  /** Still image shown while the video loads, and instead of it on slow links. */
  poster: string;
  alt: string;
};

export const heroMedia: BackgroundMedia = {
  src: null,
  poster: "/team-photos/6962-stands.jpg",
  alt: "The Antares stands section cheering at a competition",
};

export const seasonMedia: BackgroundMedia = {
  src: null,
  poster: "/robot-images/2026-CAD.png",
  alt: "Orion, the 2026 competition robot",
};
