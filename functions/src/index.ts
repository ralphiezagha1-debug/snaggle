import { onRequest } from "firebase-functions/v2/https";
import express, { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import sg from "@sendgrid/mail";
import { defineSecret } from "firebase-functions/params";

// --- init (safe at import time) ---
initializeApp();
const db = getFirestore();

// Secrets
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const MAIL_FROM = process.env.MAIL_FROM || "no-reply@snaggle.fun";
const MAIL_ADMIN = process.env.MAIL_ADMIN || "ralphiezagha1@gmail.com";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://snaggle.fun", "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);

// Basic rate limit
const limiter = rateLimit({
  windowMs: 60_000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health
app.get("/health", (_req: Request, res: Response) => res.status(200).send("ok"));

// Helper: validate email (simple)
function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Waitlist endpoint
app.post("/api/waitlist", async (req: Request, res: Response) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!validEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    // Save to Firestore
    await db.collection("waitlist").doc(email).set(
      {
        email,
        createdAt: Timestamp.now(),
      },
      { merge: true }
    );

    // Send emails via SendGrid
    const key = process.env.SENDGRID_API_KEY; // populated via secret at runtime
    if (key) {
      sg.setApiKey(key);

      const userMsg = {
        to: email,
        from: MAIL_FROM,
        subject: "You're on the Snaggle waitlist 🎉",
        text: "Thanks for joining the Snaggle waitlist!",
      };

      const adminMsg = {
        to: MAIL_ADMIN,
        from: MAIL_FROM,
        subject: "New waitlist signup",
        text: `Email: ${email}`,
      };

      await Promise.allSettled([sg.send(userMsg as any), sg.send(adminMsg as any)]);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Internal error" });
  }
});

// Export ONE https function that mounts the Express app
export const http = onRequest(
  {
    region: "us-central1",
    cors: false,
    secrets: [SENDGRID_API_KEY],
    invoker: "public",
  },
  app
);
