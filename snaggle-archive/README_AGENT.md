# Agent Deploy Instructions

1. Unpack this ZIP.
2. Confirm `config.js` has Firebase + Stripe keys (test/live toggle).
3. Run `build_and_deploy.sh` to build and deploy to Firebase Hosting (snaggle.fun).
4. Apply `firestore.rules` and `firestore.indexes.json`.
5. Import `seed_data.json` to populate auctions and test user.
6. Output DNS records (if needed) and confirm live site.

Test login: test@snaggle.fun / password123 (mock credits: 100).
