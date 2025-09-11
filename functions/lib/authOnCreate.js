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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOnCreate = void 0;
const functions = __importStar(require("firebase-functions"));
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const mail_1 = __importDefault(require("@sendgrid/mail"));
(0, app_1.initializeApp)();
// These two are fine to read at module scope (non-sensitive defaults)
const MAIL_FROM = process.env.MAIL_FROM || "no-reply@snaggle.fun";
const MAIL_ADMIN = process.env.MAIL_ADMIN || "ralphiezagha1@gmail.com";
exports.authOnCreate = functions
    .runWith({ secrets: ["SENDGRID_API_KEY", "MAIL_FROM", "MAIL_ADMIN"] })
    .auth.user()
    .onCreate(async (user) => {
    try {
        const email = user.email;
        if (!email) {
            console.log("[authOnCreate] User has no email:", user.uid);
            return;
        }
        // 🔑 Read the secret at invocation time, then set the API key
        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
        if (!SENDGRID_API_KEY) {
            console.warn("[authOnCreate] SENDGRID_API_KEY missing at invocation; aborting email send.");
            return;
        }
        mail_1.default.setApiKey(SENDGRID_API_KEY);
        // Create a verification link
        const link = await (0, auth_1.getAuth)().generateEmailVerificationLink(email, {
            url: "https://snaggle.fun/",
            handleCodeInApp: false,
        });
        // Send verification email
        const verifyMsg = {
            to: email,
            from: MAIL_FROM,
            subject: "Verify your email for Snaggle",
            text: `Welcome to Snaggle! Please verify your email: ${link}`,
            html: `<div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
                 <h2>Welcome to Snaggle 🎉</h2>
                 <p>Tap the button below to verify your email and finish setting up your account.</p>
                 <p><a href="${link}" style="display:inline-block;padding:10px 16px;border-radius:8px;text-decoration:none;background:#10b981;color:#ffffff">Verify email</a></p>
                 <p>If the button doesn’t work, copy and paste this link:</p>
                 <p><a href="${link}">${link}</a></p>
               </div>`,
        };
        await mail_1.default.send(verifyMsg);
        // Admin notification
        const adminMsg = {
            to: MAIL_ADMIN,
            from: MAIL_FROM,
            subject: "New Snaggle signup",
            text: `${email} just created an account.`,
            html: `<p><strong>${email}</strong> just created an account.</p>`,
        };
        await mail_1.default.send(adminMsg);
        console.log("[authOnCreate] Verification email sent to", email);
    }
    catch (err) {
        console.error("[authOnCreate] Error:", err);
        throw err;
    }
});
