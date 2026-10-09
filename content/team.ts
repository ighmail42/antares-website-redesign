/**
 * Who Antares is: the numbers, the awards, and the story blocks reused across
 * the home and about pages.
 *
 * The values live in `content/data/team.json` and can be edited at /admin.
 * A number left out is skipped by the components that render it, so the site
 * never shows a placeholder figure to a sponsor.
 */

import data from "./data/team.json";
import { currentSeason } from "./seasons";

export type Stat = {
  value: string;
  /** Rendered as a count-up when the value is numeric. */
  numeric?: number;
  suffix?: string;
  label: string;
  detail?: string;
};

export type TeamNumbers = {
  weeklyHours: number;
  competitionsThisSeason?: number;
  peopleReachedByOutreach?: number;
};

export type Award = {
  year: string;
  name: string;
  event?: string;
  note?: string;
};

export type Community = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  external?: boolean;
};

export type Step = { step: string; title: string; body: string };

export type TimelineEntry = { marker: string; body: string };

export type Subteam = { name: string; body: string };

export type StudentQuote = { quote: string; name: string; role: string; photo?: string };

export const teamNumbers: TeamNumbers = data.teamNumbers;

/** Source: FIRST award records and Khan Lab School. */
export const awards: Award[] = data.awards;

/**
 * The four big numbers on the home page. Derived rather than stored, so they
 * cannot drift from the facts they summarise: the award count is the length
 * of the list above, and the roster size is whichever season is marked
 * current in `content/data/seasons.json`. Rolling the season over updates
 * the home page on its own.
 *
 * The roster tile is skipped entirely if that season has no student count,
 * rather than rendering an empty number at a sponsor.
 */
export const headlineStats: Stat[] = [
  { value: "2018", label: "Founded", detail: "Rookie season at Khan Lab School" },
  ...(currentSeason.students
    ? [
        {
          value: String(currentSeason.students),
          numeric: currentSeason.students,
          label: "Students",
          detail: `On the team this season, from 6th grade through 12th`,
        },
      ]
    : []),
  {
    value: String(awards.length),
    numeric: awards.length,
    label: "FIRST awards",
    detail: "For engineering, imagery, autonomous and team culture",
  },
  {
    value: `${teamNumbers.weeklyHours}+`,
    numeric: teamNumbers.weeklyHours,
    suffix: "+",
    label: "Hours a week",
    detail: "Per member during build season",
  },
];

/**
 * The three communities a first-time visitor needs explained, in the order the
 * website feedback asked for them.
 */
export const communities: Community[] = data.communities;

/** How a match actually runs, for sponsors who have never watched one. */
export const matchPhases: Step[] = data.matchPhases;

/** The student-ownership argument, used on the about and sponsors pages. */
export const leadershipLadder: Step[] = data.leadershipLadder;

/**
 * Student stories. The sponsors page only renders this section when there is
 * at least one entry, so nothing looks broken while it is empty.
 */
export const studentQuotes: StudentQuote[] = data.studentQuotes;

/** How Khan Lab School came to exist, for visitors who only know Khan Academy. */
export const schoolTimeline: TimelineEntry[] = data.schoolTimeline;

/**
 * The disciplines students can lead. These mirror the training curriculum in
 * `content/training.ts`, which is where the lessons for each one live.
 */
export const subteams: Subteam[] = data.subteams;
