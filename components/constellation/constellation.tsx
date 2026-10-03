import { SCORPIUS_VIEWBOX, antares, scorpiusLines, scorpiusStars } from "./scorpius";
import styles from "./constellation.module.css";

type ConstellationProps = {
  /** Extra class for positioning the SVG inside its parent. */
  className?: string;
  /** Draw the mark on as the page loads. Off for small decorative copies. */
  animated?: boolean;
  /** Label Antares. Used in the hero, where there is room for it. */
  labelled?: boolean;
};

/**
 * The team's constellation emblem, drawn as SVG so it can animate and take its
 * colour from whichever kind of section it sits in. The geometry is generated
 * straight from the brand kit's Illustrator file, so this is the official mark
 * rather than a redrawing of it. See `scorpius.ts`.
 */
export function Constellation({ className, animated = true, labelled = false }: ConstellationProps) {
  return (
    <svg
      className={`${styles.svg}${animated ? ` ${styles.animated}` : ""}${className ? ` ${className}` : ""}`}
      viewBox={`0 0 ${SCORPIUS_VIEWBOX.width} ${SCORPIUS_VIEWBOX.height}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.lines}>
        {scorpiusLines.map((d, index) => (
          <path key={index} d={d} style={{ "--line-index": index } as React.CSSProperties} />
        ))}
      </g>

      <g className={styles.stars}>
        {scorpiusStars.map((star, index) => (
          <circle
            key={index}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            style={{ "--star-index": index } as React.CSSProperties}
          />
        ))}
      </g>

      <path className={styles.antares} d={antares.d} />

      {labelled && (
        <text className={styles.label} x={antares.cx} y={antares.cy + antares.height / 2 + 26}>
          ANTARES
        </text>
      )}
    </svg>
  );
}
