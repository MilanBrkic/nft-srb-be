import { Request, Response } from 'express';
import User from '../db/User/User';
import userModel from '../db/User/UserModel';

export default async function getAllImages(req: Request, res: Response) {
  const address = req.params.address;
  const user: User = await userModel.findByAddress(address);

  if (!user) {
    return res.status(400).send('User does not exist');
  }

  return res.status(200).send(user.images);
}
