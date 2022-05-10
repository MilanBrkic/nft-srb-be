import MulterRequest from '../multer/MulterRequest';
import { Response } from 'express';
import crypto from 'crypto';
import userModel from '../db/User/UserModel';
import User from '../db/User/User';
import GoogleDriveService from '../services/GoogleDriveService';
import { Duplex } from 'stream';
import Lock from '../lock/Lock';
import Image from '../db/User/Image';

export default async function mint(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer, mimetype } = req.file;
  const stream = bufferToStream(buffer);
  const media = {
    mimeType: mimetype,
    body: stream
  };

  const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');

  const user: User = await userModel.getByImage(md5Hash);

  if (!user) {
    const image = new Image(md5Hash, req.body.account, req.body.ipnft);
    await image.enrichWithMetadata();

    console.log(`Image: ${JSON.stringify(image)}`);
    // await saveImageWhereNeeded(image, media);

    return res.status(200).send('Image info saved to db');
  } else {
    console.log(`Image ${md5Hash} already minted`);
    return res.status(400).send('Already minted');
  }
}
async function saveImageWhereNeeded(image: Image, media: { mimeType: string; body: any }) {
  console.log(`Minting started | Address:  ${image.userAddress} | Hash: ${image.md5Hash}`);

  const googleId = await GoogleDriveService.saveFile(media);
  console.log(`Google Id: ${googleId} | Hash: ${image.md5Hash} | Address: ${image.userAddress}`);

  // await userModel.addAnImage(image.userAddress, image.md5Hash, googleId, 'da', 'da');

  console.log(`Image ${image.md5Hash} minted | Google Id: ${googleId} | Address: ${image.userAddress}`);

  Lock.unlockImage(image.md5Hash);
}
function bufferToStream(myBuffer: any) {
  let tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}
