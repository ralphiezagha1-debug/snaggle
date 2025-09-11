import * as functions from "firebase-functions";

/**
 * Classic v1 auth trigger (CJS-friendly).
 * Switch back to v2 later once we flip the project to ESM.
 */
export const authOnCreate = functions.auth.user().onCreate(async (user) => {
  console.log("New user:", user.uid, user.email);
  // TODO: hook SendGrid welcome/verify here
});
