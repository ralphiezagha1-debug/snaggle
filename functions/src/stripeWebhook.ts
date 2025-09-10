import Stripe from "stripe";
import { onRequest } from "firebase-functions/v2/https";
import type { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export const stripeWebhook = onRequest({ maxInstances: 1 }, async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  if (!sig || typeof sig !== "string") return res.status(400).send("Missing signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message);
    return res.status(400).send(`Webhook Error: ${err?.message}`);
  }

  // Handle events as needed
  switch (event.type) {
    case "checkout.session.completed":
      // TODO: fulfill the order, etc.
      break;
    default:
      // no-op
      break;
  }

  res.json({ received: true });
});
