import { onRequest } from "firebase-functions/v2/https";

export const joinWaitlist = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  res.status(200).json({ ok: true, echo: req.body ?? null });
});
