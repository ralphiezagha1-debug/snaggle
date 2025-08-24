import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';

export const closeAuction = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  const { auctionId } = data as { auctionId: string };
  if (!auctionId) throw new functions.https.HttpsError('invalid-argument', 'auctionId required.');
  const db = getFirestore();
  await db.collection('auctions').doc(auctionId).set({ status: 'closed', updatedAt: Date.now() }, { merge: true });
  return { ok: true };
});
