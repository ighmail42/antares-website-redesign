import Link from "next/link";

import { Constellation } from "@/components/constellation/constellation";
import { page } from "@/content/pages";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import styles from "./not-found.module.css";

export default function NotFound() {
  const copy = page("notFound").hero;

  return (
    <>
      <SiteHeader />
      <main className={styles.wrap} data-scheme="dark">
      <Constellation className={styles.backdrop} animated={false} />
      <div className="shell">
        <div className={styles.inner}>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.body}>{copy.body}</p>
          <div className="button-row">
            <Link className="button button-primary" href="/">
              {copy.primaryCta}
            </Link>
            <Link className="button button-ghost" href="/season">
              {copy.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
