import { onRequest } from "firebase-functions/v2/https";

export const health = onRequest((_, res) => res.status(200).send("ok"));

// Re-export joinWaitlist so Hosting can find it
export { joinWaitlist } from "./waitlist";
