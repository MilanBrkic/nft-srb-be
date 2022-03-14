import multer from 'multer'
import {v4} from 'uuid'

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, DIR);
    },
    filename: (_req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, v4() + '-' + fileName)
    }
});

export let upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});