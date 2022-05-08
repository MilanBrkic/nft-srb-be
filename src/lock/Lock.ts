export default class Lock {
  private static lockedImages = new Set();

  public static lockImage(imageHash: string): void {
    this.lockedImages.add(imageHash);
  }

  public static unlockImage(imageHash: string): void {
    this.lockedImages.delete(imageHash);
  }

  public static contains(imageHash: string): boolean {
    return this.lockedImages.has(imageHash);
  }
}
