import { Server } from 'ws';
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const wss = new Server({ noServer: true });

    // Handle WebSocket connections
    wss.on('connection', (ws) => {
        console.log('WebSocket client connected');

        // Handle incoming messages
        ws.on('message', (message) => {
            console.log('Received message:', message);
            // You can send response to the client if needed
            ws.send('Message received');
        });

        // Handle WebSocket disconnections
        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    });

    // Upgrade HTTP request to WebSocket
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
        wss.emit('connection', ws, req);
    });
}
