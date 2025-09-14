import { onRequest } from "firebase-functions/v2/https";
import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import cors from "cors";
import { isValidEmail, sendMail, SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN, unsuppressIfNeeded } from "./lib/email.js";
if (!getApps().length)
    initializeApp();
const db = getFirestore();
const allow = cors({ origin: ["https://snaggle.fun", "http://localhost:5173"], methods: ["POST", "OPTIONS"] });
const hits = new Map();
function allowHit(ip, limit = 5, windowMs = 60000) {
    const now = Date.now();
    const h = hits.get(ip);
    if (!h || now - h.ts > windowMs) {
        hits.set(ip, { count: 1, ts: now });
        return true;
    }
    if (h.count >= limit)
        return false;
    h.count++;
    return true;
}
export const waitlist = onRequest({ region: "us-central1", secrets: [SENDGRID_API_KEY, MAIL_FROM, MAIL_ADMIN] }, async (req, res) => {
    allow(req, res, async () => {
        if (req.method === "OPTIONS")
            return res.status(204).end();
        if (req.method !== "POST")
            return res.status(405).json({ ok: false, error: "POST only" });
        const ip = (req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "ip").split(",")[0].trim();
        if (!allowHit(ip))
            return res.status(429).json({ ok: false, error: "Too many requests" });
        const email = req.body?.email?.trim();
        if (!isValidEmail(email ?? ""))
            return res.status(400).json({ ok: false, error: "Invalid email" });
        const col = db.collection("waitlist");
        const q = await col.where("email", "==", email).limit(1).get();
        const docRef = q.empty ? col.doc() : q.docs[0].ref;
        await docRef.set({ email, createdAt: FieldValue.serverTimestamp() }, { merge: true });
        await unsuppressIfNeeded(email, SENDGRID_API_KEY.value());
        const from = MAIL_FROM.value() || "no-reply@snaggle.fun";
        const [userRes, adminRes] = await Promise.all([
            sendMail({
                to: email,
                from,
                subject: "You’re on the Snaggle waitlist 🎉",
                html: `<div style="font-family:system-ui">
            <h2>Welcome to Snaggle 🎉</h2>
            <p>Thanks for joining the waitlist! We’ll email you with early access and launch updates.</p>
          </div>`
            }),
            sendMail({
                to: MAIL_ADMIN.value() || "ralphiezagha1@gmail.com",
                from,
                subject: "New waitlist signup",
                html: `<div style="font-family:system-ui"><b>${email}</b> just joined the waitlist.</div>`
            })
        ]);
        const ok = (userRes.ok && adminRes.ok);
        return res.status(ok ? 200 : 502).json({ ok, userRes, adminRes });
    });
});
