import { onUserCreated } from "firebase-functions/v2/auth";
import * as logger from "firebase-functions/logger";
import { getApps, initializeApp } from "firebase-admin/app";

// Guard: only initialize once when code is loaded alongside other modules
if (!getApps().length) initializeApp();

/**
 * Minimal auth trigger (no email send). Keeps code load fast & safe.
 */
export const authOnCreate = onUserCreated(
  { region: "us-central1" },
  async (event) => {
    const user = event.data;
    logger.info("[authOnCreate] new user", { uid: user.uid, email: user.email });
    // no-op: we can add mail later once SendGrid is fully verified
  }
);


