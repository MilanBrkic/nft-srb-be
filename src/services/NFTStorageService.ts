import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import Constants from '../constants/Constants'
import INFTStorageToken from '../domain/NFTStorageToken'


export default class NFTStorageService{
    public static async storeNFT(fileBuffer, name:string, description:string, mimetype:string):Promise<INFTStorageToken> {
        
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: Constants.NFT_STORAGE_KEY })
        const image = new File(fileBuffer,name, {type: mimetype});
        // call client.store, passing in the image & metadata
        return nftstorage.store({
            image,
            name,
            description,
        })
    }

    // private async fileFromPath(filePath) {
    //     const content = await fs.promises.readFile(filePath)
    //     const type = mime.lookup(filePath)
    //     return new File([content], path.basename(filePath), { type })
    // }
} 