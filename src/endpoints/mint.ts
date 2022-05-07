import MulterRequest from '../multer/MulterRequest';
import { Response } from 'express';
import crypto from 'crypto';
import userModel from '../db/User/UserModel';
import User from '../db/User/User';
import GoogleDriveService from '../services/GoogleDriveService';
import { Duplex } from 'stream';
import NFTStorageService from '../services/NFTStorageService';
import INFTStorageToken from '../domain/NFTStorageToken';

export default async function mint(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer, originalname, mimetype } = req.file;
  const hash = crypto.createHash('md5').update(buffer).digest('hex');

  const user: User = await userModel.getByImage(hash);

  if (!user) {
    const address = req.body.account;
    try {
      await saveImageWhereNeeded(address, hash, buffer, originalname, mimetype);
    } catch (error) {
      console.log(`Error in mint | Reason: ${error.message}`);
      return res.status(500).send('Error while minting');
    }
    return res.status(200).send('Hola Mundo');
  } else {
    console.log(`Image ${hash} already minted`);
    return res.status(404).send('Already minted');
  }
}

async function saveImageWhereNeeded(address: string, hash: string, buffer: any, originalname: string, mimetype: string) {
  const stream = bufferToStream(buffer);
  const media = {
    mimeType: 'image/jpeg',
    body: stream
  };

  const googleId = await GoogleDriveService.saveFile(media);
  const nftStorageToken: INFTStorageToken = await NFTStorageService.storeNFT(buffer, originalname, 'test', mimetype);
  await userModel.addAnImage(address, hash, googleId, nftStorageToken.ipnft);

  console.log(`Image ${hash} minted | NFTStorage token: ${nftStorageToken.ipnft} | Google Id: ${googleId} Address ${address}`);
}
function bufferToStream(myBuuffer) {
  let tmp = new Duplex();
  tmp.push(myBuuffer);
  tmp.push(null);
  return tmp;
}
