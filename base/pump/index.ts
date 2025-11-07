import { BN, min } from "bn.js";
import { Program, Provider } from "@coral-xyz/anchor";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    getAccount,
    getAssociatedTokenAddress,
    getAssociatedTokenAddressSync,
    NATIVE_MINT,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
    Commitment,
    Connection,
    Finality,
    Keypair,
    PublicKey,
    Transaction,
    VersionedTransaction,
    TransactionMessage,
    TransactionInstruction,
    AddressLookupTableProgram,
    ComputeBudgetProgram,
} from "@solana/web3.js";

import { jitoBundle, jitoPumpBundle } from "./jitoBundle";
import { PumpFunIDL, PumpFun } from "./utils/IDL";
import { GlobalAccount } from "./utils/accounts";
import { BondingCurveAccount } from "./utils/accounts";
import {
    toCompleteEvent,
    toCreateEvent,
    toSetParamsEvent,
    toTradeEvent,
} from "./utils/events";
import {
    buildTx,
    buildVersionedTx,
    calculateWithSlippageBuy,
    calculateWithSlippageSell,
    chunkArray,
    createLookupTable,
    getRandomInt,
    sendTx,
} from "./utils";
import { commitmentType, eventAuthority, MAIN_RPC, pumpFunProgram, rentProgram, systemProgram } from "@/lib/constant";
import { astralaneBundle, astralaneBundleBuy } from "../astralane";
import { CompleteEvent, CreateEvent, CreateTokenMetadata, PriorityFee, PumpFunEventHandlers, PumpFunEventType, Result, SetParamsEvent, TradeEvent, TransactionResult } from "../types";
import { execute } from "../legacy";

// Private code
