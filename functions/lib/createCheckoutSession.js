"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const https_1 = require("firebase-functions/v2/https");
/** Temporary stub; replace with real logic */
exports.createCheckoutSession = (0, https_1.onRequest)((_req, res) => {
    res.status(501).json({ ok: false, error: "createCheckoutSession not implemented" });
});
