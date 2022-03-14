import {Response, Router} from "express";
import { signIn } from "./sign-in";
import { upload } from '../multer/multer'
import MulterRequest from "../multer/MulterRequest";

export const router = Router();

router.post('/mint', upload.single('image'),(req: MulterRequest, res: Response) => {
    console.log(`file: ${req.file}`);
    res.status(200).send("Hola Mundo");
  });
  
router.post('/sign-in', signIn);