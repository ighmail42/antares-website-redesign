/**
 * Checks the content files against the schema.
 *
 * The same code runs in two places: live in the editor at /admin, so an editor
 * sees a problem while they are still typing, and once during the build, so a
 * bad file fails CI instead of reaching the live site.
 */

import { contentFiles, type Collection, type Field } from "./schema";

import internal from "./data/internal.json";
import media from "./data/media.json";
import pages from "./data/pages.json";
import posts from "./data/posts.json";
import seasons from "./data/seasons.json";
import site from "./data/site.json";
import sponsors from "./data/sponsors.json";
import team from "./data/team.json";
import training from "./data/training.json";

export type Problem = {
  /** Human-readable location, e.g. "Seasons > 2026 > Summary". */
  where: string;
  message: string;
  severity: "error" | "warning";
};

export const contentData: Record<string, Record<string, unknown>> = {
  internal,
  media,
  pages,
  posts,
  seasons,
  site,
  sponsors,
  team,
  training,
};

const isBlank = (value: unknown) =>
  value === undefined || value === null || (typeof value === "string" && value.trim() === "");

function checkField(field: Field, value: unknown, where: string, problems: Problem[]): void {
  const at = `${where} > ${field.label}`;

  if (isBlank(value)) {
    if (field.required) {
      problems.push({ where: at, message: "is required but empty", severity: "error" });
    }
    return;
  }

  switch (field.kind) {
    case "number":
      if (typeof value !== "number" || !Number.isFinite(value)) {
        problems.push({ where: at, message: "must be a number", severity: "error" });
      }
      break;

    case "boolean":
      if (typeof value !== "boolean") {
        problems.push({ where: at, message: "must be true or false", severity: "error" });
      }
      break;

    case "select":
      if (!field.options?.includes(String(value))) {
        problems.push({
          where: at,
          message: `must be one of: ${field.options?.join(", ")}`,
          severity: "error",
        });
      }
      break;

    case "url":
      if (typeof value !== "string" || !/^(https?:\/\/|mailto:|\/)/.test(value)) {
        problems.push({
          where: at,
          message: "must start with https://, mailto: or / for a file in public/",
          severity: "error",
        });
      }
      break;

    case "image":
      if (typeof value !== "string" || !value.startsWith("/")) {
        problems.push({
          where: at,
          message: "must be a file in public/, written with a leading slash",
          severity: "error",
        });
      }
      break;

    case "stringList":
      if (!Array.isArray(value)) {
        problems.push({ where: at, message: "must be a list", severity: "error" });
      } else {
        value.forEach((entry, index) => {
          if (typeof entry !== "string" || entry.trim() === "") {
            problems.push({ where: `${at} > ${index + 1}`, message: "is empty", severity: "error" });
          }
        });
      }
      break;

    case "object":
      if (typeof value !== "object" || Array.isArray(value)) {
        problems.push({ where: at, message: "must be a group of fields", severity: "error" });
      } else {
        for (const child of field.fields ?? []) {
          checkField(child, (value as Record<string, unknown>)[child.name], at, problems);
        }
      }
      break;

    case "list":
      if (!Array.isArray(value)) {
        problems.push({ where: at, message: "must be a list", severity: "error" });
      } else {
        value.forEach((entry, index) => {
          const row = entry as Record<string, unknown>;
          const title = field.titleField ? row?.[field.titleField] : undefined;
          const label = typeof title === "string" && title ? title : `${index + 1}`;
          for (const child of field.fields ?? []) {
            checkField(child, row?.[child.name], `${at} > ${label}`, problems);
          }
        });
      }
      break;

    default:
      if (typeof value !== "string") {
        problems.push({ where: at, message: "must be text", severity: "error" });
      }
  }
}

function checkCollection(
  collection: Collection,
  value: unknown,
  fileLabel: string,
  problems: Problem[],
): void {
  const where = `${fileLabel} > ${collection.label}`;

  if (collection.kind === "value") {
    if (collection.field && !isBlank(value)) {
      checkField({ ...collection.field, label: collection.label }, value, fileLabel, problems);
    }
    return;
  }

  if (collection.kind === "stringList") {
    checkField(
      { name: collection.name, label: collection.label, kind: "stringList", entryNoun: collection.entryNoun },
      value,
      fileLabel,
      problems,
    );
    return;
  }

  if (collection.kind === "object") {
    if (typeof value !== "object" || value === null) {
      problems.push({ where, message: "is missing", severity: "error" });
      return;
    }
    for (const field of collection.fields ?? []) {
      checkField(field, (value as Record<string, unknown>)[field.name], where, problems);
    }
    return;
  }

  if (!Array.isArray(value)) {
    problems.push({ where, message: "is missing or is not a list", severity: "error" });
    return;
  }
  value.forEach((entry, index) => {
    const row = entry as Record<string, unknown>;
    const title = collection.titleField ? row?.[collection.titleField] : undefined;
    const label = typeof title === "string" && title ? title : `${index + 1}`;
    for (const field of collection.fields ?? []) {
      checkField(field, row?.[field.name], `${where} > ${label}`, problems);
    }
  });
}

/** Rules that span more than one field. */
function checkRules(data: Record<string, Record<string, unknown>>, problems: Problem[]): void {
  const seasonList = (data.seasons?.seasons ?? []) as { status?: string; year?: string }[];
  const current = seasonList.filter((season) => season.status === "current");
  if (current.length === 0) {
    problems.push({
      where: "Seasons",
      message: "no season is marked current, so the season page falls back to the newest one",
      severity: "warning",
    });
  } else if (current.length > 1) {
    problems.push({
      where: "Seasons",
      message: `${current.length} seasons are marked current (${current.map((s) => s.year).join(", ")}). Only one can be.`,
      severity: "error",
    });
  }

  const budget = (data.sponsors?.budgetBreakdown ?? []) as { percent?: number }[];
  if (budget.length > 0) {
    const total = budget.reduce((sum, line) => sum + (line.percent ?? 0), 0);
    if (Math.abs(total - 100) > 1) {
      problems.push({
        where: "Sponsors > Budget breakdown",
        message: `percentages add up to ${total}, not 100`,
        severity: "warning",
      });
    }
  }
}

/** Check one file's data. Used live by the editor. */
export function validateFile(fileId: string, data: Record<string, unknown>): Problem[] {
  const file = contentFiles.find((entry) => entry.id === fileId);
  if (!file) return [{ where: fileId, message: "unknown content file", severity: "error" }];

  const problems: Problem[] = [];
  for (const collection of file.collections) {
    checkCollection(collection, data[collection.name], file.label, problems);
  }
  return problems;
}

/** Check everything. Used by the build. */
export function validateAll(
  data: Record<string, Record<string, unknown>> = contentData,
): Problem[] {
  const problems: Problem[] = [];
  for (const file of contentFiles) {
    for (const collection of file.collections) {
      checkCollection(collection, data[file.id]?.[collection.name], file.label, problems);
    }
  }
  checkRules(data, problems);
  return problems;
}

/**
 * Called once from the root layout, so a malformed content file stops the
 * build rather than reaching the live site.
 */
export function assertContentValid(): void {
  const problems = validateAll();
  const errors = problems.filter((problem) => problem.severity === "error");
  const warnings = problems.filter((problem) => problem.severity === "warning");

  for (const warning of warnings) {
    console.warn(`Content warning: ${warning.where} ${warning.message}`);
  }

  if (errors.length > 0) {
    const lines = errors.map((error) => `  - ${error.where} ${error.message}`).join("\n");
    throw new Error(`Content has ${errors.length} problem(s):\n${lines}`);
  }
}
