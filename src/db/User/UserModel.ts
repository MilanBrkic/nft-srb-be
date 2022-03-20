import mongoose from "mongoose";
import {Schema} from "mongoose";
import User from "./User";

const model = new Schema({
    address:String,
    imagesHash: [String]
})

class UserModel{
    private model;
    constructor(){
        this.model = mongoose.model('users',model)
    }    
    
    
    public async findByAddress(address: string):Promise<User | null>{
        const user = (await this.model.find({address}).exec())[0];
        return user;
    }

    public async getByImage(imageHash:string): Promise<User | null>{
        const user =  (await this.model.find({imagesHash:{$in:imageHash}}).exec())[0];
        return user;
    }

    public async insert(address:string):Promise<User | null>{
        return this.model.create({address});
    }

    public async addAnImage(address:string, imageHash: string): Promise<User | null>{
        return this.model.updateOne({address}, {$push:{imagesHash: imageHash}})
    }


}

const userModel = new UserModel();
export default userModel;