export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  price: number;
  timestamp: number; // ms epoch
}
