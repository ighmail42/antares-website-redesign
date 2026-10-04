# Content still to write

The redesign put the site's words and numbers in `content/` so students can
edit them without touching components. These are the places that still need a
human decision. Every one is marked `NEEDS REVIEW` in the source.

Put your name next to an item when you pick it up.

## 1. Numbers we could not verify — `content/team.ts`

| Field | Where it would appear | Owner |
| --- | --- | --- |
| `teamNumbers.activeStudents` | About page, sponsor deck parity | |
| `teamNumbers.competitionsThisSeason` | Season page | |
| `teamNumbers.peopleReachedByOutreach` | About and sponsors pages | |

These are `undefined` right now, and every component that renders them skips
them, so the site never shows a placeholder to a sponsor. Fill them in and they
appear. `headlineStats` at the top of the same file controls the four big
numbers on the home page — swap in any of these once they are confirmed.

## 2. Student stories — `content/team.ts`, `studentQuotes`

The sponsor deck has a slide for one student's path from joining in middle
school to leading and teaching. The website has the same slot, and it is empty.
Each entry needs:

- the student's approved name and grade
- a short quote, two or three sentences
- what they led, and who they trained
- an approved photo in `public/team-photos/`

The "What students say" section on the sponsors page only renders when this
array has entries, so nothing looks broken while it is empty.

## 3. Season stories — `content/seasons.ts`

2022 and 2023 currently have one factual line each. Someone who was there
should add two or three `highlights`: what the team was proud of, what changed,
what broke. Look at what 2024, 2025 and 2026 do for the pattern.

Also confirm whether Antares competed in the 2020 INFINITE RECHARGE season.
It is missing from the list.

## 4. The sample blog post

`/blog/2027-sample-post` is called "A sample post" and says so in its first
line. It exists so the season page is not empty while the format is new.
Replace it with the first real post of the season, or delete it in the editor.

The four 2027 Google Doc links that used to sit on the season page have been
removed: all of them needed a sign-in. They are in the git history if anyone
wants them back.

## 5. Blog posts that nobody outside the team can read

Every build blog that lives in a Google Doc currently returns a sign-in wall:
all of 2022, 2023 and 2027, eleven posts in total. They have always been like
this; the blog reader at `/blog` just makes it visible, because the document
refuses to embed.

In each document: **Share > General access > Anyone with the link > Viewer**.
The 2024 and 2025 posts are PDFs in `public/blog-PDFs/` and are fine.

## 6. Sponsor descriptions

> **One of these is placeholder text written to show the design, and has to go
> before anyone outside the team sees it.** The Gene Haas Foundation entry has
> a real website and a description taken from the foundation's own mission
> statement, but the "With Antares" paragraph was invented to fill the space.
> Replace it with what the grant actually pays for, or delete it.


Clicking a sponsor logo opens a panel. It shows the tier and a link, and will
show two more things once someone writes them, in `content/data/sponsors.json`
or through /admin:

- **About the company** — one or two sentences on what they do.
- **Their relationship with Antares** — what they give and what it pays for.

Sponsor websites are also empty. Those need checking rather than guessing.

## 7. Sponsor list — `content/sponsors.ts`

The sponsor deck lists Google among past supporters, and the website does not.
Confirm whether Google belongs on the sponsors page and, if so, which tier and
whether we have permission to use the logo.

## 8. A longer hero video

`public/video/hero.mp4` is a 16-second cut from the 2026 competition reel,
starting at 0:10 of the original. If there is better footage, or a cut the team
prefers, replace that file and its poster frame. `public/video/README.md` has
the format requirements.
