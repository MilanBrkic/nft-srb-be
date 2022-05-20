import { BigNumber } from 'ethers';

export const nftChangedEventListener = (tokenId: BigNumber, isForSale: boolean, price: BigNumber, owner: string, event: Event) => {
  console.log('NftChanged', tokenId, isForSale, price, event);
};
