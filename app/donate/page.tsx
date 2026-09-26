import type { Metadata } from "next";

import { Accordion } from "@/components/accordion/accordion";
import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Ways to donate to Antares, FRC Team 6962, through Khan Lab School: check, employer matching, donor-advised funds, appreciated stock and in-kind gifts. All tax-deductible.",
};

export default function DonatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Donate"
        title="Every gift buys parts, hours and a place at the event"
        lede={`Donations to Antares go through ${site.legal.recipient}, a ${site.legal.status}, so they are tax-deductible. Tell us it is coming and we will make sure it reaches the team.`}
      >
        <div className="button-row">
          <a className="button button-primary" href={site.links.schoolGiving} target="_blank" rel="noopener noreferrer">
            Give online
          </a>
          <a className="button button-ghost" href={`mailto:${site.email.donate}`}>
            Email {site.email.donate}
          </a>
        </div>
      </PageHero>

      {/* -------------------------------------------------------------- */}
      {/* Families                                                        */}
      {/* -------------------------------------------------------------- */}
      <section className="section" data-tight>
        <div className="shell">
          <Reveal className={styles.familyCard}>
            <p className="eyebrow">Parents and families</p>
            <h2 className={styles.familyTitle}>Family giving is the base the season stands on</h2>
            <p className={styles.familyBody}>
              Corporate sponsorship is what makes an ambitious season possible, but family
              contributions are what make it dependable. They arrive early, they are not tied to a
              company&apos;s budget cycle, and they cover the unglamorous things: the replacement
              gearbox in week five, the meal on a competition Saturday, the registration deposit
              that has to be paid before anyone has seen the game.
            </p>
            <p className={styles.familyBody}>
              Gifts of any size help, and many employers will match them, which quietly doubles
              what a family can do. If your workplace has a matching program or a donor-advised
              fund, ask us and we will send you exactly what their portal needs.
            </p>
            <div className="button-row">
              <a className="button button-primary" href={`mailto:${site.email.donate}`}>
                Ask about matching
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
              <p className="eyebrow">Before you give</p>
              <h2 className={styles.title}>Two things that keep the gift on track</h2>
              <ol className={styles.checklist}>
                <li>
                  Write <strong>&ldquo;{site.legal.memo}&rdquo;</strong> in the memo or notes field.
                  Without it, the gift lands in the school&apos;s general fund.
                </li>
                <li>
                  Email <a href={`mailto:${site.email.donate}`}>{site.email.donate}</a> and{" "}
                  <a href={`mailto:${site.email.schoolGiving}`}>{site.email.schoolGiving}</a> with
                  the donor name, the amount, any expected employer match, and the method. That is
                  how we account for and allocate it correctly.
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
              </div>
            </Reveal>

            {/* ---------------------------------------------------------- */}
            {/* Ways to give                                                */}
            {/* ---------------------------------------------------------- */}
            <div className={styles.ways}>
              <h2 className={styles.waysTitle}>Ways to give</h2>

              <Accordion title="Online" summary="Card or ACH through the school" defaultOpen>
                <p>
                  Give through{" "}
                  <a href={site.links.schoolGiving} target="_blank" rel="noopener noreferrer">
                    Khan Lab School&apos;s donation page
                  </a>
                  , then note &ldquo;{site.legal.memo}&rdquo; in the designation or notes field.
                </p>
              </Accordion>

              <Accordion title="Check" summary="Payable to Khan Lab School">
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
                title="Employer matching and donor-advised funds"
                summary="Double a gift through your workplace"
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

              <Accordion title="Appreciated stock" summary="Often the most tax-efficient option">
                <p>
                  Email <a href={`mailto:${site.email.donate}`}>{site.email.donate}</a> and{" "}
                  <a href={`mailto:${site.email.schoolGiving}`}>{site.email.schoolGiving}</a> for
                  transfer instructions.
                </p>
              </Accordion>

              <Accordion title="In-kind donations" summary="Tools, machining, materials, expertise">
                <p>
                  Machine time, fabrication, tooling, materials and professional expertise are all
                  genuinely useful. Email{" "}
                  <a href={`mailto:${site.email.donate}`}>{site.email.donate}</a> to discuss what
                  you have in mind.
                </p>
              </Accordion>

              <Accordion title="Company sponsorship" summary="Partnership levels from $1,000">
                <p>
                  Companies and foundations usually sponsor rather than donate, which comes with
                  recognition at events, on apparel and on this website. See the{" "}
                  <a href="/sponsors#levels">2026-27 partnership levels</a>.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions"
        title="Not sure which route fits?"
        body="Email the team and a student will help you work out the simplest way to give, including whether your employer will match it."
        primary={{ href: `mailto:${site.email.donate}`, label: `Email ${site.email.donate}` }}
        secondary={{ href: "/sponsors/impact", label: "See where it goes" }}
      />
    </main>
  );
}
