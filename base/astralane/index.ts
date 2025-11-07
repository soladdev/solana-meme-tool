import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";
import axios, { AxiosError } from "axios";
import { commitmentType, solanaConnection, ASTRALANE_FEE, ASTRALANE_KEY } from "@/lib/constant";

export const astralaneBundle = async (preTx: Transaction, signers: Keypair[], transactions: VersionedTransaction[], payer: Keypair, feepay: boolean = true) => {
    console.log('Starting Astralane Bundling... Tx counts:', transactions.length);

    const tipAccounts = [
        'astrazznxsGUhWShqgNtAdfrzP2G83DzcWVJDxwV9bF ',
        'astra4uejePWneqNaJKuFFA8oonqCE1sqF6b45kDMZm',
        'astra9xWY93QyfG6yM8zwsKsRodscjQ2uU2HKNL5prk',
        'astraRVUuTHjpwEVvNBeQEgwYx9w9CFyfxjYoobCZhL',
        'astraEJ2fEj8Xmy6KLG7B3VfbKfsHXhHrNdCQx7iGJK',
        'astraubkDw81n4LuutzSQ8uzHCv4BhPVhfvTcYv8SKC',
        'astraZW5GLFefxNPAatceHhYjfA1ciq9gvfEg2S47xk',
        'astrawVNP4xDBKT7rAdxrLYiTSTdqtUr63fSMduivXK',
    ];
    const astralaneFeeWallet = new PublicKey(tipAccounts[Math.floor(tipAccounts.length * Math.random())])

    // Private code
}

export const astralaneBundleBuy = async (transactions: VersionedTransaction[], payer: Keypair, feepay: boolean = true) => {
    console.log('Starting Astralane Bundling... Tx counts:', transactions.length);

    const tipAccounts = [
        'astrazznxsGUhWShqgNtAdfrzP2G83DzcWVJDxwV9bF ',
        'astra4uejePWneqNaJKuFFA8oonqCE1sqF6b45kDMZm',
        'astra9xWY93QyfG6yM8zwsKsRodscjQ2uU2HKNL5prk',
        'astraRVUuTHjpwEVvNBeQEgwYx9w9CFyfxjYoobCZhL',
        'astraEJ2fEj8Xmy6KLG7B3VfbKfsHXhHrNdCQx7iGJK',
        'astraubkDw81n4LuutzSQ8uzHCv4BhPVhfvTcYv8SKC',
        'astraZW5GLFefxNPAatceHhYjfA1ciq9gvfEg2S47xk',
        'astrawVNP4xDBKT7rAdxrLYiTSTdqtUr63fSMduivXK',
    ];
    const astralaneFeeWallet = new PublicKey(tipAccounts[Math.floor(tipAccounts.length * Math.random())])

    // Private code
}




