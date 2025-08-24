const p = (import.meta as any).env?.VITE_PROVIDER ?? 'firebase';
export const provider: 'firebase' | 'supabase' = (p === 'supabase' ? 'supabase' : 'firebase');
