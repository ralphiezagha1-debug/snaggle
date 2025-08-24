import * as functions from 'firebase-functions';
import type { Request, Response } from 'express';
export { placeBid } from './placeBid';
export { closeAuction } from './closeAuction';

export const health = functions.https.onRequest((_req: Request, res: Response) => {
  res.status(200).send('ok');
});
