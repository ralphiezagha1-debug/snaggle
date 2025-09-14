// functions/src/lib/mailer.ts
import sgMail from "@sendgrid/mail";
export function setSendgridKeyOnce(apiKey) {
    sgMail.setApiKey(apiKey);
}
export async function sendUserConfirmation(from, to) {
    const msg = {
        to,
        from,
        subject: "Youâ€™re on the Snaggle waitlist ðŸŽ‰",
        text: "Thanks for joining the Snaggle waitlist! Weâ€™ll email you with early access and launch updates.",
        html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2>Welcome to Snaggle ðŸŽ‰</h2>
      <p>Thanks for joining the waitlist! Weâ€™ll email you with early access and launch updates.</p>
    </div>`,
    };
    await sgMail.send(msg);
}
export async function sendAdminNotification(from, adminTo, userEmail) {
    const msg = {
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
