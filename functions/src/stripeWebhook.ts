import { onRequest } from "firebase-functions/v2/https";

/** Temporary stub; replace with real logic */
export const stripeWebhook = onRequest((_req, res) => {
  // Stripe expects 2xx to consider delivery successful
  res.status(200).send("stripeWebhook stub");
});
