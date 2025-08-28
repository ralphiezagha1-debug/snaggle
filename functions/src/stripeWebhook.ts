import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { defineString } from 'firebase-functions/params';
import express from "express";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// It is recommended to store secrets in environment variables
const stripeSecretKey = defineString('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineString('STRIPE_WEBHOOK_SECRET');

// Safe init
if (admin.apps.length === 0) { admin.initializeApp(); }

const stripe = new Stripe(stripeSecretKey.value(), { apiVersion: '2023-10-16' });
const db = getFirestore();

const app = express();

// Use express.raw for the webhook endpoint
app.post('/', express.raw({ type: 'application/json' }), async (req: express.Request, res: express.Response) => {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    res.status(400).send('Webhook Error: Missing stripe-signature header');
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret.value());
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const credits = parseInt(session.metadata?.credits || '0', 10);

    if (userId && credits > 0) {
      const userRef = db.collection('users').doc(userId);
      const purchaseHistoryRef = userRef.collection('purchases');
      try {
        await db.runTransaction(async (transaction) => {
          transaction.set(userRef, {
            credits: FieldValue.increment(credits),
            updatedAt: FieldValue.serverTimestamp(),
          }, { merge: true });

          const newPurchaseRef = purchaseHistoryRef.doc();
          transaction.set(newPurchaseRef, {
            createdAt: FieldValue.serverTimestamp(),
            credits,
            amount: session.amount_total, // in cents
            stripeCheckoutSessionId: session.id,
          });
        });
        console.log(`Successfully credited ${credits} to user ${userId}`);
      } catch (error) {
        console.error(`Failed to credit user ${userId}`, error);
        // You might want to handle this error, e.g., by sending an alert
      }
    }
  }

  res.status(200).json({ received: true });
});

export const stripeWebhook = onRequest(app);
