import type { Route } from "next";

/**
 * The single list of header links. Add a route here when it should appear in
 * the header and the footer.
 */
export const siteNavigation: { href: Route; label: string }[] = [
  { href: "/about" as Route, label: "About" },
  { href: "/season" as Route, label: "Season" },
  { href: "/history" as Route, label: "History" },
  { href: "/training" as Route, label: "Training" },
  { href: "/sponsors" as Route, label: "Sponsors" },
];

/** The header's call to action, kept separate so it can be styled as a button. */
export const primaryAction = { href: "/donate" as Route, label: "Donate" };

/** Links that only make sense to team members. Not in the main navigation. */
export const internalNavigation: { href: Route; label: string }[] = [
  { href: "/internal" as Route, label: "Team internal" },
];
