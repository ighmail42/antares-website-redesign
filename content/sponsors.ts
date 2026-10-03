/**
 * Sponsor logos, tiers and the 2026-27 partnership levels.
 *
 * The values live in `content/data/sponsors.json` and can be edited at /admin.
 *
 * To add a sponsor: drop the logo in `public/sponsor-logos/`, then add an
 * entry to the matching tier. Width and height only set the aspect ratio, so
 * the real pixel size of the file does not have to match. A sponsor with no
 * logo renders as a name card instead.
 */

import data from "./data/sponsors.json";

export type Sponsor = {
  name: string;
  logo?: string;
  width?: number;
  height?: number;
  href?: string;
  /** One or two sentences on what the company does. */
  description?: string;
  /** How they support Antares, in the team's own words. */
  relationship?: string;
  /** The year they first supported the team. */
  since?: string;
};

export type SponsorTier = {
  id: string;
  name: string;
  /** Shown on the sponsors page under the tier heading. */
  blurb: string;
  sponsors: Sponsor[];
};

export type PartnershipLevel = {
  amount: string;
  name: string;
  summary: string;
  benefits: string[];
  highlight?: boolean;
};

export type ValueProp = { title: string; body: string };

export type BudgetLine = { label: string; percent: number; note: string };

export const sponsorTiers: SponsorTier[] = data.sponsorTiers;

/** Logos shown in the home page marquee, in order: everything but bronze. */
export const featuredSponsors: Sponsor[] = sponsorTiers
  .filter((tier) => tier.id !== "bronze")
  .flatMap((tier) => tier.sponsors);

/** 2026-27 partnership levels. Each level adds to the one before it. */
export const partnershipLevels: PartnershipLevel[] = data.partnershipLevels;

/** Why a company sponsors a high school robotics team. */
export const sponsorValue: ValueProp[] = data.sponsorValue;

/** Share of the planned 2025-26 expense budget. Rounded, totals 100%. */
export const budgetBreakdown: BudgetLine[] = data.budgetBreakdown;

/** National outcomes for FIRST alumni. Source: FIRST. */
export const firstImpactStats = data.firstImpactStats;

export const waysToGive: string[] = data.waysToGive;
