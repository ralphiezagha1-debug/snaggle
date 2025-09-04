import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { defineSecret } from "firebase-functions/params";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import sgMail from "@sendgrid/mail";

/** ---------- setup ---------- */
getApps().length ? getApp() : initializeApp();

const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM        = defineSecret("MAIL_FROM");
const MAIL_ADMIN       = defineSecret("MAIL_ADMIN");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** ---------- health ---------- */
export const health = onRequest((_, res) => {
  res.status(200).send("ok");
});

/** ---------- waitlist (Express app) ---------- */
const app = express();

app.use(cors({ origin: ["https://snaggle.fun", "http://localhost:5173"] }));
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false }));

app.get("/health", (_req, res) => res.status(200).send("ok"));

app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body ?? {};
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  try {
    // configure sendgrid using secret
    sgMail.setApiKey(SENDGRID_API_KEY.value());

    const db = getFirestore();
    await db.collection("waitlist").add({ email, createdAt: new Date() });

    await sgMail.send({
      to: email,
      from: MAIL_FROM.value(),
      subject: "Welcome to Snaggle!",
      text: "Thanks for joining our waitlist. You’re on the list!",
    });

    await sgMail.send({
      to: MAIL_ADMIN.value(),
      from: MAIL_FROM.value(),
      subject: "New Waitlist Signup",
      text: `New signup: ${email}`,
    });

    return res.json({ ok: true });
  } catch (err) {
    logger.error("waitlist error", err as Error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Export the Express app as a v2 onRequest function WITH secrets declared
export const waitlist = onRequest(
  { secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] },
  (req, res) => app(req, res)
);
