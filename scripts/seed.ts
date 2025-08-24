import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

function loadCreds() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!json) throw new Error('FIREBASE_SERVICE_ACCOUNT env var not set');
  return JSON.parse(json);
}

async function main() {
  const creds = loadCreds();
  initializeApp({ credential: cert(creds) });
  const db = getFirestore();

  const auctions = [
    { title: 'Nintendo Switch OLED', currentPrice: 10, bidIncrement: 1, status: 'open', createdAt: Date.now() },
    { title: 'AirPods Pro', currentPrice: 5, bidIncrement: 1, status: 'open', createdAt: Date.now() },
  ];

  for (const a of auctions) {
    await db.collection('auctions').add(a);
  }

  console.log('Seed complete.');
}

main().catch(e => { console.error(e); process.exit(1); });
