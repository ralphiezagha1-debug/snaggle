import type { BidApi, Unsubscribe } from '@/api/bidApi';

const noop: Unsubscribe = () => {};

const api: BidApi = {
  async getAuctions() {
    console.warn('Supabase provider: getAuctions not implemented');
    return [];
  },
  async getAuction() {
    console.warn('Supabase provider: getAuction not implemented');
    return null;
  },
  watchAuction() {
    console.warn('Supabase provider: watchAuction not implemented');
    return noop;
  },
  async getRecentBids() {
    console.warn('Supabase provider: getRecentBids not implemented');
    return [];
  },
  watchRecentBids() {
    console.warn('Supabase provider: watchRecentBids not implemented');
    return noop;
  },
  async placeBid() {
    console.warn('Supabase provider: placeBid not implemented');
    return { ok: true };
  },
  async getCredits() {
    console.warn('Supabase provider: getCredits not implemented');
    return null;
  },
  async creditBalance() {
    console.warn('Supabase provider: creditBalance not implemented');
    return 0;
  },
  async getPurchaseHistory() {
    console.warn('Supabase provider: getPurchaseHistory not implemented');
    return [];
  },
  async createAuction() {
    console.warn('Supabase provider: createAuction not implemented');
    return 'new-auction-id';
  },
  async closeAuction() {
    console.warn('Supabase provider: closeAuction not implemented');
    return;
  },
};

export default api;
