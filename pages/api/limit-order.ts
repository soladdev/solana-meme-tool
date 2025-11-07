import connectMongodb from '@/base/mongodb';
import Order from '@/models/Order';
import bs58 from 'bs58';
import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const payload = req.body;
        connectMongodb()
            .then(async () => {
                console.log('MongoDB connected');
                // redis
                try {
                    const storeRes = await Order.create(payload);
                    res.json(storeRes);
                } catch (error) {
                    console.error('Error creating order:', error);
                    res.status(500).json({ error: 'Failed to create order' });
                }
            })
            .catch(error => {
                console.log("MongoDB connect failed", error);
                res.status(500).json({ error: "MongoDB connect failed" })
            });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed Order!" })
    }
}