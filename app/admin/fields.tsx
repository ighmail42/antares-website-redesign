"use client";

import type { Field } from "@/content/schema";
import styles from "./admin.module.css";

export type Path = (string | number)[];

/** Returns a copy of `root` with `value` written at `path`. */
export function setAtPath(root: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value;

  const [head, ...rest] = path;

  if (typeof head === "number") {
    const list = Array.isArray(root) ? [...root] : [];
    list[head] = setAtPath(list[head], rest, value);
    return list;
  }

  const object = { ...((root as Record<string, unknown>) ?? {}) };
  object[head] = setAtPath(object[head], rest, value);
  return object;
}

/** Returns a copy of `root` with the entry at `path` removed. */
export function removeAtPath(root: unknown, path: Path): unknown {
  const parentPath = path.slice(0, -1);
  const last = path[path.length - 1];
  const parent = getAtPath(root, parentPath);

  if (typeof last === "number" && Array.isArray(parent)) {
    const list = parent.filter((_, index) => index !== last);
    return setAtPath(root, parentPath, list);
  }

  const object = { ...((parent as Record<string, unknown>) ?? {}) };
  delete object[last as string];
  return setAtPath(root, parentPath, object);
}

export function getAtPath(root: unknown, path: Path): unknown {
  return path.reduce<unknown>((value, key) => {
    if (value === null || value === undefined) return undefined;
    return (value as Record<string | number, unknown>)[key];
  }, root);
}

/** An empty row shaped like the schema, for the Add buttons. */
export function blankEntry(fields: Field[]): Record<string, unknown> {
  const entry: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.kind === "list" || field.kind === "stringList") entry[field.name] = [];
    else if (field.kind === "object") entry[field.name] = blankEntry(field.fields ?? []);
    else if (field.kind === "boolean") entry[field.name] = false;
    else if (field.kind === "number") entry[field.name] = undefined;
    else entry[field.name] = "";
  }
  return entry;
}

type ChangeHandler = (path: Path, value: unknown) => void;
type RemoveHandler = (path: Path) => void;

type FieldProps = {
  field: Field;
  value: unknown;
  path: Path;
  onChange: ChangeHandler;
  onRemove: RemoveHandler;
};

export function FieldInput({ field, value, path, onChange, onRemove }: FieldProps) {
  const id = path.join("-");

  /* ---- Groups of fields ------------------------------------------- */
  if (field.kind === "object") {
    return (
      <fieldset className={styles.group}>
        <legend className={styles.groupLegend}>{field.label}</legend>
        {field.help && <p className={styles.help}>{field.help}</p>}
        {(field.fields ?? []).map((child) => (
          <FieldInput
            key={child.name}
            field={child}
            value={(value as Record<string, unknown>)?.[child.name]}
            path={[...path, child.name]}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </fieldset>
    );
  }

  /* ---- A list of rows --------------------------------------------- */
  if (field.kind === "list") {
    const rows = Array.isArray(value) ? value : [];
    return (
      <fieldset className={styles.group}>
        <legend className={styles.groupLegend}>
          {field.label} <span className={styles.count}>{rows.length}</span>
        </legend>
        {field.help && <p className={styles.help}>{field.help}</p>}

        {rows.map((row, index) => {
          const title = field.titleField
            ? (row as Record<string, unknown>)?.[field.titleField]
            : undefined;
          return (
            <details className={styles.row} key={index}>
              <summary className={styles.rowSummary}>
                <span className={styles.rowTitle}>
                  {typeof title === "string" && title ? title : `Untitled ${field.itemNoun ?? "entry"}`}
                </span>
                <RowControls
                  index={index}
                  count={rows.length}
                  onMove={(to) => {
                    const next = [...rows];
                    const [moved] = next.splice(index, 1);
                    next.splice(to, 0, moved);
                    onChange(path, next);
                  }}
                  onDelete={() => onRemove([...path, index])}
                />
              </summary>
              <div className={styles.rowBody}>
                {(field.fields ?? []).map((child) => (
                  <FieldInput
                    key={child.name}
                    field={child}
                    value={(row as Record<string, unknown>)?.[child.name]}
                    path={[...path, index, child.name]}
                    onChange={onChange}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </details>
          );
        })}

        <button
          type="button"
          className={styles.addButton}
          onClick={() => onChange(path, [...rows, blankEntry(field.fields ?? [])])}
        >
          Add {field.itemNoun ?? "entry"}
        </button>
      </fieldset>
    );
  }

  /* ---- A list of plain lines -------------------------------------- */
  if (field.kind === "stringList") {
    const entries = Array.isArray(value) ? (value as string[]) : [];
    return (
      <fieldset className={styles.group}>
        <legend className={styles.groupLegend}>
          {field.label} <span className={styles.count}>{entries.length}</span>
        </legend>
        {field.help && <p className={styles.help}>{field.help}</p>}

        {entries.map((entry, index) => (
          <div className={styles.lineRow} key={index}>
            <input
              className={styles.input}
              value={entry}
              onChange={(event) => onChange([...path, index], event.target.value)}
            />
            <RowControls
              index={index}
              count={entries.length}
              onMove={(to) => {
                const next = [...entries];
                const [moved] = next.splice(index, 1);
                next.splice(to, 0, moved);
                onChange(path, next);
              }}
              onDelete={() => onRemove([...path, index])}
            />
          </div>
        ))}

        <button type="button" className={styles.addButton} onClick={() => onChange(path, [...entries, ""])}>
          Add {field.entryNoun ?? "line"}
        </button>
      </fieldset>
    );
  }

  /* ---- Single values ---------------------------------------------- */
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {field.label}
        {field.required && <span className={styles.required}> required</span>}
      </label>
      {field.help && <p className={styles.help}>{field.help}</p>}

      {field.kind === "textarea" ? (
        <textarea
          id={id}
          className={`${styles.input} ${styles.textarea}`}
          rows={4}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(path, event.target.value)}
        />
      ) : field.kind === "select" ? (
        <select
          id={id}
          className={styles.input}
          value={(value as string) ?? ""}
          onChange={(event) => onChange(path, event.target.value)}
        >
          <option value="">Choose one</option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.kind === "boolean" ? (
        <label className={styles.checkboxRow}>
          <input
            id={id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onChange(path, event.target.checked)}
          />
          <span>Yes</span>
        </label>
      ) : field.kind === "number" ? (
        <input
          id={id}
          className={styles.input}
          type="number"
          value={value === undefined || value === null ? "" : String(value)}
          placeholder={field.placeholder}
          onChange={(event) =>
            onChange(path, event.target.value === "" ? undefined : Number(event.target.value))
          }
        />
      ) : (
        <input
          id={id}
          className={styles.input}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(path, event.target.value)}
        />
      )}
    </div>
  );
}

function RowControls({
  index,
  count,
  onMove,
  onDelete,
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  onDelete: () => void;
}) {
  const stop = (event: React.MouseEvent) => event.preventDefault();

  return (
    <span className={styles.rowControls}>
      <button
        type="button"
        title="Move up"
        disabled={index === 0}
        onClick={(event) => {
          stop(event);
          onMove(index - 1);
        }}
      >
        &uarr;
      </button>
      <button
        type="button"
        title="Move down"
        disabled={index === count - 1}
        onClick={(event) => {
          stop(event);
          onMove(index + 1);
        }}
      >
        &darr;
      </button>
      <button
        type="button"
        title="Delete"
        className={styles.deleteButton}
        onClick={(event) => {
          stop(event);
          if (confirm("Delete this entry?")) onDelete();
        }}
      >
        &times;
      </button>
    </span>
  );
}
