import type { Auction } from '@/models/Auction';
import type { Bid } from '@/models/Bid';
import type { UserCredits } from '@/models/UserCredits';
import type { Purchase } from '@/models/Purchase';

export type Unsubscribe = () => void;

export interface BidApi {
  // Auctions
  getAuctions(args?: { status?: 'open' | 'closed' | 'scheduled' }): Promise<Auction[]>;
  getAuction(id: string): Promise<Auction | null>;
  watchAuction(id: string, cb: (a: Auction | null) => void): Unsubscribe;

  // Bids
  getRecentBids(auctionId: string, limit?: number): Promise<Bid[]>;
  watchRecentBids(auctionId: string, limit: number, cb: (bids: Bid[]) => void): Unsubscribe;
  placeBid(auctionId: string): Promise<{ ok: true }>;

  // Credits
  getCredits(uid: string): Promise<UserCredits | null>;
  creditBalance(uid: string, delta: number): Promise<number>;
  getPurchaseHistory(uid:string): Promise<Purchase[]>;

  // Admin-ish
  createAuction(init: Partial<Auction>): Promise<string>;
  closeAuction(id: string): Promise<void>;
}
