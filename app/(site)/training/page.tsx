import type { Metadata } from "next";

import { Accordion } from "@/components/accordion/accordion";
import { CtaBand } from "@/components/cta-band/cta-band";
import { PageHero } from "@/components/page-hero/page-hero";
import { Reveal } from "@/components/reveal/reveal";
import { trainingSections } from "@/content/training";
import { page } from "@/content/pages";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Training",
  description:
    "The training materials Antares uses to teach new students design, build, electrical, code, fabrication, marketing, business and outreach. Free for other teams to use.",
};

export default function TrainingPage() {
  const copy = page("training");

  return (
    <main>
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title ?? ""}
        lede={copy.hero.lede}
      />

      <section className="section">
        <div className="shell">
          <Reveal className={styles.jumpBar}>
            <span className={styles.jumpLabel}>Jump to</span>
            <ul className={styles.jumpList}>
              {trainingSections.map((section) => (
                <li key={section.id}>
                  <a className={styles.jumpLink} href={`#${section.id}`}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className={styles.sections}>
            {trainingSections.map((section, index) => (
              <Reveal key={section.id} delay={index * 50}>
                <Accordion
                  id={section.id}
                  title={section.title}
                  summary={section.summary}
                  meta={
                    section.resources.length > 0
                      ? `${section.resources.length} ${section.resources.length === 1 ? "lesson" : "lessons"}`
                      : "In progress"
                  }
                  defaultOpen={section.defaultOpen}
                >
                  {section.intro && <p className={styles.intro}>{section.intro}</p>}

                  {section.comingSoon ? (
                    <p className={styles.comingSoon}>{section.comingSoon}</p>
                  ) : (
                    <ul className={styles.resourceList}>
                      {section.resources.map((resource) => (
                        <li key={resource.title}>
                          {resource.youtubeId ? (
                            <div className={styles.video}>
                              <iframe
                                src={`https://www.youtube-nocookie.com/embed/${resource.youtubeId}`}
                                title={resource.title}
                                loading="lazy"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                              <div>
                                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                                {resource.description && (
                                  <p className={styles.resourceDescription}>{resource.description}</p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <a
                              className={styles.resource}
                              href={resource.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className={styles.resourceMain}>
                                <span className={styles.resourceTitle}>{resource.title}</span>
                                {resource.description && (
                                  <span className={styles.resourceDescription}>{resource.description}</span>
                                )}
                              </span>
                              <span className={styles.resourceArrow} aria-hidden="true">
                                &rarr;
                              </span>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </Accordion>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={copy.cta.eyebrow}
        title={copy.cta.title ?? ""}
        body={copy.cta.body ?? ""}
        primary={{ href: "/about", label: copy.cta.primaryCta ?? "" }}
        secondary={{ href: "/history", label: copy.cta.secondaryCta ?? "" }}
      />
    </main>
  );
}
