import { onRequest } from "firebase-functions/v2/https";

/** Temporary stub; replace with real logic */
export const placeBid = onRequest((_req, res) => {
  res.status(501).json({ ok: false, error: "placeBid not implemented" });
});
