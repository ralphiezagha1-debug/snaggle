"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendgridTestV2 = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
const MAIL_FROM = (0, params_1.defineSecret)("MAIL_FROM");
exports.sendgridTestV2 = (0, https_1.onRequest)({ region: "us-central1", secrets: [SENDGRID_API_KEY, MAIL_FROM] }, async (req, res) => {
    try {
        const sg = (await import("@sendgrid/mail")).default;
        const apiKey = SENDGRID_API_KEY.value();
        if (!apiKey || !apiKey.startsWith("SG.")) {
            console.error("[sendgridTestV2] Missing or invalid SENDGRID_API_KEY");
            return res.status(500).send("SendGrid API key not configured.");
        }
        sg.setApiKey(apiKey);
        // Accept ?to=... or POST body { to: "..." }
        const to = (req.query && req.query.to) ||
            (req.body && req.body.to) ||
            MAIL_FROM.value() ||
            "no-reply@snaggle.fun";
        const from = MAIL_FROM.value() || "no-reply@snaggle.fun";
        const msg = {
            to: String(to),
            from: String(from),
            subject: "SendGrid Test Email",
            text: "If you got this, SendGrid works with Firebase 🎉",
        };
        const resp = await sg.send(msg);
        console.log("[sendgridTestV2] sent", { to, statusCode: resp[0]?.statusCode });
        return res.status(200).send("Sent ✅");
    }
    catch (err) {
        console.error("[sendgridTestV2] error:", err);
        return res.status(500).send("Error: " + (err?.message || String(err)));
    }
});
