import { onRequest } from "firebase-functions/v2/https";
import express from "express";
// Keep a simple HTTP app alive for existing routing
const app = express();
app.get("/health", (_req, res) => res.status(200).send("ok"));
export const http = onRequest({ region: "us-central1" }, app);
// Existing function exports (make sure the files exist below)
export { placeBid } from "./placeBid.js";
export { createCheckoutSession } from "./createCheckoutSession.js";
export { stripeWebhook } from "./stripeWebhook.js";
export { waitlist } from "./waitlist.js";
// New auth trigger (SendGrid welcome/verify)
export { authOnCreate } from "./authOnCreate.js";
export { sendgridTestV2 } from './sendgridTestV2.js';
