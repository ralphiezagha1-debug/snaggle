"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeAuction = void 0;
const https_1 = require("firebase-functions/v2/https");
const app_1 = require("firebase-admin/app");
if ((0, app_1.getApps)().length === 0) {
    (0, app_1.initializeApp)();
}
exports.closeAuction = (0, https_1.onRequest)(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    // TODO: implement close logic with Firestore
    // const db = getFirestore();
    // ...
    res.status(200).send("ok");
});
