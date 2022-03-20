import MulterRequest from "../multer/MulterRequest";
import {Response} from "express";
import crypto from "crypto";
import userModel from "../db/User/UserModel";


export default async function mint(req: MulterRequest, res: Response) {
    const hash = crypto.createHash('md5').update(req.file.buffer).digest('hex');
    const address  = req.body.account;
    console.log(`hash ${hash} user ${address}`)
    await userModel.addAnImage(address, hash);

    res.status(200).send("Hola Mundo");
  }