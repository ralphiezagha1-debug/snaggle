"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitlist = void 0;
const https_1 = require("firebase-functions/v2/https");
/** Temporary stub; replace with real logic */
exports.waitlist = (0, https_1.onRequest)((req, res) => {
    if (req.method !== "POST")
        return res.status(405).send("Method Not Allowed");
    res.status(200).json({ ok: true, message: "waitlist stub" });
});
