import { volumeBoostingWithConstantWallet } from '@/base/volume';
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { redisClient } from '@/lib/redis';
import { decryptPayload } from '@/lib/decrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
        if (!encryptKey) {
            return res.status(500).json({ result: false, error: "Encryption key not configured" });
        }

        const { payload } = req.body?.params ?? {};
        if (!payload) {
            return res.status(400).json({ result: false, error: "Payload is required" });
        }

        const { privateKey, tokenAddress, buyAmount, distributeCnt, delay } = decryptPayload(payload, encryptKey);
        await redisClient.set(`volume-${privateKey}`, "1");
        await volumeBoostingWithConstantWallet(privateKey, tokenAddress, distributeCnt, Number(buyAmount), Number(delay));
        return res.json({ result: true, content: "Volume boosting is running" });
    } catch (error) {
        console.error("Volume boost error:", error);
        const message = error instanceof Error ? error.message : "Volume boost failed";
        return res.status(500).json({ result: false, error: message });
    }
}