import { Schema } from 'mongoose';

const nftModel = new Schema({
  md5Hash: String,
  googleId: String,
  ipnft: String,
  transactionHash: String
});
export default nftModel;
