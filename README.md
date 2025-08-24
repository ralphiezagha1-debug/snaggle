# Snaggle – Agent Patch

This patch introduces a provider adapter (`firebase` now, `supabase` stub) and minimal auth/pages to reach a working MVP path.

## Run locally
```bash
npm ci
npm run dev
```

## Seed sample data
```bash
# Set service account JSON (from your secure secret)
export FIREBASE_SERVICE_ACCOUNT="$(cat service-account.json)"
npx ts-node scripts/seed.ts
```

## Switch provider
Set `VITE_PROVIDER=firebase` (default) or `supabase` in `.env`.
