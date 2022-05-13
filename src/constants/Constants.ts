import dotenv from 'dotenv';
dotenv.config();
class Constants {
  public static readonly MONGO_BASE_CONNECTION_URL = process.env.MONGO_BASE_CONNECTION_URL ?? 'mongodb://localhost:27017';
  public static readonly NFT_SRB_DATABASE = 'nft-srb';
  public static readonly SERVER_PORT = Number(process.env.SERVER_PORT) ?? 3005;
  public static readonly CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  public static readonly SMART_CONTRACT_URL = process.env.SMART_CONTRACT_URL ?? 'http://127.0.0.1:8545/';
  public static readonly GOOGLE_DRIVE_URL = 'https://drive.google.com/uc?id=';
  public static readonly IPFS_BASE_URL = 'https://ipfs.io/ipfs/';
  public static JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
}
export default Constants;
