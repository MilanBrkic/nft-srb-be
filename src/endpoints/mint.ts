import MulterRequest from "../multer/MulterRequest";
import {Response} from "express";
import crypto from "crypto";
import userModel from "../db/User/UserModel";
import User from "../db/User/User";
import GoogleDriveService from "../services/GoogleDriveService";


export default async function mint(req: MulterRequest, res: Response) {
    const hash = crypto.createHash('md5').update(req.file.buffer).digest('hex');
    await GoogleDriveService.listFiles()
    // const user: User = await userModel.getByImage(hash);

    // if(!user){
    //   const address  = req.body.account;
    //   await userModel.addAnImage(address, hash);
    //   console.log(`Image ${hash} minted | Address ${address}`)
    //   res.status(200).send("Hola Mundo");
    // }
    // else{
    //   console.log(`Image ${hash} already minted minted`)
    //   res.status(404).send("Already minted");
    // }
  }