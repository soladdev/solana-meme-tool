import type { NextApiRequest, NextApiResponse } from "next";
import { solanaConnection } from '@/lib/constant';
import { getWalletRiskScore } from '@/base/wallet-check';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // if already running, stop it

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { walletAddress } = req.body;
        if (!walletAddress) {
            return res.status(400).json({ error: "walletAddress is required" });
        }

        const { score, reasons, features } = await getWalletRiskScore(solanaConnection, walletAddress);
        return res.json({ score, reasons, features });
    } catch (error) {
        console.error("Wallet check error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ result: false, error: message });
    }
}