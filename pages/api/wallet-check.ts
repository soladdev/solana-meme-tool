import { volumeBoosting } from '@/base/volume';
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { redisClient } from '@/lib/redis';
import { solanaConnection } from '@/lib/constant';
import { getWalletRiskScore } from '@/base/wallet-check';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // if already running, stop it

    try {
        const { walletAddress } = req.body;
        console.log("🚀 ~ handler ~ walletAddress:", walletAddress)
        try {
            const { score, reasons, features } = await getWalletRiskScore(solanaConnection, walletAddress);
            console.log(`Risk Score: ${score}/100`);
            console.log('Reasons:', reasons.join(', '));
            res.json({ score, reasons, features })
        } catch (error) {
            console.log(error)
            res.status(500).json({ result: false, content: error })
        }
    } catch (error) {
        console.log(error)
    }
}