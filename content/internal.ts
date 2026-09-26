/**
 * Team-only resources. This page is not in the main navigation.
 *
 * ADDING THE CALENDAR
 * -------------------
 * In Google Calendar: Settings > the team calendar > Integrate calendar, then
 * copy the "Embed code" src URL into `calendarEmbedUrl` below. Add
 * `&mode=MONTH&showTitle=0&showPrint=0&showTabs=0&showCalendars=0` for a clean
 * embed. Until it is set, the page shows a short note instead.
 */

export const announcementsDoc = {
  /** Published-to-web URL, used for the embed. */
  embedUrl:
    "https://docs.google.com/document/d/e/2PACX-1vS3PX3jIxeF1hY-T3JxPG6_2exwSkdSH7e4TQ-G8h_V4gqgLQgRaOyWM4IV-H2zh9IsfiWtmmXAroOT/pub?embedded=true",
  /** Editable URL, for the "edit" link. */
  editUrl:
    "https://docs.google.com/document/d/1s1DQv08JHRtf0XDBuVnLDS99uQducST5dk2CXAhKp3w/edit?usp=sharing",
};

export const calendarEmbedUrl: string | null = null;

export const internalLinks = [
  {
    title: "AIM inventory",
    description: "Find and add tools, parts, assemblies and materials, and see where they live.",
    href: "https://docs.google.com/document/d/1I9T66MCCvx5s-qQLplDAvSGkhlbdboJZAC9z1I4xfvA/edit",
  },
  {
    title: "Training materials",
    description: "Every lesson, by subject.",
    href: "/training",
  },
  {
    title: "Season blogs",
    description: "What we wrote each week, going back to 2022.",
    href: "/history",
  },
];
