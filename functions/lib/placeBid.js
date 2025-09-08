"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeBid = void 0;
const https_1 = require("firebase-functions/v2/https");
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
// Safe init (won't throw if already initialized)
if ((0, app_1.getApps)().length === 0) {
    (0, app_1.initializeApp)();
}
const BID_COST = 1;
const TIMER_EXTENSION_MS = 15 * 1000; // 15 seconds
exports.placeBid = (0, https_1.onCall)(async (request) => {
    const uid = request.auth?.uid;
    const { auctionId } = (request.data ?? {});
    if (!uid) {
        throw new https_1.HttpsError("unauthenticated", "You must be signed in to place a bid.");
    }
    if (!auctionId) {
        throw new https_1.HttpsError("invalid-argument", "auctionId is required.");
    }
    const db = (0, firestore_1.getFirestore)();
    const auth = (0, auth_1.getAuth)();
    const auctionRef = db.collection("auctions").doc(auctionId);
    const userRef = db.collection("users").doc(uid);
    const bidsRef = auctionRef.collection("bids");
    try {
        const userRecord = await auth.getUser(uid);
        const userName = userRecord.displayName || "Anonymous";
        await db.runTransaction(async (transaction) => {
            const auctionDoc = await transaction.get(auctionRef);
            const userDoc = await transaction.get(userRef);
            if (!auctionDoc.exists) {
                throw new https_1.HttpsError("not-found", "Auction not found.");
            }
            const auction = auctionDoc.data();
            if (!auction) {
                throw new https_1.HttpsError("data-loss", "Auction data is corrupt.");
            }
            if (auction.status !== "open") {
                throw new https_1.HttpsError("failed-precondition", "Auction is not open for bidding.");
            }
            if (auction.endsAt && auction.endsAt < Date.now()) {
                throw new https_1.HttpsError("failed-precondition", "Auction has already ended.");
            }
            const currentCredits = userDoc.exists ? userDoc.data()?.credits : 0;
            if (currentCredits < BID_COST) {
                throw new https_1.HttpsError("resource-exhausted", "Insufficient credits to place a bid.");
            }
            // 1. Deduct credits. Use update here to ensure user document exists.
            transaction.update(userRef, {
                credits: firestore_1.FieldValue.increment(-BID_COST),
                updatedAt: firestore_1.FieldValue.serverTimestamp(),
            });
            // 2. Add bid to subcollection
            const newBidRef = bidsRef.doc();
            transaction.set(newBidRef, {
                userId: uid,
                userName: userName,
                createdAt: firestore_1.FieldValue.serverTimestamp(),
                // The price here is for record-keeping; the authoritative price is on the auction doc
                amount: auction.currentPrice + auction.bidIncrement,
            });
            // 3. Update auction
            transaction.update(auctionRef, {
                currentPrice: firestore_1.FieldValue.increment(auction.bidIncrement),
                endsAt: Date.now() + TIMER_EXTENSION_MS,
                lastBidder: userName, // Storing userName for easy display on the client
                lastBidderId: uid,
                updatedAt: firestore_1.FieldValue.serverTimestamp(),
                bidCount: firestore_1.FieldValue.increment(1),
            });
        });
        return { ok: true };
    }
    catch (error) {
        if (error.code === "firestore/not-found" && error.message.includes("users")) {
            throw new https_1.HttpsError("resource-exhausted", "Insufficient credits to place a bid.");
        }
        if (!(error instanceof https_1.HttpsError)) {
            console.error("Unexpected error placing bid:", error);
            throw new https_1.HttpsError("internal", "An unexpected error occurred.");
        }
        throw error;
    }
});
