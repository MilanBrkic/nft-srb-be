import { Request, Response } from 'express';

export default async function getAllImages(req: Request, res: Response) {
  const walletId = req.params.id;
  console.log(walletId);
  return res.status(200);
}
