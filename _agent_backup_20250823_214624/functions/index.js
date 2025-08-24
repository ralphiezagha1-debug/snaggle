const functions = require("firebase-functions");
exports.health = functions.https.onRequest((req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).send("OK");
});
