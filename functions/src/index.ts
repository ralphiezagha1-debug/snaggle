import { onRequest } from "firebase-functions/v2/https";
import express from "express";

// Keep a simple HTTP app alive for existing routing
const app = express();
app.get("/health", (_req, res) => res.status(200).send("ok"));
export const http = onRequest({ region: "us-central1" }, app);

// Existing function exports (make sure the files exist below)
export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";
export { waitlist } from "./waitlist";

// New auth trigger (SendGrid welcome/verify)
export { authOnCreate } from "./authOnCreate";





export { sendgridTestV2 } from './sendgridTestV2';

