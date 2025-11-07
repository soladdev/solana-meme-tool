import { ComputeBudgetProgram, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js"
import base58 from 'bs58'
import { CHUNK_SIZE, solanaConnection } from "@/lib/constant"
import { execute } from "../legacy"
import { saveDataToFile } from "@/lib/utils"
import { createAssociatedTokenAccountIdempotentInstruction, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token"
import { getSPLBalance, sleep } from "../utils"
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes"
import { filterHoldersWithTokens } from "../pump/utils"

export const distributeSol = async (connection: Connection, mainKp: Keypair, distritbutionNum: number, distributionAmount: number): Promise<string[]> => {
    const wallets = []
    try {
        const sendSolTx: TransactionInstruction[] = []
        sendSolTx.push(
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1_000_000 }),
            ComputeBudgetProgram.setComputeUnitLimit({ units: 12_000 })
        )
        const mainSolBal = await connection.getBalance(mainKp.publicKey)
        if (mainSolBal <= distributionAmount * LAMPORTS_PER_SOL * distritbutionNum + 1_000_000) {
            console.log("Main wallet balance is not enough")
            return []
        }

        let solAmount = Math.floor(distributionAmount * LAMPORTS_PER_SOL)

        for (let i = 0; i < distritbutionNum; i++) {
            const wallet = Keypair.generate()
            let lamports = Math.floor(solAmount * (1 - (Math.random() * 0.2)))

            wallets.push(base58.encode(wallet.secretKey));
            // console.log("🚀 ~ distributeSol ~ wallets:", wallets)
            sendSolTx.push(
                SystemProgram.transfer({
                    fromPubkey: mainKp.publicKey,
                    toPubkey: wallet.publicKey,
                    lamports
                })
            )
        }

        try {
            saveDataToFile(wallets, `data-${mainKp.publicKey}.json`)
        } catch (error) {
            console.log("DistributeSol tx error")
            return [];
        }

        let index = 0

        while (true) {
            try {
                if (index > 5) {
                    console.log("Distribution failed, Exiting...")
                    await sleep(3000);
                    return []
                }
                const siTx = new Transaction().add(...sendSolTx)
                const latestBlockhash = await connection.getLatestBlockhash()
                siTx.feePayer = mainKp.publicKey
                siTx.recentBlockhash = latestBlockhash.blockhash
                const messageV0 = new TransactionMessage({
                    payerKey: mainKp.publicKey,
                    recentBlockhash: latestBlockhash.blockhash,
                    instructions: sendSolTx,
                }).compileToV0Message()
                const transaction = new VersionedTransaction(messageV0)
                transaction.sign([mainKp])
                // console.log(await connection.simulateTransaction(transaction))
                // serialize and measure size in bytes
                const serialized = transaction.serialize();
                const txSize = serialized.length;

                console.log("🧮 Sol distribution tx size: ", txSize, "bytes");
                let txSig = await execute(connection, transaction);
                if (txSig) {
                    const distibuteTx = txSig ? `https://solscan.io/tx/${txSig}` : ''
                    console.log("SOL distributed ", distibuteTx)
                    break;
                }
            } catch (error) {
                // console.log("Distribution error: ", error)
                await sleep(3000)
                index++;
            }
        }
        console.log("Success in distribution")
        return wallets
    } catch (error) {
        console.log(`Failed to transfer SOL`)
        return []
    }
}

export const distributeToken = async (
    connection: Connection,
    tokenAddress: string,
    mainKp: Keypair,
    holders: string[],
    destinationWallets: string[]
): Promise<boolean> => {
    try {
        // STEP 1 — Create ATAs for destination wallets
        for (let i = 0; i < destinationWallets.length; i += CHUNK_SIZE) {
            const chunk = destinationWallets.slice(i, i + CHUNK_SIZE);
            const createAtaIxs = [];

            for (const wallet of chunk) {
                const keypair = Keypair.fromSecretKey(bs58.decode(wallet));
                try {
                    const desAta = await getAssociatedTokenAddress(
                        new PublicKey(tokenAddress),
                        keypair.publicKey
                    );

                    // Create destination wallet ata
                    createAtaIxs.push(
                        createAssociatedTokenAccountIdempotentInstruction(
                            mainKp.publicKey,
                            desAta,
                            keypair.publicKey,
                            new PublicKey(tokenAddress)
                        )
                    );
                } catch (innerErr) {
                    console.warn(`⚠️ Failed to create ATA for ${keypair.publicKey.toBase58()}:`, innerErr);
                    return false;
                }
            }

            if (createAtaIxs.length === 0) continue;

            const latestBlockhash = await connection.getLatestBlockhash();

            const messageV0 = new TransactionMessage({
                payerKey: mainKp.publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions: createAtaIxs,
            }).compileToV0Message();

            const transaction = new VersionedTransaction(messageV0);
            transaction.sign([mainKp]);
            // serialize and measure size in bytes
            const serialized = transaction.serialize();
            const txSize = serialized.length;

            console.log("🧮 ATA creation tx size: ", txSize, "bytes");

            console.log("Simulating ATA creation...");
            const simResult = await connection.simulateTransaction(transaction);
            if (simResult.value.err) console.warn("Simulation error:", simResult.value.err);

            const txSig = await execute(connection, transaction);
            console.log(`✅ ATA batch created: https://solscan.io/tx/${txSig}`);
        }

        // STEP 2 — Distribute tokens from holders
        console.log(" -- Distribute tokens from holders -- ")
        
        await sleep(5000);
        const holderKps = await filterHoldersWithTokens(holders, tokenAddress);
        let transferCnt = Math.floor(destinationWallets.length / holderKps.length);

        for (let i = 0; i < holderKps.length; i++) {
            console.log("🚀 ~ distributeToken ~ holders:", holderKps[i].publicKey.toBase58())
            try {
                const tokenBalance = await getSPLBalance(connection, new PublicKey(tokenAddress), holderKps[i].publicKey);
                
                if (!tokenBalance || tokenBalance <= 0) {
                    console.warn(`⚠️ No token balance for holder ${holders[i]}`);
                    continue;
                }

                const holderAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), holderKps[i].publicKey);

                const transferIxs = [];

                if (i == holders.length - 1) transferCnt = destinationWallets.length - (holders.length * i);
                for (let j = 0; j < transferCnt; j++) {
                    const receiverWallet = destinationWallets[i * transferCnt + j];
                    const receiverKeypair = Keypair.fromSecretKey(bs58.decode(receiverWallet));
                    const receiverAta = await getAssociatedTokenAddress(
                        new PublicKey(tokenAddress),
                        receiverKeypair.publicKey
                    );
                    // console.log("🚀 ~ distributeToken ~ receiverAta:", receiverAta.toBase58())
                    console.log("Amount", Math.floor(tokenBalance / (transferCnt + 1)))

                    const transferInstruction = createTransferInstruction(
                        holderAta,
                        receiverAta,
                        holderKps[i].publicKey,
                        Math.floor(tokenBalance / (transferCnt + 1) * 10 ** 6)
                    );

                    transferIxs.push(transferInstruction);
                }

                // Split the transfer instructions into smaller arrays
                const transferChunks: typeof transferIxs[] = [];
                for (let k = 0; k < transferIxs.length; k += CHUNK_SIZE) {
                    transferChunks.push(transferIxs.slice(k, k + CHUNK_SIZE));
                }

                for (const chunk of transferChunks) {
                    let index = 0;

                    while (true) {
                        try {
                            if (index > 10) {
                                console.log("Distribution failed, Exiting...")
                                return false;
                            }
                            const latestBlockhash = await connection.getLatestBlockhash();

                            const messageV0 = new TransactionMessage({
                                payerKey: mainKp.publicKey,
                                recentBlockhash: latestBlockhash.blockhash,
                                instructions: chunk,
                            }).compileToV0Message();

                            const transaction = new VersionedTransaction(messageV0);
                            transaction.sign([holderKps[i]]);

                            console.log("Simulating token transfer...");
                            const sim = await connection.simulateTransaction(transaction);
                            console.warn("Simulation warning:", sim);
                            const serialized = transaction.serialize();
                            const txSize = serialized.length;

                            console.log("🧮 Token distribution tx size: ", txSize, "bytes");

                            const txSig = await execute(connection, transaction);
                            if (txSig) {
                                console.log(`✅ Tokens distributed: https://solscan.io/tx/${txSig}`);
                            }
                            break;
                        } catch (error) {
                            console.log(error);
                            await sleep(5000)
                            index++;
                        }
                    }
                }
                return true;
            } catch (innerErr) {
                // console.error(`❌ Error while distributing from holder ${holderKeypair.publicKey.toBase58()}:`, innerErr);
                return false
            }
        }

        return true; // ✅ everything ran successfully
    } catch (err) {
        console.error("❌ distributeToken failed:", err);
        return false;
    }
};