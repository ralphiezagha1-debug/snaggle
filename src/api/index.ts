import { provider } from '@/config/runtime';
import type { BidApi } from './bidApi';

let singleton: Promise<BidApi> | null = null;

export function loadBidApi(): Promise<BidApi> {
  if (!singleton) {
    singleton = (async () => {
      if (provider === 'firebase') {
        const mod = await import('./providers/firebase/firebaseBidApi');
        return mod.default;
      } else {
        const mod = await import('./providers/supabase/supabaseBidApi');
        return mod.default;
      }
    })();
  }
  return singleton;
}
