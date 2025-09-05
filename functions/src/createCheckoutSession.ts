import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getApps, initializeApp } from "firebase-admin/app";
import Stripe from "stripe";
import { defineString } from "firebase-functions/params";

// It is recommended to store secrets in environment variables
// You can do this by running:
// firebase functions:config:set stripe.secret="your_stripe_secret_key"
const stripeSecretKey = defineString("STRIPE_SECRET_KEY");

// Safe init
if (getApps().length === 0) {
  initializeApp();
}

const stripe = new Stripe(stripeSecretKey.value(), { apiVersion: "2023-10-16" });

type CreateCheckoutSessionData = {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
};

export const createCheckoutSession = onCall(async (request) => {
  const uid = request.auth?.uid;
  const { priceId, successUrl, cancelUrl } = (request.data ?? {}) as CreateCheckoutSessionData;

  if (!uid) {
    throw new HttpsError("unauthenticated", "You must be signed in to create a checkout session.");
  }

  if (!priceId || !successUrl || !cancelUrl) {
    throw new HttpsError("invalid-argument", "priceId, successUrl, and cancelUrl are required.");
  }

  const creditPacks = [
    { id: "price_1Hh1v5FqH6X5Yqj5J6X5Yqj5", credits: 50 },
    { id: "price_1Hh1v5FqH6X5Yqj5J6X5Yqj6", credits: 100 },
    { id: "price_1Hh1v5FqH6X5Yqj5J6X5Yqj7", credits: 250 },
  ];
  const pack = creditPacks.find((p) => p.id === priceId);
  if (!pack) {
    throw new HttpsError("invalid-argument", "Invalid priceId.");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Associate the checkout session with the user
      client_reference_id: uid,
      // We can pass metadata to the webhook
      metadata: {
        userId: uid,
        credits: pack.credits.toString(),
      },
    });

    return { sessionId: session.id };
  } catch (error: any) {
    console.error("Stripe error:", error);
    throw new HttpsError(
      "internal",
      "An error occurred while creating the checkout session.",
      error.message
    );
  }
});