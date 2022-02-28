import { prop, ReturnModelType } from "@typegoose/typegoose";

class User{
    
    constructor(address:string){
        this.address = address;
    }
    @prop()
    address!: string;

    @prop()
    name?:string;

    @prop()
    email?:string;

    public static async findByAddress(this: ReturnModelType<typeof User>, address: string){
        return this.find({address}).exec();
    }

    public static async insert(this: ReturnModelType<typeof User>, address: string){
        return this.create({address});
    }

}
export default User;