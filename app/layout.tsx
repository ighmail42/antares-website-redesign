import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { site } from "@/content/site";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
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
    images: ["/team-photos/team-2026.webp"],
  },
  icons: {
    icon: "/brand/dark-icon.png",
    shortcut: "/brand/dark-icon.png",
    apple: "/brand/dark-icon.png",
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
