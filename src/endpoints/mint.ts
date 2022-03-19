import MulterRequest from "../multer/MulterRequest";
import {Response} from "express";
import crypto from "crypto";
import { userModel } from "../db/User/userModel";


export default async function mint(req: MulterRequest, res: Response) {
    const hash = crypto.createHash('md5').update(req.file.buffer).digest('hex');
    const address  = req.body.account;
    console.log(`hash ${hash} user ${address}`)
    const user = await userModel.addAnImage(address, hash);
    console.log(`User: ${JSON.stringify(user)}`)
    res.status(200).send("Hola Mundo");
  }