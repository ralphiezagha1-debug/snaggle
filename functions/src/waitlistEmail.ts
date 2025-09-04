import sgMail from "@sendgrid/mail";

/**
 * Sends both the user confirmation and the admin notification emails.
 */
export async function sendWaitlistEmails(
  apiKey: string,
  from: string,
  adminTo: string,
  userEmail: string
): Promise<void> {
  sgMail.setApiKey(apiKey);

  // User confirmation
  await sgMail.send({
    to: userEmail,
    from,
    subject: "You’re on the Snaggle waitlist 🎉",
    text:
      "Thanks for joining the Snaggle waitlist! We’ll email you with early access and launch updates.",
    html: `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2>Welcome to <span style="color:#16ff00">Snaggle</span> 🎉</h2>
        <p>Thanks for joining the waitlist! We’ll email you with early access and launch updates.</p>
      </div>
    `,
  });

  // Admin notification
  await sgMail.send({
    to: adminTo,
    from,
    subject: "New waitlist signup",
    text: `New waitlist email: ${userEmail}`,
    html: `<p>New waitlist signup: <strong>${userEmail}</strong></p>`,
  });
}
