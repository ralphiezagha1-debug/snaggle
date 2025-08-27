import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as admin from "firebase-admin";

// Safe init (won't throw if already initialized)
if (admin.apps.length === 0) { admin.initializeApp(); }

type PlaceBidData = { auctionId: string };

const BID_COST = 1;
const TIMER_EXTENSION_MS = 15 * 1000; // 15 seconds

export const placeBid = onCall<PlaceBidData>(async (request) => {
  const uid = request.auth?.uid;
  const { auctionId } = request.data ?? {};

  if (!uid) {
    throw new HttpsError("unauthenticated", "You must be signed in to place a bid.");
  }
  if (!auctionId) {
    throw new HttpsError("invalid-argument", "auctionId is required.");
  }

  const db = getFirestore();
  const auth = admin.auth();

  const auctionRef = db.collection("auctions").doc(auctionId);
  const userRef = db.collection("users").doc(uid);
  const bidsRef = auctionRef.collection("bids");

  try {
    const userRecord = await auth.getUser(uid);
    const userName = userRecord.displayName || 'Anonymous';

    await db.runTransaction(async (transaction) => {
      const auctionDoc = await transaction.get(auctionRef);
      const userDoc = await transaction.get(userRef);

      if (!auctionDoc.exists) {
        throw new HttpsError("not-found", "Auction not found.");
      }

      const auction = auctionDoc.data();
      if (!auction) {
          throw new HttpsError("data-loss", "Auction data is corrupt.");
      }

      if (auction.status !== 'open') {
        throw new HttpsError("failed-precondition", "Auction is not open for bidding.");
      }

      if (auction.endsAt && auction.endsAt < Date.now()) {
        throw new HttpsError("failed-precondition", "Auction has already ended.");
      }

      const currentCredits = userDoc.exists ? userDoc.data()?.credits : 0;

      if (currentCredits < BID_COST) {
        throw new HttpsError("resource-exhausted", "Insufficient credits to place a bid.");
      }

      // 1. Deduct credits
      // We use update here, which requires the document to exist.
      // This is a safeguard against creating a credit doc with a negative balance.
      // A user must have a credit document to be able to bid.
      transaction.update(userRef, {
        credits: FieldValue.increment(-BID_COST),
        updatedAt: FieldValue.serverTimestamp()
      });

      // 2. Add bid to subcollection
      const newBidRef = bidsRef.doc();
      transaction.set(newBidRef, {
        userId: uid,
        userName: userName,
        createdAt: FieldValue.serverTimestamp(),
        // The price here is for record-keeping, the authoritative price is on the auction doc.
        amount: auction.currentPrice + auction.bidIncrement,
      });

      // 3. Update auction
      transaction.update(auctionRef, {
        currentPrice: FieldValue.increment(auction.bidIncrement),
        endsAt: Date.now() + TIMER_EXTENSION_MS,
        lastBidder: userName, // Storing userName for easy display on the client
        lastBidderId: uid,
        updatedAt: FieldValue.serverTimestamp(),
        bidCount: FieldValue.increment(1),
      });
    });

    return { ok: true };
  } catch (error: any) {
    if (error.code === 'firestore/not-found' && error.message.includes('users')) {
        throw new HttpsError('resource-exhausted', 'Insufficient credits to place a bid.');
    }
    if (!(error instanceof HttpsError)) {
      console.error("Unexpected error placing bid:", error);
      throw new HttpsError('internal', 'An unexpected error occurred.');
    }
    throw error;
  }
});
