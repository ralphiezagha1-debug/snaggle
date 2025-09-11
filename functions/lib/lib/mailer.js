"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAdminNotification = exports.sendUserConfirmation = exports.setSendgridKeyOnce = void 0;
// functions/src/lib/mailer.ts
const mail_1 = __importDefault(require("@sendgrid/mail"));
function setSendgridKeyOnce(apiKey) {
    mail_1.default.setApiKey(apiKey);
}
exports.setSendgridKeyOnce = setSendgridKeyOnce;
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
exports.sendUserConfirmation = sendUserConfirmation;
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
exports.sendAdminNotification = sendAdminNotification;
