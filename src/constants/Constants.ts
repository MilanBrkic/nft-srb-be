class Constants{
    public static readonly MONGO_BASE_CONNECTION_URL = process.env.MONGO_BASE_CONNECTION_URL ?? 'mongodb://localhost:27017';
    public static readonly NFT_SRB_DATABASE = "nft-srb"
    public static readonly SERVER_PORT = process.env.SERVER_PORT ?? 3005
}
export default Constants;