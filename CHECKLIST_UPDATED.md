<!-- BEGIN SNAGGLE PENDING TASKS -->
# Pending Task List (Actionable)

## Backend & Rules
- [ ] Confirm Firebase CLI login (firebase login) and firebase use snaggle-fun.
- [ ] Keep Storage disabled until image uploads ship; rules must deny writes.
- [ ] Add Security Rules for: users, auctions, bids, credits; server-verified writes for bids.
- [ ] Cloud Function (optional P0): validate bid & extend timer atomically.

## Frontend
- [ ] Auction List & Detail wired to Firestore streams.
- [ ] Wallet page (tokens/credits history + purchase tokens via Stripe).
- [ ] Rewards page (daily check-ins, referral code).
- [ ] Admin panel MVP (create auction, seed images via URLs).

## Tokens & Credits
- [ ] Implement "lose → credit" issuance (50% cap, 30-day expiry).
- [ ] Credit application at checkout for marketplace items.
- [ ] Config toggles in configs: creditRate, creditExpiryDays.

## DevOps
- [ ] GitHub Actions: preview on PR, prod on main.
- [ ] Nightly Firestore export (admin manual step acceptable P0).
- [ ] Add HOST/env secrets and verify custom domain stays mapped.

## Legal/Policy
- [ ] ToS/Privacy/Refunds pages; disclose token price (.60), credit policy.
- [ ] Seller terms for inventory, shipping, and chargebacks.

## Stretch (P1+)
- [ ] Firebase Storage + upload UI + signed resize.
- [ ] Push notifications; leaderboards; marketplace expansion.
<!-- END SNAGGLE PENDING TASKS -->

<!-- BEGIN SNAGGLE BLUEPRINT A-Z -->
# Snaggle Blueprint (A→Z)

1) **Repo & Infra**
   - Stack: Vite + React + shadcn/ui; Firebase (Hosting, Firestore, Auth; Storage later).
   - Domains: **snaggle.fun** (live). GitHub Actions for CI/CD.
   - Envs: dev, preview, prod with protected branches.
   - **Long-term migration path:** Abstract bidding logic behind `bidApi`. Start on Firebase for speed, but plan to migrate the bidding core to **Supabase (Postgres + Realtime) + Vercel** for transactions, realtime channels, and cron jobs. Firebase may remain only for FCM push notifications.

2) **Data Model (Firestore)**
   - users: profile, balances (tokens, credits), role, strike counters.
   - auctions: item meta, retailPrice, tokenBidCost = **.60**, current price, endTime, status.
   - bids: (auctionId, userId, ts).
   - credits: issue on loss (e.g., **50%** of token value), expires **30 days**.
   - rewards: daily visits, referrals, streaks.
   - configs: site-wide tunables (bid increment seconds, fees, caps).

3) **Auth & Roles**
   - Email/Password + OAuth; roles: admin, seller, buyer.
   - Basic KYC hooks (optional), fraud flags, account holds.

4) **Auction Engine (near-real-time)**
   - Client subscribes to auctions/:id and bids subcollection.
   - Extend timer on bid (classic penny): configurable add-seconds.
   - Hard caps: max duration, max effective price.
   - Server-verified writes via Security Rules and/or Cloud Function.

5) **Tokens & Credits**
   - Token price: **.60**.
   - Losers credit back **up to 50%** of token value, **expires in 30 days**, marketplace spendable.
   - Wallet page: tokens, credits, history; staking (optional phase 2).

6) **Payments**
   - Stripe (tokens), store credit redemption (no cash-out).
   - Admin reconciliation & reports.

7) **UI/UX**
   - No cart; fast bid flow; minimal friction.
   - Pages: Home feed, Auction detail, Wallet, Rewards, Profile, Admin.
   - Gamification: streaks, daily check-ins, referrals, leaderboards.

8) **Images/Storage**
   - Phase 1: image URLs (seeded). Phase 2: Firebase Storage + rules.

9) **Notifications**
   - Email (SendGrid) + optional push: outbid, won, shipping status.

10) **Analytics & Logging**
   - Page analytics, conversion funnels, auction KPIs, fraud signals.

11) **Security & Compliance**
   - Firestore rules least-privilege; rate limiting; audit trail.
   - Policies/ToS; age block; refunds policy for malfunctions only.

12) **DevOps**
   - CI: lint, build, deploy to preview on PR, prod on main.
   - Backups: scheduled export of Firestore; secret management.

13) **Roadmap Phases**
   - P0: Live auctions, tokens, credits, basic rewards.
   - P1: Marketplace for credits, better analytics, Storage uploads.
   - P2: Staking, advanced seller tools, push notifications.
<!-- END SNAGGLE BLUEPRINT A-Z -->

# Snaggle Features & Setup Checklist

## Core Functionality
- [x] Live auctions with bidding logic
- [x] Firestore rules deployed (secure + error-resistant)
- [ ] Auction scheduling & expiration automation (Cloud Functions)
- [ ] Payment processing integration (Stripe/PayPal)
- [ ] Token/credit system with win/loss rules and expirations

## User Management
- [x] Firebase Authentication (email/Google/etc.)
- [ ] Admin dashboard for auction management
- [ ] User profile editing in-app
- [ ] Profile picture upload (**depends on Storage**)

## Media & Assets
- [ ] Firebase **Storage** enabled & rules deployed (**SKIPPED for now**)
  - Needed for: auction item images, profile photos, banners
  - Current status: using static/external URLs; no in-app uploads
  - When ready: upgrade to Blaze → Storage → Get started → choose region → deploy storage.rules
- [ ] Image compression & optimization pipeline

## Security & Rules
- [x] Error-resistant Firestore rules live
- [ ] Tighten prod rules after feature freeze
- [ ] Create all required composite indexes (watch console prompts)

## Deployment & Automation
- [x] Firebase Hosting live on snaggle.fun
- [ ] GitHub Actions CI/CD for rules & app
- [ ] Automated Firestore backups

## Follow-ups / Notes
- [ ] Add `setAdminClaim` callable deploy + grant admin to primary account
- [ ] Map custom domain to correct project ID in workflows/secrets
- [ ] Revisit Storage once images/uploads are required

## Run Log
- **2025-08-12 23:02:56 -04:00** — Patched deploy script to Firestore-only (project: **snaggle-fun**); deploy: **success**; commit: **pushed (6bd6418)**.
- **2025-08-12 23:06:34 -04:00** — Merged A→Z blueprint and pending tasks into CHECKLIST.md (commit pending).
