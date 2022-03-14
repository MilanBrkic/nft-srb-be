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

    public static async findByAddress(this: ReturnModelType<typeof User>, address: string):Promise<User | undefined>{
        const user:User = (await this.find({address}).exec())[0];
        return user;
    }

    public static async insert(this: ReturnModelType<typeof User>, address: string):Promise<User>{
        const user = await this.create({address});
        return user;
    }

}
export default User;