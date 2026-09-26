import {
  SCORPIUS_VIEWBOX,
  antares,
  pointById,
  scorpiusLines,
  scorpiusStars,
  sparklePath,
} from "./scorpius";
import styles from "./constellation.module.css";

type ConstellationProps = {
  /** Extra class for positioning the SVG inside its parent. */
  className?: string;
  /** Draw the lines on as the page loads. Off for small decorative copies. */
  animated?: boolean;
  /** Label Antares. Used in the hero, where there is room for it. */
  labelled?: boolean;
};

/**
 * The team's constellation emblem, redrawn as SVG so it can animate: the lines
 * draw themselves on, the stars spark into place, and Antares keeps a slow
 * pulse. Geometry comes from the official logo, see `scorpius.ts`.
 */
export function Constellation({ className, animated = true, labelled = false }: ConstellationProps) {
  return (
    <svg
      className={`${styles.svg}${animated ? ` ${styles.animated}` : ""}${className ? ` ${className}` : ""}`}
      viewBox={`0 0 ${SCORPIUS_VIEWBOX.width} ${SCORPIUS_VIEWBOX.height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.lines}>
        {scorpiusLines.map(([fromId, toId], index) => {
          const from = pointById(fromId);
          const to = pointById(toId);
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              style={{ "--line-index": index } as React.CSSProperties}
            />
          );
        })}
      </g>

      <g className={styles.stars}>
        {scorpiusStars.map((star, index) => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.r}
            style={{ "--star-index": index } as React.CSSProperties}
          >
            <title>{star.name}</title>
          </circle>
        ))}
      </g>

      <path className={styles.antares} d={sparklePath(antares.x, antares.y, antares.rx, antares.ry)}>
        <title>{antares.name}</title>
      </path>

      {labelled && (
        <text className={styles.label} x={antares.x} y={antares.y + antares.ry + 76}>
          ANTARES
        </text>
      )}
    </svg>
  );
}
