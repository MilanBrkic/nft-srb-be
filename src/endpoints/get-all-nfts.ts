import { Request, Response } from 'express';
import User from '../domain/User';
import userModel from '../db/model/UserModel';

export default async function getAllNfts(req: Request, res: Response) {
  const address = req.params.address;
  const user: User = await userModel.findByAddress(address);

  if (!user) {
    return res.status(400).send('User does not exist');
  }
  const response = user.nfts.map((nft) => {
    return {
      googleId: nft.googleId,
      image: nft.ipfsMetadata.image,
      name: nft.ipfsMetadata.name,
      description: nft.ipfsMetadata.description
    };
  });

  return res.status(200).send(response);
}
