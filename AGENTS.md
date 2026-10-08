<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Working on the Antares website

Read this before changing anything. Most of it is here because it was got
wrong once already.

## Words and numbers are content, not code

Every string a visitor reads lives in `content/data/*.json`. If you find
yourself typing a sentence into a component, stop: it belongs in a JSON file,
and the field has to be added to `content/schema.ts` as well.

**Adding a field to a JSON file without adding it to `content/schema.ts` is a
silent data-loss bug.** The editor at `/admin` rebuilds each file from the
schema when someone saves, so an unknown field is dropped the next time a
student edits that file. Schema, type in `content/*.ts`, and data file get
changed together, always.

`assertContentValid()` runs at build, so a malformed file fails the build
rather than shipping.

## Never invent a fact about the team

No invented numbers, quotes, award counts, student names, dates or sponsor
relationships. If a number cannot be verified, leave it `undefined` — every
component skips what it is not given, so nothing renders a placeholder at a
sponsor. Write the gap into `docs/content-todo.md` instead.

This applies to plausible-sounding filler most of all. "Over 200 companies
sponsor the program" is a real figure from FIRST. "Our students log 5,000
hours a year" is one you made up.

## Brand

- The Antares yellow is a **fill**, never text. It is about 1.35:1 on white,
  which fails every contrast threshold. Yellow backgrounds with navy on top
  are correct; yellow words on white are not.
- `--accent-mark` is the colour for small emphasis: Light Blue on light
  backgrounds, yellow inside dark ones. Use it rather than picking a colour.
- Do not invent brand colours. The palette is in `app/globals.css` and comes
  from the brand guide.
- A `data-scheme="dark"` subtree must set `color: var(--text)` as well as
  redefining the variable. `color` resolves once on `<body>` and inherits as
  a concrete value, so redefining the variable alone does nothing and you get
  dark text on a dark panel.

## The site is a static export under a sub-path

- Anything in `public/` must go through `asset()` in `lib/asset.ts`.
- Internal links use `next/link`. A plain `<a href="/sponsors">` loses the
  basePath and 404s in production while working perfectly on localhost.
- Route handlers such as `robots.ts` and `sitemap.ts` need
  `export const dynamic = "force-static"`.
- A local `npm run build` does not use `output: export`, so it will not catch
  export-only failures. The deploy will.

## House style, settled with the chief mentor

- "tier", never "level", for partnership tiers.
- "6th grade", "6th through 12th graders". Never "sixth grade" or "grade 6".
- The build season is **eight weeks**. Six is an anachronism.
- American spelling in anything a visitor reads: traveling, practicing,
  aluminum, totaling.
- "approximately", not "around", when the meaning is approximately.
- Never state that a gift is tax-deductible. Sponsorships buy recognition, so
  the treatment differs; the site says who receives and acknowledges the gift
  and points the donor at their own adviser.
- A gift noted "Antares, Team 6962" is a **restricted** gift, which is a good
  thing: the school has to spend it on the team.

## Process

Branch, commit, pull request, review, merge. Never commit to `main`. See
`docs/how-a-change-goes-live.md`.
