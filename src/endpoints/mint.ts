import MulterRequest from "../multer/MulterRequest";
import {Response} from "express";
import crypto from "crypto";
import userModel from "../db/User/UserModel";
import User from "../db/User/User";
import GoogleDriveService from "../services/GoogleDriveService";
import {Duplex} from "stream";

export default async function mint(req: MulterRequest, res: Response) {
    const buffer = req.file.buffer;
    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const stream = bufferToStream(buffer);

    const media = {
      mimeType: 'image/jpeg',
      body: stream
    };

   
    const user: User = await userModel.getByImage(hash);

    if(!user){
      const address  = req.body.account;
      await saveImageWhereNeeded(address,hash,media);
      res.status(200).send("Hola Mundo");
    }
    else{
      console.log(`Image ${hash} already minted`)
      res.status(404).send("Already minted");
    }
  }

  async function saveImageWhereNeeded(address:string, hash:string,media:any){
    const googleId = await GoogleDriveService.saveFile(media);
    await userModel.addAnImage(address, hash, googleId);
    console.log(`Image ${hash} minted | Address ${address}`)
  }
  function bufferToStream(myBuuffer) {
    let tmp = new Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
}