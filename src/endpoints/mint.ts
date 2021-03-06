import MulterRequest from '../multer/MulterRequest';
import { Response } from 'express';
import crypto from 'crypto';
import userModel from '../db/model/UserModel';
import User from '../domain/User';
import GoogleDriveService from '../services/GoogleDriveService';
import { Duplex } from 'stream';
import Lock from '../lock/Lock';
import Nft from '../domain/Nft';
import JWTService from '../services/JWTService';

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

  const user: User = await userModel.getByNft(md5Hash);

  if (!user) {
    const nft = new Nft(md5Hash, getAddress(req.headers.authorization), req.body.ipnft, req.body.price);
    console.log(`Enriching nft ${md5Hash} with metadata...`);
    await nft.enrichWithMetadata();
    console.log(`Nft ${md5Hash} enriched`);

    try {
      await saveNftWhereNeeded(nft, media);
    } catch (error) {
      console.log(`Error in saveNftWhereNeeded | hash: ${nft.md5Hash} | Address: ${nft.address} | Reason: ${error.message}`);
      return res.status(500).send();
    }

    return res.status(200).send('Nft info saved to db');
  } else {
    console.log(`Nft: ${md5Hash} already minted`);
    return res.status(400).send('Already minted');
  }
}
async function saveNftWhereNeeded(nft: Nft, media: { mimeType: string; body: any }) {
  const googleId = await GoogleDriveService.saveFile(media);
  nft.googleId = googleId;
  console.log(`Google Id: ${googleId} | Hash: ${nft.md5Hash} | Address: ${nft.address}`);

  await userModel.addNft(nft.address, nft);

  Lock.unlockNft(nft.md5Hash);
  console.log(`Nft: ${nft.md5Hash} saved and unlocked | Google Id: ${googleId} | Address: ${nft.address}`);
}
function bufferToStream(myBuffer: any) {
  let tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}

function getAddress(auth: string) {
  const bearer = auth.split(' ')[1];
  return (JWTService.verify(bearer) as any).address;
}
