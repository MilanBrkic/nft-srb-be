import mongoose, { Mongoose } from 'mongoose';
import Constants from '../constants/Constants';

class MongooseDatabase {
  public mongoose!: Mongoose;

  public async connect() {
    try {
      this.mongoose = await mongoose.connect(`${Constants.MONGO_BASE_CONNECTION_URL}`);
      console.log('Connected to mongoDb');
    } catch (error) {
      console.log(`Failed to connect to mnogoDb | Reason: ${error?.stack}`);
    }
  }
}

export const mongooseDb = new MongooseDatabase();
