/**
 * Scorpius, the constellation Antares sits in.
 *
 * Positions come from each star's real right ascension and declination,
 * projected flat and stretched horizontally to match the team logo's
 * composition. Antares (alpha Scorpii) is the bright one in the middle.
 */

export const SCORPIUS_VIEWBOX = { width: 1000, height: 743 };

export type ScorpiusStar = {
  id: string;
  name: string;
  x: number;
  y: number;
  /** Drawn radius, derived from apparent magnitude. */
  r: number;
};

export const scorpiusStars: ScorpiusStar[] = [
  { id: "bet", name: "Graffias", x: 878.0, y: 70.0, r: 4.41 },
  { id: "del", name: "Dschubba", x: 918.4, y: 142.5, r: 4.76 },
  { id: "pi", name: "Pi Scorpii", x: 930.0, y: 232.3, r: 4.07 },
  { id: "sig", name: "Alniyat", x: 753.3, y: 218.9, r: 4.07 },
  { id: "alp", name: "Antares", x: 688.4, y: 240.5, r: 6.25 },
  { id: "tau", name: "Paikauhale", x: 637.1, y: 286.4, r: 4.18 },
  { id: "eps", name: "Larawag", x: 524.2, y: 442.8, r: 4.76 },
  { id: "mu", name: "Xamidimura", x: 511.0, y: 539.4, r: 3.95 },
  { id: "zet", name: "Zeta Scorpii", x: 491.0, y: 650.4, r: 3.26 },
  { id: "eta", name: "Eta Scorpii", x: 350.2, y: 673.0, r: 3.61 },
  { id: "the", name: "Sargas", x: 151.1, y: 666.8, r: 5.22 },
  { id: "iot", name: "Iota Scorpii", x: 70.0, y: 592.9, r: 3.95 },
  { id: "kap", name: "Girtab", x: 110.2, y: 564.7, r: 4.64 },
  { id: "lam", name: "Shaula", x: 180.6, y: 515.1, r: 5.56 },
  { id: "ups", name: "Lesath", x: 203.3, y: 520.0, r: 4.29 },
];

/** The classic stick figure: claws, body, then the curl of the tail. */
export const scorpiusLines: [string, string][] = [
  ["bet", "del"],
  ["del", "pi"],
  ["del", "sig"],
  ["sig", "alp"],
  ["alp", "tau"],
  ["tau", "eps"],
  ["eps", "mu"],
  ["mu", "zet"],
  ["zet", "eta"],
  ["eta", "the"],
  ["the", "iot"],
  ["iot", "kap"],
  ["kap", "lam"],
  ["lam", "ups"],
];

const byId = new Map(scorpiusStars.map((star) => [star.id, star]));

export function starById(id: string): ScorpiusStar {
  const star = byId.get(id);
  if (!star) throw new Error(`Unknown Scorpius star: ${id}`);
  return star;
}
