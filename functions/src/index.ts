import { onRequest } from "firebase-functions/v2/https";
import express from "express";

const app = express();
app.get("/health", (_req: express.Request, res: express.Response) => res.status(200).send("ok"));
export const http = onRequest(app);

// Keep existing exports
export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";

// New export
export { joinWaitlist } from "./waitlist";