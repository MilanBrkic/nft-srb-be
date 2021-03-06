import { Router } from 'express';
import { upload } from '../multer/multer';
import authenticate from './authenticate';
import mint from './mint';
import getNftStatus from './nft-status';
import getAllNfts from './get-all-nfts';
import unlockNft from './unlock-nft';
import getMarketplace from './get-marketplace';
export const router = Router();

router.post('/auth', authenticate);

router.post('/mint', upload.single('image'), mint);

router.get('/marketplace', getMarketplace);

router.post('/nft/status', upload.single('image'), getNftStatus);

router.post('/nft/unlock', upload.single('image'), unlockNft);

router.get('/user/nfts', getAllNfts);
