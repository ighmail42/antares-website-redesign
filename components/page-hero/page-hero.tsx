import type { ReactNode } from "react";

import { Constellation } from "@/components/constellation/constellation";
import { HeroMedia } from "@/components/hero-media/hero-media";
import { Starfield } from "@/components/starfield/starfield";
import type { BackgroundMedia } from "@/content/media";
import styles from "./page-hero.module.css";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Optional photo or video behind the header. */
  media?: BackgroundMedia;
  children?: ReactNode;
};

/** The standard header for every page other than the home page. */
export function PageHero({ eyebrow, title, lede, media, children }: PageHeroProps) {
  return (
    <header className={`band-dark ${styles.hero}`}>
      {media ? <HeroMedia media={media} intensity={0.45} priority /> : <Starfield density={70} />}
      {!media && <Constellation className={styles.constellation} animated={false} />}

      <div className="shell">
        <div className={styles.inner}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {lede && <p className={styles.lede}>{lede}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
