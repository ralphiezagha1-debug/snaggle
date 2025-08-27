export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  credits?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface Purchase {
  id: string;
  createdAt: number;
  credits: number;
  amount: number; // in cents
  stripeCheckoutSessionId: string;
}
