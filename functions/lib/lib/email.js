import { defineSecret } from "firebase-functions/params";
export const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
export const MAIL_FROM = defineSecret("MAIL_FROM");
export const MAIL_ADMIN = defineSecret("MAIL_ADMIN");
export function isValidEmail(email) {
    if (!email)
        return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
export async function unsuppressIfNeeded(email, apiKey) {
    const base = "https://api.sendgrid.com/v3";
    const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };
    const endpoints = [
        `${base}/suppression/blocks/${encodeURIComponent(email)}`,
        `${base}/suppression/bounces/${encodeURIComponent(email)}`,
        `${base}/suppression/spam_reports/${encodeURIComponent(email)}`,
        `${base}/suppression/invalid_emails/${encodeURIComponent(email)}`,
        `${base}/asm/suppressions/global/${encodeURIComponent(email)}`,
    ];
    for (const url of endpoints) {
        try {
            const res = await fetch(url, { method: "DELETE", headers });
            await res.text().catch(() => { });
        }
        catch { /* ignore */ }
    }
}
export async function sendMail(msg) {
    const apiKey = SENDGRID_API_KEY.value();
    if (!apiKey)
        return { ok: false };
    const mail = await import("@sendgrid/mail");
    mail.setApiKey(apiKey);
    // @ts-ignore
    const resp = await mail.send({
        to: msg.to,
        from: msg.from,
        subject: msg.subject,
        text: msg.text ?? " ",
        html: msg.html ?? "<div> </div>",
    });
    const [response] = resp;
    const sgHeaders = {};
    ["x-message-id", "x-sendgrid-message-id", "x-sendgrid-processed"].forEach(h => {
        const v = response.headers.get?.(h);
        if (v)
            sgHeaders[h] = v;
    });
    return { ok: response.statusCode >= 200 && response.statusCode < 300, status: response.statusCode, messageId: sgHeaders["x-message-id"] ?? sgHeaders["x-sendgrid-message-id"], sgHeaders };
}
