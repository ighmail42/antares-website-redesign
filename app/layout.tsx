import type { Metadata } from "next";
import { Josefin_Sans, Libre_Franklin } from "next/font/google";

import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { site } from "@/content/site";

import "./globals.css";
import { asset } from "@/lib/asset";

/* Brand fonts. Josefin Sans is the title face from the brand reference guide.
   Libre Franklin stands in for Franklin Gothic, which cannot be redistributed
   on the web. See the font stacks in app/globals.css. */
const displayFont = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Antares | FRC Team ${site.teamNumber}`,
    template: `%s | Antares ${site.teamNumber}`,
  },
  description:
    `Antares is FIRST Robotics Competition Team ${site.teamNumber}, a student-led team of grade ${site.grades} engineers at Khan Lab School in ${site.city}.`,
  openGraph: {
    type: "website",
    siteName: `Antares | FRC Team ${site.teamNumber}`,
    images: [asset("/team-photos/team-2026.webp")],
  },
  // Preview deployments set SITE_NOINDEX so a draft never outranks the real
  // site. See .github/workflows/nextjs.yml.
  robots: process.env.SITE_NOINDEX ? { index: false, follow: false } : undefined,
  // The plain star on the brand navy. The 69/62 numerals in the full icon are
  // unreadable at favicon sizes and just muddy the mark.
  icons: {
    icon: asset("/brand/favicon.png"),
    shortcut: asset("/brand/favicon.png"),
    apple: asset("/brand/favicon.png"),
  },
};

/**
 * Marks the document as scripted before the first paint so the scroll-reveal
 * styles can hide elements without ever hiding content from a reader whose
 * JavaScript failed to load.
 */
const enableMotionStyles = `document.documentElement.dataset.js="on"`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      // The inline script in <head> sets data-js before hydration, which React
      // would otherwise report as an attribute mismatch.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableMotionStyles }} />
      </head>
      <body>
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
