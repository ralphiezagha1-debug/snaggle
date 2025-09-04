import { MailDataRequired, setApiKey, send } from "@sendgrid/mail";

/**
 * Sends a confirmation email to the user.
 */
export async function sendUserConfirmation(from: string, to: string) {
  const msg: MailDataRequired = {
    to,
    from,
    subject: "You’re on the Snaggle waitlist 🎉",
    text:
      "Thanks for joining the Snaggle waitlist! We’ll email you with early access and launch updates.",
    html: `<div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5\">
      <h2>Welcome to Snaggle 🎉</h2>
      <p>Thanks for joining the waitlist! We’ll email you with early access and launch updates.</p>
    </div>`,
  };
  await send(msg);
}

/**
 * Notifies the admin that a new email was added to the waitlist.
 */
export async function sendAdminNotification(from: string, adminTo: string, userEmail: string) {
  const msg: MailDataRequired = {
    to: adminTo,
    from,
    subject: "New waitlist signup",
    text: `New waitlist email: ${userEmail}`,
    html: `<div style=\"font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5\">
      <p><strong>New waitlist signup:</strong> ${userEmail}</p>
    </div>`,
  };
  await send(msg);
}

/**
 * Helper to set the SendGrid API key once per invocation.
 */
export function configureSendgrid(apiKey: string) {
  setApiKey(apiKey);
}
