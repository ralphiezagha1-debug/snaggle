import { onRequest } from "firebase-functions/v2/https";
import express from "express";

import { waitlist } from "./waitlist"; // <-- explicit import

/** Simple health check */
export const health = onRequest((_, res) => {
  res.status(200).send("ok");
});

export { waitlist };                            // <-- explicit export
export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";
