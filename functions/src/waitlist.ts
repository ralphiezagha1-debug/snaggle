import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import { sendWaitlistEmails } from "./waitlistEmail";

// Secrets (already set with `firebase functions:secrets:set ...`)
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM = defineSecret("MAIL_FROM");   // e.g. no-reply@snaggle.fun
const MAIL_ADMIN = defineSecret("MAIL_ADMIN"); // e.g. ralphiezagha1@gmail.com

// Helper: robustly parse body (JSON or urlencoded)
function readEmail(req: any): string | undefined {
  if (typeof req.body === "string") {
    try {
      const parsed = JSON.parse(req.body);
      return parsed?.email;
    } catch {
      // maybe x-www-form-urlencoded in string form — fall through
    }
  }
  if (req.body && typeof req.body === "object") {
    return req.body.email;
  }
  if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(req.body);
    return params.get("email") ?? undefined;
  }
  return undefined;
}

export const joinWaitlist = onRequest(
  {
    region: "us-central1",
    // If you want to set cpu/memory, you can add: cpu: 1, memory: "256MiB"
    cors: ["https://snaggle.fun", "http://localhost:5173"],
    secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const email = readEmail(req);

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ ok: false, error: "invalid_email" });
      return;
    }

    try {
      await sendWaitlistEmails(
        SENDGRID_API_KEY.value(),
        MAIL_FROM.value(),
        MAIL_ADMIN.value(),
        email
      );

      logger.info("Waitlist signup", { email });
      res.status(200).json({ ok: true });
    } catch (err: any) {
      logger.error("SendGrid failure", { err: err?.response?.body ?? err });
      res.status(500).json({ ok: false, error: "mail_failed" });
    }
  }
);
