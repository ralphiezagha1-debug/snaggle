import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp } from "firebase-admin/app";

if (getApps().length === 0) { initializeApp(); }

export const closeAuction = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  // TODO: implement close logic with Firestore
  // const db = getFirestore();
  // ...

  res.status(200).send("ok");
});


