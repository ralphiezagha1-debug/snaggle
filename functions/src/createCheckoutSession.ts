import Stripe from "stripe";
import { onRequest } from "firebase-functions/v2/https";
import type { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // Pin to the type your codebase expects
  apiVersion: "2022-11-15",
});

export const createCheckoutSession = onRequest(async (req: Request, res: Response) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        { price: process.env.STRIPE_PRICE_ID as string, quantity: 1 },
      ],
      success_url: "https://snaggle.fun/success",
      cancel_url: "https://snaggle.fun/cancel",
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error("createCheckoutSession error:", err);
    res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
});
