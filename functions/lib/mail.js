"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTestMail = void 0;
// functions/src/mail.ts
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
const MAIL_FROM = (0, params_1.defineSecret)("MAIL_FROM");
const MAIL_ADMIN = (0, params_1.defineSecret)("MAIL_ADMIN");
/**
 * Simple endpoint to verify SendGrid secrets. This function sends a test
 * email to the configured administrator address when invoked.
 */
exports.sendTestMail = (0, https_1.onRequest)({ secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] }, async (_req, res) => {
    mail_1.default.setApiKey(SENDGRID_API_KEY.value());
    await mail_1.default.send({
        to: MAIL_ADMIN.value(),
        from: MAIL_FROM.value(),
        subject: "Snaggle SendGrid Test",
        text: "If you got this, SendGrid secrets are working!",
    });
    res.send("✅ Test email sent");
});
