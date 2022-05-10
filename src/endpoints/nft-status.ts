import { Response } from 'express';
import crypto from 'crypto';
import Lock from '../lock/Lock';
import userModel from '../db/model/UserModel';
import User from '../domain/User';
import MulterRequest from '../multer/MulterRequest';

export async function getNftStatus(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer } = req.file;
  const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');

  const user: User = await userModel.getByNft(md5Hash);

  if (!user) {
    if (Lock.contains(md5Hash)) {
      console.log(`Nft: ${md5Hash} currently minting`);
      return res.status(400).send('Nft currently minting');
    }
    Lock.lockNft(md5Hash);
    console.log(`Nft: ${md5Hash} locked for minting`);
    return res.status(200).send('Nft can be minted');
  } else {
    console.log(`Nft ${md5Hash} already minted`);
    return res.status(400).send('Already minted');
  }
}
