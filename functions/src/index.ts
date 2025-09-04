import { onRequest } from "firebase-functions/v2/https";
import express from "express";

/** Simple health check (must return void) */
export const health = onRequest((_, res) => {
  res.status(200).send("ok");
});

export { waitlist } from "./waitlist";
export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";
