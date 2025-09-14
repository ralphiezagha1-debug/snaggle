import sgMail from "@sendgrid/mail";

/**
 * Sends both the user confirmation and the admin notification emails.
 *
 * @param apiKey   SendGrid API key to authenticate the client
 * @param from     The sender address (e.g. noâ€‘reply@snaggle.fun)
 * @param adminTo  The administrator address to notify of new signups
 * @param userEmail The new waitlist member's email address
 */
export async function sendWaitlistEmails(
  apiKey: string,
  from: string,
  adminTo: string,
  userEmail: string
): Promise<void> {
  // Initialise the API key on every call to avoid retaining secrets at module load time
  sgMail.setApiKey(apiKey);

  // Send confirmation email to the user
  await sgMail.send({
    to: userEmail,
    from,
    subject: "Youâ€™re on the Snaggle waitlist ðŸŽ‰",
    text:
      "Thanks for joining the Snaggle waitlist! Weâ€™ll email you with early access and launch updates.",
    html: `
      <p>Welcome to Snaggle ðŸŽ‰</p>
      <p>Thanks for joining the waitlist! Weâ€™ll email you with early access and launch updates.</p>
    `,
  });

  // Send notification email to the administrator
  await sgMail.send({
    to: adminTo,
    from,
    subject: "New waitlist signup",
    text: `New waitlist email: ${userEmail}`,
    html: `<p>New waitlist signup: ${userEmail}</p>`,
  });
}

