import { Request, Response } from 'express';
import userModel from '../db/model/UserModel';
import Nft from '../domain/Nft';
export default async function updateNft(req: Request, res: Response) {
  const buyerAddress = req.body.address;
  const nftHash = req.body.md5Hash;
  let buyer: any;
  let seller: any;

  if (!buyerAddress) return res.status(400).send('No buyer');

  if (!nftHash) return res.status(400).send('No md5Hash');

  try {
    [buyer, seller] = await Promise.all([userModel.findByAddress(buyerAddress), userModel.getByNft(nftHash)]);
  } catch (error) {
    console.error(`Error in Promise.all of finding users | Reason: ${error.message}`);
  }

  if (!buyer) return res.status(404).send('Buyer does not exist');

  if (!seller) return res.status(404).send('Seller does not exist');

  if (buyer.address === seller.address) return res.status(400).send('Buyer and seller are the same');

  let nftFromDb: Nft;
  for (let i = 0; i < seller.nfts.length; i++) {
    if (seller.nfts[i].md5Hash === nftHash) {
      seller.nfts[i].forSale = false;
      nftFromDb = seller.nfts[i];
    }
  }

  try {
    await Promise.all([userModel.addNft(buyerAddress, nftFromDb), userModel.removeNft(seller.address, nftHash)]);
  } catch (error) {
    console.error(`Error in Promise.all of saving users | Reason: ${error.message}`);
  }

  console.log(`Nft ${nftHash} sold by ${seller.address} and bought by address ${buyer.address}`);
  return res.status(200).send();
}
