# Editing the website

Everything the site says — every word, number, sponsor, season and link — lives
in seven files under `content/data/`. You do not need to install anything or
know how to code to change them.

There are two ways in. Both end with the same thing: a change saved to GitHub,
which rebuilds the site automatically.

---

## The editor at /admin

Open **[/admin](https://team6962.github.io/antares-website-redesign/admin)**.

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
| `pages.json` | Every heading, intro and button label on the site |
| `site.json` | Team name, address, email, tax details, social links, outbound links |
| `seasons.json` | Every season, its robot, awards and build blogs |
| `sponsors.json` | Sponsors by tier, partnership levels, budget breakdown |
| `training.json` | The training subjects and their lessons |
| `team.json` | Awards, student quotes, the explainer blocks, subteams |
| `media.json` | The video and photos behind page headers |
| `internal.json` | The Google Doc embedded on the members-only page |

---

## Writing a build blog post

Posts are written on the site now. No Google Doc, no PDF.

In the editor, pick **Build blog posts** and press **Add post**. Fill in:

- **Title**, and a **web address** like `2027-week-1` (lowercase, dashes). The
  post then lives at `/blog/2027-week-1`. Changing it later breaks any link
  anyone has shared.
- **Season** — the year, matching one under Seasons. That is what groups it.
- **Date**, written `2027-01-17`.
- **Summary** — one or two sentences, shown on the blog list.

Then add a **section** for each part of the story. Three or four is usually
right: what you set out to do, what you built, what broke, what is next.

Inside a section's text:

- a blank line starts a new paragraph
- a line starting with `- ` becomes a bullet

That is the entire format. Photos go in `public/blog-images/` and are added to
a section with a leading slash, like `/blog-images/week-1-drivetrain.jpg`.
Always fill in the description: it is what a screen reader says, and what shows
if the photo does not load.

**New posts start as drafts.** A draft has a page you can open and check, but
it stays off the blog list and out of search engines. Turn the draft switch off
when it is ready.

There is a post called "How to write a build blog" already in there, kept as a
draft. It says all of this again and shows what the format looks like. Delete
it whenever you like.

## The members-only page

`/internal` is a single Google Doc in a frame, linked from the footer and kept
out of search engines and the sitemap. It holds no copy of its own: the page
shows whatever the document says at the moment someone opens it, so editing the
document is the whole job and nothing needs republishing here.

**Who can read it is decided in Google, not on this site.** Share the document
with the people who should see it and they will see it in the frame. There is
no password on this site and no member list to maintain.

**Known issue: the frame is blank for everyone right now.** The document it
points at has previews switched off, so `/preview` — the only form of a
private Doc that another site is allowed to load — does not render it, even
opened directly by a member who can open the document normally. A Workspace
admin has been asked to enable previews, which is the fix; nothing in this
repository can work around it, and swapping in a different address will not
help, because `/edit` cannot be framed at all.

Once previews are on, the note above the frame still matters. Signed out,
Google fills the frame with its own sign-in card. Signed in to an account the
document was not shared with, it serves a bare `400. That's an error`, which
looks like a broken website rather than a closed door. The page cannot tell
those apart — a cross-origin frame is opaque, and Google sends no
`Timing-Allow-Origin` header, so even its response status reads as zero here
— so the note shows for everyone and points at the Google Docs button, which
works in every case. If you reword it, keep it pointing there.

If previews never get enabled, there are two ways out. Embedding the
document's **published to web** form (File > Share > Publish to web) needs no
sign-in and frames cleanly, but it makes the contents readable by anyone who
opens the page. Removing the frame and leaving a button keeps the document
private and always works, but members read it on Google Docs rather than
here.

To swap in a different document, open **Team internal document** in the editor.
It takes the same link twice:

- **Open address** — the link straight from Share > Copy link.
- **Embed address** — that same link with everything after the long ID replaced
  by `/preview`. Only `/preview` is allowed to load inside another site; paste
  an `/edit` link here and the frame shows nothing at all.

Treat the page as public plumbing around a private document. Anyone can reach
the URL; only people the document is shared with can read anything.

## What is not in the editor

Nearly everything is, but a few things stay in the code on purpose:

- **Instructions that quote the team's own details.** The donate page's "ways
  to give" spell out the cheque payee, the memo line, the tax ID and the
  address. Those are assembled from `site.json` as the page renders, so they
  cannot go stale. Their headings are editable; the instructions underneath
  are not.
- **Labels that are not really copy** — "Close" on a dialog, the text a screen
  reader hears, the title of an embedded document.

If you want to change something and cannot find it, it is a small job for
whoever maintains the site. Open an issue rather than working around it.

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
