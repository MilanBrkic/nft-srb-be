class Constants{
    public static readonly MONGO_BASE_CONNECTION_URL = process.env.MONGO_BASE_CONNECTION_URL ?? 'mongodb://localhost:27017';
    public static readonly NFT_SRB_DATABASE = "nft-srb"
    public static readonly SERVER_PORT = process.env.SERVER_PORT ?? 3005
    public static readonly NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhBZEE3NUVhOENjYjU0RTJCNkU2REE3RTM0MDE4RUIyYzFGNTg0NDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzkzMDkzNTIyNSwibmFtZSI6Ik5mdCBTcmJpamEifQ.QekYNFAmi0NdQun2Zl9D-udFYX8kNznm8MbfLjcpRak"
}
export default Constants;