import { executeCopyTrade } from '@/base/copyTrade';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { targetWallet, privateKey } = req.body;
        const copyTradingRes = await executeCopyTrade(targetWallet, privateKey);
        return res.json({ result: copyTradingRes });
    } catch (err) {
        console.error("Copy trade error:", err);
        const message = err instanceof Error ? err.message : "Copy trade failed";
        return res.status(500).json({ error: message });
    }
}