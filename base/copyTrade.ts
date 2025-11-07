
import {
    CommitmentLevel,
    SubscribeRequest,
    SubscribeUpdate,
    SubscribeUpdateTransaction,
} from "@triton-one/yellowstone-grpc";
import { CompiledInstruction } from "@triton-one/yellowstone-grpc/dist/grpc/solana-storage";
import { ClientDuplexStream } from '@grpc/grpc-js';
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';
import { getAssociatedTokenAddress, NATIVE_MINT } from "@solana/spl-token";
import { getBuyTxWithJupiter, getSellTxWithJupiter } from "./swapOnlyAmm";
import { execute } from "./legacy";
import { BASE_MINT_ADDRESS, MAIN_GRPC, MAIN_GRPC_TOKEN, MAIN_RPC, solanaConnection } from "@/lib/constant";
import { client } from "./config";
import { jitoBundle } from "./pump/jitoBundle";

dotenv.config()

// Constants
const COMMITMENT = CommitmentLevel.PROCESSED;
const BUY_AMOUNT = 0.001;

const IS_JITO = process.env.IS_JITO || true;
const stream = await client.subscribe();
// Main function
export async function executeCopyTrade(targetWallet: string, privateKey: string): Promise<boolean> {
    const keyPair = Keypair.fromSecretKey(bs58.decode(privateKey));

    console.log('========================================= Your Config =======================================')
    console.log('Target Wallet Address =====> ', targetWallet);
    console.log("Bot Wallet Address    =====> ", keyPair.publicKey.toBase58());
    console.log('=============================================================================================== \n');
    const request = createSubscribeRequest(targetWallet);

    try {
        await sendSubscribeRequest(stream, request);
        console.log(`Geyser connection established - watching ${targetWallet} \n`);
        const handleRes = await handleStreamEvents(keyPair, targetWallet, stream);
        return handleRes
    } catch (error) {
        console.error('Error in subscription process:', error);
        stream.end();
        return false;
    }
}

function handleStreamEvents(
    keyPair: Keypair,
    targetWallet: string,
    stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate>
): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        let resolved = false; // prevent multiple resolve/reject calls

        stream.on("data", async (data) => {
            try {
                await handleData(keyPair, targetWallet, data, stream);
                resolve(true)
            } catch (err) {
                if (!resolved) {
                    resolved = true;
                    reject(err); // Reject on error
                }
            }
        });

        stream.on("error", (error: Error) => {
            console.error("Stream error:", error);
            if (!resolved) {
                resolved = true;
                reject(error); // Reject on stream error
            }
        });

        stream.on("end", () => {
            console.log("Stream ended");
            if (!resolved) {
                resolved = true;
                resolve(true); // Resolve when stream ends
            }
        });

        stream.on("close", () => {
            console.log("Stream closed");
            if (!resolved) {
                resolved = true;
                resolve(true); // Resolve when stream is closed
            }
        });
    });
}



// Get Token mint
const getMintAccount = (targetWallet: string, data: SubscribeUpdate): string | null => {
    const preAccounts = data.transaction?.transaction?.meta?.preTokenBalances;
    if (preAccounts == undefined) return null;
    const preAccount = filterAccount(preAccounts, "", targetWallet);
    if (preAccount) return preAccount.mint;
    else return null;
}

const getTokenDecimals = (targetWallet: string, data: SubscribeUpdate): number | null => {
    const preAccounts = data.transaction?.transaction?.meta?.preTokenBalances;
    if (preAccounts == undefined) return null;
    const preAccount = filterAccount(preAccounts, "", targetWallet);
    if (preAccount) return preAccount.uiTokenAmount.decimals;
    else return null;
}

function isSubscribeUpdateTransaction(data: SubscribeUpdate): data is SubscribeUpdate & { transaction: SubscribeUpdateTransaction } {
    return (
        'transaction' in data &&
        typeof data.transaction === 'object' &&
        data.transaction !== null &&
        'slot' in data.transaction &&
        'transaction' in data.transaction
    );
}

function convertSignature(signature: Uint8Array): { base58: string } {
    return { base58: bs58.encode(Buffer.from(signature)) };
}