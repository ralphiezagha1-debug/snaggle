const admin = require("firebase-admin");

// Load your Firebase service account JSON
const serviceAccount = require("./snaggle-ed88d-firebase-adminsdk-fbsvc-d84e5eb427.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedDatabase() {
  try {
    // ---- Token Economy Setup ----
    const tokens = [
      {
        name: "Snaggle Credits",
        symbol: "SNG",
        initialSupply: 1000000,
        exchangeRateUSD: 0.01, // 1 cent per token
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    // ---- Auctions Sample ----
    const auctions = [
      {
        title: "Nintendo Switch OLED",
        description: "Brand new Nintendo Switch OLED - starts at 1 token",
        startTime: new Date(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h from now
        startingBid: 1,
        currentBid: 1,
        status: "active"
      },
      {
        title: "Apple AirPods Pro 2",
        description: "Latest AirPods Pro, noise-cancelling",
        startTime: new Date(),
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48h
        startingBid: 1,
        currentBid: 1,
        status: "active"
      }
    ];

    // ---- Users Sample ----
    const users = [
      {
        username: "testuser",
        email: "test@snaggle.fun",
        balance: 100,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    // ---- Marketplace (User Listings) ----
    const marketplace = [
      {
        title: "PS5 Controller",
        priceTokens: 500,
        sellerId: "testuser",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        title: "Gift Card $25",
        priceTokens: 2500,
        sellerId: "testuser",
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    // Clear existing collections
    console.log("Clearing old collections...");
    const collections = ["tokens", "auctions", "users", "marketplace"];
    for (const col of collections) {
      const snapshot = await db.collection(col).get();
      const batch = db.batch();
      snapshot.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }

    // Insert tokens
    console.log("Seeding tokens...");
    for (const token of tokens) {
      await db.collection("tokens").add(token);
    }

    // Insert auctions
    console.log("Seeding auctions...");
    for (const auction of auctions) {
      await db.collection("auctions").add(auction);
    }

    // Insert users
    console.log("Seeding users...");
    for (const user of users) {
      await db.collection("users").add(user);
    }

    // Insert marketplace
    console.log("Seeding marketplace listings...");
    for (const listing of marketplace) {
      await db.collection("marketplace").add(listing);
    }

    console.log("Database seed complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
