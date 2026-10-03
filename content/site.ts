/**
 * Site-wide facts, contacts and navigation copy.
 *
 * The values live in `content/data/site.json` so the editor at /admin can
 * change them. This file describes their shape and is where a developer adds
 * a new field. See `docs/editing-content.md`.
 */

import data from "./data/site.json";

export type Site = {
  teamNumber: number;
  teamName: string;
  tagline: string;
  founded: number;
  grades: string;
  city: string;
  /** Used for page titles, Open Graph tags and the sitemap. */
  url: string;
  email: {
    general: string;
    donate: string;
    schoolGiving: string;
  };
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  /** Khan Lab School is the 501(c)(3) that receives gifts on the team's behalf. */
  legal: {
    recipient: string;
    status: string;
    ein: string;
    memo: string;
  };
  links: {
    school: string;
    schoolGiving: string;
    first: string;
    firstNorCal: string;
    blueAlliance: string;
  };
};

export const site: Site = data.site;
