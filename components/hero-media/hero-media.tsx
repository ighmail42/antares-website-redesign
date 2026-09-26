import Image from "next/image";

import type { BackgroundMedia } from "@/content/media";
import styles from "./hero-media.module.css";

type HeroMediaProps = {
  media: BackgroundMedia;
  /** 0 to 1. Higher means the media shows through more strongly. */
  intensity?: number;
  priority?: boolean;
};

/**
 * Full-bleed background for a page header.
 *
 * Plays a muted, looping competition clip when `media.src` is set, and shows
 * the still poster otherwise. Either way a dark scrim sits on top so headline
 * text keeps its contrast.
 */
export function HeroMedia({ media, intensity = 0.4, priority = false }: HeroMediaProps) {
  return (
    <div className={styles.wrap} aria-hidden="true" style={{ "--media-opacity": intensity } as React.CSSProperties}>
      {media.src ? (
        <video
          className={styles.media}
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          className={styles.media}
          src={media.poster}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
        />
      )}
      <div className={styles.scrim} />
    </div>
  );
}
