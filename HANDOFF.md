# Antares website redesign — for review

This branch (`redesign`) is a rebuild of team6962.com aimed at the audience the
website feedback deck identified: **sponsors and the wider FRC community**.
Team members are served by the pages built for them.

Everything here is a proposal. Nothing is live.

---

## If you just want to look at it

You need [Node.js](https://nodejs.org/) 20 or newer, once:

```bash
npm install
npm run dev
```

Then open <http://localhost:3000> and click through. It works on a phone too —
narrow your browser window to check.

If you would rather not install anything, ask whoever shared this to push the
branch so GitHub can build a preview link.

---

## What changed, page by page

| Page | Before | Now |
| --- | --- | --- |
| Home | One paragraph and a photo | Video hero, who-we-are explainer, stats, sponsor logos, how a match works, student-led story, current season |
| About | Did not exist | Student leadership, the eight subteams, Khan Lab School, what FRC is, the award record |
| Season | Did not exist | The current season, build blogs, and how a season actually runs |
| History | Two lines per season | A story per season: highlights, awards, robot images, blogs |
| Training | One long list of links | Eight collapsible subjects with short descriptions |
| Sponsors | A plain logo grid | Every sponsor by tier, why sponsor us, FIRST outcomes, partnership levels with amounts, how to give |
| Sponsor impact | Did not exist | Where the money goes, what a contribution buys |
| Donate | Read like a Google Doc | Sectioned, collapsible, and leads with family giving |

Contact details moved from the body of the home page into the site footer, as
the feedback asked.

---

## What we would like feedback on

1. **Tone of the writing.** Every page was written from scratch. Does it sound
   like us? Anything that overclaims, or undersells?
2. **The sponsor path.** Follow Home → Sponsors → Sponsor impact → Donate the
   way a company would. Does it answer the questions a sponsor would ask, in
   the order they would ask them?
3. **The season and history pages.** Are the facts right? Especially award
   years, robot names and what happened each season.
4. **What is missing.** Anything the team wants on the site that is not here.

---

## What still needs someone to write it

Listed in full in [`docs/content-todo.md`](docs/content-todo.md). The short
version:

- Student quotes and stories, with approved names, grades and photos.
- Two or three lines about the 2022 and 2023 seasons from someone who was there.
- Three numbers we could not confirm: active students, competitions this
  season, and people reached through outreach.
- Whether Google belongs on the sponsors page.

Anything unconfirmed is deliberately left blank rather than filled with a
placeholder, so the site never shows a sponsor a made-up number.

---

## For whoever maintains the site

Nearly all edits are data, not code, and most do not need the repository
cloned at all. There is a form-based editor at **`/admin`** — see
[`docs/editing-content.md`](docs/editing-content.md).

Every word and number lives in [`content/data/`](content/data/) as JSON, with
the matching type and anything computed in `content/`:

- `site.json` — team facts, emails, address, tax details
- `team.json` — awards, the who-we-are blocks, subteams, quotes
- `seasons.json` — one entry per season
- `sponsors.json` — sponsors by tier, partnership levels, budget split
- `training.json` — the training curriculum
- `media.json` — hero video and header images
- `internal.json` — the Google Doc embedded on `/internal`

A bad edit cannot take the site down: the content is checked while the site
builds, and a problem fails the build rather than reaching the live site.

Adding a sponsor, a season or a lesson means adding an object to an array. The
[README](README.md) has the details, along with the design system, the brand
tokens and how the animation works.

Built with Next.js and plain CSS, no UI framework and no animation library. It
still deploys as a static site through the existing GitHub Pages workflow.
