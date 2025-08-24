import auctions from '../data/auctions.json';

export interface Auction {
  id: string;
  title: string;
  img: string;
  msrp: number;
  currentPrice: number;
  endsAt: string; // ISO
  status: 'live' | 'ended' | 'scheduled';
}

export interface BidApi {
  listAuctions(): Promise<Auction[]>;
  getAuction(id: string): Promise<Auction | null>;
  placeBid(params: { auctionId: string; amount: number; userId: string }): Promise<{ ok: boolean; error?: string }>;
}

class DefaultLocalBidApi implements BidApi {
  async listAuctions(): Promise<Auction[]> {
    return Promise.resolve(auctions as Auction[]);
  }

  async getAuction(id: string): Promise<Auction | null> {
    const auction = auctions.find((a) => a.id === id) as Auction | undefined;
    return Promise.resolve(auction || null);
  }

  async placeBid(params: { auctionId: string; amount: number; userId: string }): Promise<{ ok: boolean; error?: string }> {
    console.log("Placing bid with params:", params)
    return Promise.resolve({ ok: false, error: 'not-implemented' });
  }
}

export const bidApi = new DefaultLocalBidApi();
