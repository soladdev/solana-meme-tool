import { executeCopyTrade } from '@/base/copyTrade';
import { volumeBoosting, volumeBoostingWithConstantWallet } from '@/base/volume';
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { redisClient } from '@/lib/redis';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // if already running, stop it

    try {
        const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        const { payload } = req.body.params;

        try {
            const { privateKey, tokenAddress, buyAmount, distributeCnt, delay } = JSON.parse(CryptoJS.AES.decrypt(payload, encryptoKey).toString(CryptoJS.enc.Utf8));
            console.log(privateKey, tokenAddress, buyAmount, distributeCnt, delay)

            await redisClient.set(`volume-${privateKey}`, "1");
            volumeBoostingWithConstantWallet(privateKey, tokenAddress, distributeCnt, Number(buyAmount), Number(delay)).then(() => res.json({ result: true, content: "Volume boosting is running" }))
        } catch (error) {
            console.log(error)
            res.status(500).json({ result: false, content: error })
        }
    } catch (error) {
        console.log(error)
    }
}