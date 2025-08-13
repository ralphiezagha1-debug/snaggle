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