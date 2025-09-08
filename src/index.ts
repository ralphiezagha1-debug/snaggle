import { onRequest } from "firebase-functions/v2/https";

// Configure secrets for Stripe and mail; these will be injected via Firebase Secrets Manager
const API_SECRETS = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "SENDGRID_API_KEY",
  "MAIL_FROM",
  "MAIL_ADMIN",
];

/** Simple health check (must return void) */
export const health = onRequest({ secrets: API_SECRETS }, (_, res) => {
  res.status(200).send("ok");
});

export { waitlist } from "./waitlist";
export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";
