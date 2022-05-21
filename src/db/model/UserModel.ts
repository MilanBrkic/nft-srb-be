import mongoose, { Schema } from 'mongoose';
import { nftSchema } from './NftModel';
import User from '../../domain/User';
import Nft from '../../domain/Nft';

const userSchema = new Schema({
  address: String,
  nfts: [nftSchema]
});

class UserModel {
  private model;
  constructor() {
    this.model = mongoose.model('users', userSchema);
  }

  public async findByAddress(address: string): Promise<any | null> {
    const user = (await this.model.find({ address }).exec())[0];
    return user;
  }

  public async getByNft(md5Hash: string): Promise<any | null> {
    const user = (await this.model.find({ 'nfts.md5Hash': { $in: md5Hash } }).exec())[0];
    return user;
  }

  public async insert(address: string): Promise<User | null> {
    return this.model.create({ address });
  }

  public async getAllExcept(address: string): Promise<User[]> {
    return this.model.find({ address: { $ne: address } }).exec();
  }
  public async addNft(address: string, nft: Nft): Promise<User | null> {
    return this.model.updateOne({ address }, { $push: { nfts: { ...nft } } });
  }

  public async removeNft(address: string, md5Hash: string) {
    return this.model.updateOne({ address }, { $pull: { nfts: { md5Hash } } });
  }

  public async getByIpfsToken(ipfsToken: string) {
    const user = (await this.model.find({ 'nfts.ipfsToken': { $in: ipfsToken } }).exec())[0];
    return user;
  }

  public async getByTokenId(tokenId: number) {
    const user = (await this.model.find({ 'nfts.tokenId': { $in: tokenId } }).exec())[0];
    return user;
  }
}

const userModel = new UserModel();
export default userModel;
