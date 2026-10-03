# Antares Website

> **Reviewing the redesign?** Start with [HANDOFF.md](HANDOFF.md) — what changed,
> how to run it, and what we would like feedback on.

Website for FIRST Robotics Competition Team 6962, Antares. Next.js, React,
TypeScript and plain CSS, exported as a static site.

## Run It Locally

Install [Node.js](https://nodejs.org/) 20 or newer, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the development
server with `Control-C`.

Before submitting a change, run:

```bash
npm run lint
npm run build
```

There is no automated test suite, so also click through the affected pages at
desktop and phone widths.

## Changing Words and Numbers

**Most edits do not need a developer, and do not need this repository cloned.**
Everything the site says lives in `content/data/` as JSON, and there is a
form-based editor at **`/admin`** that reads and writes those files.

See [`docs/editing-content.md`](docs/editing-content.md) for the editor's
workflow. The short version: edit the forms, copy the file, paste it into
GitHub, open a pull request.

| File | What it holds |
| --- | --- |
| `content/data/site.json` | Team facts, email addresses, postal address, tax details, outbound links |
| `content/data/team.json` | Awards, the "who we are" blocks, leadership ladder, subteams, student quotes |
| `content/data/seasons.json` | One entry per season: robot, summary, highlights, awards, blog links |
| `content/data/sponsors.json` | Sponsor logos by tier, partnership levels, budget split, FIRST statistics |
| `content/data/training.json` | Training curriculum, grouped into the collapsible sections on `/training` |
| `content/data/media.json` | Background photo or video for the home and season headers |
| `content/data/internal.json` | Announcements doc, calendar embed, internal quick links |

The matching `content/*.ts` file holds the type for each one, plus anything
computed rather than stored — the home page's "FIRST awards" figure, for
instance, is the length of the awards list, so it never drifts.

`docs/content-todo.md` lists what still needs a human decision.

### How content is checked

`content/schema.ts` describes every field: its label, its help text, whether it
is required, and what kind of value it holds. One schema drives three things —
the forms at `/admin`, the inline help an editor reads, and the checks in
`content/validate.ts`.

Those checks run once while the site builds, from `app/layout.tsx`. **A
malformed content file fails the build and the live site keeps serving the last
good version**, with an error naming the exact field. Adding a field means
adding it to the type in `content/*.ts` and to the schema.

### Add a sponsor

Put the logo in `public/sponsor-logos/`, then add an entry to the right tier in
`content/sponsors.ts`. Logos sit on light plates, so a logo drawn for a white
page works as-is. A sponsor with no `logo` renders as a name card instead.

### Add a season

Add an object to the top of `seasons` in `content/seasons.ts`. Set `status` to
`"current"` for the season in progress; the home page and `/season` read from
whichever entry is current. Robot images go in `public/robot-images/`, local
blog PDFs in `public/blog-PDFs/`.

### Add a training lesson

Add an entry to the right section's `resources` array in
`content/training.ts`. A `youtubeId` renders an embedded player instead of a
link.

## Where Things Live

- `app/layout.tsx` sets metadata, loads the fonts and runs the content checks.
- `app/(site)/` holds the public pages and the layout that wraps them in the
  site header and footer. The brackets are a Next.js route group: they organise
  files without appearing in the URL, so `app/(site)/history/page.tsx` is still
  `/history`.
- `app/admin/` is the content editor. It sits outside the site group, so it
  does not get the site's header and footer.
- `components/` holds the shared pieces. Each has its own folder with a
  `.module.css` beside it.
- `lib/site-navigation.ts` is the single list of header links.
- `public/` holds images, PDFs and video. `public/robot-images/2026-CAD.png` is
  referenced as `/robot-images/2026-CAD.png`.
- `.github/workflows/nextjs.yml` builds and publishes after a push to `main`.

### Components

| Component | What it does |
| --- | --- |
| `site-header` | Transparent over the hero, solid once you scroll; mobile drawer |
| `site-footer` | Contact details, navigation, school and FIRST links |
| `page-hero` | Standard header for interior pages |
| `hero-media` | Background photo or muted looping video with a dark scrim |
| `constellation` | Scorpius, drawn from the real star positions, with Antares pulsing |
| `starfield` | Twinkling canvas starfield behind headers |
| `reveal` | Fades content in as it scrolls into view |
| `counter` | Counts a number up when it first appears |
| `stat-grid` | The bordered grid of big numbers |
| `accordion` | Collapsible panel built on `<details>` |
| `logo-marquee` | Slow sponsor logo strip |
| `cta-band` | The closing call-to-action panel |

## CSS

The site uses only built-in Next.js CSS support. No framework, no
preprocessor.

- `app/globals.css` holds the design tokens (colour, type scale, spacing), base
  element styles, and the layout primitives pages compose: `.shell`,
  `.shell-wide`, `.shell-narrow`, `.section`, `.eyebrow`, `.lede`, `.prose`,
  `.button`.
- Sections are full-bleed. A `.section` spans the window and a `.shell` inside
  it constrains the content, so backgrounds always reach both edges.
- `data-tone="raised"` and `data-tone="deep"` on a `.section` switch its
  background. `data-tight` reduces its vertical padding.
- Files ending in `.module.css` belong to the component beside them.
- Reuse the custom properties in `:root` instead of repeating colour values.

## Brand

Colours and fonts come from the Antares Brand Reference Guide.

| Token | Hex | Brand name |
| --- | --- | --- |
| `--brand-blue` | `#252E45` | Blue (Pantone 533 C) |
| `--brand-yellow` | `#F2DE8B` | Yellow (Pantone 1205 C) |
| `--brand-light-blue` | `#39456A` | Light Blue Accent |
| `--brand-dark-blue` | `#1D2335` | Dark Blue Accent |

Titles are Josefin Sans. Copy is Franklin Gothic in the guide; the web uses
Libre Franklin, its open equivalent, because Franklin Gothic cannot be
redistributed. Both load through `next/font/google` in `app/layout.tsx`.

Official marks live in `public/brand/`: `logo-yellow.png`, `icon-yellow.png`
and their blue counterparts, plus `constellation-yellow.png`. The constellation
on the site is an SVG redraw of that emblem so it can animate; its coordinates
are traced from the PNG and live in `components/constellation/scorpius.ts`.

## Motion

Animation is CSS plus two small client components, with no animation library.

- `Reveal` adds `data-revealed` when an element scrolls into view. The hidden
  starting state only applies under `html[data-js="on"]`, which an inline
  script in `app/layout.tsx` sets before first paint, so content is never
  hidden from a reader whose JavaScript failed.
- Everything respects `prefers-reduced-motion`. The starfield does not render
  at all, the marquee stops, and reveals show immediately.

## Next.js Notes

Pages are Server Components unless the file starts with `"use client"`. Keep
them that way unless they need browser APIs or React state. The header,
starfield, reveal and counter are the only Client Components.

Use `next/image` for images, and wrap any path into `public/` with `asset()`
from `lib/asset.ts`:

```tsx
<Image src={asset("/team-photos/team-2026.webp")} alt="" width={800} height={600} />
```

Next rewrites its own `_next/*` URLs and `next/link` hrefs when the site is
served under a sub-path, but it does not touch files you reference out of
`public/`. Without `asset()` those 404 on any GitHub Pages project-site
preview. On the real site the base path is empty and `asset()` does nothing.

Do not delete `next.config.ts` just because it is nearly empty. The GitHub
Pages workflow's `configure-pages` step rewrites that file during CI to enable
static export and disable server-side image optimisation.

`next-env.d.ts` and `.next/` are generated. Do not edit them, and do not commit
`.next/` or `out/`.

## Common Changes

### Add a page

1. Create `app/name/page.tsx` with a default export and an exported `metadata`.
2. Start it with `<PageHero>` and wrap sections in
   `<section className="section"><div className="shell">…</div></section>`.
3. Add `{ href: "/name", label: "Name" }` to `lib/site-navigation.ts` if it
   belongs in the header.
4. Add `app/name/page.module.css` only for styles the primitives do not cover.
5. Add the route to `app/sitemap.ts` if it should be indexed.

### Change navigation or branding

Edit `lib/site-navigation.ts` for links, `public/brand/` for image files, and
the brand custom properties at the top of `app/globals.css` for colours.
