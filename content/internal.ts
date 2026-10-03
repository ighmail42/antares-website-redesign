/**
 * Team-only resources. This page is not in the main navigation.
 *
 * The values live in `content/data/internal.json`.
 *
 * ADDING THE CALENDAR
 * -------------------
 * In Google Calendar: Settings > the team calendar > Integrate calendar, then
 * copy the "Embed code" src URL into `calendarEmbedUrl`. Add
 * `&mode=MONTH&showTitle=0&showPrint=0&showTabs=0&showCalendars=0` for a clean
 * embed. While it is empty, the page shows a short note instead.
 */

import data from "./data/internal.json";

export type InternalLink = {
  title: string;
  description: string;
  href: string;
};

export const announcementsDoc: { embedUrl: string; editUrl: string } = data.announcementsDoc;
export const calendarEmbedUrl: string | null = data.calendarEmbedUrl;
export const internalLinks: InternalLink[] = data.internalLinks;
