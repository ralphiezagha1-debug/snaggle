"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSendgrid = configureSendgrid;
exports.sendUserConfirmation = sendUserConfirmation;
exports.sendAdminNotification = sendAdminNotification;
const mail_1 = __importDefault(require("@sendgrid/mail"));
/** Set the SendGrid API key once per cold start */
function configureSendgrid(apiKey) {
    mail_1.default.setApiKey(apiKey);
}
async function sendUserConfirmation(from, to) {
    const msg = {
        to,
        from,
        subject: "You’re on the Snaggle waitlist 🎉",
        text: "Thanks for joining the Snaggle waitlist! We’ll email you with early access and launch updates.",
        html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2>Welcome to Snaggle 🎉</h2>
      <p>Thanks for joining the waitlist! We’ll email you with early access and launch updates.</p>
    </div>`,
    };
    await mail_1.default.send(msg);
}
async function sendAdminNotification(from, adminTo, userEmail) {
    const msg = {
        to: adminTo,
        from,
        subject: "New waitlist signup",
        text: `New waitlist email: ${userEmail}`,
        html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <strong>New waitlist signup:</strong> ${userEmail}
    </div>`,
    };
    await mail_1.default.send(msg);
}
