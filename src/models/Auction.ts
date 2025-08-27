export interface Auction {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  currentPrice: number;
  bidIncrement: number;
  status: 'open' | 'closed' | 'scheduled';
  startsAt?: number; // ms epoch
  endsAt?: number;   // ms epoch
  createdAt?: number;
  updatedAt?: number;
  lastBidder?: string;
  lastBidderId?: string;
  bidCount?: number;
  participantCount?: number;
}
