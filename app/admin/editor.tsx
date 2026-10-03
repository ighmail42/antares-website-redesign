"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { contentFiles, fileById, type Collection, type Field } from "@/content/schema";
import { contentData, validateFile, type Problem } from "@/content/validate";
import { editUrl, rawUrl } from "@/lib/content-repo";
import { FieldInput, removeAtPath, setAtPath, type Path } from "./fields";
import styles from "./admin.module.css";

/** Lets a whole collection be rendered by the same component as a field. */
function asField(collection: Collection): Field {
  if (collection.kind === "value" && collection.field) {
    return { ...collection.field, label: collection.label };
  }
  return {
    name: collection.name,
    label: collection.label,
    kind: collection.kind === "value" ? "text" : collection.kind,
    fields: collection.fields,
    titleField: collection.titleField,
    itemNoun: collection.itemNoun,
    entryNoun: collection.entryNoun,
  };
}

type Draft = Record<string, Record<string, unknown>>;

/**
 * Drops optional fields the editor left blank, so adding a row does not write
 * a line of empty quotes into the file for every field nobody filled in.
 * Lists are always kept, because the code that renders them expects an array.
 */
function prune(value: unknown, fields: Field[]): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => prune(entry, fields));
  }
  if (value === null || typeof value !== "object") return value;

  const out: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    const field = fields.find((candidate) => candidate.name === key);
    const blank = entry === undefined || (typeof entry === "string" && entry.trim() === "");
    if (blank && field && !field.required) continue;

    if (field?.kind === "object" || field?.kind === "list") {
      out[key] = prune(entry, field.fields ?? []);
    } else {
      out[key] = entry;
    }
  }
  return out;
}

/** The file exactly as it should be committed. */
function serialiseFile(fileId: string, data: Record<string, unknown>): string {
  const file = fileById(fileId);
  const out: Record<string, unknown> = {};
  for (const collection of file.collections) {
    const value = data[collection.name];
    out[collection.name] =
      collection.kind === "list" || collection.kind === "object"
        ? prune(value, collection.fields ?? [])
        : value;
  }
  return `${JSON.stringify(out, null, 2)}\n`;
}

export function ContentEditor() {
  const [draft, setDraft] = useState<Draft>(() =>
    JSON.parse(JSON.stringify(contentData)) as Draft,
  );
  const [fileId, setFileId] = useState(contentFiles[0].id);
  const [collectionName, setCollectionName] = useState(contentFiles[0].collections[0].name);
  const [status, setStatus] = useState<string | null>(null);

  const file = contentFiles.find((entry) => entry.id === fileId) ?? contentFiles[0];
  const collection =
    file.collections.find((entry) => entry.name === collectionName) ?? file.collections[0];

  const original = useMemo(() => JSON.stringify(contentData[fileId], null, 2), [fileId]);
  const serialised = useMemo(() => serialiseFile(fileId, draft[fileId]), [draft, fileId]);
  const changed = serialised.trim() !== original.trim();

  const problems: Problem[] = useMemo(
    () => validateFile(fileId, draft[fileId]),
    [draft, fileId],
  );
  const errors = problems.filter((problem) => problem.severity === "error");

  /* Warn before closing the tab with unsaved edits. */
  useEffect(() => {
    const anyChanged = contentFiles.some(
      (entry) =>
        JSON.stringify(draft[entry.id]) !== JSON.stringify(contentData[entry.id]),
    );
    if (!anyChanged) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [draft]);

  const handleChange = useCallback(
    (path: Path, value: unknown) => {
      setDraft((current) => ({
        ...current,
        [fileId]: setAtPath(current[fileId], path, value) as Record<string, unknown>,
      }));
    },
    [fileId],
  );

  const handleRemove = useCallback(
    (path: Path) => {
      setDraft((current) => ({
        ...current,
        [fileId]: removeAtPath(current[fileId], path) as Record<string, unknown>,
      }));
    },
    [fileId],
  );

  const flash = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(null), 4000);
  };

  const copyFile = async () => {
    try {
      await navigator.clipboard.writeText(serialised);
      flash("Copied. Now open the file on GitHub, select everything, paste, and commit.");
    } catch {
      flash("Could not copy. Use Download instead.");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([serialised], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileId}.json`;
    link.click();
    URL.revokeObjectURL(url);
    flash(`Saved ${fileId}.json to your downloads.`);
  };

  const pullLatest = async () => {
    try {
      const response = await fetch(rawUrl(fileId), { cache: "no-store" });
      if (!response.ok) throw new Error(String(response.status));
      const latest = await response.json();
      setDraft((current) => ({ ...current, [fileId]: latest }));
      flash("Loaded the current version from GitHub. Any edits here were replaced.");
    } catch {
      flash("Could not reach GitHub. You may be offline.");
    }
  };

  const discard = () => {
    if (!confirm("Throw away your changes to this file?")) return;
    setDraft((current) => ({
      ...current,
      [fileId]: JSON.parse(JSON.stringify(contentData[fileId])),
    }));
  };

  return (
    <div className={styles.shell}>
      {/* ---- Which file and section ---------------------------------- */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Content</h2>
        {contentFiles.map((entry) => {
          const entryChanged =
            JSON.stringify(draft[entry.id]) !== JSON.stringify(contentData[entry.id]);
          const active = entry.id === fileId;
          return (
            <div key={entry.id} className={styles.navGroup}>
              <button
                type="button"
                className={styles.navFile}
                data-active={active || undefined}
                onClick={() => {
                  setFileId(entry.id);
                  setCollectionName(entry.collections[0].name);
                }}
              >
                {entry.label}
                {entryChanged && <span className={styles.dot} title="Unsaved changes" />}
              </button>
              {active && (
                <div className={styles.navCollections}>
                  {entry.collections.map((item) => (
                    <button
                      type="button"
                      key={item.name}
                      className={styles.navCollection}
                      data-active={item.name === collection.name || undefined}
                      onClick={() => setCollectionName(item.name)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </aside>

      {/* ---- The form ------------------------------------------------ */}
      <main className={styles.main}>
        <header className={styles.mainHead}>
          <h1 className={styles.mainTitle}>{collection.label}</h1>
          <p className={styles.mainDescription}>{collection.description}</p>
          {collection.shownOn && (
            <p className={styles.shownOn}>
              Appears on <strong>{collection.shownOn}</strong>
            </p>
          )}
        </header>

        <FieldInput
          field={asField(collection)}
          value={
            collection.kind === "value"
              ? draft[fileId]?.[collection.name]
              : draft[fileId]?.[collection.name]
          }
          path={[collection.name]}
          onChange={handleChange}
          onRemove={handleRemove}
        />
      </main>

      {/* ---- Problems and saving ------------------------------------- */}
      <aside className={styles.save}>
        <h2 className={styles.sidebarTitle}>Checks</h2>
        {problems.length === 0 ? (
          <p className={styles.ok}>Everything in this file looks right.</p>
        ) : (
          <ul className={styles.problems}>
            {problems.map((problem, index) => (
              <li key={index} data-severity={problem.severity}>
                <strong>{problem.where}</strong> {problem.message}
              </li>
            ))}
          </ul>
        )}

        <h2 className={styles.sidebarTitle}>Save your work</h2>
        {changed ? (
          <ol className={styles.steps}>
            <li>Copy the file.</li>
            <li>Open it on GitHub.</li>
            <li>Select everything in the box, paste, and commit.</li>
          </ol>
        ) : (
          <p className={styles.help}>No changes to this file yet.</p>
        )}

        <div className={styles.saveButtons}>
          <button type="button" className={styles.primary} disabled={!changed} onClick={copyFile}>
            Copy {fileId}.json
          </button>
          <a
            className={styles.secondary}
            href={editUrl(fileId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on GitHub
          </a>
          <button type="button" className={styles.secondary} disabled={!changed} onClick={downloadFile}>
            Download
          </button>
          <button type="button" className={styles.secondary} onClick={pullLatest}>
            Load latest
          </button>
          <button type="button" className={styles.secondary} disabled={!changed} onClick={discard}>
            Discard changes
          </button>
        </div>

        {errors.length > 0 && (
          <p className={styles.blocked}>
            This file has {errors.length} problem{errors.length === 1 ? "" : "s"}. You can still
            save, but the site will refuse to build until they are fixed.
          </p>
        )}

        {status && <p className={styles.status}>{status}</p>}

        <details className={styles.preview}>
          <summary>Preview {fileId}.json</summary>
          <pre>{serialised}</pre>
        </details>
      </aside>
    </div>
  );
}
