import { NFTStorage, File } from 'nft.storage';
import Constants from '../constants/Constants';
import INFTStorageToken from '../domain/NFTStorageToken';

export default class NFTStorageService {
  public static async storeNFT(fileBuffer, name: string, description: string, mimetype: string): Promise<INFTStorageToken> {
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: Constants.NFT_STORAGE_KEY });
    const image = new File(fileBuffer, name, { type: mimetype });
    // call client.store, passing in the image & metadata
    return nftstorage.store({
      image,
      name,
      description
    });
  }
}
