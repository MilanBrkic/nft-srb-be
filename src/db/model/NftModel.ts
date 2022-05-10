import { Schema } from 'mongoose';
import ipfsMetadataModel from './IpfsMetadataModel';

const nftModel = new Schema({
  md5Hash: String,
  address: String,
  googleId: String,
  ipfsToken: String,
  ipfsUrl: String,
  ipfsMetadata: ipfsMetadataModel
});
export default nftModel;
