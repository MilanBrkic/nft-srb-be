import Constants from '../constants/Constants';
import IIPFSMetadata from './IIPFSMetadata';
import IPFSService from '../services/IPFSService';

export default class Nft {
  public ipfsUrl: string;
  public ipfsMetadata: IIPFSMetadata;
  public googleId: string;
  constructor(
    public md5Hash: string,
    public address: string,
    public ipfsToken: string,
    public price: number,
    public forSale: boolean = true
  ) {
    this.ipfsUrl = `${Constants.IPFS_BASE_URL}${ipfsToken}/metadata.json`;
  }

  public async enrichWithMetadata() {
    try {
      this.ipfsMetadata = await IPFSService.getMetadata(this.ipfsUrl);
      console.log(`ipfs returned metadata for nft: ${this.md5Hash}`);
    } catch (error) {
      console.error(`No metadata from ipfs | Reason: ${error.message}`);
    }
  }

  getDto() {
    return {
      googleId: this.googleId,
      image: this.ipfsMetadata.image,
      name: this.ipfsMetadata.name,
      description: this.ipfsMetadata.description
    };
  }
}
