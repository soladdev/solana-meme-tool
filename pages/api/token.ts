import connectMongodb from "@/base/mongodb";
import Token from "@/models/Token";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { publicKey } = req.body;
        console.log("🚀 ~ handler ~ publicKey:", publicKey)
        connectMongodb()
            .then(async () => {
                Token.find({ mainWalletAddress: publicKey })
                    .select("tokenAddress -_id") // only tokenAddress, remove _id
                    .then((list: any) => {
                        // Extract tokenAddress strings into an array
                        const tokenAddresses = list.map((item: any) => item.tokenAddress);

                        res.json({ success: true, content: tokenAddresses });
                    })
                    .catch((err: any) =>{
                        console.log(err)
                        res
                            .status(500)
                            .json({ success: false, content: "Failed to fetch token list" })}
                    );
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ success: false, content: "Failed to fetch token list" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, content: "Failed to fetch token list" })
    }
}