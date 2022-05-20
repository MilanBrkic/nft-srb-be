import { BigNumber, Event } from 'ethers';
import userModel from '../db/model/UserModel';
import { sleep } from '../helper/helper';
import NftSrb from '../nftsrb/NftSrb';

export const mintEventListener = async (tokenId: BigNumber, tokenURI: string, minter: string, event: Event) => {
  if (event.blockNumber <= NftSrb.startBlockNumber) return;
  console.log(`Mint event received | tokenId: ${tokenId._hex}`);

  minter = minter.toLowerCase();
  let count = 0;

  while (count < 20) {
    const userByAddress = await userModel.findByAddress(minter);
    if (!userByAddress) {
      count++;
      console.log(`No user found for address: ${minter}, timeouting ${count}. time`);
      await sleep(1000);
      continue;
    }

    const ipfsToken = tokenURI.split('/')[2];
    const userByTokenUri = await userModel.getByIpfsToken(ipfsToken);

    if (!userByTokenUri) {
      count++;
      console.log(`No user found for tokenURI: ${tokenId}, timeouting ${count}. time`);
      await sleep(1000);
      continue;
    }

    if (userByTokenUri.address !== userByAddress.address) {
      console.log(
        `Addresses do not match | userByTokenUri.address: ${userByTokenUri.address} | userByAddress.address: ${userByAddress.address}`
      );
      break;
    }

    let hash: string;
    let parsedTokendId = parseInt(tokenId._hex, 16);
    for (const nft of userByAddress.nfts) {
      if (nft.ipfsToken === ipfsToken) {
        nft.tokenId = parsedTokendId;
        hash = nft.md5Hash;
      }
    }

    await userByAddress.save();
    console.log(`For address: ${userByAddress.address} and nft: ${hash} added tokenId: ${parsedTokendId}`);
    break;
  }
};
