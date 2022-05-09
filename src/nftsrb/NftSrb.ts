import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract, providers, Wallet } from 'ethers';
import Constants from '../constants/Constants';
import { abi } from '../nft-smart-contract/artifacts/contracts/NftSrb.sol/NftSrb.json';

export default class NftSrb {
  private static provider = new JsonRpcProvider(Constants.SMART_CONTRACT_URL);

  private wallet: Wallet;
  private contract: Contract;

  constructor(privateKey: string) {
    this.wallet = new Wallet(privateKey, NftSrb.provider);
    this.contract = new Contract(Constants.CONTRACT_ADDRESS, abi, this.wallet);
  }

  public async mint(ipfsUrl: string): Promise<string> {
    const result = await this.contract.mint(ipfsUrl);
    console.log(`Transaction minted: ${JSON.stringify(result)}`);
    return result.hash;
  }

  public async getAllByAddress() {
    try {
      const result = await this.contract.getAllByAddress();
      console.log(`getAllByAddress: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error(`Error in getAllByAddress | Wallet address: ${this.wallet.address} | Reason: ${error.message}`);
    }
  }
}
