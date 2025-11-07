import { PublicKey } from "@solana/web3.js";

export type Result<T, E = any | undefined> = {
  Ok?: T,
  Err?: E
}

export type CreateTokenMetadata = {
  name: string;
  symbol: string;
  description: string;
  file: Blob;
  twitter?: string;
  telegram?: string;
  website?: string;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  description: string;
  image: string;
  showName: boolean;
  createdOn: string;
  twitter: string;
};

export type CreateEvent = {
  name: string;
  symbol: string;
  uri: string;
  mint: PublicKey;
  bondingCurve: PublicKey;
  user: PublicKey;
};

export type TradeEvent = {
  mint: PublicKey;
  solAmount: bigint;
  tokenAmount: bigint;
  isBuy: boolean;
  user: PublicKey;
  timestamp: number;
  virtualSolReserves: bigint;
  virtualTokenReserves: bigint;
  realSolReserves: bigint;
  realTokenReserves: bigint;
};

export type CompleteEvent = {
  user: PublicKey;
  mint: PublicKey;
  bondingCurve: PublicKey;
  timestamp: number;
};

export type SetParamsEvent = {
  feeRecipient: PublicKey;
  initialVirtualTokenReserves: bigint;
  initialVirtualSolReserves: bigint;
  initialRealTokenReserves: bigint;
  tokenTotalSupply: bigint;
  feeBasisPoints: bigint;
};

export interface PumpFunEventHandlers {
  createEvent: CreateEvent;
  tradeEvent: TradeEvent;
  completeEvent: CompleteEvent;
  setParamsEvent: SetParamsEvent;
}

export type PumpFunEventType = keyof PumpFunEventHandlers;

export type PriorityFee = {
  unitLimit: number;
  unitPrice: number;
};

export type TransactionResult = {
  signature?: string;
  error?: unknown;
  results?: any;
  success: boolean;
};

export type BatchBuyTransactionResult = {
  signature?: string;
  error?: unknown;
  results?: any;
  success: boolean;
};

export type snipePayload = {
  amount: number;
  slippage: number;
  tipAmount: number;
  isSetMev: number;
  minLiquidity: number;
  maxLiquidity: number;
  marketCost: number;
  poolSupply: number;
  privateKey: string;
}

export interface Data {
  privateKey: string;
  pubkey: string;
}

export type listedToken = {
  address: string,
  amount: string
}

export type TokenData = {
  address: string,
  name: string,
  symbol: string,
  url: string,
  amount: string,
  price: number
}

export interface WalletData {
  balance: number; // SOL balance in lamports
  owner: string | null;
  transactions: any[]; // Transaction history
  tokenAccounts: any[]; // Token holdings
}

export interface RiskFeatures {
  totalTxCount: number;
  successfulTx: number;
  failedTx: number;
  txCountPerHour: number;
  txCountPerDay: number;
  scamInteractions: number;
  suspiciousTokens: number;
  recentCreation: boolean;
  largeTransfers: number;
  uniqueToAddressCount: number;      // <-- recipients, not signers
  avgFeeValue: number;               // SOL
  avgTxValue: number;                // SOL
}

export interface RiskScore {
  score: number;
  reasons: string[];
  features: RiskFeatures | null
}

/* Bucket interfaces – keep them in the same file or import from constants */
export interface Bucket<T = number> {
  min: T;
  max?: T;
  points: number;
  reason: string;
}
export type VelocityBucket = Bucket<number>;
export type FailureRateBucket = Bucket<number>;
export type UniqueAddressBucket = Bucket<number>;
export type FeeBucket = Bucket<number>;
export type TxValueBucket = Bucket<number>;