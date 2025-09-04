import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { getFirestore } from "firebase-admin/firestore";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import sgMail from "@sendgrid/mail";
import { defineSecret } from "firebase-functions/params";

// Init firebase-admin once
getApps().length ? getApp() : initializeApp();

// Secrets
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM        = defineSecret("MAIL_FROM");
const MAIL_ADMIN       = defineSecret("MAIL_ADMIN");

// Email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Express app
const app = express();

// CORS + JSON + rate limit
app.use(cors({ origin: ["https://snaggle.fun", "http://localhost:5173"] }));
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false }));

// Routes
app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body ?? {};
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  try {
    // Configure SendGrid per-request (secret access happens at runtime)
    sgMail.setApiKey(SENDGRID_API_KEY.value());

    const db = getFirestore();
    await db.collection("waitlist").add({ email, createdAt: new Date() });

    // User confirmation
    await sgMail.send({
      to: email,
      from: MAIL_FROM.value(),
      subject: "Welcome to Snaggle!",
      text: "Thanks for joining our waitlist. You’re on the list!",
    });

    // Admin notification
    await sgMail.send({
      to: MAIL_ADMIN.value(),
      from: MAIL_FROM.value(),
      subject: "New Waitlist Signup",
      text: `New signup: ${email}`,
    });

    return res.json({ ok: true });
  } catch (err) {
    logger.error("Waitlist error", err as Error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Health
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Export with secrets so Functions can mount them
export const waitlist = onRequest(
  { secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] },
  (req, res) => app(req, res)
);
