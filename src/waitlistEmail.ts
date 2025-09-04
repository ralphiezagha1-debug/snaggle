/**
 * Waitlist email builder (no Node-only APIs, CI-safe)
 */
export interface WaitlistEmailInput {
  to: string;
  from?: string;
  subject?: string;
}

export interface MailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

// Read from Vite env if present; fallback to default.
const DEFAULT_FROM = ((import.meta as any)?.env?.VITE_MAIL_FROM ?? "no-reply@snaggle.fun") as string;
const DEFAULT_SUBJECT = "Welcome to the Snaggle waitlist";

export function buildWaitlistEmail(input: WaitlistEmailInput): MailPayload {
  const to = input.to.trim();
  const from = (input.from || DEFAULT_FROM).trim();
  const subject = input.subject || DEFAULT_SUBJECT;

  const text = "Thanks for joining the Snaggle waitlist!\n\nWe'll email you when your spot is ready.\n\n- Team Snaggle";

  // Use plain strings (no template backticks) to avoid any accidental parsing issues.
  const htmlParts: string[] = [];
  htmlParts.push('<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">');
  htmlParts.push('<h2>Thanks for joining the Snaggle waitlist</h2>');
  htmlParts.push('<p>We\'ll email you when your spot is ready.</p>');
  htmlParts.push('<p>- Team Snaggle</p>');
  htmlParts.push('</div>');
  const html = htmlParts.join('');

  return { to, from, subject, text, html };
}