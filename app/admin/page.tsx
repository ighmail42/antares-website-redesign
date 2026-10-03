import type { Metadata } from "next";
import Link from "next/link";

import { ContentEditor } from "./editor";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Content editor",
  description: "Edit the words, numbers and links on team6962.com.",
  robots: { index: false, follow: false },
};

/**
 * A form-based editor for everything in `content/data/`.
 *
 * It runs entirely in the browser and has no server and no password: it reads
 * the content that shipped with the site, lets you change it, and hands back a
 * file to commit on GitHub. Nothing you do here reaches the live site until
 * someone commits that file, which is also what keeps the tech team's review
 * in the loop.
 */
export default function AdminPage() {
  return (
    <>
      <div className={styles.banner} data-scheme="dark">
        <div>
          <strong>Content editor.</strong> Changes here are not live until you save the file to
          GitHub. <Link href="/">Back to the site</Link>
        </div>
      </div>
      <ContentEditor />
    </>
  );
}
