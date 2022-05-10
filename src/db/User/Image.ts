import Constants from '../../constants/Constants';
import IIPFSMetadata from '../../domain/IIPFSMetadata';
import IPFSService from '../../services/IPFSService';

export default class Image {
  public ipfsUrl: string;
  public ipfsMetadata: IIPFSMetadata;
  constructor(public md5Hash: string, public userAddress: string, public ipfsToken: string) {
    this.ipfsUrl = `${Constants.IPFS_BASE_URL}${ipfsToken}/metadata.json`;
  }

  public async enrichWithMetadata() {
    try {
      this.ipfsMetadata = await IPFSService.getMetadata(this.ipfsUrl);
      console.log(`ipfs returned metadata for image: ${this.md5Hash}`);
    } catch (error) {
      console.error(`No metadata from ipfs | Reason: ${error.message}`);
    }
  }
}
