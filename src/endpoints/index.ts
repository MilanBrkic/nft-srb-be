import {Router} from "express";
import  signIn  from "./sign-in";
import { upload } from '../multer/multer'
import mint from "./mint";


export const router = Router();

router.post('/mint', upload.single('image'),mint);
  
router.post('/sign-in', signIn);