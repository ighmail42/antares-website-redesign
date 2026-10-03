/**
 * Scorpius, the constellation Antares sits in.
 *
 * GENERATED from the brand kit's `Antares_Constellation_Final.ai`, so the
 * drawn mark is the official emblem rather than a redrawing of it: the same
 * tapered segments, the same star sizes, the same four-point Antares. To
 * regenerate after a brand update, re-run the converter in
 * `docs/editing-content.md`.
 *
 * Coordinates are in the emblem's own space, shifted so the artwork starts at
 * the origin.
 */

export const SCORPIUS_VIEWBOX = { width: 569, height: 285 };

/** The connecting segments, ordered outward from Antares. */
export const scorpiusLines: string[] = [
  "M 394.25 106.26 L 412.36 106.18 L 394.71 110.23 C 391.82 110.78 391.31 106.40 394.25 106.26",
  "M 280.34 147.71 L 318.40 121.13 C 319.30 120.49 320.55 120.71 321.18 121.62 C 321.86 122.57 321.56 123.92 320.54 124.50 Z",
  "M 449.41 119.64 L 495.55 181.19 L 446.27 122.12 C 444.60 120.00 447.72 117.52 449.41 119.64",
  "M 218.29 206.47 L 248.70 171.81 C 249.43 170.98 250.69 170.90 251.52 171.63 C 252.40 172.39 252.43 173.78 251.59 174.58 Z",
  "M 456.07 100.72 L 541.40 98.87 L 456.25 104.72 C 453.56 104.83 453.37 100.86 456.07 100.72",
  "M 450.36 88.60 L 540.93 21.80 L 452.79 91.78 C 450.66 93.38 448.24 90.26 450.36 88.60",
  "M 182.08 264.55 L 202.69 227.19 C 203.23 226.22 204.45 225.87 205.41 226.41 C 206.44 226.97 206.77 228.32 206.10 229.29 Z",
  "M 120.81 269.82 L 154.10 270.27 C 155.20 270.28 156.09 271.19 156.07 272.30 C 156.07 273.49 154.98 274.42 153.80 274.26 C 153.80 274.26 120.81 269.82 120.81 269.82",
  "M 25.55 151.84 L 64.02 123.29 L 28.07 154.95 C 25.95 156.70 23.39 153.55 25.55 151.84",
  "M 38.37 242.16 L 90.46 262.94 C 91.49 263.35 91.99 264.52 91.58 265.55 C 91.16 266.62 89.89 267.11 88.85 266.60 Z",
  "M 12.58 181.00 L 22.68 219.07 C 22.97 220.14 22.33 221.24 21.26 221.52 C 20.13 221.83 18.95 221.07 18.77 219.90 Z",
];

/** The stars, ordered outward from Antares. */
export const scorpiusStars: { cx: number; cy: number; r: number }[] = [
  { cx: 434.20, cy: 103.65, r: 9.56 },
  { cx: 265.73, cy: 157.02, r: 7.54 },
  { cx: 504.96, cy: 193.08, r: 6.59 },
  { cx: 212.41, cy: 216.27, r: 4.62 },
  { cx: 556.55, cy: 98.20, r: 6.59 },
  { cx: 552.98, cy: 12.59, r: 6.59 },
  { cx: 169.41, cy: 273.41, r: 5.83 },
  { cx: 77.30, cy: 115.26, r: 8.50 },
  { cx: 105.79, cy: 268.71, r: 6.89 },
  { cx: 12.49, cy: 165.83, r: 6.49 },
  { cx: 25.46, cy: 235.35, r: 5.27 },
];

/** Antares itself: the four-point star from the team icon. */
export const antares = {
  d: "M 376.92 109.56 C 356.05 112.74 354.05 115.32 351.58 142.20 C 349.11 115.32 347.11 112.74 326.25 109.56 C 347.11 106.38 349.11 103.80 351.58 76.92 C 354.05 103.80 356.05 106.38 376.92 109.56",
  cx: 351.59,
  cy: 109.57,
  width: 50.67,
  height: 65.28,
};
