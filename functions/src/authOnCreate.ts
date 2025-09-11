import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import sgMail from "@sendgrid/mail";

initializeApp();

// These two are fine to read at module scope (non-sensitive defaults)
const MAIL_FROM = process.env.MAIL_FROM || "no-reply@snaggle.fun";
const MAIL_ADMIN = process.env.MAIL_ADMIN || "ralphiezagha1@gmail.com";

// Helper type for SendGrid
type MailData = Parameters<typeof sgMail.send>[0];

export const authOnCreate = functions
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
      sgMail.setApiKey(SENDGRID_API_KEY);

      // Create a verification link
      const link = await getAdminAuth().generateEmailVerificationLink(email, {
        url: "https://snaggle.fun/",
        handleCodeInApp: false,
      });

      // Send verification email
      const verifyMsg: MailData = {
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
      await sgMail.send(verifyMsg);

      // Admin notification
      const adminMsg: MailData = {
        to: MAIL_ADMIN,
        from: MAIL_FROM,
        subject: "New Snaggle signup",
        text: `${email} just created an account.`,
        html: `<p><strong>${email}</strong> just created an account.</p>`,
      };
      await sgMail.send(adminMsg);

      console.log("[authOnCreate] Verification email sent to", email);
    } catch (err) {
      console.error("[authOnCreate] Error:", err);
      throw err;
    }
  });
