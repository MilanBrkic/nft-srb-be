import { Schema } from 'mongoose';

export const ipfsMetadataSchema = new Schema({
  name: String,
  description: String,
  image: String
});
