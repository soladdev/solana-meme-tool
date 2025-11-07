import { CommitmentLevel, SubscribeRequest } from "@triton-one/yellowstone-grpc";
import { MARKET_STATE_LAYOUT_V3 } from "@raydium-io/raydium-sdk";
import { BufferRingBuffer } from "./buffer/buffer";
import { client } from "./config";

export const bufferRing = new BufferRingBuffer(5000);

export async function streamOpenbook() {
  const stream = await client.subscribe();
  // Collecting all incoming events.
  stream.on("data", (data) => {
    if (data.account != undefined) {
      bufferRing.enqueue(data.account.account.data);
    }
  });

  // Private code
  // Sending a subscription request.
  await new Promise<void>((resolve, reject) => {
    stream.write(openBookRequest, (err: null | undefined) => {
      if (err === null || err === undefined) {
        resolve();
      } else {
        reject(err);
      }
    });
  }).catch((reason) => {
    console.error(reason);
    throw reason;
  });
}