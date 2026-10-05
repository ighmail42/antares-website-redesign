import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/* The site is a static export, so this file has to be evaluated at build time
   rather than per request. Without it, reading process.env below makes Next
   treat the route as dynamic and the export fails. */
export const dynamic = "force-static";

/**
 * Preview deployments set SITE_NOINDEX and are closed to crawlers. The real
 * site allows everything except the team-only page.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/internal", "/admin"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
