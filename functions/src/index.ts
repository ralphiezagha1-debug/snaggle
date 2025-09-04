// Gen 2 entrypoint: keep this tiny and re-export functions.
import { onRequest } from "firebase-functions/v2/https";

export const health = onRequest((req, res) => {
  res.status(200).send("ok");
});

// Re-export your waitlist handler (named exactly as the Hosting rewrite expects)
export { joinWaitlist } from "./waitlist";
