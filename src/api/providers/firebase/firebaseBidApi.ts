import type { BidApi, Unsubscribe } from '@/api/bidApi';
import type { Auction } from '@/models/Auction';
import type { Bid } from '@/models/Bid';
import type { UserCredits } from '@/models/UserCredits';
import { app, db } from '@/platforms/firebase/app';
import {
  collection, doc, getDoc, getDocs, query, where, onSnapshot, orderBy, limit as qlimit, setDoc, increment, serverTimestamp
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

function noimpl(name: string): never {
  throw new Error(`Not implemented: ${name}`);
}

const functions = getFunctions(app);
const placeBidFn = httpsCallable(functions, 'placeBid');

const api: BidApi = {
  async getAuctions(args) {
    const col = collection(db, 'auctions');
    const q = args?.status ? query(col, where('status', '==', args.status)) : col;
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Auction[];
  },
  async getAuction(id) {
    const d = await getDoc(doc(db, 'auctions', id));
    return d.exists() ? ({ id: d.id, ...(d.data() as any) } as Auction) : null;
  },
  watchAuction(id, cb) {
    return onSnapshot(doc(db, 'auctions', id), s => {
      cb(s.exists() ? ({ id: s.id, ...(s.data() as any) } as Auction) : null);
    });
  },
  async getRecentBids(auctionId, lim = 20) {
    const col = collection(db, 'auctions', auctionId, 'bids');
    const q = query(col, orderBy('createdAt', 'desc'), qlimit(lim));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Bid[];
  },
  watchRecentBids(auctionId, lim, cb) {
    const col = collection(db, 'auctions', auctionId, 'bids');
    const q = query(col, orderBy('createdAt', 'desc'), qlimit(lim));
    return onSnapshot(q, s => {
      cb(s.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Bid[]);
    });
  },
  async placeBid(auctionId) {
    const result = await placeBidFn({ auctionId });
    return result.data as { ok: true };
  },
  async getCredits(uid) {
    const d = await getDoc(doc(db, 'users', uid));
    if (!d.exists()) return null;
    const data = d.data();
    return { uid: d.id, credits: data.credits || 0, updatedAt: data.updatedAt };
  },
  async creditBalance(uid, delta) {
    const ref = doc(db, 'users', uid);
    await setDoc(ref, {
      credits: increment(delta),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    const d = await getDoc(ref);
    return d.data()?.credits ?? delta;
  },
  getPurchaseHistory: async function (uid: string): Promise<any[]> {
    const col = collection(db, 'users', uid, 'purchases');
    const q = query(col, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
  },
  async createAuction(init) {
    noimpl('createAuction');
  },
  async closeAuction(id) {
    noimpl('closeAuction');
  }
};

export default api;
