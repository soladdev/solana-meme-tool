import bs58 from 'bs58';
import type { NextApiRequest, NextApiResponse } from "next";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PumpFunSDK } from "@/base/pump";
import CryptoJS from "crypto-js";
import { solanaConnection } from '@/lib/constant';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
    const { payload } = req.body.params;
    try {
        const { isBuy, wallet, amount, tokenAddress } = JSON.parse(CryptoJS.AES.decrypt(payload, encryptoKey).toString(CryptoJS.enc.Utf8));
        const nodeWallet = new NodeWallet(new Keypair())
        const provider = new AnchorProvider(solanaConnection, nodeWallet, {
            commitment: "finalized",
        });

        console.log("Create pumpfun sdk")
        const sdk = new PumpFunSDK(provider);


        // const txResult = await sdk.createAndBatchBuy(buyersKeypair, buyersAmount, tokenMetadata, mint)
        let txResult;
        if (isBuy) {
            txResult = await sdk.buy(Keypair.fromSecretKey(bs58.decode(wallet)), new PublicKey(tokenAddress), BigInt(Math.floor(amount * LAMPORTS_PER_SOL)))
        } else {
            txResult = await sdk.sell(Keypair.fromSecretKey(bs58.decode(wallet)), new PublicKey(tokenAddress), BigInt(Math.floor(amount * 10 ** 6)))
        }

        if (txResult?.success) {
            return res.status(200).send({ message: "success", signature: txResult?.txSig });
        } else {
            return res.status(400).send({ message: "failed", error: txResult?.error });
        }
    } catch (e) {
        console.log(e)
        return res.status(403).json({ error: "Failed with something" })
    }
}
