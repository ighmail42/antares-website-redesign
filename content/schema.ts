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
          { name: "grades", label: "Grades", kind: "text", placeholder: "6th through 12th", help: "Reads as \"a student-led team of <grades> graders\" in the site description search engines show." },
          { name: "city", label: "City", kind: "text", required: true },
          { name: "url", label: "Website address", kind: "url", required: true, help: "Used for search engines and link previews. Not the preview site." },
          {
            name: "email", label: "Email addresses", kind: "object",
            fields: [
              { name: "general", label: "General", kind: "text", required: true },
              { name: "donate", label: "Donations", kind: "text", required: true },
              { name: "schoolGiving", label: "School giving office", kind: "text", required: true },
              {
                name: "subjects", label: "Subject lines", kind: "object",
                help: "Filled in for the reader when they click an email link, so the team can tell an arriving message apart at a glance.",
                fields: [
                  { name: "sponsorship", label: "Sponsorship inquiry", kind: "text", required: true },
                  { name: "donation", label: "Donation", kind: "text", required: true },
                  { name: "matching", label: "Employer matching", kind: "text", required: true },
                  { name: "inKind", label: "In-kind donation", kind: "text", required: true },
                  { name: "stock", label: "Stock transfer", kind: "text", required: true },
                  { name: "giftNotice", label: "Gift notification", kind: "text", required: true },
                ],
              },
              {
                name: "giftNoticeBody", label: "Gift notification template", kind: "textarea", required: true,
                help: "The message body filled in when a donor tells us a gift is coming. It goes to the team and the school giving office together, because our process needs both. One field per line.",
              },
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
              { name: "taxNote", label: "Tax note", kind: "textarea", required: true, help: "Shown on the donate and sponsors pages. Keep it away from promising that a gift is tax-deductible: a sponsorship that comes with recognition is not treated the same way as a plain donation, and only a donor's own adviser can tell them which applies." },
            ],
          },
          {
            name: "social", label: "Social media", kind: "object",
            help: "Full profile addresses. Leave one empty and it is not shown in the footer.",
            fields: [
              { name: "instagram", label: "Instagram", kind: "url" },
              { name: "youtube", label: "YouTube", kind: "url" },
              { name: "tiktok", label: "TikTok", kind: "url" },
              { name: "linkedin", label: "LinkedIn", kind: "url" },
              { name: "facebook", label: "Facebook", kind: "url" },
              { name: "x", label: "X", kind: "url" },
              { name: "github", label: "GitHub", kind: "url" },
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
    id: "pages",
    label: "Page text",
    description: "Every heading, intro and button label on the site. This is where the site's voice lives.",
    collections: [
      {
        name: "home",
        label: "Home page",
        description: "The words on the home page, from the headline over the video down to the closing call to action.",
        shownOn: "/",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Headline, first line", kind: "text", help: "The home page headline is two lines. This is the white one." },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "note", label: "Headline, second line", kind: "text", help: "Shown underneath in the brand yellow." },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
          {
            name: "communities", label: "Who we are", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "sponsors", label: "Sponsor strip", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "primaryCta", label: "Main button", kind: "text" },
            ],
          },
          {
            name: "photo", label: "Photo caption", kind: "object",
            fields: [
              { name: "body", label: "Body", kind: "textarea" },
            ],
          },
          {
            name: "match", label: "How a match works", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "studentLed", label: "Student led", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "primaryCta", label: "Main button", kind: "text" },
            ],
          },
          {
            name: "season", label: "This season", kind: "object",
            fields: [
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About page",
        description: "How the team describes itself.",
        shownOn: "/about",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "ladder", label: "Leadership ladder", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "subteams", label: "Subteams", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "school", label: "Khan Lab School", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "primaryCta", label: "Main button", kind: "text" },
            ],
          },
          {
            name: "frc", label: "What FRC is", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "awards", label: "Awards", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "season",
        label: "Season page",
        description: "Headings on the current season page. The season's own name and summary live under Seasons.",
        shownOn: "/season",
        kind: "object",
        fields: [
          {
            name: "blogs", label: "Build blog", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "rhythm", label: "How a season runs", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "previous", label: "Last season", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "primaryCta", label: "Main button", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "history",
        label: "History page",
        description: "Headings on the history page. The seasons themselves live under Seasons.",
        shownOn: "/history",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "awards", label: "Awards", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "training",
        label: "Training page",
        description: "Headings on the training page. The lessons live under Training.",
        shownOn: "/training",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "sponsors",
        label: "Sponsors page",
        description: "Headings on the sponsors page. Sponsors, levels and statistics live under Sponsors.",
        shownOn: "/sponsors",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
          {
            name: "wall", label: "Sponsor wall", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "value", label: "Why sponsor us", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "note", label: "Small print", kind: "textarea", help: "Shown smaller and quieter, under the block." },
              { name: "primaryCta", label: "Button label", kind: "text", help: "The button at the end of the block, which goes to the budget page." },
            ],
          },
          {
            name: "first", label: "FIRST statistics", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "note", label: "Small print", kind: "textarea", help: "Shown smaller and quieter, under the block." },
            ],
          },
          {
            name: "levels", label: "Partnership levels", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "note", label: "Small print", kind: "textarea", help: "Shown smaller and quieter, under the block." },
            ],
          },
          {
            name: "quotes", label: "Student quotes", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "how", label: "How to sponsor", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "primaryCta", label: "Main button", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "impact",
        label: "Sponsor impact page",
        description: "Headings on the sponsor impact page.",
        shownOn: "/sponsors/impact",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "chart", label: "Budget chart", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "note", label: "Small print", kind: "textarea", help: "Shown smaller and quieter, under the block." },
            ],
          },
          {
            name: "buys", label: "What it buys", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "offsite", label: "Employee experience", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
              { name: "note", label: "Small print", kind: "textarea", help: "Shown smaller and quieter, under the block." },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "donate",
        label: "Donate page",
        description: "Headings on the donate page. The ways to give are written in the page itself.",
        shownOn: "/donate",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
          {
            name: "family", label: "Parents and families", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "note", label: "Small print", kind: "textarea", help: "Shown smaller and quieter, under the block." },
              { name: "primaryCta", label: "Main button", kind: "text" },
            ],
          },
          {
            name: "checklist", label: "Before you give", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "ways", label: "Ways to give", kind: "object",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
          {
            name: "methodOnline", label: "Way to give: online", kind: "object",
            help: "The instructions inside this one are built from the team details above, so they stay correct on their own. Only the heading and the line beside it are edited here.",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
              { name: "note", label: "Line beside the heading", kind: "text" },
            ],
          },
          {
            name: "methodCheck", label: "Way to give: check", kind: "object",
            help: "The instructions inside this one are built from the team details above, so they stay correct on their own. Only the heading and the line beside it are edited here.",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
              { name: "note", label: "Line beside the heading", kind: "text" },
            ],
          },
          {
            name: "methodMatching", label: "Way to give: employer matching", kind: "object",
            help: "The instructions inside this one are built from the team details above, so they stay correct on their own. Only the heading and the line beside it are edited here.",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
              { name: "note", label: "Line beside the heading", kind: "text" },
            ],
          },
          {
            name: "methodStock", label: "Way to give: appreciated stock", kind: "object",
            help: "The instructions inside this one are built from the team details above, so they stay correct on their own. Only the heading and the line beside it are edited here.",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
              { name: "note", label: "Line beside the heading", kind: "text" },
            ],
          },
          {
            name: "methodInKind", label: "Way to give: in-kind", kind: "object",
            help: "The instructions inside this one are built from the team details above, so they stay correct on their own. Only the heading and the line beside it are edited here.",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
              { name: "note", label: "Line beside the heading", kind: "text" },
            ],
          },
          {
            name: "methodSponsorship", label: "Way to give: company sponsorship", kind: "object",
            help: "The instructions inside this one are built from the team details above, so they stay correct on their own. Only the heading and the line beside it are edited here.",
            fields: [
              { name: "title", label: "Heading", kind: "text" },
              { name: "note", label: "Line beside the heading", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "internal",
        label: "Team internal page",
        description: "The wording on the members-only page.",
        shownOn: "/internal",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "lede", label: "Intro", kind: "textarea", help: "The larger paragraph under the heading." },
            ],
          },
          {
            name: "access", label: "Note about access", kind: "object",
            help: "Shown above the document to everyone, because nothing here can tell who has access. The panel often cannot see a reader's Google session at all, since browsers block that cookie inside a frame on another site, so it can keep asking a member to sign in however many times they do. Signed in to an account the document was not shared with, it shows a bare \"400. That's an error\" instead. Keep this short and keep it pointing at the Google Docs button, which is the one thing that works in every case.",
            fields: [
              { name: "body", label: "Note", kind: "textarea" },
              { name: "primaryCta", label: "Button label", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "blog",
        label: "Build blog page",
        description: "Headings on the blog index.",
        shownOn: "/blog",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
            ],
          },
          {
            name: "cta", label: "Closing call to action", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
      {
        name: "notFound",
        label: "Page-not-found page",
        description: "What someone sees at an address that does not exist.",
        shownOn: "404",
        kind: "object",
        fields: [
          {
            name: "hero", label: "Header", kind: "object",
            fields: [
              { name: "eyebrow", label: "Label above the heading", kind: "text", help: "The small uppercase line. Keep it to three or four words." },
              { name: "title", label: "Heading", kind: "text" },
              { name: "body", label: "Body", kind: "textarea" },
              { name: "primaryCta", label: "Main button", kind: "text" },
              { name: "secondaryCta", label: "Second button", kind: "text" },
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "posts",
    label: "Build blog posts",
    description: "Posts written on the site itself. Older posts that live in a Google Doc or a PDF are listed under their season instead.",
    collections: [
      {
        name: "posts",
        label: "Posts",
        description: "Newest first. A new post starts as a draft, which keeps it off the blog list until you are ready.",
        shownOn: "/blog and /season",
        kind: "list",
        titleField: "title",
        itemNoun: "post",
        fields: [
          { name: "title", label: "Title", kind: "text", required: true },
          { name: "slug", label: "Web address", kind: "text", required: true, help: "The last part of the address, lowercase with dashes: 2027-week-1 becomes /blog/2027-week-1. Changing it breaks any existing links." },
          { name: "season", label: "Season", kind: "text", required: true, help: "The year, matching a season under Seasons. Groups the post on the blog list." },
          { name: "date", label: "Date", kind: "text", required: true, placeholder: "2027-01-17", help: "Written as year-month-day." },
          { name: "authors", label: "Written by", kind: "text" },
          { name: "summary", label: "Summary", kind: "textarea", required: true, help: "One or two sentences, shown on the blog list." },
          { name: "draft", label: "Draft", kind: "boolean", help: "Kept off the blog list and out of search engines while this is on." },
          { name: "image", label: "Header photo", kind: "image", help: "A file in public/blog-images/." },
          { name: "imageAlt", label: "Header photo description", kind: "text", help: "What a screen reader says. Describe what is in the photo." },
          {
            name: "sections", label: "Sections", kind: "list", titleField: "heading", itemNoun: "section",
            help: "Three or four is usually right. Each one can have a heading, some text, and a photo.",
            fields: [
              { name: "heading", label: "Heading", kind: "text" },
              { name: "body", label: "Text", kind: "textarea", help: "A blank line starts a new paragraph. A line starting with \"- \" becomes a bullet." },
              { name: "image", label: "Photo", kind: "image", help: "A file in public/blog-images/." },
              { name: "imageAlt", label: "Photo description", kind: "text" },
              { name: "imageCaption", label: "Caption", kind: "text" },
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
          { name: "students", label: "Students on the team", kind: "number", help: "Roster size for that season. Leave empty if the number is not known." },
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
              { name: "description", label: "About the company", kind: "textarea", help: "One or two sentences on what they do. Shown when someone clicks the logo." },
              { name: "relationship", label: "Their relationship with Antares", kind: "textarea", help: "What they give us and what it pays for, in our own words." },
              { name: "since", label: "Supporting since", kind: "text", placeholder: "2023" },
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
        description: "Leave a number empty rather than guessing. Anything empty is simply not shown. The student count on the home page is not here: it comes from whichever season is marked current, under Seasons.",
        kind: "object",
        fields: [
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
    id: "internal",
    label: "Team internal document",
    description: "The Google Doc embedded on the members-only page.",
    collections: [
      {
        name: "doc",
        label: "Document",
        description:
          "Who can read this is decided in Google Docs, not here. Share the document with the people who should see it and they will see it on the page; everyone else gets an empty panel and the note above it.",
        shownOn: "/internal",
        kind: "object",
        fields: [
          { name: "label", label: "Panel heading", kind: "text", required: true, help: "The heading above the document on the page." },
          { name: "embedUrl", label: "Embed address", kind: "url", required: true, help: "The share link with the ending replaced by /preview. Only /preview is allowed to load inside the page; a normal /edit link shows nothing." },
          { name: "openUrl", label: "Open address", kind: "url", required: true, help: "The normal share link, straight from Share > Copy link. The buttons use it, and it is where Google shows its own sign-in and request-access screens." },
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

];

export function fileById(id: string): ContentFile {
  const file = contentFiles.find((entry) => entry.id === id);
  if (!file) throw new Error(`Unknown content file: ${id}`);
  return file;
}
