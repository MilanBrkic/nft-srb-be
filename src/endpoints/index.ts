import { Router } from 'express';
import { upload } from '../multer/multer';
import signIn from './sign-in';
import mint from './mint';
import getNftStatus from './nft-status';
import updateNft from './update-nft';
import buyNft from './buy-nft';
import getAllNfts from './get-all-nfts';

export const router = Router();

router.post('/sign-in', signIn);

router.post('/mint', upload.single('image'), mint);

router.post('/nft/status', upload.single('image'), getNftStatus);

router.patch('/nft', updateNft);

router.post('/buy', buyNft);

router.get('/user/:address/nfts', getAllNfts);
