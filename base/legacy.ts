import { Connection, VersionedTransaction } from "@solana/web3.js";

export const execute = async (connection: Connection, transaction: VersionedTransaction) => {
  const signature = await connection.sendTransaction(transaction);
  // const signature = await connection.sendRawTransaction(transaction.serialize());
  return signature
}

