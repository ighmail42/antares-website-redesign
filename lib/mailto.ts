/**
 * Builds `mailto:` links with the subject, recipients and body filled in.
 *
 * Every email link on the site goes through here so the team knows what an
 * arriving message is about before opening it, and so the gift notification
 * reaches both donate@ addresses in one click rather than relying on the
 * sender to add the second one.
 *
 * The wording lives in `content/data/site.json` under `email.subjects`, so it
 * is editable at /admin.
 */

type MailtoOptions = {
  /** One address, or several when a message has to reach all of them. */
  to: string | string[];
  subject?: string;
  body?: string;
};

export function mailto({ to, subject, body }: MailtoOptions): string {
  const recipients = (Array.isArray(to) ? to : [to]).join(",");

  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);

  /* URLSearchParams encodes a space as "+", which some mail clients show
     literally in the subject line. %20 is safe everywhere. */
  const query = params.toString().replace(/\+/g, "%20");

  return query ? `mailto:${recipients}?${query}` : `mailto:${recipients}`;
}
