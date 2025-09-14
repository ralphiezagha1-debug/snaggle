import { onRequest } from "firebase-functions/v2/https";

/** Temporary stub; replace with real logic */
export const waitlist = onRequest((req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  res.status(200).json({ ok: true, message: "waitlist stub" });
});
