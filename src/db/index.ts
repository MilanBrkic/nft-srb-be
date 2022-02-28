import mongoose, {Mongoose} from "mongoose";
import Constants from "../constants/Constants";

class MongooseDatabase {
    private mongoose!: Mongoose;

    public async connect(){
        try {
            this.mongoose = await mongoose.connect(`${Constants.MONGO_BASE_CONNECTION_URL}/${Constants.NFT_SRB_DATABASE}`);
            console.log("Connected to mongoDb");
        } catch (error) {
            console.log(`Failed to connect to mnogoDb | Reason: ${error?.stack}`);
        }

    }
}

export const mongooseDb = new MongooseDatabase();