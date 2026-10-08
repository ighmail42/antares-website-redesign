import type { Metadata } from "next";
import Link from "next/link";

import { Accordion } from "@/components/accordion/accordion";
import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { site } from "@/content/site";
import { mailto } from "@/lib/mailto";
import { page } from "@/content/pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Ways to donate to Antares, FRC Team 6962, through Khan Lab School: check, employer matching, donor-advised funds, appreciated stock and in-kind gifts.",
};

export default function DonatePage() {
  const copy = page("donate");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={`Donations to Antares go through ${site.legal.recipient}, a ${site.legal.status}, which provides the donation acknowledgment. Tell us a gift is coming and we will make sure it reaches the team.`}
      >
        <div className="button-row">
          <a className="button button-primary" href={site.links.schoolGiving} target="_blank" rel="noopener noreferrer">
            {copy.hero.primaryCta}
          </a>
          <a
            className="button button-ghost"
            href={mailto({ to: site.email.donate, subject: site.email.subjects.donation })}
          >
            {copy.hero.secondaryCta} {site.email.donate}
          </a>
        </div>
      </PageHero>

      {/* -------------------------------------------------------------- */}
      {/* Families                                                        */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tight>
        <div className="shell">
          <Reveal className={styles.familyCard}>
            <p className="eyebrow">{copy.family.eyebrow}</p>
            <h2 className={styles.familyTitle}>{copy.family.title}</h2>
            <p className={styles.familyBody}>{copy.family.body}</p>
            <p className={styles.familyBody}>{copy.family.note}</p>
            <div className="button-row">
              <a
                className="button button-primary"
                href={mailto({ to: site.email.donate, subject: site.email.subjects.matching })}
              >
                {copy.family.primaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Before you give                                                 */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <div className={styles.layout}>
            <Reveal className={styles.intro}>
              <p className="eyebrow">{copy.checklist.eyebrow}</p>
              <h2 className={styles.title}>{copy.checklist.title}</h2>
              <ol className={styles.checklist}>
                <li>
                  Write <strong>&ldquo;{site.legal.memo}&rdquo;</strong> in the memo or notes field.
                  That makes it a restricted gift, which the school has to spend on Antares. Without
                  it, the gift goes to the school&apos;s general fund.
                </li>
                <li>
                  <a
                    href={mailto({
                      to: [site.email.donate, site.email.schoolGiving],
                      subject: site.email.subjects.giftNotice,
                      body: site.email.giftNoticeBody,
                    })}
                  >
                    Send us a note about the gift
                  </a>
                  . The link opens an email, already addressed to the team and the school&apos;s
                  giving office, with the details we need: donor name, amount, any expected
                  employer match, and the method. That is how we make sure it reaches Antares.
                </li>
              </ol>

              <div className={styles.legalBox}>
                <h3 className={styles.legalTitle}>Recipient details</h3>
                <p>
                  {site.legal.recipient}, {site.legal.status}
                  <br />
                  Federal tax ID {site.legal.ein}
                  <br />
                  {site.address.line2}, {site.address.line3}
                </p>
                <p className={styles.taxNote}>{site.legal.taxNote}</p>
              </div>
            </Reveal>

            {/* ---------------------------------------------------------- */}
            {/* Ways to give                                                */}
            {/* ---------------------------------------------------------- */}
            <div className={styles.ways}>
              <h2 className={styles.waysTitle}>{copy.ways.title}</h2>

              <Accordion title={copy.methodOnline.title ?? ""} summary={copy.methodOnline.note} defaultOpen>
                <p>
                  Give through{" "}
                  <a href={site.links.schoolGiving} target="_blank" rel="noopener noreferrer">
                    Khan Lab School&apos;s donation page
                  </a>
                  , then note &ldquo;{site.legal.memo}&rdquo; in the designation or notes field.
                </p>
              </Accordion>

              <Accordion title={copy.methodCheck.title ?? ""} summary={copy.methodCheck.note}>
                <ul className={styles.plainList}>
                  <li>
                    Payable to: <strong>{site.legal.recipient}</strong>
                  </li>
                  <li>
                    Memo: <strong>{site.legal.memo}</strong>
                  </li>
                  <li>
                    Mail to: {site.address.line1}, {site.address.line2}, {site.address.line3}, Attn:
                    Business Office
                  </li>
                </ul>
              </Accordion>

              <Accordion
                title={copy.methodMatching.title ?? ""}
                summary={copy.methodMatching.note}
              >
                <ul className={styles.plainList}>
                  <li>Ask your employer about their donation and matching procedures.</li>
                  <li>
                    Recipient: <strong>{site.legal.recipient}</strong> (Tax ID/EIN {site.legal.ein})
                  </li>
                  <li>
                    Always indicate <strong>{site.legal.memo}</strong> in the memo or notes.
                  </li>
                  <li>Volunteer-hour matching programs count too, if your employer offers one.</li>
                </ul>
              </Accordion>

              <Accordion title={copy.methodStock.title ?? ""} summary={copy.methodStock.note}>
                <p>
                  <a
                    href={mailto({
                      to: [site.email.donate, site.email.schoolGiving],
                      subject: site.email.subjects.stock,
                    })}
                  >
                    Email us for transfer instructions
                  </a>
                  .
                </p>
              </Accordion>

              <Accordion title={copy.methodInKind.title ?? ""} summary={copy.methodInKind.note}>
                <p>
                  Machine time, fabrication, tooling, materials and professional expertise are all
                  genuinely useful. Email{" "}
                  <a href={mailto({ to: site.email.donate, subject: site.email.subjects.inKind })}>
                    {site.email.donate}
                  </a>{" "}
                  to discuss what you have in mind.
                </p>
              </Accordion>

              <Accordion title={copy.methodSponsorship.title ?? ""} summary={copy.methodSponsorship.note}>
                <p>
                  Companies and foundations usually sponsor rather than donate, which comes with
                  recognition at events, on apparel and on this website. Because a sponsorship buys
                  something in return, it is not treated like a plain gift. See the{" "}
                  <Link href="/sponsors#levels">2026-27 partnership tiers</Link>.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{
          href: mailto({ to: site.email.donate, subject: site.email.subjects.donation }),
          label: `Email ${site.email.donate}`,
        }}
        secondary={{ href: "/sponsors/impact", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
