import {Request, Response} from "express";
import User from "../db/User/User";
import userModel from "../db/User/UserModel";

export default async function signIn(req:Request, res:Response){
    const address = req.body.accounts[0];
    let user:User;

    if(!address){
        res.status(404).send("No account sent");
    }
    try {   
        user = await userModel.findByAddress(address);
        if(user){
            console.log(`User logged in with address: ${user.address}`)
            res.status(200).send({new_user:false, address: user.address});
        }
        else {
            user = await userModel.insert(address);
            console.log(`User created with address: ${user.address}`)
            res.status(201).send({new_user:true, address: user.address})
        }
    } catch (error) {
        console.log(`signIn() function | Reason ${error?.stack}`)
        res.status(500).end();
    }
}