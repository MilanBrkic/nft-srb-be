import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import Constants from '../constants/Constants';
import { abi } from '../nft-smart-contract/artifacts/contracts/NftSrb.sol/NftSrb.json';

export default class NftSrb {
  private static provider: JsonRpcProvider;
  private static contract: Contract;
  public static init() {
    this.provider = new JsonRpcProvider(Constants.SMART_CONTRACT_URL);
    this.contract = new Contract(Constants.CONTRACT_ADDRESS, abi, this.provider);
    console.log('Nft Smart contracts initialized');
  }
}
