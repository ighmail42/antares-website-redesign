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

## 4. Competition video — `content/media.ts`

The home page hero is built to play a muted competition clip behind the
headline. See `public/video/README.md` for the format, then set `src`.

## 5. Team calendar — `content/internal.ts`

Paste the Google Calendar embed URL into `calendarEmbedUrl`. Instructions are
in the comment at the top of that file.

## 6. Sponsor list — `content/sponsors.ts`

The sponsor deck lists Google among past supporters, and the website does not.
Confirm whether Google belongs on the sponsors page and, if so, which tier and
whether we have permission to use the logo.

## 7. Brand kit

The team's brand kit lives in a Google Drive folder that needs sign-in. The
colours in `app/globals.css` were derived from the logo and the competition
shirts. Check them against the official kit, especially:

- `--brand-blue: #252e45`
- `--brand-yellow: #f2de8b`
- the display typeface (currently Space Grotesk) and body typeface (Inter)
