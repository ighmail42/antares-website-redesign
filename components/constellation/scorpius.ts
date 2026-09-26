/**
 * Scorpius, the constellation Antares sits in.
 *
 * These coordinates are traced from the official brand emblem
 * (`public/brand/constellation-yellow.png`), so the drawn constellation
 * matches the team's logo exactly rather than being an approximation. The
 * viewBox is the emblem's own pixel space.
 *
 * Antares is the four-point sparkle in the middle, the same mark used in the
 * team icon.
 */

export const SCORPIUS_VIEWBOX = { width: 2320, height: 1138 };

export type ScorpiusStar = {
  id: string;
  /** Shown as a tooltip on hover. */
  name: string;
  x: number;
  y: number;
  r: number;
};

export const scorpiusStars: ScorpiusStar[] = [
  { id: "bet", name: "Graffias", x: 2277.1, y: 27.0, r: 28 },
  { id: "del", name: "Dschubba", x: 2292.0, y: 383.6, r: 27.5 },
  { id: "pi", name: "Pi Scorpii", x: 2077.1, y: 779.1, r: 28 },
  { id: "sig", name: "Alniyat", x: 1782.3, y: 406.4, r: 40.5 },
  { id: "tau", name: "Paikauhale", x: 1080.2, y: 628.8, r: 32 },
  { id: "eps", name: "Larawag", x: 858.1, y: 875.6, r: 18.5 },
  { id: "mu", name: "Xamidimura", x: 678.9, y: 1113.7, r: 23.5 },
  { id: "zet", name: "Zeta Scorpii", x: 413.9, y: 1094.1, r: 27.5 },
  { id: "the", name: "Sargas", x: 79.2, y: 955.1, r: 20.5 },
  { id: "kap", name: "Girtab", x: 25.1, y: 665.5, r: 25.5 },
  { id: "lam", name: "Shaula", x: 295.2, y: 454.8, r: 34 },
];

/** Antares itself, drawn as the brand's four-point star rather than a dot. */
export const antares = { id: "alp", name: "Antares", x: 1438.0, y: 431.1, rx: 105.5, ry: 136.5 };

/**
 * The stick figure, in drawing order: the three claws fan off the junction
 * beside Antares, then the body runs down and the tail curls back up.
 */
export const scorpiusLines: [string, string][] = [
  ["bet", "sig"],
  ["del", "sig"],
  ["pi", "sig"],
  ["sig", "alp"],
  ["alp", "tau"],
  ["tau", "eps"],
  ["eps", "mu"],
  ["mu", "zet"],
  ["zet", "the"],
  ["the", "kap"],
  ["kap", "lam"],
];

const byId = new Map<string, { x: number; y: number }>([
  ...scorpiusStars.map((star) => [star.id, { x: star.x, y: star.y }] as const),
  [antares.id, { x: antares.x, y: antares.y }],
]);

export function pointById(id: string): { x: number; y: number } {
  const point = byId.get(id);
  if (!point) throw new Error(`Unknown Scorpius star: ${id}`);
  return point;
}

/**
 * A four-point sparkle centred on (cx, cy). The control points give each arm
 * the concave taper the brand mark uses.
 */
export function sparklePath(cx: number, cy: number, rx: number, ry: number): string {
  const kx = rx * 0.3;
  const ky = ry * 0.3;
  return [
    `M ${cx} ${cy - ry}`,
    `C ${cx + kx * 0.4} ${cy - ky} ${cx + kx} ${cy - ky * 0.4} ${cx + rx} ${cy}`,
    `C ${cx + kx} ${cy + ky * 0.4} ${cx + kx * 0.4} ${cy + ky} ${cx} ${cy + ry}`,
    `C ${cx - kx * 0.4} ${cy + ky} ${cx - kx} ${cy + ky * 0.4} ${cx - rx} ${cy}`,
    `C ${cx - kx} ${cy - ky * 0.4} ${cx - kx * 0.4} ${cy - ky} ${cx} ${cy - ry}`,
    "Z",
  ].join(" ");
}
