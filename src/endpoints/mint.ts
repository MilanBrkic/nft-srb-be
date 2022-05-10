import MulterRequest from '../multer/MulterRequest';
import { Response } from 'express';
import crypto from 'crypto';
import userModel from '../db/User/UserModel';
import User from '../db/User/User';
import GoogleDriveService from '../services/GoogleDriveService';
import { Duplex } from 'stream';
import NFTStorageService from '../services/NFTStorageService';
import INFTStorageToken from '../domain/NFTStorageToken';
import Lock from '../lock/Lock';

export default async function mint(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer, originalname, mimetype } = req.file;
  const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');

  const user: User = await userModel.getByImage(md5Hash);

  if (!user) {
    const address = req.body.account;
    const ipnft = req.body.ipnft;
    const url = req.body.url;

    console.log(ipnft);
    console.log(url);
    // saveImageWhereNeeded(address, md5Hash, buffer, originalname, mimetype).catch((err) => {
    //   console.error(`Error in saveImageWhereNeeded | Address: ${address} | originalname: ${originalname} | Reason: ${err.message}`);
    // });

    return res.status(200).send('Image info saved to db');
  } else {
    console.log(`Image ${md5Hash} already minted`);
    return res.status(400).send('Already minted');
  }
}
async function saveImageWhereNeeded(address: string, md5Hash: string, buffer: any, originalname: string, mimeType: string) {
  console.log(`Minting for address ${address} started`);

  const stream = bufferToStream(buffer);
  const media = {
    mimeType,
    body: stream
  };

  const googleId = await GoogleDriveService.saveFile(media);
  console.log(`Google Id: ${googleId} | Hash: ${md5Hash} | Address: ${address}`);

  await userModel.addAnImage(address, md5Hash, googleId, 'da', 'da');

  console.log(`Image ${md5Hash} minted | Google Id: ${googleId} | Address: ${address}`);

  Lock.unlockImage(md5Hash);
}
function bufferToStream(myBuuffer) {
  let tmp = new Duplex();
  tmp.push(myBuuffer);
  tmp.push(null);
  return tmp;
}
