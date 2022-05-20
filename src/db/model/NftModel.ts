import { Schema } from 'mongoose';
import { ipfsMetadataSchema } from './IpfsMetadataModel';

export const nftSchema = new Schema({
  md5Hash: String,
  address: String,
  googleId: String,
  ipfsToken: String,
  ipfsUrl: String,
  price: Number,
  forSale: Boolean,
  tokenId: Number,
  ipfsMetadata: ipfsMetadataSchema
});
