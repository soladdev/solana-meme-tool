import CryptoJS from "crypto-js";

/**
 * Decrypts an AES-encrypted payload and parses it as JSON.
 * @param payload - Base64-encoded encrypted string
 * @param key - Encryption key (from env)
 * @returns Parsed JSON object
 */
export function decryptPayload<T = Record<string, unknown>>(payload: string, key: string): T {
  const decrypted = CryptoJS.AES.decrypt(payload, key).toString(CryptoJS.enc.Utf8);
  if (!decrypted) {
    throw new Error("Failed to decrypt payload");
  }
  return JSON.parse(decrypted) as T;
}
