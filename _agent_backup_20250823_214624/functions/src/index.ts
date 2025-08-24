import * as functions from 'firebase-functions'
import type { Request, Response } from 'express'

export const health = functions.https.onRequest((req: Request, res: Response) => {
  res.status(200).send('ok')
})
