import {Request, Response} from "express";
import User from "../db/User/User";
import { userModel } from "../db/User/userModel";

export async function signIn(req:Request, res:Response){
    const address = req.body.accounts[0];
    let user:User;

    if(!address){
        return res.status(404).send("No account sent");
    }
    try {   
        user = await userModel.findByAddress(address);
        if(user){
            console.log(`User logged in with address: ${user.address}`)
            return res.status(200).send({new_user:false, user});
        }
        else {
            user = await userModel.insert(address);
            return res.status(201).send({new_user:true, user})
        }
    } catch (error) {
        console.log(`signIn() function | Reason ${error?.stack}`)
        return res.status(500).end();
    }
}``