import { Schema } from 'mongoose';

const imageModel = new Schema({
  md5Hash: String,
  googleId: String,
  ipnft: String,
  transactionHash: String
});
export default imageModel;
