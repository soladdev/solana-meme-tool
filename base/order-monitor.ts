// This script runs independently

import Order from "@/models/Order";
import connectMongodb from "./mongodb";

connectMongodb()
    .then(async () => {
        console.log('MongoDB connected');
        // redis
        try {
            setInterval(async () => {
                await performOrders()
            }, 60 * 1000);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    })
    .catch(error => {
        console.log("MongoDB connect failed", error);
    });

// Graceful exit
process.on('SIGINT', () => {
    console.log('[Monitor] Shutting down...');
    process.exit();
});

async function performOrders() {
    // Private code
}