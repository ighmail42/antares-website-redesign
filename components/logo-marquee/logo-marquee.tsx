import Image from "next/image";

import type { Sponsor } from "@/content/sponsors";
import styles from "./logo-marquee.module.css";

type LogoMarqueeProps = {
  sponsors: Sponsor[];
  /** Seconds for one full pass. Longer is calmer. */
  speed?: number;
};

/**
 * A slow, continuous strip of sponsor logos.
 *
 * The list is rendered twice so the animation can loop seamlessly; the second
 * copy is hidden from assistive technology. The strip stops on hover and for
 * readers who prefer reduced motion.
 */
export function LogoMarquee({ sponsors, speed = 46 }: LogoMarqueeProps) {
  const withLogos = sponsors.filter((sponsor) => sponsor.logo);

  return (
    <div className={styles.viewport}>
      <div className={styles.track} style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}>
        {[0, 1].map((copy) => (
          <ul className={styles.row} key={copy} aria-hidden={copy === 1 || undefined}>
            {withLogos.map((sponsor) => (
              <li className={styles.item} key={`${copy}-${sponsor.name}`}>
                <Image
                  className={styles.logo}
                  src={sponsor.logo as string}
                  alt={copy === 0 ? sponsor.name : ""}
                  width={sponsor.width ?? 200}
                  height={sponsor.height ?? 60}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
