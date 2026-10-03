/**
 * Training curriculum, grouped into the sections the training page renders as
 * collapsible panels.
 *
 * The lessons live in `content/data/training.json` and can be edited at
 * /admin, or by hand in that file.
 */

import data from "./data/training.json";

export type TrainingResource = {
  title: string;
  /** Link to a slide deck, document or video. */
  href?: string;
  /** One short line. Keep it under about 15 words. */
  description?: string;
  /** A YouTube video id renders an embedded player instead of a link. */
  youtubeId?: string;
};

export type TrainingSection = {
  id: string;
  title: string;
  /** One sentence describing the subject, shown in the collapsed state. */
  summary: string;
  intro?: string;
  resources: TrainingResource[];
  /** Shown instead of a resource list when the material is not published yet. */
  comingSoon?: string;
  /** Open this panel by default. */
  defaultOpen?: boolean;
};

export const trainingSections: TrainingSection[] = data.trainingSections;
