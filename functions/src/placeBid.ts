import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp } from "firebase-admin/app";

// Safe init (won't throw if already initialized)
if (getApps().length === 0) { initializeApp(); }

type PlaceBidData = { auctionId: string };

export const placeBid = onCall<PlaceBidData>(async (request) => {
  const uid = request.auth?.uid;
  const { auctionId } = request.data ?? {};

  if (!uid) {
    throw new HttpsError("unauthenticated", "You must be signed in to place a bid.");
  }
  if (!auctionId) {
    throw new HttpsError("invalid-argument", "uctionId is required.");
  }

  // TODO: implement real bidding logic
  // const db = getFirestore();
  // await db.collection("bids").add({ auctionId, uid, ts: Date.now() });

  return { ok: true };
});
