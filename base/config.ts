import { MAIN_GRPC, MAIN_GRPC_TOKEN } from '@/lib/constant';
import { PublicKey } from '@solana/web3.js';
import Client from '@triton-one/yellowstone-grpc';

export const blockEngineUrl = 'tokyo.mainnet.block-engine.jito.wtf';
export const global_mint = new PublicKey("p89evAyzjd9fphjJx7G3RFA48sbZdpGEppRcfRNpump")

export const client = new Client(MAIN_GRPC, MAIN_GRPC_TOKEN, {});
