import Constants from '../constants/Constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import nftSrbJson from '../abi/NftSrb.json';
import { mintEventListener } from '../events/mint-event';
import { nftChangedEventListener } from '../events/nft-changed-event';
import { buyEventListener } from '../events/buy-nft';

export default class NftSrb {
  public static startBlockNumber: number;

  public static async init() {
    const provider = new JsonRpcProvider(Constants.SMART_CONTRACT_URL);
    const contract = new Contract(Constants.CONTRACT_ADDRESS, nftSrbJson.abi, provider);

    this.startBlockNumber = await provider.getBlockNumber();
    this.listenToEvents(contract);
  }

  public static async listenToEvents(contract: Contract) {
    contract.on('Mint', mintEventListener);

    contract.on('NftChanged', nftChangedEventListener);
    contract.on('TransferNftSrb', buyEventListener);

    console.log('Subscribed to smart contract events...');
  }
}
