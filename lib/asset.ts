/**
 * Prefix a file in `public/` with the deployment's base path.
 *
 * GitHub Pages serves a project site under `/<repo>/`, and the Pages workflow
 * sets that as Next's `basePath`. Next rewrites its own `_next/*` URLs and
 * `next/link` hrefs for you, but not files you reference out of `public/`, so
 * those go through here or they 404 on a preview deployment.
 *
 * On the real site, where the base path is empty, this is a no-op. Absolute
 * URLs are passed through untouched, so it is safe to call on a list that
 * mixes local files with external links.
 */

/** Next replaces this at build time with the configured basePath. */
const basePath = process.env.__NEXT_ROUTER_BASEPATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
