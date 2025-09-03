import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";
import * as sendgrid from "@sendgrid/mail";
import crypto from "crypto";

// Safe admin init
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const ALLOW_ORIGINS = new Set(["https://snaggle.fun", "https://www.snaggle.fun"]);

// crude in-memory rate limiter: 5 req/min per IP hash (per instance)
type StampArr = number[];
const rateMap: Map<string, StampArr> = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

function corsHeaders(origin: string | undefined) {
  const allow = origin && ALLOW_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function isValidEmail(email: string): boolean {
  if (!email) return false;
  const e = email.trim().toLowerCase();
  if (e.length > 254) return false;
  // Simple RFC-ish regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

async function sendAdminEmail(newEmail: string) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_ADMIN;
  if (!apiKey || !from || !to) {
    logger.error("SendGrid not configured (missing env vars)");
    return { queued: false };
  }
  try {
    sendgrid.setApiKey(apiKey);
    await sendgrid.send({
      to,
      from,
      subject: "New Waitlist Signup",
      text: `New user joined waitlist: ${newEmail}`,
      categories: ["waitlist"],
    });
    return { queued: true };
  } catch (err: any) {
    // fail-open: log and move on
    logger.error("SendGrid error", { code: err?.code, message: err?.message });
    return { queued: false };
  }
}

export const joinWaitlist = onRequest(async (req, res) => {
  const origin = req.get("origin") || undefined;
  const headers = corsHeaders(origin);

  // Preflight
  if (req.method === "OPTIONS") {
    res.status(204).set(headers).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).set(headers).send("Method Not Allowed");
    return;
  }

  res.set(headers);
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const rawEmail = (body?.email ?? "").toString().trim().toLowerCase();

    if (!isValidEmail(rawEmail)) {
      res.status(400).json({ success: false, error: "Email required or invalid" });
      return;
    }

    const ip = (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim()
      || req.socket.remoteAddress
      || "0.0.0.0";

    // rate limit
    const key = hashIp(ip);
    const now = Date.now();
    const arr = rateMap.get(key) ?? [];
    const pruned = arr.filter(ts => now - ts < WINDOW_MS);
    if (pruned.length >= RATE_LIMIT) {
      res.status(429).json({ success: false, error: "Too many requests" });
      return;
    }
    pruned.push(now);
    rateMap.set(key, pruned);

    const email = rawEmail;
    const emailDomain = email.split("@")[1] || "";
    const db = admin.firestore();

    // Dedup: use email as doc id for O(1) lookup; also store email field
    const docId = email;
    const ref = db.collection("waitlist").doc(docId);
    const snap = await ref.get();

    let deduped = false;
    if (snap.exists) {
      deduped = true;
    } else {
      await ref.set({
        email,
        emailDomain,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        source: "landing",
        ipHash: key,
      });
    }

    const { queued } = deduped ? { queued: false } : await sendAdminEmail(email);

    logger.info("waitlist_join", {
      success: true,
      deduped,
      queued,
      emailDomain,
      ipHash: key.slice(0, 8),
    });

    res.status(200).json({ success: true, ...(deduped ? { deduped: true } : {}), ...(queued ? { queued: true } : {}) });
  } catch (err: any) {
    logger.error("waitlist_join_error", { message: err?.message });
    res.status(500).json({ success: false, error: "Failed to join" });
  }
});