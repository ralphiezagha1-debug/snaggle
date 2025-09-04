import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { getFirestore } from "firebase-admin/firestore";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import sgMail from "@sendgrid/mail";
import { getSecret } from "firebase-functions/params";

// Initialize firebase-admin (idempotent)
getApps().length ? getApp() : initializeApp();

const SENDGRID_API_KEY = getSecret("SENDGRID_API_KEY");
const MAIL_FROM = getSecret("MAIL_FROM");
const MAIL_ADMIN = getSecret("MAIL_ADMIN");

sgMail.setApiKey(SENDGRID_API_KEY.value());

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: ["https://snaggle.fun", "http://localhost:5173"],
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// --- Endpoint ---
app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body ?? {};

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  try {
    const db = getFirestore();
    await db.collection("waitlist").add({
      email,
      createdAt: new Date(),
    });

    // Confirmation email to user
    await sgMail.send({
      to: email,
      from: MAIL_FROM.value(),
      subject: "Welcome to Snaggle!",
      text: "Thanks for joining our waitlist. You’re on the list!",
    });

    // Notification email to admin
    await sgMail.send({
      to: MAIL_ADMIN.value(),
      from: MAIL_FROM.value(),
      subject: "New Waitlist Signup",
      text: `New signup: ${email}`,
    });

    return res.json({ ok: true });
  } catch (err) {
    logger.error("Error in waitlist signup:", err as Error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Health check
app.get("/health", (_req, res) => res.status(200).send("ok"));

export const waitlist = onRequest(app);
