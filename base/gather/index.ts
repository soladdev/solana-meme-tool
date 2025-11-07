import { AnchorProvider } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { createCloseAccountInstruction, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram, TokenAmount, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58"
import { BN } from "bn.js";
import { PumpFunSDK } from "../pump";
import { execute } from "../legacy";
import { sleep } from "../utils";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { CHUNK_SIZE } from "@/lib/constant";

export const gatherTokenAndSol = async (connection: Connection, keypairstr: string, wallets: string[], tokenAddressStr: string): Promise<boolean> => {
    const mainKp = Keypair.fromSecretKey(base58.decode(keypairstr));
    const tokenAddress = new PublicKey(tokenAddressStr);
    const mainWalletAta = await getAssociatedTokenAddress(
        tokenAddress,
        mainKp.publicKey
    );

    // Private code

}

export const sellAllToken = async (connection: Connection, mainKp: Keypair, tokenAddress: PublicKey, initialTokenBalance: TokenAmount): Promise<boolean> => {
    // Private code
}