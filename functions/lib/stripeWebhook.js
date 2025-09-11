"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = void 0;
const https_1 = require("firebase-functions/v2/https");
/** Temporary stub; replace with real logic */
exports.stripeWebhook = (0, https_1.onRequest)((_req, res) => {
    // Stripe expects 2xx to consider delivery successful
    res.status(200).send("stripeWebhook stub");
});
