/** Waitlist email builder (web) */
export interface WaitlistEmailInput { to: string; from?: string; subject?: string; }
export interface MailPayload { to: string; from: string; subject: string; text: string; html: string; }

const DEFAULT_FROM = ((import.meta as any)?.env?.VITE_MAIL_FROM ?? "no-reply@snaggle.fun") as string;
const DEFAULT_SUBJECT = "Welcome to the Snaggle waitlist";

export function buildWaitlistEmail(input: WaitlistEmailInput): MailPayload {
  const to = input.to.trim();
  const from = (input.from || DEFAULT_FROM).trim();
  const subject = input.subject || DEFAULT_SUBJECT;

  const text =
    "Thanks for joining the Snaggle waitlist!\n\n" +
    "We'll email you when your spot is ready.\n\n" +
    "- Team Snaggle";

  const html =
    '<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">' +
    '<h2>Thanks for joining the Snaggle waitlist</h2>' +
    "<p>We'll email you when your spot is ready.</p>" +
    "<p>- Team Snaggle</p>" +
    "</div>";

  return { to, from, subject, text, html };
}