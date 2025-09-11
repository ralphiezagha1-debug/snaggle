"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendgridTest = void 0;
const https_1 = require("firebase-functions/v2/https");
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || "");
exports.sendgridTest = (0, https_1.onRequest)(async (req, res) => {
    try {
        const to = req.query?.to || process.env.MAIL_FROM || "no-reply@snaggle.fun";
        const msg = {
            to,
            from: process.env.MAIL_FROM || "no-reply@snaggle.fun",
            subject: "SendGrid Test Email",
            text: "If you got this, SendGrid works with Firebase 🎉",
        };
        const resp = await mail_1.default.send(msg);
        console.log("[sendgridTest] sent", { to, statusCode: resp[0]?.statusCode });
        res.status(200).send("Sent ✅");
    }
    catch (err) {
        console.error("[sendgridTest] error:", err);
        res.status(500).send("Error: " + err.message);
    }
});
