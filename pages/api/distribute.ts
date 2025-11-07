import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { distributeSol, distributeToken } from "@/base/distribute";
import { solanaConnection } from "@/lib/constant";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Keypair } from "@solana/web3.js";
import connectMongodb from "@/base/mongodb";
import WalletGroup from "@/models/WalletGroup";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { payload } = req.body.params;
    try {
        const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        const { metadata, wallets } = JSON.parse(CryptoJS.AES.decrypt(payload, encryptoKey).toString(CryptoJS.enc.Utf8));
        console.log("🚀 ~ handler ~ metadata:", metadata)
        console.log("🚀 ~ handler ~ wallets:", wallets)
        connectMongodb()
            .then(async () => {
                try {
                    const exists = await WalletGroup.findOne({
                        mainWalletAddress: (Keypair.fromSecretKey(bs58.decode(wallets[0]))).publicKey.toBase58(),
                    });

                    if (exists) {
                        console.log("⚠️ mainWalletAddress already exists!");
                        return res.json({ result: true, content: "Already distributed" })
                    }
                    const generatedWallets = await distributeSol(solanaConnection, Keypair.fromSecretKey(bs58.decode(wallets[0])), metadata.count, metadata.amount);
                    if (generatedWallets.length == 0) {
                        res.status(500).json({ result: false, content: "Failed to generate new wallets" });
                        return;
                    }
                    await WalletGroup.create({
                        mainWalletAddress: (Keypair.fromSecretKey(bs58.decode(wallets[0]))).publicKey.toBase58(),
                        generatedWalletsArray: generatedWallets.join(","),
                        tokenAddress: metadata.tokenAddress
                    }).then(async () => {
                        const distributeRes = await distributeToken(solanaConnection, metadata.tokenAddress, Keypair.fromSecretKey(bs58.decode(wallets[0])), wallets, generatedWallets);
                        
                        const newWalletsArray = CryptoJS.AES.encrypt(JSON.stringify({
                            wallets: generatedWallets
                        }), encryptoKey).toString();
                        console.log("🚀 ~ handler ~ generatedWallets:", generatedWallets)
                        distributeRes ? res.json({ result: distributeRes, content: "Token distribution success", newWalletsArray }) : res.status(500).json({ result: distributeRes, content: "Token distribution failed" })
                    }).catch((err: any) => {
                        console.log(err)
                        res.status(500).json({ result: false, content: "Failed to store wallets" })})
                } catch (error) {
                    console.error('Failed to store wallets:', error);
                    res.status(500).json({ result: false, content: 'Failed to store wallets' });
                }
            })
            .catch(error => {
                console.log("MongoDB connect failed", error);
                res.status(500).json({ result: false, error: "MongoDB connect failed" })
            });
    } catch (err: any) {
        console.log("🚀 ~ handler ~ err:", err)
        return res.status(500).json({ error: err.message })
    }
}