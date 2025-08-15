import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize admin SDK once
try {
  admin.initializeApp();
} catch (e) {
  // ignore if already initialized
}

/**
 * Callable to set or clear an admin claim on a user.
 * Restrict invocation to existing admins (defense-in-depth via rules and code).
 *
 * Usage from client (admin only):
 *   const fn = httpsCallable(functions, 'setAdminClaim');
 *   await fn({ uid: 'TARGET_UID', admin: true });
 */
export const setAdminClaim = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be signed in.");
  }
  const callerUid = context.auth.uid;
  const callerToken = context.auth.token as any;
  if (!callerToken.admin) {
    throw new functions.https.HttpsError("permission-denied", "Admin only.");
  }

  const targetUid = data?.uid as string;
  const makeAdmin = !!data?.admin;
  if (!targetUid) {
    throw new functions.https.HttpsError("invalid-argument", "Expected { uid, admin }.");
  }

  await admin.auth().setCustomUserClaims(targetUid, { admin: makeAdmin });
  return { ok: true, uid: targetUid, admin: makeAdmin };
});

/**
 * Helper callable to fetch the caller's token claims (for debugging).
 */
export const whoAmI = functions.https.onCall(async (_data, context) => {
  if (!context.auth) {
    return { signedIn: false };
  }
  return {
    signedIn: true,
    uid: context.auth.uid,
    claims: context.auth.token,
  };
});
