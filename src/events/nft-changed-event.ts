import { BigNumber, Event, utils } from 'ethers';
import userModel from '../db/model/UserModel';
import NftSrb from '../nftsrb/NftSrb';
import Nft from '../domain/Nft';

export const nftChangedEventListener = async (tokenId: BigNumber, forSale: boolean, price: BigNumber, owner: string, event: Event) => {
  if (event.blockNumber <= NftSrb.startBlockNumber) {
    return;
  }
  let nft: Nft;
  const tokenIdDeci = parseInt(tokenId._hex, 16);
  const priceEth = Number(utils.formatEther(price._hex));
  owner = owner.toLowerCase();

  const user = await userModel.getByTokenId(tokenIdDeci);

  if (!user) {
    console.log(`User wtih tokenId: ${tokenId} does not exist`);
    return;
  }

  if (user.address !== owner) {
    console.log("Can't update other users Nfts");
    return;
  }

  nft = user.nfts.find((nft: Nft) => nft.tokenId === tokenIdDeci);

  if (forSale !== undefined && forSale !== null) {
    if (typeof forSale === 'boolean') {
      nft.forSale = forSale;
    } else {
      console.log('forSale is not boolean');
    }
  }

  if (priceEth) {
    if (typeof priceEth === 'number') {
      nft.price = priceEth;
    } else {
      console.log('price is not number');
    }
  }

  await user.save();
  console.log(`Nft with tokenId: ${tokenId} updated price: ${priceEth} and forSale: ${forSale} `);
};
