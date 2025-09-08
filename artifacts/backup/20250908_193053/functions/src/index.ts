// functions/src/index.ts
import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import cors from "cors";
import Stripe from "stripe";

import {
  SENDGRID_API_KEY,
  MAIL_FROM,
  MAIL_ADMIN,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
} from "./config";

import { setSendgridKeyOnce, sendUserConfirmation, sendAdminNotification } from "./lib/mailer";
// If you save waitlist emails in Firestore, uncomment these:
// import { getFirestore, FieldValue } from "firebase-admin/firestore";
// import { initializeApp } from "firebase-admin/app";
// initializeApp();

const app = express();

// JSON for most routes; raw body specifically for webhook route (see below)
app.use("/stripe/webhook", express.raw({ type: "application/json" }) as any);
app.use(express.json());
app.use(
  cors({
    origin: ["https://snaggle.fun", "http://localhost:5173"],
    credentials: true,
  })
);

// --- HEALTH ---
app.get("/health", (_req, res) => res.status(200).send("ok"));

// --- WAITLIST ---
app.post("/waitlist", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) return res.status(400).json({ ok: false, error: "invalid_email" });

    // Secrets at runtime
    const apiKey = SENDGRID_API_KEY.value();
    const from = MAIL_FROM.value();
    const admin = MAIL_ADMIN.value();

    setSendgridKeyOnce(apiKey);

    // OPTIONAL: Save to Firestore
    // const db = getFirestore();
    // await db.collection("waitlist").doc(email).set(
    //   { email, createdAt: FieldValue.serverTimestamp() },
    //   { merge: true }
    // );

    await sendUserConfirmation(from, email);
    await sendAdminNotification(from, admin, email);

    return res.json({ ok: true });
  } catch (err: any) {
    console.error("waitlist error:", err);
    return res.status(500).json({ ok: false, error: "internal" });
  }
});

// --- STRIPE CHECKOUT (example) ---
app.post("/checkout", async (req, res) => {
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value(), { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: req.body.line_items,
      success_url: "https://snaggle.fun/success",
      cancel_url: "https://snaggle.fun/cancel",
    });

    res.json({ id: session.id });
  } catch (err: any) {
    console.error("checkout error:", err);
    res.status(500).json({ error: "stripe_checkout_failed" });
  }
});

// --- STRIPE WEBHOOK ---
app.post("/stripe/webhook", (req, res) => {
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY.value(), { apiVersion: "2024-06-20" });
    const sig = req.headers["stripe-signature"] as string;

    const event = stripe.webhooks.constructEvent(
      (req as any).body, // raw body because of express.raw above
      sig,
      STRIPE_WEBHOOK_SECRET.value()
    );

    // Handle events as needed
    switch (event.type) {
      case "checkout.session.completed":
        // TODO: fulfill purchase
        break;
      default:
        // noop
        break;
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error("webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Export ONE functions endpoint with declared secrets
export const api = onRequest(
  {
    region: "us-central1",
    // Declare every secret your routes access
    secrets: [
      SENDGRID_API_KEY,
      MAIL_FROM,
      MAIL_ADMIN,
      STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET,
    ],
    // Optional: increase timeout/memory if you need it
    // timeoutSeconds: 60,
    // memory: "256MiB",
  },
  app as any
);
