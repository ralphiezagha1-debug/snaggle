"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_WEBHOOK_SECRET = exports.STRIPE_SECRET_KEY = exports.MAIL_ADMIN = exports.MAIL_FROM = exports.SENDGRID_API_KEY = void 0;
// functions/src/config.ts
const params_1 = require("firebase-functions/params");
/** SendGrid */
exports.SENDGRID_API_KEY = (0, params_1.defineSecret)("SENDGRID_API_KEY");
exports.MAIL_FROM = (0, params_1.defineSecret)("MAIL_FROM");
exports.MAIL_ADMIN = (0, params_1.defineSecret)("MAIL_ADMIN");
/** Stripe (only if you actually use these) */
exports.STRIPE_SECRET_KEY = (0, params_1.defineSecret)("STRIPE_SECRET_KEY");
exports.STRIPE_WEBHOOK_SECRET = (0, params_1.defineSecret)("STRIPE_WEBHOOK_SECRET");
