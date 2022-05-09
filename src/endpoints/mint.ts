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
import NftSrb from '../nftsrb/NftSrb';

export default async function mint(req: MulterRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send('File not specified');
  }

  const { buffer, originalname, mimetype } = req.file;
  const md5Hash = crypto.createHash('md5').update(buffer).digest('hex');

  if (Lock.contains(md5Hash)) {
    console.log(`Image: ${md5Hash} currently minting`);
    return res.status(400).send('Image currently minting');
  }

  const user: User = await userModel.getByImage(md5Hash);

  if (!user) {
    const address = req.body.account;
    Lock.lockImage(md5Hash);
    saveImageWhereNeeded(address, md5Hash, buffer, originalname, mimetype).catch((err) => {
      console.error(`Error in saveImageWhereNeeded | Address: ${address} | originalname: ${originalname} | Reason: ${err.message}`);
    });

    return res.status(200).send('Image is minting');
  } else {
    console.log(`Image ${md5Hash} already minted`);
    return res.status(400).send('Already minted');
  }
}
async function saveImageWhereNeeded(address: string, md5Hash: string, buffer: any, originalname: string, mimetype: string) {
  console.log(`Minting for address ${address} started`);

  const stream = bufferToStream(buffer);
  const media = {
    mimeType: 'image/jpeg',
    body: stream
  };

  const googleId = await GoogleDriveService.saveFile(media);
  console.log(`Google Id: ${googleId} | Hash: ${md5Hash} | Address: ${address}`);

  const nftStorageToken: INFTStorageToken = await NFTStorageService.storeNFT(buffer, originalname, googleId, mimetype);
  console.log(`NFTStorage token: ${nftStorageToken.ipnft} | Hash: ${md5Hash} | Address: ${address}`);

  const nftsrb = new NftSrb('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');
  const transactionHash = await nftsrb.mint(nftStorageToken.ipnft);
  console.log(`Token ${nftStorageToken.ipnft} minted | Blockchain transaction hash: ${transactionHash} | Address: ${address}`);

  await userModel.addAnImage(address, md5Hash, googleId, nftStorageToken.ipnft, transactionHash);

  console.log(
    `Image ${md5Hash} minted | NFTStorage token: ${nftStorageToken.ipnft} | Google Id: ${googleId} | Blockchain transaction hash: ${transactionHash} | Address: ${address}`
  );

  Lock.unlockImage(md5Hash);
}
function bufferToStream(myBuuffer) {
  let tmp = new Duplex();
  tmp.push(myBuuffer);
  tmp.push(null);
  return tmp;
}
