import mongoose, { Schema } from 'mongoose';
import nftModel from './NftModel';
import User from '../../domain/User';
import Nft from '../../domain/Nft';

const model = new Schema({
  address: String,
  nfts: [nftModel]
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

  public async getByNft(md5Hash: string): Promise<User | null> {
    const user = (await this.model.find({ 'nfts.md5Hash': { $in: md5Hash } }).exec())[0];
    return user;
  }

  public async insert(address: string): Promise<User | null> {
    return this.model.create({ address });
  }

  public async addNft(nft: Nft): Promise<User | null> {
    return this.model.updateOne({ address: nft.address }, { $push: { nfts: { ...nft } } });
  }
}

const userModel = new UserModel();
export default userModel;
