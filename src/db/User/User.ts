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

    md5Images:string[];

    public static async findByAddress(this: ReturnModelType<typeof User>, address: string):Promise<User | undefined>{
        const user:User = (await this.find({address}).exec())[0];
        return user;
    }

    public static async insert(this: ReturnModelType<typeof User>, address: string):Promise<User>{
        const user = await this.create({address});
        return user;
    }

    public static async addAnImage(this: ReturnModelType<typeof User>, address:string, md5Image:string){
        const user = await this.updateOne({address:"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"}, {md5Images: md5Image})
        return user;
    }

}
export default User;