import {Router} from "express";
import { signIn } from "./sign-in";
export const router = Router();

router.get('/user/:id/get-all', (req, res) => {
    console.log("Hola Mundo");
    res.status(200).send("Hola Mundo");
  });
  
router.post('/sign-in', signIn);