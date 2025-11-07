import { ComputeBudgetProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionMessage, VersionedTransaction } from "@solana/web3.js"
import base58 from "bs58"
import { getSOLBalance, sleep } from "../utils";
import { BUY_INTERVAL_MAX, BUY_INTERVAL_MIN, DISTRIBUTE_INTERVAL_MAX, DISTRIBUTE_INTERVAL_MIN, SELL_INTERVAL_MAX, SELL_INTERVAL_MIN, solanaConnection } from "@/lib/constant";
import { distribute } from "./distribute";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PumpFunSDK } from "../pump";
import { createCloseAccountInstruction, getAssociatedTokenAddress, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { readJson, saveNewFile } from "@/lib/utils";
import { redisClient } from "@/lib/redis";
import { jitoBundle } from "../pump/jitoBundle";
import pMap from 'p-map';

export const volumeBoosting = async (privateKey: string, tokenAddress: string, distributeCnt: number, buyAmount: number, delay: number) => {
    // Private code

}

export const volumeBoostingWithConstantWallet = async (
    privateKey: string,
    tokenAddress: string,
    distributeCnt: number,
    buyAmount: number,
    delay: number,
    concurrency: number = 8              // ← NEW: max parallel wallets
) => {
    const mainKp = Keypair.fromSecretKey(base58.decode(privateKey));
    const baseMint = new PublicKey(tokenAddress);

    const solBalance = await getSOLBalance(solanaConnection, mainKp.publicKey);
    console.info(`Wallet: ${mainKp.publicKey.toBase58()}`);
    console.info(`Token: ${baseMint.toBase58()}`);
    console.info(`SOL balance: ${solBalance} SOL`);

    const nodeWallet = new NodeWallet(new Keypair());
    const provider = new AnchorProvider(solanaConnection, nodeWallet, { commitment: 'finalized' });
    const sdk = new PumpFunSDK(provider);

    // ———— MAIN LOOP ————
    // Private code
};