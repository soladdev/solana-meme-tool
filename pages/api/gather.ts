import { gatherTokenAndSol, sellAllToken } from "@/base/gather";
import connectMongodb from "@/base/mongodb";
import CryptoJS from "crypto-js";
import { solanaConnection } from "@/lib/constant";
import WalletGroup from "@/models/WalletGroup";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Keypair } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { payload } = req.body.params;
    console.log("🚀 ~ handler ~ payload:", payload)
    try {
        const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        const { mainWallet } = JSON.parse(CryptoJS.AES.decrypt(payload, encryptoKey).toString(CryptoJS.enc.Utf8));
        console.log("🚀 ~ handler ~ mainWallet:", mainWallet)

        connectMongodb()
            .then(async () => {
                try {
                    WalletGroup.findOne({
                        mainWalletAddress: Keypair.fromSecretKey(bs58.decode(mainWallet)).publicKey.toBase58(),
                    }).then(async (walletGroupData: any) => {
                        if (!walletGroupData) {
                            res.status(404).json({ result: true, content: "Data doesn't exist" })
                        }
                        const wallets = walletGroupData.generatedWalletsArray.split(",");
                        console.log("🚀 ~ handler ~ wallets:", wallets)
                        const tokenAddress = walletGroupData.tokenAddress;
                        console.log("🚀 ~ handler ~ tokenAddress:", tokenAddress)
                        const gatherRes = await gatherTokenAndSol(solanaConnection, mainWallet, wallets, tokenAddress);
                        if (gatherRes) {
                            await WalletGroup.deleteOne({ mainWalletAddress: Keypair.fromSecretKey(bs58.decode(mainWallet)).publicKey.toBase58() })
                            res.json({ result: gatherRes, content: "Gathering success" })
                            // const sellResult = await sellAllToken(solanaConnection, mainWallet, tokenAddress);
                            // sellResult ? res.json({ result: gatherRes, content: "Token gathering success" }) :
                            //     res.status(500).json({ result: gatherRes, content: "Token selling failed" })
                        } else {
                            res.status(500).json({ result: gatherRes, content: "Token gathering failed" })
                        }
                        // gatherRes ? res.json({ result: gatherRes, content: "Token gathering success" }) : res.status(500).json({ result: gatherRes, content: "Token gathering failed" })
                    }).catch((err: any) => {
                        console.log(err);
                        res.status(500).json({ result: true, content: "Database access error" })
                    })


                } catch (error) {
                    console.error('Failed to gather tokens:', error);
                    res.status(500).json({ result: false, content: 'Failed to gather tokens' });
                }
            })
            .catch(err => {
                console.log("MongoDB connect failed", err);
                res.status(500).json({ result: false, error: "MongoDB connect failed" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: false, content: "Internal sever error" })
    }
}