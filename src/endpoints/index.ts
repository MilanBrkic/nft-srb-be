import { Router } from 'express';
import signIn from './sign-in';
import { upload } from '../multer/multer';
import mint from './mint';
import getAllNfts from './get-all-nfts';
import { getNftStatus } from './nft-status';

export const router = Router();

router.post('/mint', upload.single('image'), mint);

router.post('/sign-in', signIn);

router.get('/user/:address/nfts', getAllNfts);

router.post('/nft/status', upload.single('image'), getNftStatus);
