import MulterRequest from '../multer/MulterRequest';
import { Response } from 'express';
import Lock from '../lock/Lock';
import crypto from 'crypto';

export default function unlockNft(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer } = req.file;
  const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');
  Lock.unlockNft(md5Hash);
  console.log(`Nft: ${md5Hash} unlocked`);

  res.status(200).send(`Nft: ${md5Hash} unlocked`);
}
