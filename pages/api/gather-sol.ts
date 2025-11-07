import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { redisClient } from "@/lib/redis";
import { gatherSol } from "@/base/volume/gather";
import { solanaConnection } from "@/lib/constant";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        const { payload } = req.body.params;
        const { privateKey } = JSON.parse(CryptoJS.AES.decrypt(payload, encryptoKey).toString(CryptoJS.enc.Utf8));
        console.log("🚀 ~ handler ~ privateKey:", privateKey)
        gatherSol(solanaConnection, privateKey)
            .then(() => res.json({ result: true, content: "Sol and token is gathered" }))
            .catch(err => res.status(500).json({ result: false, content: "Failed to gather" }))
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: false, content: error })
    }
}