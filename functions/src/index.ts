import * as functions from "firebase-functions";

export const health = functions.https.onRequest((req, res) => {
  res.status(200).send("ok");
});
