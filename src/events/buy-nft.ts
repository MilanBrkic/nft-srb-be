import { BigNumber, Event } from 'ethers';
import userModel from '../db/model/UserModel';
import Nft from '../domain/Nft';
import NftSrb from '../nftsrb/NftSrb';

export const buyEventListener = async (sellerAddress: string, buyerAddress: string, tokenId: BigNumber, tokenURI: string, event: Event) => {
  if (event.blockNumber <= NftSrb.startBlockNumber) {
    return;
  }

  console.log('Buy event', sellerAddress, buyerAddress, tokenId);
  buyerAddress = buyerAddress.toLowerCase();
  sellerAddress = sellerAddress.toLowerCase();
  let buyer: any;
  let seller: any;
  let parsedTokendId = parseInt(tokenId._hex, 16);

  try {
    [buyer, seller] = await Promise.all([userModel.findByAddress(buyerAddress), userModel.findByAddress(sellerAddress)]);
  } catch (error) {
    console.error(`Error in Promise.all of finding users | Reason: ${error.message}`);
    return;
  }

  if (!seller) {
    console.error(`No seller for address ${sellerAddress}`);
    return;
  }

  if (!buyer) {
    console.error(`No seller for address ${buyerAddress}`);
    return;
  }

  let nftFromDb: Nft;
  for (let i = 0; i < seller.nfts.length; i++) {
    if (seller.nfts[i].tokenId && seller.nfts[i].tokenId === parsedTokendId) {
      seller.nfts[i].forSale = false;
      nftFromDb = seller.nfts[i];
    }
  }

  try {
    await Promise.all([userModel.addNft(buyerAddress, nftFromDb), userModel.removeNft(seller.address, nftFromDb.md5Hash)]);
  } catch (error) {
    console.error(`Error in Promise.all of saving users | Reason: ${error.message}`);
    return;
  }

  console.log(`Nft ${parsedTokendId} sold by ${seller.address} and bought by address ${buyer.address}`);
};
