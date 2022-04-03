import {Request, Response} from "express";
import User from "../db/User/User";
import userModel from "../db/User/UserModel";
import GoogleDriveService from "../services/GoogleDriveService";

export default async function signIn(req:Request, res:Response){
    GoogleDriveService.getFile('1HKL2Gtq65a0D1_9zK5nSE3kkAvoZhcbY');
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