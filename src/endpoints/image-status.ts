import { Response } from 'express';
import crypto from 'crypto';
import Lock from '../lock/Lock';
import userModel from '../db/User/UserModel';
import User from '../db/User/User';
import MulterRequest from '../multer/MulterRequest';

export async function getImageStatus(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer } = req.file;
  const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');

  const user: User = await userModel.getByImage(md5Hash);

  if (!user) {
    if (Lock.contains(md5Hash)) {
      console.log(`Image: ${md5Hash} currently minting`);
      return res.status(400).send('Image currently minting');
    }
    Lock.lockImage(md5Hash);
    console.log(`Image: ${md5Hash} locked for minting`);
    return res.status(200).send('Image can be minted');
  } else {
    console.log(`Image ${md5Hash} already minted`);
    return res.status(400).send('Already minted');
  }
}
