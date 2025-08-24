import * as functions from 'firebase-functions';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export const placeBid = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');

  const { auctionId } = data as { auctionId: string };
  if (!auctionId) throw new functions.https.HttpsError('invalid-argument', 'auctionId required.');

  const db = getFirestore();
  const auctionRef = db.collection('auctions').doc(auctionId);
  const creditsRef = db.collection('userCredits').doc(uid);
  const bidsCol = auctionRef.collection('bids');

  await db.runTransaction(async (trx) => {
    const [aSnap, cSnap] = await Promise.all([trx.get(auctionRef), trx.get(creditsRef)]);
    if (!aSnap.exists) throw new functions.https.HttpsError('not-found', 'Auction not found.');
    const a = aSnap.data() as any;
    if (a.status !== 'open') throw new functions.https.HttpsError('failed-precondition', 'Auction closed.');

    const inc = a.bidIncrement ?? 1;
    const nextPrice = (a.currentPrice ?? 0) + inc;

    const balance = (cSnap.exists ? (cSnap.data() as any).balance : 0) as number;
    if (balance < 1) throw new functions.https.HttpsError('failed-precondition', 'Insufficient credits.');

    trx.update(auctionRef, { currentPrice: nextPrice, updatedAt: Date.now(), leaderId: uid });
    trx.set(bidsCol.doc(), { bidderId: uid, amount: nextPrice, createdAt: Timestamp.now().toMillis() });
    trx.set(creditsRef, { balance: balance - 1, updatedAt: Date.now() }, { merge: true });
  });

  return { ok: true };
});
