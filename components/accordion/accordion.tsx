import type { ReactNode } from "react";
import styles from "./accordion.module.css";

type AccordionProps = {
  title: string;
  /** One line shown next to the title, so a closed panel still says something. */
  summary?: string;
  /** Small count or tag on the right, e.g. "4 lessons". */
  meta?: string;
  defaultOpen?: boolean;
  id?: string;
  children: ReactNode;
};

/**
 * A collapsible panel built on `<details>`, so it works without JavaScript and
 * is keyboard accessible for free. Browsers that support `::details-content`
 * animate the open and close; the rest snap, which is fine.
 */
export function Accordion({ title, summary, meta, defaultOpen, id, children }: AccordionProps) {
  return (
    <details className={styles.item} open={defaultOpen} id={id}>
      <summary className={styles.summary}>
        <span className={styles.heading}>
          <span className={styles.title}>{title}</span>
          {summary && <span className={styles.subtitle}>{summary}</span>}
        </span>
        {meta && <span className={styles.meta}>{meta}</span>}
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <div className={styles.panel}>
        <div className={styles.panelInner}>{children}</div>
      </div>
    </details>
  );
}
