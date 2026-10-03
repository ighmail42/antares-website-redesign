/**
 * Simple glyphs for the social links in the footer. Each is drawn on a 24x24
 * grid and inherits `currentColor`, so adding a platform means adding a path
 * here and a field in `content/data/site.json`.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  "aria-hidden": true,
  focusable: "false" as const,
};

export const socialIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  instagram: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="5" width="20" height="14" rx="4.5" />
      <path d="M10.2 9.3v5.4l4.6-2.7z" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.2 10.5v6.1M7.2 7.6v.1M11.4 16.6v-6.1M11.4 13.2c0-1.6.9-2.7 2.3-2.7s2.4 1 2.4 2.8v3.3" />
    </svg>
  ),
  facebook: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M15.2 8.3h-1.4c-1 0-1.6.6-1.6 1.6v1.5h2.8l-.4 2.7h-2.4v5" />
      <path d="M9.6 11.4h2.6" />
    </svg>
  ),
  x: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  ),
  tiktok: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M14.2 3.2v10.9a3.8 3.8 0 1 1-3.8-3.8" />
      <path d="M14.2 5.6c.7 1.7 2.2 2.8 4.1 3" />
    </svg>
  ),
  github: (props) => (
    <svg {...base} {...props} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M9.3 20.3c-3.6 1-3.6-1.8-5-2.2m10 3.4v-3.1c0-.9-.1-1.3-.6-1.8 2.3-.3 4.6-1.1 4.6-5a3.9 3.9 0 0 0-1.1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0C6.9 5.9 6 6.2 6 6.2a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4.8 11.6c0 3.9 2.3 4.7 4.6 5-.3.3-.5.8-.6 1.4v3.4" />
    </svg>
  ),
};

/** The order they appear in the footer. */
export const socialOrder = ["instagram", "youtube", "tiktok", "linkedin", "facebook", "x", "github"];

export const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  x: "X",
  github: "GitHub",
};
