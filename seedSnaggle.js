/*
 * Seed script for the Snaggle auction platform.
 *
 * This script populates Firebase Authentication and Firestore with a set of
 * mock users, auctions and transaction history to facilitate development
 * and testing. It creates one administrator and two regular test users,
 * seeds a diverse collection of 20 auctions with staggered start and end
 * times, records a handful of credit transactions for the test users,
 * updates user credit balances in Firestore and finally triggers a
 * redeployment of your Firebase Hosting and Cloud Functions to make the
 * newly seeded data immediately available.
 *
 * To run this script you must have:
 *   1. A properly configured Firebase project with Firestore and
 *      Authentication enabled.
 *   2. Appropriate permissions to create users and write to Firestore.
 *   3. Application Default Credentials set up (either via the
 *      GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to a
 *      service account key file, or by running the script via the
 *      Firebase CLI with `firebase login` and `firebase use`).
 *   4. The Firebase CLI installed and configured on your machine. The
 *      script calls `firebase deploy --only hosting,functions` once
 *      seeding completes.
 *
 * Usage:
 *   node seedSnaggle.js
 */

const admin = require('firebase-admin');
const { execSync } = require('child_process');

async function createOrUpdateUser(auth, db, userData) {
  /*
   * Create a Firebase Authentication user if one does not already exist.
   * Assign custom claims (e.g. admin privileges) and write a corresponding
   * document in Firestore with profile details and credit balance.
   */
  const { email, password, credits, customClaims } = userData;
  let userRecord;
  try {
    // Attempt to fetch an existing user by email
    userRecord = await auth.getUserByEmail(email);
    console.log(`User ${email} already exists, updating details…`);
    // If a password is provided and differs from the current one,
    // update it. Note: Firebase does not allow retrieving the current
    // password, so we attempt to set it regardless.
    await auth.updateUser(userRecord.uid, { password });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // Create a new user
      userRecord = await auth.createUser({ email, password });
      console.log(`Created user ${email} with UID ${userRecord.uid}`);
    } else {
      throw error;
    }
  }

  // Apply custom claims if provided
  if (customClaims && Object.keys(customClaims).length > 0) {
    await auth.setCustomUserClaims(userRecord.uid, customClaims);
    console.log(`Set custom claims for ${email}: ${JSON.stringify(customClaims)}`);
  }

  // Persist user profile and credit balance in Firestore
  const userDoc = db.collection('users').doc(userRecord.uid);
  await userDoc.set(
    {
      email,
      credits,
      isAdmin: !!(customClaims && customClaims.admin),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
  console.log(`Stored profile for ${email} in Firestore with ${credits} credits`);

  return userRecord;
}

async function seedAuctions(db) {
  /*
   * Create a collection of 20 auctions with staggered start and end times.
   * Each auction lasts two minutes and begins two minutes after the previous
   * one. A diverse set of items is provided to simulate real auction
   * activity. Image URLs point to Unsplash's on‑demand service; the
   * combination of query terms and a `sig` parameter helps ensure unique
   * images per item without requiring you to host any assets yourself.
   */
  const now = new Date();
  const auctions = [
    {
      title: 'Wireless Headphones',
      description: 'High‑quality wireless headphones with active noise cancellation for immersive audio.',
      query: 'wireless-headphones',
    },
    {
      title: 'Amazon Gift Card $50',
      description: 'A $50 Amazon gift card to spend on millions of items across electronics, books and more.',
      query: 'gift-card',
    },
    {
      title: 'Vintage Comic Book',
      description: 'A collectible vintage comic book in excellent condition, perfect for enthusiasts.',
      query: 'comic-book',
    },
    {
      title: 'Smartwatch',
      description: 'Stay connected and track your health with this sleek and modern smartwatch.',
      query: 'smartwatch',
    },
    {
      title: 'Lego Star Wars Set',
      description: 'Build your own galaxy with this Lego Star Wars construction set.',
      query: 'lego-star-wars',
    },
    {
      title: 'Nintendo Switch Lite',
      description: 'A portable gaming console for playing your favorite Nintendo titles on the go.',
      query: 'nintendo-switch',
    },
    {
      title: 'Apple AirTag',
      description: 'Keep track of your belongings with Apple’s small and lightweight AirTag.',
      query: 'airtag',
    },
    {
      title: 'Funko Pop Figurine',
      description: 'Collectible Funko Pop figurine of a popular character; a must‑have for fans.',
      query: 'funko-pop',
    },
    {
      title: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker delivering powerful sound and long battery life.',
      query: 'bluetooth-speaker',
    },
    {
      title: 'Retro Game Console',
      description: 'A retro game console loaded with classic games for a nostalgic gaming experience.',
      query: 'retro-game-console',
    },
    {
      title: 'iTunes Gift Card $25',
      description: 'A $25 iTunes gift card to enjoy music, movies and apps from the Apple ecosystem.',
      query: 'gift-card',
    },
    {
      title: 'Trading Card Pack',
      description: 'A sealed pack of collectible trading cards featuring rare inserts and holographics.',
      query: 'trading-card',
    },
    {
      title: 'Smart Home Light Bulb',
      description: 'Wi‑Fi enabled smart bulb that works with voice assistants for customizable lighting.',
      query: 'smart-light-bulb',
    },
    {
      title: 'Movie Theater Gift Card',
      description: 'Enjoy the latest blockbuster releases with this movie theater gift card.',
      query: 'movie-theater-gift-card',
    },
    {
      title: 'Vintage Vinyl Record',
      description: 'Classic vinyl record in great condition for audiophiles and collectors.',
      query: 'vinyl-record',
    },
    {
      title: 'Fitness Tracker',
      description: 'Monitor your activity, heart rate and sleep patterns with this lightweight fitness tracker.',
      query: 'fitness-tracker',
    },
    {
      title: 'Art Print Poster',
      description: 'High‑resolution art print poster to add style and personality to any room.',
      query: 'art-print',
    },
    {
      title: 'E‑Reader Tablet',
      description: 'Compact e‑reader with a glare‑free screen and weeks of battery life.',
      query: 'e-reader',
    },
    {
      title: 'Collectible Action Figure',
      description: 'Limited edition action figure featuring detailed sculpting and articulation.',
      query: 'action-figure',
    },
    {
      title: 'Wireless Charger',
      description: 'Fast wireless charger compatible with a wide range of Qi‑enabled devices.',
      query: 'wireless-charger',
    },
  ];

  const auctionPromises = auctions.map((item, index) => {
    const startTime = new Date(now.getTime() + index * 2 * 60 * 1000);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 1000);
    const auctionDoc = db.collection('auctions').doc();
    const imageUrl = `https://source.unsplash.com/featured/800x600?${encodeURIComponent(item.query)}&sig=${index}`;
    return auctionDoc.set({
      title: item.title,
      description: item.description,
      imageUrl,
      startPrice: 0.10,
      bidIncrement: 0.01,
      startTime: admin.firestore.Timestamp.fromDate(startTime),
      endTime: admin.firestore.Timestamp.fromDate(endTime),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
  await Promise.all(auctionPromises);
  console.log('Seeded 20 auctions into Firestore');
}

async function seedTransactions(db, userTransactions) {
  /*
   * Populate credit transaction history for specified users. Each entry in
   * userTransactions should provide a uid and a list of transaction
   * definitions. A transaction consists of an amount (positive for
   * credits added, negative for deductions), a type to categorize the
   * transaction and an optional description. The function writes these
   * entries to the `transactions` collection. Firestore will assign
   * automatically generated document IDs for each transaction.
   */
  const batch = db.batch();
  const transactionsCol = db.collection('transactions');
  const now = new Date();
  userTransactions.forEach(({ uid, transactions }) => {
    transactions.forEach((txn, idx) => {
      const txnRef = transactionsCol.doc();
      const createdAt = new Date(now.getTime() + (idx * 1000));
      batch.set(txnRef, {
        userId: uid,
        amount: txn.amount,
        type: txn.type,
        description: txn.description,
        createdAt: admin.firestore.Timestamp.fromDate(createdAt),
      });
    });
  });
  await batch.commit();
  console.log('Seeded credit transactions');
}

async function updateUserCredits(db, users) {
  /*
   * Update the credit balance for each user in Firestore after seeding
   * transactions. This function writes the final credit totals to the
   * `users/{uid}` documents.
   */
  const batch = db.batch();
  users.forEach(({ uid, credits }) => {
    const userRef = db.collection('users').doc(uid);
    batch.set(userRef, { credits }, { merge: true });
  });
  await batch.commit();
  console.log('Updated user credit balances');
}

async function main() {
  // Initialize the Firebase admin SDK using application default credentials
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
  const auth = admin.auth();
  const db = admin.firestore();

  // Define user data
  const usersData = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      credits: 1000,
      customClaims: { admin: true },
    },
    {
      email: 'user1@example.com',
      password: 'user123',
      credits: 500,
      customClaims: {},
    },
    {
      email: 'user2@example.com',
      password: 'user123',
      credits: 300,
      customClaims: {},
    },
  ];

  // Create or update users in Auth and Firestore
  const createdUsers = [];
  for (const userData of usersData) {
    const userRecord = await createOrUpdateUser(auth, db, userData);
    createdUsers.push({ uid: userRecord.uid, credits: userData.credits, email: userData.email });
  }

  // Seed auctions
  await seedAuctions(db);

  // Prepare transaction history for the test users (not the admin)
  const userTransactions = createdUsers
    .filter((u) => u.email !== 'admin@example.com')
    .map((u) => {
      if (u.email === 'user1@example.com') {
        return {
          uid: u.uid,
          transactions: [
            { amount: 500, type: 'credit_load', description: 'Initial credit load' },
            { amount: -50, type: 'bid_deduction', description: 'Bid on auction' },
            { amount: 50, type: 'manual_credit', description: 'Admin added credit' },
          ],
        };
      }
      if (u.email === 'user2@example.com') {
        return {
          uid: u.uid,
          transactions: [
            { amount: 300, type: 'credit_load', description: 'Initial credit load' },
            { amount: -30, type: 'bid_deduction', description: 'Bid on auction' },
            { amount: 30, type: 'manual_credit', description: 'Admin added credit' },
          ],
        };
      }
      return { uid: u.uid, transactions: [] };
    });

  // Seed transaction history
  await seedTransactions(db, userTransactions);

  // Update final credit balances
  await updateUserCredits(db, createdUsers);

  // Redeploy Firebase hosting and functions to ensure data is live
  try {
    console.log('Redeploying Firebase hosting and functions…');
    execSync('firebase deploy --only hosting,functions', { stdio: 'inherit' });
    console.log('Deployment complete');
  } catch (deployError) {
    console.error('Failed to deploy Firebase:', deployError.message);
  }

  console.log('Seeding complete');
}

main().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});