import { onRequest } from "firebase-functions/v2/https";

// Health check endpoint used by monitoring and CI pipelines. Responds with "ok".
export const health = onRequest((_, res) => res.status(200).send("ok"));

// Re-export the waitlist function so Firebase Hosting rewrites can locate it.
export { waitlist } from "./waitlist";

