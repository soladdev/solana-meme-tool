// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bs58 from 'bs58';
import type { NextApiRequest, NextApiResponse } from "next";
import { Keypair, PublicKey } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PumpFunSDK } from "@/base/pump";
import { openAsBlob } from "fs";
import { solanaConnection } from '@/lib/constant';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const payload = req.body;
    console.log("🚀 ~ handler ~ payload:", payload)
    // Private code
}
