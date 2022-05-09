import dotenv from 'dotenv';
dotenv.config();
class Constants {
  public static readonly MONGO_BASE_CONNECTION_URL = process.env.MONGO_BASE_CONNECTION_URL ?? 'mongodb://localhost:27017';
  public static readonly NFT_SRB_DATABASE = 'nft-srb';
  public static readonly SERVER_PORT = Number(process.env.SERVER_PORT) ?? 3005;
  public static readonly CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  public static readonly SMART_CONTRACT_URL = process.env.SMART_CONTRACT_URL ?? 'http://127.0.0.1:8545/';
  public static readonly GOOGLE_DRIVE_URL = 'https://drive.google.com/uc?id=';
  public static readonly NFT_STORAGE_KEY =
    process.env.NFT_STORAGE_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI1RjM0OGQwNUY4Mzg1RjVBNjc1Nzk1QjVlRTAyMjUyMzkyMDMwYjgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODk5MjExOTEyNSwibmFtZSI6Ik5mdCBTcmJpamEifQ.lpojeEc7f1M5HMPDGWNYgTZa43beBNS7V2xog3B_S-Q';
}
export default Constants;
