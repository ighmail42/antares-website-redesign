# How a change goes live

**The short version:** you make a change, someone on the team checks it, and
then it appears on the website about two minutes later. You never change the
live website directly.

If you only remember one sentence, remember that one. The rest of this page
explains why it works that way and what the buttons are called.

---

## The picture

Think about how a part gets onto the robot.

You do not walk up to the competition robot during an event and start
unbolting things. You make your part at the shop, someone looks at it, and
*then* it goes on the robot. If it turns out to be wrong, you still have the
old part and you can put it back.

The website works exactly the same way, and GitHub just uses different words
for it.

| On the robot | On the website | What it means |
| --- | --- | --- |
| The competition robot | `main` | The real website. What visitors see. |
| Your own copy to work on | a **branch** | A safe place to change things. Nobody else sees it. |
| Saving your work with a note | a **commit** | One change, with a sentence saying what you did. |
| Design review | a **pull request** | "Here is my change. Can someone look before it goes live?" |
| Bolting it on | **merge** | Your change becomes part of the real website. |
| Driving onto the field | **deploy** | Happens by itself, about two minutes after the merge. |

Nothing you do is permanent until somebody merges it. That is the whole point.
You cannot break the website by trying something.

---

## What you actually do

### Changing words, numbers, sponsors, seasons or lessons

This is most changes, and it needs no code and nothing installed.

1. Open **/admin** on the website and find what you want to change.
2. Edit the form. Watch the **Checks** panel — it tells you right away if
   something is missing.
3. Click **Copy …json**, then **Open on GitHub**.
4. Select everything in the box, paste, and scroll to **Commit changes**.
5. Choose **Create a new branch and start a pull request**.

Step 5 is the important one. It makes your own copy instead of changing the
real website, and it asks for a review at the same time.

[`editing-content.md`](editing-content.md) walks through this with more detail
and explains what each file holds.

### Changing how the site looks or works

Same shape, more steps, and you need the project running on your computer. See
the README. The rule does not change: branch, commit, pull request, review,
merge.

---

## After you open the pull request

1. **A robot checks it first.** It builds the whole website from your change.
   If the build fails, something is broken and the pull request says so. This
   catches real mistakes, like a missing comma in a file, before a person even
   looks.
2. **A person reads it.** They can leave comments, ask questions, or just
   approve it.
3. **Someone clicks Merge.**
4. **The site rebuilds and publishes itself.** No one uploads anything.

Give it two or three minutes, then look. If you still see the old version,
your browser or the website's cache may be holding on to the old page for up
to ten minutes. Wait, then do a hard refresh (<kbd>Shift</kbd> and reload).
Nothing is wrong — this trips people up constantly.

---

## The rules

- **Never commit straight to `main`.** Always a branch and a pull request,
  even for a one-word typo, even if you are sure. The point is not that you
  might be wrong. The point is that a second person sees every change.
- **One change per pull request.** "Fix the sponsor list" is easy to review.
  "Fix the sponsor list and redo the history page and change the colours" is
  not, so it sits there for a week.
- **Say what you changed, in normal words.** "Added 2026 CalGames to the
  season page" tells the reviewer everything. "update" tells them nothing.
- **Ask for a review, do not merge your own work.** If nobody responds, ask
  in Discord rather than merging it yourself.

---

## When something looks wrong on the live site

Do not panic and do not start editing quickly. Going back is easy and fast.

Tell a mentor or a lead, and say **which page** and **what looks wrong**. The
change that caused it can be undone with one button, and the site goes back to
how it was a few minutes later. A website that is briefly wrong and then fixed
properly is much better than one that gets three rushed fixes on top of each
other.
