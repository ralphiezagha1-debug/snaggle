import type { BidApi, Unsubscribe } from '@/api/bidApi';

const noop: Unsubscribe = () => {};

const api: BidApi = {
  async getAuctions() { throw new Error('Not implemented (supabase)'); },
  async getAuction() { throw new Error('Not implemented (supabase)'); },
  watchAuction() { return noop; },
  async getRecentBids() { throw new Error('Not implemented (supabase)'); },
  watchRecentBids() { return noop; },
  async placeBid() { throw new Error('Not implemented (supabase)'); },
  async getCredits() { throw new Error('Not implemented (supabase)'); },
  async creditBalance() { throw new Error('Not implemented (supabase)'); },
  async createAuction() { throw new Error('Not implemented (supabase)'); },
  async closeAuction() { throw new Error('Not implemented (supabase)'); },
};

export default api;
