export default class Lock {
  private static lockedNfts = new Set();

  public static lockNft(nftHash: string): void {
    this.lockedNfts.add(nftHash);
  }

  public static unlockNft(nftHash: string): void {
    this.lockedNfts.delete(nftHash);
  }

  public static contains(nftHash: string): boolean {
    return this.lockedNfts.has(nftHash);
  }
}
