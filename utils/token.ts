/**
 * Shortens a Solana address for display.
 * @param address - Full address string
 * @param chars - Number of characters to show at start/end (default: 4)
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
