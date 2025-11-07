import { executeCopyTrade } from '@/base/copyTrade';
import bs58 from 'bs58';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { targetWallet, privateKey } = req.body;
        await executeCopyTrade(targetWallet, privateKey)
            .then(copyTradingRes => res.json({ result: copyTradingRes }))
            .catch(err => res.json({ error: err }))
    } catch (error) {
        console.log(error)
    }
}