// functions/src/lib/mailer.ts
import sgMail from "@sendgrid/mail";
import type { MailDataRequired } from "@sendgrid/helpers/classes/mail";

export function setSendgridKeyOnce(apiKey: string) {
  sgMail.setApiKey(apiKey);
}

export async function sendUserConfirmation(from: string, to: string) {
  const msg: MailDataRequired = {
    to,
    from,
    subject: "You’re on the Snaggle waitlist 🎉",
    text: "Thanks for joining the Snaggle waitlist! We’ll email you with early access and launch updates.",
    html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2>Welcome to Snaggle 🎉</h2>
      <p>Thanks for joining the waitlist! We’ll email you with early access and launch updates.</p>
    </div>`,
  };
  await sgMail.send(msg);
}

export async function sendAdminNotification(from: string, adminTo: string, userEmail: string) {
  const msg: MailDataRequired = {
    to: adminTo,
    from,
    subject: "New waitlist signup",
    text: `New waitlist email: ${userEmail}`,
    html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <strong>New waitlist signup:</strong> ${userEmail}
    </div>`,
  };
  await sgMail.send(msg);
}
