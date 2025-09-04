import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { configureSendgrid, sendAdminNotification, sendUserConfirmation } from "./lib/mailer";

// Initialize Admin SDK once
try {
  admin.app();
} catch {
  admin.initializeApp();
}

// Secrets (must be set via `firebase functions:secrets:set`)
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM = defineSecret("MAIL_FROM");
const MAIL_ADMIN = defineSecret("MAIL_ADMIN");

// Allowed origins for CORS
const ALLOWED_ORIGINS = new Set(["https://snaggle.fun", "http://localhost:5173"]);

// Simple RFC 5322-ish email regex (pragmatic)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$;

// Express app for middleware (CORS + rate limit)
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.has(origin)) return cb(null, true);
      return cb(new Error("CORS: origin not allowed"));
    },
    methods: ["POST", "OPTIONS"],
  })
);

// Basic rate limit: 5 requests / 60s per IP
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: "Too many requests, try again later." },
  })
);

app.options("/api/waitlist", (_req, res) => res.sendStatus(204));

app.post("/api/waitlist", async (req, res) => {
  const email: unknown = req.body?.email;
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  // Configure SendGrid using secrets injected by Functions
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.MAIL_FROM;
  const adminTo = process.env.MAIL_ADMIN;
  if (!apiKey || !from || !adminTo) {
    return res.status(500).json({ ok: false, error: "Missing mail configuration" });
  }
  configureSendgrid(apiKey);

  // Save to Firestore
  const db = admin.firestore();
  await db.collection("waitlist").add({ email, createdAt: Timestamp.now() });

  // Send emails (best-effort; if one fails we still attempt the other)
  try {
    await sendUserConfirmation(from, email);
  } catch (e) {
    console.error("sendUserConfirmation failed", e);
  }
  try {
    await sendAdminNotification(from, adminTo, email);
  } catch (e) {
    console.error("sendAdminNotification failed", e);
  }

  return res.status(200).json({ ok: true });
});

export const waitlist = onRequest(
  { secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN], region: "us-central1" },
  app
);
