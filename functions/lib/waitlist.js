"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitlist = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const params_1 = require("firebase-functions/params");
// Init firebase-admin once
(0, app_1.getApps)().length ? (0, app_1.getApp)() : (0, app_1.initializeApp)();
// Secrets
const SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
const MAIL_FROM = (0, params_1.defineSecret)("MAIL_FROM");
const MAIL_ADMIN = (0, params_1.defineSecret)("MAIL_ADMIN");
// Email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Express app
const app = (0, express_1.default)();
// CORS + JSON + rate limit
app.use((0, cors_1.default)({ origin: ["https://snaggle.fun", "http://localhost:5173"] }));
app.use(express_1.default.json());
app.use((0, express_rate_limit_1.default)({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false }));
// Routes
app.post("/api/waitlist", async (req, res) => {
    const { email } = req.body ?? {};
    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
        return res.status(400).json({ ok: false, error: "Invalid email" });
    }
    try {
        // Configure SendGrid per-request (secret access happens at runtime)
        mail_1.default.setApiKey(SENDGRID_API_KEY.value());
        const db = (0, firestore_1.getFirestore)();
        await db.collection("waitlist").add({ email, createdAt: new Date() });
        // User confirmation
        await mail_1.default.send({
            to: email,
            from: MAIL_FROM.value(),
            subject: "Welcome to Snaggle!",
            text: "Thanks for joining our waitlist. You’re on the list!",
        });
        // Admin notification
        await mail_1.default.send({
            to: MAIL_ADMIN.value(),
            from: MAIL_FROM.value(),
            subject: "New Waitlist Signup",
            text: `New signup: ${email}`,
        });
        return res.json({ ok: true });
    }
    catch (err) {
        logger.error("Waitlist error", err);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
});
// Health
app.get("/health", (_req, res) => res.status(200).send("ok"));
// Export with secrets so Functions can mount them
exports.waitlist = (0, https_1.onRequest)({ secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] }, (req, res) => app(req, res));
// touch
