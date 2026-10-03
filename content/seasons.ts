/**
 * One entry per competition season, newest first.
 *
 * The seasons live in `content/data/seasons.json` and can be edited at /admin.
 *
 * `highlights` is the short "what was special about that year" list the
 * history page tells its story with. `blogPosts` accepts either a local file
 * in `public/blog-PDFs/` or an external link.
 */

import data from "./data/seasons.json";

export type SeasonLink = { label: string; href: string };

export type Season = {
  year: string;
  /** The FIRST game name, or the project name for an off-season build. */
  game: string;
  /** What the team called the robot. */
  robot?: string;
  status: "upcoming" | "current" | "past";
  summary: string;
  /** Two to four short lines: achievements, changes, what the team is proud of. */
  highlights?: string[];
  awards?: string[];
  image?: { src: string; alt: string };
  techBinder?: string;
  blogPosts?: SeasonLink[];
};

export const seasons: Season[] = data.seasons as Season[];

export const currentSeason = seasons.find((season) => season.status === "current") ?? seasons[0];
export const pastSeasons = seasons.filter((season) => season.status === "past");
