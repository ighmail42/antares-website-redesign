import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { blogEntries } from "@/lib/blog";

/* Same as app/robots.ts: evaluated at build time for the static export. */
export const dynamic = "force-static";

/** Public pages, for search engines. */
const routes = [
  "",
  "/about",
  "/season",
  "/history",
  "/training",
  "/sponsors",
  "/sponsors/impact",
  "/donate",
  "/blog",
  ...blogEntries.map((entry) => `/blog/${entry.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/season" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
