import { CommitmentLevel, SubscribeRequest } from "@triton-one/yellowstone-grpc";
import { LIQUIDITY_STATE_LAYOUT_V4, MARKET_STATE_LAYOUT_V3, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js";
import { bufferRing } from "./openbook";
import { buy, checkValidation } from "./transaction/transaction";
import base58 from "bs58";
import { createPoolKeys } from "./liquidity";
import { client } from "./config";
import { snipePayload } from "./types";

let latestBlockHash: string = "";

export async function streamNewTokens(payload: snipePayload): Promise<boolean> {
    const stream = await client.subscribe();
    // Create a subscription request.
    // Private code

    // Sending a subscription request.
    await new Promise<void>((resolve, reject) => {
        stream.write(request, (err: null | undefined) => {
            if (err === null || err === undefined) {
                resolve();
            } else {
                reject(err);
            }
        });
    }).catch((reason) => {
        console.error(reason);
        throw reason;
    });
    // Collecting all incoming events.
    return new Promise<boolean>((resolve, reject) => {
        let resolved = false;
        stream.on("data", (data) => {
            if (data.blockMeta) {
                latestBlockHash = data.blockMeta.blockhash;
            }

            // Private code
            resolve(true);
        });
    })
}
