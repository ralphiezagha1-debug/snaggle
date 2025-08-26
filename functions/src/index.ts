import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";

const app = express();

app.get("/health", (_req, res) => res.status(200).send("ok"));

export const http = onRequest(app);
