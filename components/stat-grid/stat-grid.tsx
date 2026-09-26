import { Counter } from "@/components/counter/counter";
import { Reveal } from "@/components/reveal/reveal";
import styles from "./stat-grid.module.css";

export type StatItem = {
  value: string;
  numeric?: number;
  suffix?: string;
  label: string;
  detail?: string;
};

type StatGridProps = {
  items: StatItem[];
  /** "loud" is the big home page strip; "quiet" fits inside a content section. */
  tone?: "loud" | "quiet";
};

export function StatGrid({ items, tone = "loud" }: StatGridProps) {
  return (
    <dl className={styles.grid} data-tone={tone}>
      {items.map((item, index) => (
        <Reveal as="div" key={item.label} delay={index * 90} className={styles.cell}>
          <dt className={styles.value}>
            {item.numeric !== undefined ? (
              <Counter to={item.numeric} fallback={item.value} suffix={item.suffix ?? ""} />
            ) : (
              item.value
            )}
          </dt>
          <dd className={styles.label}>
            {item.label}
            {item.detail && <span className={styles.detail}>{item.detail}</span>}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
