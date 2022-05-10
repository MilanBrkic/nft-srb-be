import { Request, Response } from 'express';
import IUser from '../domain/IUser';
import userModel from '../db/model/UserModel';

export default async function getAllNfts(req: Request, res: Response) {
  const address = req.params.address;
  const user: IUser = await userModel.findByAddress(address);

  if (!user) {
    return res.status(400).send('User does not exist');
  }

  return res.status(200).send(user.nfts);
}
