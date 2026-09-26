import Link from "next/link";

import { Constellation } from "@/components/constellation/constellation";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <Constellation className={styles.backdrop} animated={false} />
      <div className="shell">
        <div className={styles.inner}>
          <p className="eyebrow">404</p>
          <h1 className={styles.title}>That page is not in this constellation</h1>
          <p className={styles.body}>
            The link may be out of date. Try the home page, or head straight to the season.
          </p>
          <div className="button-row">
            <Link className="button button-primary" href="/">
              Back to home
            </Link>
            <Link className="button button-ghost" href="/season">
              This season
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
