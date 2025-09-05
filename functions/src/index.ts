import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp } from "firebase-admin/app";
import { sendWaitlistEmails } from "./waitlistEmail";

// Import callable and other HTTP functions
export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";
export { sendTestMail } from "./mail";

// Secrets required for sending waitlist emails
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM = defineSecret("MAIL_FROM");
const MAIL_ADMIN = defineSecret("MAIL_ADMIN");

// Email validation regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Initialise firebase-admin once at runtime. Avoids hitting the network at module load time.
if (getApps().length === 0) {
  initializeApp();
}

// Create an Express app to handle our HTTP routes
const app = express();

// Configure CORS, JSON parsing and rate limiting
app.use(cors({ origin: ["https://snaggle.fun", "http://localhost:5173"] }));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 60_000, // 1 minute window
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health check route. Useful for monitoring and CI smoke tests.
app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

// Waitlist signup handler
app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body ?? {};
  // Validate that the email exists and matches our regex
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: "Invalid email" });
    return;
  }
  try {
    const db = getFirestore();
    // Record the waitlist entry with a server timestamp
    await db.collection("waitlist").add({ email, createdAt: new Date() });

    // Send confirmation to user and notification to admin
    await sendWaitlistEmails(
      SENDGRID_API_KEY.value(),
      MAIL_FROM.value(),
      MAIL_ADMIN.value(),
      email
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Waitlist error", err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Export a single HTTPS function that handles both /health and /api/waitlist
export const waitlist = onRequest(
  { secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] },
  (req, res) => app(req, res)
);