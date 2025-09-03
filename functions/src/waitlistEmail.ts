import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM = defineSecret("MAIL_FROM");
const MAIL_ADMIN = defineSecret("MAIL_ADMIN");

export const onWaitlistCreate = onDocumentCreated(
  {
    document: "waitlist/{docId}",
    region: "us-central1",
    retry: false,
    secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN],
  },
  async (event) => {
    const data = event.data?.data() as { email?: string } | undefined;
    const email = (data?.email || "").trim().toLowerCase();
    if (!email) return;

    sgMail.setApiKey(SENDGRID_API_KEY.value());

    const from = MAIL_FROM.value();
    const admin = MAIL_ADMIN.value();

    const userMsg = {
      to: email,
      from,
      subject: "You're on the Snaggle waitlist 🎉",
      text: "Thanks for joining the Snaggle waitlist! We’ll notify you as soon as we go live.",
      html: 
        <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
          <h2>Welcome to Snaggle 🎉</h2>
          <p>Thanks for joining the waitlist! We’ll email you as soon as we go live.</p>
          <p style="color:#6b7280;font-size:12px">If this wasn’t you, you can ignore this email.</p>
        </div>
      ,
    };

    const adminMsg = {
      to: admin,
      from,
      subject: "New waitlist signup",
      text: \New signup: \\,
      html: \<p>New waitlist signup: <strong>\</strong></p>\,
    };

    try { await sgMail.send(userMsg); } catch (err) { console.error("SendGrid user email failed", err); }
    try { await sgMail.send(adminMsg); } catch (err) { console.error("SendGrid admin email failed", err); }
  }
);
