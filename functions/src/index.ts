import { onRequest } from "firebase-functions/v2/https";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// CORS for local + prod
app.use(cors({
  origin: ["http://localhost:5173", "https://snaggle.fun"],
}));

app.get("/health", (_req: Request, res: Response) => res.status(200).send("ok"));

export const http = onRequest(app);

export { placeBid } from "./placeBid";
export { createCheckoutSession } from "./createCheckoutSession";
export { stripeWebhook } from "./stripeWebhook";
