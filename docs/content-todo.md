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

2020 is now in the list: the chief mentor confirmed the robot was Pythagorean
Cannon and the season was cancelled. It still has no highlights.

## 4. The 2027 build blog is empty

Both posts written in the new format are drafts: "A sample post", which only
ever existed to show the format, and "How to write a build blog", which is
instructions. Neither is something a visitor should read, so neither is
public.

That leaves 2027 with nothing, and the build blog section on the season page
hides itself when its season has no public post. It comes back on its own the
moment one is published, so the first real post of the season is the whole
fix. Both drafts can be deleted in the editor once nobody needs them.

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

`public/video/hero.mp4` is a 20-second cut of the team's own match footage,
starting at 1:01 of the original recording. If there is better footage, or a
cut the team prefers, replace that file and its poster frame together.
`public/video/README.md` has the format requirements.

## 9. Which tier each current sponsor belongs to

The sponsor wall still groups companies as Platinum, Gold, Silver and Bronze,
which are not the tier names we now use anywhere else. The chief mentor asked
for them to be translated into Spark, Stellar, Interstellar, Supergiant and
Antares Mission, and said the actual donation amounts have to be checked first
to work out who lands where. Nobody should guess this: putting a sponsor in the
wrong tier is worse than leaving the old labels up.

Once the amounts are known it is a data change in `content/data/sponsors.json`
or at /admin: rename each group under `sponsorTiers` and move companies between
them. The eighteen companies currently sit like this:

| Current group | Companies |
| --- | --- |
| Platinum | PowerTec, SmugMug |
| Gold | GlobalLogic, Legion Technologies |
| Silver | Abbott Laboratories, CMS, Altair Engineering, Apple, General Catalyst, Gene Haas Foundation, HalloApp, Saints Capital |
| Bronze | Lockheed Martin, PG&E, Intuitive Foundation, FIRST NorCal |

Until that happens the sponsors page uses "tier" for both groupings, which is
the terminology the mentor picked but reads oddly while two systems coexist.

## 10. Google Drive links that need sharing turned on

The chief mentor supplied Drive links for the FIRST Responders video and for
five robots: M.R. Left, Optimus Climb, Pythagorean Cannon, Arm2D2 and RedEVA.
All six return 401 to anyone not signed in to an account with access, so none
of them are on the site; the robot names and the video are mentioned in text
only.

Either set each file to **Anyone with the link > Viewer**, or give us public
URLs, such as the video on YouTube. Then the history page can link them. The
file IDs are in the mentor's review PDF, dated 7 October 2026.

## 11. Is Khan Lab School 310 students or 315?

The mentor's review says 315 in the note about the home page and 310 in the
note about the About page. The site says 310 in both places, which is what it
said before, so nothing was changed. One number, confirmed once, should replace
both: `communities.kls` and `schoolTimeline` in `content/data/team.json`.
