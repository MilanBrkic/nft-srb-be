import { Request, Response } from 'express';
import userModel from '../db/model/UserModel';
import Nft from '../domain/Nft';
export default async function getAllNfts(req: Request, res: Response) {
  const address = req.body.address;

  if (!address) return res.status(400).send('No address provided');

  const allUsers = await userModel.getAllExcept(address);

  const nfts = [];

  allUsers.forEach((user) => {
    nfts.push(...user.nfts.filter((nft) => nft.forSale === true && nft.tokenId).map((nft) => Nft.getDto(nft)));
  });

  return res.status(200).send(nfts);
}
