import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import cors from "cors";

if (!getApps().length) initializeApp();

const ADMIN_PURGE_KEY = defineSecret("ADMIN_PURGE_KEY");
const allow = cors({ origin: ["https://snaggle.fun", "http://localhost:5173"] });

export const purgeByEmailV2 = onRequest(
  { region: "us-central1", secrets: [ADMIN_PURGE_KEY] },
  async (req, res) => {
    allow(req, res, async () => {
      if (req.method !== "POST") return res.status(405).json({ ok:false, error:"POST only" });

      const key = req.headers["x-admin-key"] as string | undefined;
      if (!key || key !== ADMIN_PURGE_KEY.value()) return res.status(401).json({ ok:false, error:"Unauthorized" });

      const email = (req.body?.email as string | undefined)?.trim();
      if (!email) return res.status(400).json({ ok:false, error:"Missing email" });

      const auth = getAuth();
      const db   = getFirestore();

      let authDeleted = false;
      try {
        const u = await auth.getUserByEmail(email);
        await auth.deleteUser(u.uid);
        authDeleted = true;
      } catch { /* ignore if not found */ }

      const snap = await db.collection("waitlist").where("email","==",email).get();
      const batch = db.batch();
      snap.forEach(doc => batch.delete(doc.ref));
      if (!snap.empty) await batch.commit();

      return res.json({ ok:true, authDeleted, docsDeleted: snap.size });
    });
  }
);


