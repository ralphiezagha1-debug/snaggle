import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import cors from "cors";
import { isValidEmail, unsuppressIfNeeded, sendMail, MAIL_FROM, SENDGRID_API_KEY } from "./lib/email.js";

const MAIL_ADMIN = defineSecret("MAIL_ADMIN");
const allow = cors({ origin: ["https://snaggle.fun", "http://localhost:5173"], methods: ["GET","POST"] });

export const sendgridTestV2 = onRequest(
  { region: "us-central1", secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] },
  async (req, res) => {
    allow(req, res, async () => {
      try {
        const to = (req.method === "GET" ? (req.query.to as string) : (req.body?.to as string))?.trim();
        if (!isValidEmail(to ?? "")) return res.status(400).json({ ok:false, error:"Invalid 'to' email" });

        await unsuppressIfNeeded(to!, SENDGRID_API_KEY.value());

        const r = await sendMail({
          to,
          from: MAIL_FROM.value() || "no-reply@snaggle.fun",
          subject: "Snaggle: SendGrid v2 test ✅",
          html: `<div style="font-family:system-ui">This is a direct v2 test to <b>${to}</b>. If you see this, SendGrid works.</div>`
        });

        return res.status(r.ok ? 200 : 500).json({
          ok: r.ok,
          status: r.status,
          messageId: r.messageId,
          sgHeaders: r.sgHeaders,
          meta: { from: MAIL_FROM.value(), admin: MAIL_ADMIN.value() }
        });
      } catch (e:any) {
        return res.status(500).json({ ok:false, error: e?.message || String(e) });
      }
    });
  }
);



