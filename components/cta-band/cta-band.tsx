import Link from "next/link";
import type { Route } from "next";

import { Constellation } from "@/components/constellation/constellation";
import { Reveal } from "@/components/reveal/reveal";
import styles from "./cta-band.module.css";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  body: string;
  primary: { href: Route | string; label: string };
  secondary?: { href: Route | string; label: string };
};

/** The full-bleed closing panel used at the bottom of most pages. */
export function CtaBand({ eyebrow, title, body, primary, secondary }: CtaBandProps) {
  return (
    <section className={styles.band}>
      <Constellation className={styles.backdrop} animated={false} />
      <div className="shell">
        <Reveal className={styles.inner}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
          <div className="button-row">
            <Link className="button button-primary" href={primary.href as Route}>
              {primary.label}
            </Link>
            {secondary && (
              <Link className="button button-ghost" href={secondary.href as Route}>
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
