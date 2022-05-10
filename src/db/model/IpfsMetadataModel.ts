import { Schema } from 'mongoose';

const ipfsMetadataModel = new Schema({
  name: String,
  description: String,
  image: String
});
export default ipfsMetadataModel;
