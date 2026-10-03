# Editing the website

Everything the site says — every word, number, sponsor, season and link — lives
in seven files under `content/data/`. You do not need to install anything or
know how to code to change them.

There are two ways in. Both end with the same thing: a change saved to GitHub,
which rebuilds the site automatically.

---

## The editor at /admin

Open **[/admin](https://ighmail42.github.io/antares-website-redesign/admin)**.

It is a set of forms, one per thing you might want to change. Pick a section on
the left, edit on the right, and watch the **Checks** panel: it tells you
straight away if something is missing or malformed.

When you are done:

1. Click **Copy &lt;file&gt;.json**.
2. Click **Open on GitHub**. You will need to be signed in.
3. Select everything in the box (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>),
   paste, and scroll down to **Commit changes**.
4. Choose **Create a new branch and start a pull request** so someone can look
   before it goes live.

The editor has no password and no server. It cannot change the site on its own
— the commit in step 3 is what does that. That is deliberate: it keeps a human
review in the loop.

**Before a long editing session**, click **Load latest**. The editor starts
from the content that shipped with the page you are looking at, which may be a
few days old if someone else has edited since.

**Preview &lt;file&gt;.json** at the bottom shows exactly what will be saved.

---

## Editing the file directly

If you are comfortable with it, skip the editor and change the JSON file on
GitHub. `content/data/training.json` and friends are plain lists. To add a
training lesson, for example, add one entry to the right subject's `resources`:

```json
{
  "title": "Bearings and Shafts",
  "href": "https://docs.google.com/presentation/d/…/present",
  "description": "Press fits, retaining rings, and what goes where."
}
```

Mind the commas: every entry needs one after it except the last in a list.

---

## What happens if you get it wrong

Nothing breaks. The site checks every content file while it builds:

- If something required is missing, or a link is malformed, **the build fails
  and the live site keeps showing the last good version.**
- You will see a red ✗ on your commit, and the message says exactly which
  field in which entry is wrong.
- Fix it and commit again.

You cannot take the site down by typing the wrong thing.

---

## Where each file shows up

| File | What it controls |
| --- | --- |
| `site.json` | Team name, address, email, tax details, outbound links |
| `seasons.json` | Every season, its robot, awards and build blogs |
| `sponsors.json` | Sponsors by tier, partnership levels, budget breakdown |
| `training.json` | The training subjects and their lessons |
| `team.json` | Awards, student quotes, the explainer blocks, subteams |
| `media.json` | The video and photos behind page headers |
| `internal.json` | The members-only page |

---

## Adding a picture, a PDF or a video

Files go in `public/`, and you refer to them with a leading slash:

| Put the file in | Refer to it as |
| --- | --- |
| `public/sponsor-logos/` | `/sponsor-logos/acme.svg` |
| `public/robot-images/` | `/robot-images/2027-CAD.png` |
| `public/team-photos/` | `/team-photos/team-2027.webp` |
| `public/blog-PDFs/` | `/blog-PDFs/week1.pdf` |
| `public/video/` | `/video/hero.mp4` |

Upload through GitHub: open the folder, then **Add file → Upload files**.

Sponsor logos sit on a light background on the site, so a logo drawn for a
white page works as-is.

---

## Adding a new kind of field

Say you want a "category" on every training lesson. That is a developer change,
but a small one:

1. Add the field to `TrainingResource` in `content/training.ts`.
2. Add it to the schema in `content/schema.ts`, which is what draws the forms
   and runs the checks.
3. Use it wherever the page renders lessons.

If the new field is optional, nothing else has to change and existing entries
keep working. If it is required, the build will list every entry that needs
filling in — it will not let the site go out half-updated.
