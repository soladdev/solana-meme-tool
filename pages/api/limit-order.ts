import connectMongodb from '@/base/mongodb';
import Order from '@/models/Order';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const payload = req.body;
        await connectMongodb();

        const storeRes = await Order.create(payload);
        return res.json(storeRes);
    } catch (err) {
        console.error("Limit order error:", err);
        const message = err instanceof Error ? err.message : "Failed to create order";
        return res.status(500).json({ error: message });
    }
}