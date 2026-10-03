"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { asset } from "@/lib/asset";
import type { Sponsor, SponsorTier } from "@/content/sponsors";
import styles from "./page.module.css";

type Opened = { sponsor: Sponsor; tier: SponsorTier } | null;

/**
 * The sponsor logos, grouped by tier. Clicking one opens a panel with what the
 * company does and how they support the team.
 */
export function SponsorWall({ tiers }: { tiers: SponsorTier[] }) {
  const [opened, setOpened] = useState<Opened>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => setOpened(null), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (opened && !dialog.open) dialog.showModal();
    if (!opened && dialog.open) dialog.close();
  }, [opened]);

  return (
    <>
      {tiers.map((tier) => (
        <div key={tier.id} className={styles.tier}>
          <div className={styles.tierHead}>
            <h3 className={styles.tierName}>{tier.name}</h3>
            <p className={styles.tierBlurb}>{tier.blurb}</p>
          </div>

          <ul className={styles.logoGrid} data-tier={tier.id}>
            {tier.sponsors.map((sponsor) => (
              <li key={sponsor.name}>
                <button
                  type="button"
                  className={styles.logoCell}
                  onClick={() => setOpened({ sponsor, tier })}
                  aria-label={`About ${sponsor.name}`}
                >
                  {sponsor.logo ? (
                    <Image
                      className={styles.logo}
                      src={asset(sponsor.logo)}
                      alt={sponsor.name}
                      width={sponsor.width ?? 200}
                      height={sponsor.height ?? 60}
                    />
                  ) : (
                    <span className={styles.textSponsor}>{sponsor.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Clicking the backdrop closes it; the inner div stops that bubbling. */}
      <dialog ref={dialogRef} className={styles.dialog} onClose={close} onClick={close}>
        {opened && (
          <div className={styles.dialogInner} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.dialogClose} onClick={close} aria-label="Close">
              &times;
            </button>

            <div className={styles.dialogLogo}>
              {opened.sponsor.logo ? (
                <Image
                  src={asset(opened.sponsor.logo)}
                  alt={opened.sponsor.name}
                  width={opened.sponsor.width ?? 200}
                  height={opened.sponsor.height ?? 60}
                />
              ) : (
                <span className={styles.textSponsor}>{opened.sponsor.name}</span>
              )}
            </div>

            <p className={styles.dialogTier}>
              {opened.tier.name} partner
              {opened.sponsor.since ? ` · since ${opened.sponsor.since}` : ""}
            </p>
            <h2 className={styles.dialogName}>{opened.sponsor.name}</h2>

            {opened.sponsor.description && <p>{opened.sponsor.description}</p>}

            {opened.sponsor.relationship ? (
              <>
                <h3 className={styles.dialogHeading}>With Antares</h3>
                <p>{opened.sponsor.relationship}</p>
              </>
            ) : (
              <p className={styles.dialogFallback}>{opened.tier.blurb}</p>
            )}

            {opened.sponsor.href && (
              <a
                className={`button button-ghost ${styles.dialogLink}`}
                href={opened.sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {opened.sponsor.name}
              </a>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
