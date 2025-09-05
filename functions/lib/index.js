"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitlist = exports.sendTestMail = exports.stripeWebhook = exports.createCheckoutSession = exports.placeBid = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const waitlistEmail_1 = require("./waitlistEmail");
// Import callable and other HTTP functions
var placeBid_1 = require("./placeBid");
Object.defineProperty(exports, "placeBid", { enumerable: true, get: function () { return placeBid_1.placeBid; } });
var createCheckoutSession_1 = require("./createCheckoutSession");
Object.defineProperty(exports, "createCheckoutSession", { enumerable: true, get: function () { return createCheckoutSession_1.createCheckoutSession; } });
var stripeWebhook_1 = require("./stripeWebhook");
Object.defineProperty(exports, "stripeWebhook", { enumerable: true, get: function () { return stripeWebhook_1.stripeWebhook; } });
var mail_1 = require("./mail");
Object.defineProperty(exports, "sendTestMail", { enumerable: true, get: function () { return mail_1.sendTestMail; } });
// Secrets required for sending waitlist emails
const SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
const MAIL_FROM = (0, params_1.defineSecret)("MAIL_FROM");
const MAIL_ADMIN = (0, params_1.defineSecret)("MAIL_ADMIN");
// Email validation regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Initialise firebase-admin once at runtime. Avoids hitting the network at module load time.
if ((0, app_1.getApps)().length === 0) {
    (0, app_1.initializeApp)();
}
// Create an Express app to handle our HTTP routes
const app = (0, express_1.default)();
// Configure CORS, JSON parsing and rate limiting
app.use((0, cors_1.default)({ origin: ["https://snaggle.fun", "http://localhost:5173"] }));
app.use(express_1.default.json());
app.use((0, express_rate_limit_1.default)({
    windowMs: 60_000, // 1 minute window
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
}));
// Health check route. Useful for monitoring and CI smoke tests.
app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});
// Waitlist signup handler
app.post("/api/waitlist", async (req, res) => {
    const { email } = req.body ?? {};
    // Validate that the email exists and matches our regex
    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
        res.status(400).json({ ok: false, error: "Invalid email" });
        return;
    }
    try {
        const db = (0, firestore_1.getFirestore)();
        // Record the waitlist entry with a server timestamp
        await db.collection("waitlist").add({ email, createdAt: new Date() });
        // Send confirmation to user and notification to admin
        await (0, waitlistEmail_1.sendWaitlistEmails)(SENDGRID_API_KEY.value(), MAIL_FROM.value(), MAIL_ADMIN.value(), email);
        res.json({ ok: true });
    }
    catch (err) {
        console.error("Waitlist error", err);
        res.status(500).json({ ok: false, error: "Server error" });
    }
});
// Export a single HTTPS function that handles both /health and /api/waitlist
exports.waitlist = (0, https_1.onRequest)({ secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] }, (req, res) => app(req, res));
