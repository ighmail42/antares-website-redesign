import { SCORPIUS_VIEWBOX, scorpiusLines, scorpiusStars, starById } from "./scorpius";
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
 * The full Scorpius constellation, drawn large so it fills space rather than
 * sitting in a box. Lines draw themselves on with a stroke-dash animation and
 * Antares keeps a slow pulse.
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
          const from = starById(fromId);
          const to = starById(toId);
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
            className={star.id === "alp" ? styles.antares : undefined}
            style={{ "--star-index": index } as React.CSSProperties}
          >
            <title>{star.name}</title>
          </circle>
        ))}
      </g>

      {labelled && (
        <text className={styles.label} x={starById("alp").x + 26} y={starById("alp").y + 6}>
          ANTARES
        </text>
      )}
    </svg>
  );
}
