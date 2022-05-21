import { Request, Response } from 'express';
import User from '../domain/User';
import userModel from '../db/model/UserModel';
import Nft from '../domain/Nft';

export default async function getAllNfts(req: Request, res: Response) {
  const address = req.body.address;
  const user: User = await userModel.findByAddress(address);

  if (!user) {
    return res.status(400).send('User does not exist');
  }
  const response = user.nfts.filter((nft) => nft.tokenId !== null && nft.tokenId !== undefined).map((nft) => Nft.getDto(nft));

  return res.status(200).send(response);
}
