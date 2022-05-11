import { Request, Response } from 'express';
import userModel from '../db/model/UserModel';
import Nft from '../domain/Nft';
export default async function updateNft(req: Request, res: Response) {
  const md5Hash = req.body.md5Hash;
  const price = req.body.price;
  const forSale = req.body.forSale;
  let nft: Nft;

  if (!md5Hash) {
    return res.status(400).send('md5Hash not provided');
  }

  const user: any = await userModel.getByNft(md5Hash);

  if (!user) {
    return res.status(404).send('Nft not found');
  }

  nft = user.nfts.find((nft: Nft) => nft.md5Hash === md5Hash);

  if (forSale !== undefined && forSale !== null) {
    if (typeof forSale === 'boolean') {
      nft.forSale = forSale;
    } else {
      console.log('forSale is not boolean');
    }
  }

  if (price) {
    if (typeof price === 'number') {
      nft.price = price;
    } else {
      console.log('price is not number');
    }
  }

  await user.save();
  return res.status(200).send(`Nft: ${md5Hash} updated`);
}
