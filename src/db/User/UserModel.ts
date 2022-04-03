import mongoose, {Schema} from "mongoose";
import imageModel from "./ImageModel";
import User from "./User";

const model = new Schema({
    address:String,
    images: [imageModel]
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

    public async getByImage(hash:string): Promise<User | null>{
        const user =  (await this.model.find({'images.hash':{$in:hash}}).exec())[0];
        return user;
    }

    public async insert(address:string):Promise<User | null>{
        return this.model.create({address});
    }

    public async addAnImage(address:string, hash: string, googleId:string, ipnft:string): Promise<User | null>{
        return this.model.updateOne({address}, {$push:{images: {hash,googleId,ipnft}}})
    }


}

const userModel = new UserModel();
export default userModel;