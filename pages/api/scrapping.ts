import type { NextApiRequest, NextApiResponse } from 'next';
import pMap from 'p-map';
import { solanaConnection } from '@/lib/constant';
import { fetchTopTraderWallets } from '@/lib/utils';
import { getWalletRiskScore } from '@/base/wallet-check';
import { TraderRiskResult } from '@/lib/types';
import { sleep } from '@/base/utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TraderRiskResult[] | { error: string }>
) {
    try {
        // 1. Fetch top trader wallets
        const topTraders: string[] = await fetchTopTraderWallets();
        if (topTraders.length === 0) {
            return res.status(200).json([]);
        }

        console.log(`Fetched ${topTraders.length} top traders. Analyzing...`);

        // 2. Analyze each wallet ONE BY ONE (no concurrency)
        const results: TraderRiskResult[] = [];

        for (const address of topTraders) {
            try {
                const { score, reasons, features } = await getWalletRiskScore(
                    solanaConnection,
                    address
                );

                results.push({
                    address,
                    score,
                    reasons,
                    features,
                });

                console.log(`Scored ${address}: ${score}/100`);
            } catch (err: any) {
                console.warn(`Failed to score wallet ${address}:`, err.message);
                results.push({
                    address,
                    score: 0,
                    reasons: ['Analysis failed'],
                    features: null,
                    error: err.message,
                });
            }

            // Optional: small delay between requests (e.g., 200ms)
            await sleep(8000);
        }

        // 3. Send final array
        res.status(200).json(results);
    } catch (error: any) {
        console.error('Global error in analyze-top-traders:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}