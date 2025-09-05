"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const https_1 = require("firebase-functions/v2/https");
const app_1 = require("firebase-admin/app");
const stripe_1 = __importDefault(require("stripe"));
const params_1 = require("firebase-functions/params");
// It is recommended to store secrets in environment variables
// You can do this by running:
// firebase functions:config:set stripe.secret="your_stripe_secret_key"
const stripeSecretKey = (0, params_1.defineString)("STRIPE_SECRET_KEY");
// Safe init
if ((0, app_1.getApps)().length === 0) {
    (0, app_1.initializeApp)();
}
const stripe = new stripe_1.default(stripeSecretKey.value(), { apiVersion: "2023-10-16" });
exports.createCheckoutSession = (0, https_1.onCall)(async (request) => {
    const uid = request.auth?.uid;
    const { priceId, successUrl, cancelUrl } = (request.data ?? {});
    if (!uid) {
        throw new https_1.HttpsError("unauthenticated", "You must be signed in to create a checkout session.");
    }
    if (!priceId || !successUrl || !cancelUrl) {
        throw new https_1.HttpsError("invalid-argument", "priceId, successUrl, and cancelUrl are required.");
    }
    const creditPacks = [
        { id: "price_1Hh1v5FqH6X5Yqj5J6X5Yqj5", credits: 50 },
        { id: "price_1Hh1v5FqH6X5Yqj5J6X5Yqj6", credits: 100 },
        { id: "price_1Hh1v5FqH6X5Yqj5J6X5Yqj7", credits: 250 },
    ];
    const pack = creditPacks.find((p) => p.id === priceId);
    if (!pack) {
        throw new https_1.HttpsError("invalid-argument", "Invalid priceId.");
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
    }
    catch (error) {
        console.error("Stripe error:", error);
        throw new https_1.HttpsError("internal", "An error occurred while creating the checkout session.", error.message);
    }
});
