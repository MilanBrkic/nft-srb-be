import { NextFunction, Request, Response } from 'express';
import multer from 'multer'
import {v4} from 'uuid'

const DIR = './public/';
const storage = multer.memoryStorage()

export const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});
