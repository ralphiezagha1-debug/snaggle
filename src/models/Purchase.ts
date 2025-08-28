export interface Purchase {
  id: string;
  createdAt: number;
  credits: number;
  amount: number; // in cents
  stripeCheckoutSessionId: string;
}
