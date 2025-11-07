// pages/api/orders/fetch.ts

import connectMongodb from '@/base/mongodb'
import Order from '@/models/Order'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { userWallets } = req.body

    if (!Array.isArray(userWallets) || userWallets.length === 0) {
      return res.status(400).json({ error: 'userWallets must be a non-empty array' })
    }

    await connectMongodb()
    console.log('MongoDB connected')

    // Find orders where tokenAddress is in userWallets
    const orders = await Order.find({
      privateKey: { $in: userWallets },
    }).sort({ createdAt: -1 }) // optional: sort by newest first

    return res.status(200).json(orders)
  } catch (err) {
    console.error('Error fetching orders:', err)
    return res.status(500).json({ error: 'Failed to fetch orders' })
  }
}
