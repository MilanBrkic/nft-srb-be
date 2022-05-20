import Constants from '../constants/Constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import nftSrbJson from '../abi/NftSrb.json';
import { mintEventListener } from '../events/mint-event';

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

    contract.on('TransferNftSrb', (from, to, tokenId, tokenURI) => {
      console.log(from, to, tokenId, tokenURI);
    });

    console.log('Subscribed to smart contract events...');
  }
}
