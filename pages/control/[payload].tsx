import { useEffect, useState } from "react";
import axios from "axios";
import { Input, useDisclosure, Textarea, Switch, Button } from "@heroui/react";
import Layout from "@/components/Layout/layout";
import { useRouter } from 'next/router'
import { FaExternalLinkAlt } from "react-icons/fa";
import { isValidSolanaAddress, toastError, toastSuccess } from "@/lib/utils";
import CryptoJS from "crypto-js";
import { IWallet, TokenInfo } from "@/lib/types";
import { useWalletContext } from "@/providers/wallet";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { getSOLBalance, getSPLBalance, shortenAddress, sleep } from "@/base/utils";
import { solanaConnection } from "@/lib/constant";
import TokenInfoCard from "@/components/TokenInfoCard";
import TradePanel from "@/components/TradePanel";

export default function Home() {
    const router = useRouter();
    const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!

    const [tokenAddress, setTokenAddress] = useState("");

    // console.log("🚀 ~ Home ~ tokenAddress:", tokenAddress)
    const { getPrivateKeys } = useWalletContext();
    const [buyerWallets, setBuyerWallets] = useState<IWallet[]>([]);
    const [privateKeys, setPrivateKeys] = useState<string[]>([]);
    const [newWalletCnt, setNewWalletCnt] = useState<number>(0);
    const [distributeSolAmount, setDistributeSolAmount] = useState<string>("0")
    const [newWallets, setNewWallets] = useState<string[]>([]);
    const [isDistributed, setIsdistributed] = useState<boolean>(false);
    const [isGathering, setIsGathering] = useState<boolean>(false);
    const [blLoading, setBlLoading] = useState<boolean>(false)
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);

    // Private code
}
