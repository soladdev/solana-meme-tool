import { listedToken, RiskFeatures, TokenData } from "@/base/types";
import { formatNumberAbbreviation, getSOLBalance, shortenAddress } from "@/base/utils";
import Layout from "@/components/Layout/layout";
import { solanaConnection } from "@/lib/constant";
import { TraderRiskResult } from "@/lib/types";
import { isValidSolanaAddress, toastError, toastSuccess, toastWarning } from "@/lib/utils";

import { Avatar, Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react";
import { SPL_ACCOUNT_LAYOUT, TokenAccount } from "@raydium-io/raydium-sdk";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import base58 from "bs58";
import { useEffect, useState } from "react";

export default function Home() {
    // Private code
}