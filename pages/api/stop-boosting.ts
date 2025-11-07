import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { redisClient } from "@/lib/redis";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        const { payload } = req.body.params;
        const { privateKey } = JSON.parse(CryptoJS.AES.decrypt(payload, encryptoKey).toString(CryptoJS.enc.Utf8));
        console.log("🚀 ~ handler ~ privateKey:", privateKey)
        await redisClient.set(`volume-${privateKey}`, "0");

        res.json({ result: true, content: "Stopped boosting" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: false, content: error })
    }
}