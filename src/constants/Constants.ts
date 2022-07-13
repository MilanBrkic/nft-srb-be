import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}
class Constants {
  public static readonly MONGO_BASE_CONNECTION_URL = process.env.MONGO_BASE_CONNECTION_URL ?? 'mongodb://localhost:27017/nft-srb';
  public static readonly NFT_SRB_DATABASE = 'nft-srb';
  public static readonly SERVER_PORT = Number(process.env.PORT) ?? 3005;
  public static readonly CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  public static readonly SMART_CONTRACT_URL = process.env.SMART_CONTRACT_URL ?? 'http://127.0.0.1:8545/';
  public static readonly GOOGLE_DRIVE_URL = 'https://drive.google.com/uc?id=';
  public static readonly IPFS_BASE_URL = 'https://ipfs.io/ipfs/';
  public static readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  public static readonly GOOGLE_ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
  public static readonly GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
  public static readonly GOOGLE_SCOPE = process.env.GOOGLE_SCOPE;
  public static readonly GOOGLE_TOKEN_TYPE = process.env.GOOGLE_TOKEN_TYPE;
  public static readonly GOOGLE_EXPIRY_DATE = Number(process.env.GOOGLE_EXPIRY_DATE);
  public static readonly HAVE_TOKEN =
    this.GOOGLE_ACCESS_TOKEN && this.GOOGLE_REFRESH_TOKEN && this.GOOGLE_SCOPE && this.GOOGLE_TOKEN_TYPE && this.GOOGLE_EXPIRY_DATE;
  public static readonly GOOGLE_TOKEN = {
    access_token: this.GOOGLE_ACCESS_TOKEN,
    refresh_token: this.GOOGLE_REFRESH_TOKEN,
    scope: this.GOOGLE_SCOPE,
    token_type: this.GOOGLE_TOKEN_TYPE,
    expiry_date: this.GOOGLE_EXPIRY_DATE
  };
}
export default Constants;
