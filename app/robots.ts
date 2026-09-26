import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * Preview deployments set SITE_NOINDEX and are closed to crawlers. The real
 * site allows everything except the team-only page.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/internal" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
