/**
 * The shape of every editable content file, described as data.
 *
 * One schema drives three things: the forms at /admin, the inline help an
 * editor sees, and the checks that run before a change can be saved. Adding a
 * field means adding it here and to the matching type in `content/*.ts`.
 *
 * Keep `help` short and concrete. It is the only instruction most editors
 * will read.
 */

export type FieldKind =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "number"
  | "boolean"
  | "select"
  | "stringList"
  | "object"
  | "list";

export type Field = {
  /** Key in the JSON. */
  name: string;
  label: string;
  kind: FieldKind;
  help?: string;
  placeholder?: string;
  required?: boolean;
  /** For `select`. */
  options?: string[];
  /** For `object` and `list`. */
  fields?: Field[];
  /** For `list`: which child field to show as the row title. */
  titleField?: string;
  /** For `list`: the word used on the "Add" button, e.g. "season". */
  itemNoun?: string;
  /** For `stringList`: what one entry is, e.g. "highlight". */
  entryNoun?: string;
};

export type Collection = {
  /** Key in the JSON file. */
  name: string;
  label: string;
  /** One sentence on what editing this changes, shown above the form. */
  description: string;
  /** Where it shows up on the site, so an editor can go and look. */
  shownOn?: string;
  kind: "object" | "list" | "stringList" | "value";
  fields?: Field[];
  /** For `value`: the single field this collection holds. */
  field?: Field;
  titleField?: string;
  itemNoun?: string;
  entryNoun?: string;
};

export type ContentFile = {
  /** File name under `content/data/`, without the extension. */
  id: string;
  label: string;
  description: string;
  collections: Collection[];
};

const linkFields: Field[] = [
  { name: "label", label: "Label", kind: "text", required: true, help: "The words on the link." },
  { name: "href", label: "Link", kind: "url", required: true, help: "A full https:// address, or a file in public/ like /blog-PDFs/week1.pdf" },
];

export const contentFiles: ContentFile[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "site",
    label: "Team details",
    description: "Addresses, email, tax details and outbound links. These appear in the footer and on the donate and sponsors pages.",
    collections: [
      {
        name: "site",
        label: "Team details",
        description: "Change these only when something real changes, like a new address.",
        kind: "object",
        fields: [
          { name: "teamNumber", label: "Team number", kind: "number", required: true },
          { name: "teamName", label: "Team name", kind: "text", required: true },
          { name: "tagline", label: "Tagline", kind: "text" },
          { name: "founded", label: "Founded", kind: "number", required: true },
          { name: "grades", label: "Grades", kind: "text", placeholder: "6-12" },
          { name: "city", label: "City", kind: "text", required: true },
          { name: "url", label: "Website address", kind: "url", required: true, help: "Used for search engines and link previews. Not the preview site." },
          {
            name: "email", label: "Email addresses", kind: "object",
            fields: [
              { name: "general", label: "General", kind: "text", required: true },
              { name: "donate", label: "Donations", kind: "text", required: true },
              { name: "schoolGiving", label: "School giving office", kind: "text", required: true },
            ],
          },
          {
            name: "address", label: "Postal address", kind: "object",
            fields: [
              { name: "line1", label: "Line 1", kind: "text", required: true },
              { name: "line2", label: "Line 2", kind: "text", required: true },
              { name: "line3", label: "Line 3", kind: "text", required: true },
            ],
          },
          {
            name: "legal", label: "Gift recipient", kind: "object",
            help: "Shown to sponsors and donors. Check with the school before changing.",
            fields: [
              { name: "recipient", label: "Legal recipient", kind: "text", required: true },
              { name: "status", label: "Tax status", kind: "text", required: true },
              { name: "ein", label: "Federal tax ID", kind: "text", required: true },
              { name: "memo", label: "Memo line", kind: "text", required: true, help: "What a donor writes so the gift reaches the team." },
            ],
          },
          {
            name: "links", label: "Outbound links", kind: "object",
            fields: [
              { name: "school", label: "Khan Lab School", kind: "url", required: true },
              { name: "schoolGiving", label: "School donation page", kind: "url", required: true },
              { name: "first", label: "About FRC", kind: "url", required: true },
              { name: "firstNorCal", label: "FIRST NorCal", kind: "url", required: true },
              { name: "blueAlliance", label: "The Blue Alliance", kind: "url", required: true },
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "seasons",
    label: "Seasons",
    description: "One entry per competition season, newest first. Drives the history page and the season page.",
    collections: [
      {
        name: "seasons",
        label: "Seasons",
        description: "Set exactly one season to “current”. That is the one the season page and the home page show.",
        shownOn: "/history and /season",
        kind: "list",
        titleField: "year",
        itemNoun: "season",
        fields: [
          { name: "year", label: "Year", kind: "text", required: true, placeholder: "2027" },
          { name: "game", label: "Game name", kind: "text", required: true, help: "The FIRST game, or the project name for an off-season build." },
          { name: "robot", label: "Robot name", kind: "text", help: "What the team called it. Leave empty if it did not have a name." },
          { name: "status", label: "Status", kind: "select", required: true, options: ["current", "past", "upcoming"] },
          { name: "summary", label: "Summary", kind: "textarea", required: true, help: "Two or three sentences. What the robot did and where it competed." },
          { name: "highlights", label: "Highlights", kind: "stringList", entryNoun: "highlight", help: "Two to four short lines: achievements, changes, what the team is proud of." },
          { name: "awards", label: "Awards", kind: "stringList", entryNoun: "award", help: "Shown as chips on the history page." },
          {
            name: "image", label: "Robot image", kind: "object",
            fields: [
              { name: "src", label: "File", kind: "image", help: "A file in public/robot-images/, written as /robot-images/2027-CAD.png" },
              { name: "alt", label: "Description", kind: "text", help: "For screen readers. Describe what is in the picture." },
            ],
          },
          { name: "techBinder", label: "Tech binder", kind: "image", help: "A PDF in public/tech-binders/, written as /tech-binders/2027.pdf" },
          { name: "blogPosts", label: "Build blogs", kind: "list", titleField: "label", itemNoun: "blog post", fields: linkFields },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "sponsors",
    label: "Sponsors",
    description: "Sponsor logos by tier, the partnership levels, and the budget breakdown.",
    collections: [
      {
        name: "sponsorTiers",
        label: "Sponsor tiers",
        description: "Add a sponsor by putting its logo in public/sponsor-logos/ first, then adding a row to the right tier.",
        shownOn: "/sponsors and the home page strip",
        kind: "list",
        titleField: "name",
        itemNoun: "tier",
        fields: [
          { name: "id", label: "Id", kind: "text", required: true, help: "Lowercase, no spaces. Used for layout, so leave existing ones alone." },
          { name: "name", label: "Tier name", kind: "text", required: true },
          { name: "blurb", label: "Blurb", kind: "text", required: true, help: "One line under the tier heading." },
          {
            name: "sponsors", label: "Sponsors", kind: "list", titleField: "name", itemNoun: "sponsor",
            fields: [
              { name: "name", label: "Name", kind: "text", required: true },
              { name: "logo", label: "Logo file", kind: "image", help: "A file in public/sponsor-logos/. Leave empty to show the name as text instead." },
              { name: "width", label: "Logo width", kind: "number", help: "Only sets the shape. Copy the real pixel size of the file." },
              { name: "height", label: "Logo height", kind: "number" },
              { name: "href", label: "Website", kind: "url" },
            ],
          },
        ],
      },
      {
        name: "partnershipLevels",
        label: "Partnership levels",
        description: "What a sponsor gets at each amount. Each level is written as adding to the one before it.",
        shownOn: "/sponsors",
        kind: "list",
        titleField: "name",
        itemNoun: "level",
        fields: [
          { name: "amount", label: "Amount", kind: "text", required: true, placeholder: "$1,000+" },
          { name: "name", label: "Level name", kind: "text", required: true },
          { name: "summary", label: "Summary", kind: "text", required: true, help: "One line on what this level is for." },
          { name: "benefits", label: "Benefits", kind: "stringList", entryNoun: "benefit" },
          { name: "highlight", label: "Mark as most popular", kind: "boolean", help: "Highlights this card. Use it on at most one level." },
        ],
      },
      {
        name: "sponsorValue",
        label: "Why sponsor us",
        description: "The four reasons shown on the sponsors page.",
        shownOn: "/sponsors",
        kind: "list",
        titleField: "title",
        itemNoun: "reason",
        fields: [
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "body", label: "Body", kind: "textarea", required: true },
        ],
      },
      {
        name: "budgetBreakdown",
        label: "Budget breakdown",
        description: "The chart on the sponsor impact page. The percentages should add up to 100.",
        shownOn: "/sponsors/impact",
        kind: "list",
        titleField: "label",
        itemNoun: "budget line",
        fields: [
          { name: "label", label: "Category", kind: "text", required: true },
          { name: "percent", label: "Percent", kind: "number", required: true },
          { name: "note", label: "Note", kind: "text", help: "Examples of what this covers." },
        ],
      },
      {
        name: "firstImpactStats",
        label: "FIRST statistics",
        description: "National figures about FIRST alumni. Source these before changing them.",
        shownOn: "/sponsors",
        kind: "list",
        titleField: "value",
        itemNoun: "statistic",
        fields: [
          { name: "value", label: "Shown value", kind: "text", required: true, placeholder: "83%" },
          { name: "numeric", label: "Number to count up to", kind: "number", help: "The digits only. 83 for 83%." },
          { name: "suffix", label: "Suffix", kind: "text", placeholder: "%" },
          { name: "label", label: "Label", kind: "text", required: true },
        ],
      },
      {
        name: "waysToGive",
        label: "Ways to give",
        description: "The short list used on the sponsors page.",
        kind: "stringList",
        entryNoun: "method",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "training",
    label: "Training",
    description: "The training curriculum. Each section is a collapsible panel on the training page.",
    collections: [
      {
        name: "trainingSections",
        label: "Subjects",
        description: "Add a lesson by adding a row to the right subject's list.",
        shownOn: "/training",
        kind: "list",
        titleField: "title",
        itemNoun: "subject",
        fields: [
          { name: "id", label: "Id", kind: "text", required: true, help: "Lowercase, no spaces. Used for the jump links, so leave existing ones alone." },
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "summary", label: "Summary", kind: "text", required: true, help: "One sentence, shown when the panel is closed." },
          { name: "intro", label: "Intro", kind: "textarea", help: "Optional paragraph above the lessons." },
          { name: "comingSoon", label: "Coming soon note", kind: "textarea", help: "Shown instead of the lessons when there are none yet." },
          { name: "defaultOpen", label: "Open by default", kind: "boolean" },
          {
            name: "resources", label: "Lessons", kind: "list", titleField: "title", itemNoun: "lesson",
            fields: [
              { name: "title", label: "Title", kind: "text", required: true },
              { name: "href", label: "Link", kind: "url", help: "A Google Slides or document link." },
              { name: "description", label: "Description", kind: "text", help: "One short line, under about 15 words." },
              { name: "youtubeId", label: "YouTube id", kind: "text", help: "Just the id from the URL. Shows a video player instead of a link." },
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "team",
    label: "About the team",
    description: "Awards, the explainer blocks, student quotes and the subteam list.",
    collections: [
      {
        name: "teamNumbers",
        label: "Team numbers",
        description: "Leave a number empty rather than guessing. Anything empty is simply not shown.",
        kind: "object",
        fields: [
          { name: "activeStudents", label: "Active students", kind: "number" },
          { name: "weeklyHours", label: "Hours a week per member", kind: "number", required: true },
          { name: "competitionsThisSeason", label: "Competitions this season", kind: "number" },
          { name: "peopleReachedByOutreach", label: "People reached by outreach", kind: "number" },
        ],
      },
      {
        name: "awards",
        label: "Awards",
        description: "Newest first. The count of these is the “FIRST awards” number on the home page, so it updates itself.",
        shownOn: "/about and /history",
        kind: "list",
        titleField: "name",
        itemNoun: "award",
        fields: [
          { name: "year", label: "Year", kind: "text", required: true },
          { name: "name", label: "Award", kind: "text", required: true },
          { name: "event", label: "Event", kind: "text", help: "Where it was won, if it is worth naming." },
          { name: "note", label: "Note", kind: "text" },
        ],
      },
      {
        name: "studentQuotes",
        label: "Student quotes",
        description: "Needs an approved name, grade and photo before it goes in front of sponsors. The section is hidden while this is empty.",
        shownOn: "/sponsors",
        kind: "list",
        titleField: "name",
        itemNoun: "quote",
        fields: [
          { name: "quote", label: "Quote", kind: "textarea", required: true },
          { name: "name", label: "Name", kind: "text", required: true },
          { name: "role", label: "Role or grade", kind: "text", required: true },
          { name: "photo", label: "Photo", kind: "image", help: "A file in public/team-photos/." },
        ],
      },
      {
        name: "communities",
        label: "Who we are",
        description: "The three explainer cards on the home page: the team, the school, the competition.",
        shownOn: "home page",
        kind: "list",
        titleField: "title",
        itemNoun: "card",
        fields: [
          { name: "id", label: "Id", kind: "text", required: true },
          { name: "kicker", label: "Kicker", kind: "text", required: true, help: "The small label above the title." },
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "body", label: "Body", kind: "textarea", required: true },
          { name: "href", label: "Link", kind: "url", required: true },
          { name: "linkLabel", label: "Link text", kind: "text", required: true },
          { name: "external", label: "Opens another site", kind: "boolean" },
        ],
      },
      {
        name: "matchPhases",
        label: "How a match works",
        description: "The three steps explaining a match to someone who has never seen one.",
        shownOn: "home page and /about",
        kind: "list",
        titleField: "title",
        itemNoun: "step",
        fields: [
          { name: "step", label: "Number", kind: "text", required: true, placeholder: "01" },
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "body", label: "Body", kind: "textarea", required: true },
        ],
      },
      {
        name: "leadershipLadder",
        label: "Leadership ladder",
        description: "The four stages from joining in middle school to teaching the next group.",
        shownOn: "home page and /about",
        kind: "list",
        titleField: "title",
        itemNoun: "stage",
        fields: [
          { name: "step", label: "Number", kind: "text", required: true, placeholder: "01" },
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "body", label: "Body", kind: "textarea", required: true },
        ],
      },
      {
        name: "schoolTimeline",
        label: "Khan Lab School timeline",
        description: "How the school came to exist, for visitors who only know Khan Academy.",
        shownOn: "/about",
        kind: "list",
        titleField: "marker",
        itemNoun: "entry",
        fields: [
          { name: "marker", label: "Marker", kind: "text", required: true, help: "A year, or a word like “Today”." },
          { name: "body", label: "Body", kind: "textarea", required: true },
        ],
      },
      {
        name: "subteams",
        label: "Subteams",
        description: "The disciplines students can lead. These should match the training subjects.",
        shownOn: "/about",
        kind: "list",
        titleField: "name",
        itemNoun: "subteam",
        fields: [
          { name: "name", label: "Name", kind: "text", required: true },
          { name: "body", label: "Body", kind: "textarea", required: true },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "media",
    label: "Header video and photos",
    description: "The video behind the home page headline and the photo behind the season header.",
    collections: [
      {
        name: "heroMedia",
        label: "Home page header",
        description: "Put the video in public/video/ first. With no video set, the still photo is used on its own.",
        shownOn: "home page",
        kind: "object",
        fields: [
          { name: "src", label: "Video", kind: "image", help: "/video/hero.mp4 — leave empty to use the photo only." },
          { name: "poster", label: "Photo", kind: "image", required: true, help: "Shown while the video loads, and instead of it on slow connections." },
          { name: "alt", label: "Description", kind: "text", required: true },
        ],
      },
      {
        name: "seasonMedia",
        label: "Season page header",
        description: "The photo behind the season page title.",
        shownOn: "/season",
        kind: "object",
        fields: [
          { name: "src", label: "Video", kind: "image", help: "Leave empty to use the photo only." },
          { name: "poster", label: "Photo", kind: "image", required: true },
          { name: "alt", label: "Description", kind: "text", required: true },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "internal",
    label: "Team internal page",
    description: "Announcements, the calendar and the quick links on the members-only page.",
    collections: [
      {
        name: "announcementsDoc",
        label: "Announcements document",
        description: "The Google Doc embedded on the internal page.",
        shownOn: "/internal",
        kind: "object",
        fields: [
          { name: "embedUrl", label: "Embed address", kind: "url", required: true, help: "From File > Share > Publish to web in Google Docs." },
          { name: "editUrl", label: "Edit address", kind: "url", required: true, help: "The normal document link, for the Edit button." },
        ],
      },
      {
        name: "calendarEmbedUrl",
        label: "Team calendar",
        description: "Paste the embed address from Google Calendar. While it is empty the page shows a short note instead.",
        shownOn: "/internal",
        kind: "value",
        field: {
          name: "calendarEmbedUrl",
          label: "Calendar embed address",
          kind: "url",
          help: "Google Calendar > Settings > the team calendar > Integrate calendar > Embed code. Copy the src address only.",
        },
      },
      {
        name: "internalLinks",
        label: "Quick links",
        description: "The cards at the bottom of the internal page.",
        shownOn: "/internal",
        kind: "list",
        titleField: "title",
        itemNoun: "link",
        fields: [
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "description", label: "Description", kind: "text", required: true },
          { name: "href", label: "Link", kind: "url", required: true },
        ],
      },
    ],
  },
];

export function fileById(id: string): ContentFile {
  const file = contentFiles.find((entry) => entry.id === id);
  if (!file) throw new Error(`Unknown content file: ${id}`);
  return file;
}
