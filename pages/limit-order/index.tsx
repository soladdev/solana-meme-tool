import { useState } from "react";
import axios from "axios";
import { Input, Button } from "@heroui/react";

import Layout from "@/components/Layout/layout";
import { isValidSolanaAddress, isValidSolanaPrivateKey, toastError, toastInfo, toastSuccess } from "@/lib/utils";
import { OrderProps, TokenInfo } from "@/lib/types";
import TokenInfoCard from "@/components/TokenInfoCard";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58"
import { solanaConnection } from "@/lib/constant";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenAccount } from "@raydium-io/raydium-sdk";
import { SPL_ACCOUNT_LAYOUT } from "@raydium-io/raydium-sdk";
import { FaCopy } from "react-icons/fa";
import OrderCard from "@/components/OrderCard";
import { listedToken } from "@/base/types";
import { formatNumberAbbreviation, parseAbbreviatedNumber, parseAbbreviatedTime, shortenAddress } from "@/base/utils";

export default function Home() {
  // Private code
}
