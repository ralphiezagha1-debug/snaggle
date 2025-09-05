"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
// functions/src/index.ts
const express_1 = __importDefault(require("express"));
const https_1 = require("firebase-functions/v2/https");
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("./config");
const mailer_1 = require("./lib/mailer");
// If you save waitlist emails in Firestore, uncomment these:
// import { getFirestore, FieldValue } from "firebase-admin/firestore";
// import { initializeApp } from "firebase-admin/app";
// initializeApp();
const app = (0, express_1.default)();
// JSON for most routes; raw body specifically for webhook route (see below)
app.use("/stripe/webhook", express_1.default.raw({ type: "application/json" }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://snaggle.fun", "http://localhost:5173"],
    credentials: true,
}));
// --- HEALTH ---
app.get("/health", (_req, res) => res.status(200).send("ok"));
// --- WAITLIST ---
app.post("/waitlist", async (req, res) => {
    try {
        const email = String(req.body?.email || "").trim().toLowerCase();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!ok)
            return res.status(400).json({ ok: false, error: "invalid_email" });
        // Secrets at runtime
        const apiKey = config_1.SENDGRID_API_KEY.value();
        const from = config_1.MAIL_FROM.value();
        const admin = config_1.MAIL_ADMIN.value();
        (0, mailer_1.setSendgridKeyOnce)(apiKey);
        // OPTIONAL: Save to Firestore
        // const db = getFirestore();
        // await db.collection("waitlist").doc(email).set(
        //   { email, createdAt: FieldValue.serverTimestamp() },
        //   { merge: true }
        // );
        await (0, mailer_1.sendUserConfirmation)(from, email);
        await (0, mailer_1.sendAdminNotification)(from, admin, email);
        return res.json({ ok: true });
    }
    catch (err) {
        console.error("waitlist error:", err);
        return res.status(500).json({ ok: false, error: "internal" });
    }
});
// --- STRIPE CHECKOUT (example) ---
app.post("/checkout", async (req, res) => {
    try {
        const stripe = new stripe_1.default(config_1.STRIPE_SECRET_KEY.value(), { apiVersion: "2024-06-20" });
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: req.body.line_items,
            success_url: "https://snaggle.fun/success",
            cancel_url: "https://snaggle.fun/cancel",
        });
        res.json({ id: session.id });
    }
    catch (err) {
        console.error("checkout error:", err);
        res.status(500).json({ error: "stripe_checkout_failed" });
    }
});
// --- STRIPE WEBHOOK ---
app.post("/stripe/webhook", (req, res) => {
    try {
        const stripe = new stripe_1.default(config_1.STRIPE_SECRET_KEY.value(), { apiVersion: "2024-06-20" });
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, // raw body because of express.raw above
        sig, config_1.STRIPE_WEBHOOK_SECRET.value());
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
    }
    catch (err) {
        console.error("webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
});
// Export ONE functions endpoint with declared secrets
exports.api = (0, https_1.onRequest)({
    region: "us-central1",
    // Declare every secret your routes access
    secrets: [
        config_1.SENDGRID_API_KEY,
        config_1.MAIL_FROM,
        config_1.MAIL_ADMIN,
        config_1.STRIPE_SECRET_KEY,
        config_1.STRIPE_WEBHOOK_SECRET,
    ],
    // Optional: increase timeout/memory if you need it
    // timeoutSeconds: 60,
    // memory: "256MiB",
}, app);
