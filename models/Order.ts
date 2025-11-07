
import mongoose from 'mongoose'

export interface Order extends mongoose.Document {
    isBuy: boolean,
    tokenAddress: string,
    privateKey: string,
    amount: number,
    limitMC: number,
    expireTime: number
}

const OrderSchema = new mongoose.Schema<Order>({
    isBuy: {
        type: Boolean,
        required: true
    },
    tokenAddress: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    limitMC: {
        type: Number,
        required: true
    },
    expireTime: {
        type: Number,
        required: true
    }
}, { timestamps: true })

let Order: any;
if (mongoose.models.Order) {
    Order = mongoose.model('Order');
} else {
    Order = mongoose.model('Order', OrderSchema);
}

export default Order;