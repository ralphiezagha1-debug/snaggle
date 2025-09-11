"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWaitlistEmails = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
/**
 * Sends both the user confirmation and the admin notification emails.
 *
 * @param apiKey   SendGrid API key to authenticate the client
 * @param from     The sender address (e.g. no‑reply@snaggle.fun)
 * @param adminTo  The administrator address to notify of new signups
 * @param userEmail The new waitlist member's email address
 */
async function sendWaitlistEmails(apiKey, from, adminTo, userEmail) {
    // Initialise the API key on every call to avoid retaining secrets at module load time
    mail_1.default.setApiKey(apiKey);
    // Send confirmation email to the user
    await mail_1.default.send({
        to: userEmail,
        from,
        subject: "You’re on the Snaggle waitlist 🎉",
        text: "Thanks for joining the Snaggle waitlist! We’ll email you with early access and launch updates.",
        html: `
      <p>Welcome to Snaggle 🎉</p>
      <p>Thanks for joining the waitlist! We’ll email you with early access and launch updates.</p>
    `,
    });
    // Send notification email to the administrator
    await mail_1.default.send({
        to: adminTo,
        from,
        subject: "New waitlist signup",
        text: `New waitlist email: ${userEmail}`,
        html: `<p>New waitlist signup: ${userEmail}</p>`,
    });
}
exports.sendWaitlistEmails = sendWaitlistEmails;
