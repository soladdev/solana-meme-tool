import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    ParsedTransactionWithMeta,
    ParsedInstruction,
    ConfirmedSignatureInfo,
} from '@solana/web3.js';
import {
    RiskFeatures,
    RiskScore,
    WalletData,
    Bucket,
} from '../types';
import {
    HOURLY_BUCKETS,
    DAILY_BUCKETS,
    FAILURE_RATE_BUCKETS,
    UNIQUE_TO_ADDRESS_BUCKETS,
    FEE_BUCKETS,
    TX_AMOUNT_BUCKETS,
    scamAddresses,
    PUBLIC_BIRD_EYE_API,
} from '@/lib/constant';

/* ---------- 1. Unified bucket lookup ---------- */
function getBucket<T extends { min: number; max?: number }>(
    value: number,
    buckets: T[]
): T | undefined {
    return buckets.find(b => value >= b.min && (b.max === undefined || value < b.max));
}

/* ---------- 2. Helper: extract SOL/SPL recipients ---------- */
function extractRecipients(
    tx: ParsedTransactionWithMeta,
    wallet: string
): Set<string> {
    const recipients = new Set<string>();

    // Private code

    return recipients;
}

/* ---------- 3. Feature extraction ---------- */
export async function extractFeatures(
    walletData: WalletData,
    walletAddress: string
): Promise<RiskFeatures> {
    const { transactions, tokenAccounts, balance } = walletData;

    const totalTxCount = transactions.length;
    const successfulTx = transactions.filter((tx: any) => tx.meta.err == null).length;
    const failedTx = totalTxCount - successfulTx;

    /* ---- Fees & Transfer values ---- */
    let totalFee = 0;
    let totalTransferLamports = 0;
    let transferTxCount = 0;
    const recipients = new Set<string>();

    // Private code
    return {
        totalTxCount,
        successfulTx,
        failedTx,
        txCountPerHour,
        txCountPerDay,
        scamInteractions,
        suspiciousTokens,
        recentCreation,
        largeTransfers,
        uniqueToAddressCount: recipients.size,
        avgFeeValue,
        avgTxValue,
    };
}

/* ---------- 4. Scoring ---------- */
export function calculateRiskScore(features: RiskFeatures): RiskScore {
    let score = 0;
    const reasons: string[] = [];

    // 1. Failure rate
    // Private code

    return { score, reasons, features };
}

/* ---------- 5. Public API ---------- */
export async function getWalletRiskScore(
    connection: Connection,
    walletAddress: string
): Promise<RiskScore> {
    try {
        const walletData = await fetchWalletData(connection, walletAddress);
        // console.log("🚀 ~ getWalletRiskScore ~ walletData:", walletData)
        const features = await extractFeatures(walletData, walletAddress);
        console.log('features →', features);
        return calculateRiskScore(features);
    } catch (err) {
        console.error('Risk engine error:', err);
        return { score: 0, reasons: ['Engine error'], features: null };
    }
}

/* ---------- 6. Data fetch (unchanged, just typed) ---------- */
async function fetchWalletData(
    connection: Connection,
    walletAddress: string
): Promise<WalletData> {
    const pub = new PublicKey(walletAddress);
    const balance = await connection.getBalance(pub);
    const accountInfo = await connection.getAccountInfo(pub);
    const owner = accountInfo?.owner?.toBase58() ?? null;

    // Private code
    return {
        balance,
        owner,
        transactions: transactions.filter(
            tx => tx && tx.meta && typeof tx.meta.fee === 'number'
        ),
        tokenAccounts: tokenAccounts.value,
    };
}