import mongoose, { Schema } from 'mongoose';
import imageModel from './ImageModel';
import User from './User';

const model = new Schema({
  address: String,
  images: [imageModel]
});

class UserModel {
  private model;
  constructor() {
    this.model = mongoose.model('users', model);
  }

  public async findByAddress(address: string): Promise<User | null> {
    const user = (await this.model.find({ address }).exec())[0];
    return user;
  }

  public async getByImage(md5Hash: string): Promise<User | null> {
    const user = (await this.model.find({ 'images.md5Hash': { $in: md5Hash } }).exec())[0];
    return user;
  }

  public async insert(address: string): Promise<User | null> {
    return this.model.create({ address });
  }

  public async addAnImage(
    address: string,
    md5Hash: string,
    googleId: string,
    ipnft: string,
    transactionHash: string
  ): Promise<User | null> {
    return this.model.updateOne({ address }, { $push: { images: { md5Hash, googleId, ipnft, transactionHash } } });
  }
}

const userModel = new UserModel();
export default userModel;
