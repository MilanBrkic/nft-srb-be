import {Request, response, Response} from "express";
import { userModel } from "../db/User/userModel";

export async function signIn(req:Request, res:Response){
    const address = req.body.accounts[0];
    

    if(!address){
        return res.status(404).send("No account sent");
    }
    try {   
        const user = await userModel.findByAddress(address);
        if(user.length){
            return res.status(200).send({new_user:false, user});
        }
        else {
            await userModel.insert(address);
            return res.status(201).send({new_user:true})
        }
    } catch (error) {
        console.log(`signIn() function | Reason ${error?.stack}`)
        return res.status(500).end();
    }
}