// functions/src/mail.ts
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM = defineSecret("MAIL_FROM");
const MAIL_ADMIN = defineSecret("MAIL_ADMIN");

/**
 * Simple endpoint to verify SendGrid secrets. This function sends a test
 * email to the configured administrator address when invoked.
 */
export const sendTestMail = onRequest(
  { secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] },
  async (_req, res) => {
    sgMail.setApiKey(SENDGRID_API_KEY.value());

    await sgMail.send({
      to: MAIL_ADMIN.value(),
      from: MAIL_FROM.value(),
      subject: "Snaggle SendGrid Test",
      text: "If you got this, SendGrid secrets are working!",
    });

    res.send("✅ Test email sent");
  }
);