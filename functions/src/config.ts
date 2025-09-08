// functions/src/config.ts
import { defineSecret } from "firebase-functions/params";

/** SendGrid */
export const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
export const MAIL_FROM        = defineSecret("MAIL_FROM");
export const MAIL_ADMIN       = defineSecret("MAIL_ADMIN");

/** Stripe (only if you actually use these) */
export const STRIPE_SECRET_KEY     = defineSecret("STRIPE_SECRET_KEY");
export const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
