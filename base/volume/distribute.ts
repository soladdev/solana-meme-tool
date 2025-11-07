import { SOL_AMOUNT_TO_DISTRIBUTE } from "@/lib/constant"
import { saveDataToFile } from "@/lib/utils";
import { ComputeBudgetProgram, Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js"
import base58 from "bs58";
import { execute } from "../legacy";
import { jitoBundle } from "../pump/jitoBundle";

export const distribute = async (connection: Connection, mainKp: Keypair, distributeCnt: number, buyAmount: number) => {
    // Private code
}