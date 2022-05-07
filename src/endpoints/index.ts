import { Router } from 'express';
import signIn from './sign-in';
import { upload } from '../multer/multer';
import mint from './mint';
import getAllImages from './get-all-images';

export const router = Router();

router.post('/mint', upload.single('image'), mint);

router.post('/sign-in', signIn);

router.get('/user/:address/images', getAllImages);
