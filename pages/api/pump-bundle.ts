// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bs58 from 'bs58';
import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { Keypair } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import { PumpFunSDK } from "@/base/pump";
import { openAsBlob } from "fs";
import { solanaConnection } from '@/lib/constant';
import fs from 'fs';
import path from 'path';
import connectMongodb from '@/base/mongodb';
import Token from '@/models/Token';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { parsedBodyData } = req.body.params;
  try {
    if (req.method == "POST") {
      // await dbConnect()
      const encryptoKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
      try {
        const { isJito, metaData, inputs } = JSON.parse(CryptoJS.AES.decrypt(parsedBodyData, encryptoKey).toString(CryptoJS.enc.Utf8));

        if (inputs.length > 15) {
          console.error('wallet counts is more than 15')
          return res.status(403).json({ error: 'You entered incorrect type of key. Try again with the correct key.' })
        }
        try {
          const { uniqueReturnValue, flag } = await validateInputData(inputs)

          const balcheck = await checkBalance(uniqueReturnValue)
          if (!flag || !balcheck) {
            console.error('balance error')
            return res.status(400).json({ error: "You should have enough sol in your connected wallet. If not you can't bundle" })
          }
          const wallet = new NodeWallet(new Keypair())
          const provider = new AnchorProvider(solanaConnection, wallet, {
            commitment: "finalized",
          });

          console.log("Create pumpfun sdk")
          const sdk = new PumpFunSDK(provider);

          const buyersKeypair = uniqueReturnValue.map((item: { wallet: string, amount: bigint }) => Keypair.fromSecretKey(bs58.decode(item.wallet)))
          const buyersAmount = uniqueReturnValue.map((item: { wallet: string, amount: bigint }) => item.amount)

          const tokenMetadata = {
            name: metaData.name,
            symbol: metaData.symbol,
            description: metaData.description,
            twitter: metaData.twitter,
            telegram: metaData.telegram,
            website: metaData.website,
            file: await openAsBlob(`./public/uploads/${metaData.image}`),
          };

          console.log("load metadata file")
          let mint;

          // const folderPath = path.join(process.cwd(), 'public/vanity');
          // const folderPath = path.join('/root', 'vanity');
          // const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));

          // if (files.length === 0) {
          mint = Keypair.generate()
          // } else {

          //   const firstFile = files[0]; // Pick the first file
          //   const filePath = path.join(folderPath, firstFile);
          //   const fileData = fs.readFileSync(filePath, 'utf-8');
          //   const jsonData = JSON.parse(fileData);
          //   mint = Keypair.fromSecretKey(new Uint8Array(jsonData));
          //   fs.unlinkSync(filePath);
          // }

          console.log("Create bundle tx")
          const txResult = await sdk.createAndBatchBuy(isJito, buyersKeypair, buyersAmount, tokenMetadata, mint)

          if (txResult?.success) {
            connectMongodb()
              .then(async () => {
                Token.create({
                  mainWalletAddress: buyersKeypair[0].publicKey.toBase58(),
                  tokenAddress: mint.publicKey.toBase58()
                })
                  .then(() => res.status(200).send({ message: "success", address: txResult.mint }))
                  .catch((error: any) => res.status(500).json({ error: error.message }))
              })
          } else {
            return res.status(400).send({ message: "failed", error: txResult?.error });
          }
        } catch (error: any) {
          console.error('inner error', error.message)
          return res.status(500).json({ error: error.message });
        }
      } catch (e) {
        console.error('parsed error')
        return res.status(403).json({ error: 'You entered incorrect type of key. Try again with the correct key.' })
      }
    }
  } catch (error: any) {
    console.error('handler error', error.message)
    res.status(500).json({ error: error.message });
  }
}

const validateInputData = async (inputs: Array<{
  wallet: string;
  amount: string;
}>) => {
  let flag = true
  // console.log(inputs)
  const returnValue: Array<{
    wallet: string;
    amount: bigint;
  }> = []
  for (let i = 0; i < inputs.length; i++) {
    try {
      const keypair = Keypair.fromSecretKey(bs58.decode(inputs[i].wallet))
      returnValue.push({ wallet: inputs[i].wallet, amount: BigInt(Number(inputs[i].amount) * 1000000000) })
    } catch (e) {
      console.log('valid error', e)
      flag = false
    }
  }

  const uniqueReturnValue = Array.from(
    new Map(returnValue.map(item => [item.wallet, item])).values()
  );
  if (uniqueReturnValue.length != returnValue.length || uniqueReturnValue.length == 0) flag = false

  return { uniqueReturnValue, flag }
}

const checkBalance = async (inputs: Array<{
  wallet: string;
  amount: bigint;
}>) => {
  let balcheck = true
  const pumpData: Array<{
    data: string,
    address: string,
    amount: number
  }> = []

  for (let i = 0; i < inputs.length; i++) {
    const keypair = Keypair.fromSecretKey(bs58.decode(inputs[i].wallet))
    const bal = await solanaConnection.getBalance(keypair.publicKey)
    let req = BigInt(inputs[i].amount)
    // treasury fee, lut fee, jito and create token fee, buy tx fee
    if (i == 0) req += BigInt(13_000_000) + BigInt(21_000_000) + BigInt(Math.ceil((inputs.length - 1) / 5) * 11_000_000)
    else req += BigInt(900_000)
    pumpData.push({ data: inputs[i].wallet, address: keypair.publicKey.toBase58(), amount: Number(bal) / 1000000000 })
    if (Number(bal) < Number(req) || inputs[i].amount == 0n) {
      console.log(i, bal, req)
      balcheck = false
    }
  }
  try {
    // 
  } catch (e) {
    console.error(e)
  }
  console.log('balance check result', balcheck)
  return balcheck
}