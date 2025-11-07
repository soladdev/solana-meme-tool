import { IWallet, TokenInfo } from "@/lib/types";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import bs58 from "bs58";
import CryptoJS from "crypto-js";
import { solanaConnection } from "@/lib/constant";
import { getSOLBalance, getSPLBalance } from "@/base/utils";
import { isValidSolanaAddress, isValidSolanaPrivateKey, toastError, toastInfo } from "@/lib/utils";
import axios from "axios";

// Define props for TradePanel
interface TradePanelProps {
    privateKeys: string[];
    tokenInfo: TokenInfo;
}

const TradePanel = ({ tokenInfo, privateKeys }: TradePanelProps) => {
    const [tab, setTab] = useState<"buy" | "sell">("buy");
    const [amount, setAmount] = useState("0");
    const [tradeWallet, setTradeWallet] = useState("");
    const [wallets, setWallets] = useState<Keypair[]>([]);
    const [isTrading, setIsTrading] = useState(false);
    const [tradeWalletSolAmount, setTradeWalletSolAmount] = useState("0")
    const [tradeWalletTokenAmount, setTradeWalletTokenAmount] = useState("0")
    const presetAmounts = ["0.1", "0.5", "1"];
    const presetTokenAmounts = ["10", "20", "50"];

    const handleMax = () => {
        // setAmount("Max");
        if (tab == "buy") setAmount(tradeWalletSolAmount);
        else setAmount(tradeWalletTokenAmount);
    };

    const onBuy = () => {
        console.log("buy");
        const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        if (amount == "0") {
            toastError("Input amount");
            return;
        }

        const payload = CryptoJS.AES.encrypt(JSON.stringify({
            isBuy: true,
            wallet: tradeWallet,
            amount,
            tokenAddress: tokenInfo.address
        }), encryptKey).toString()
        setIsTrading(true);
        axios.post("/api/trade", {
            params: {
                payload
            }
        }).then(res => {
            setIsTrading(false)
            toastInfo(`Success to buy`)
        }).catch(err => {
            setIsTrading(false);
            toastError("Failed to buy")
        })
    }

    const onSell = () => {
        console.log("sell");
        const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY!
        if (amount == "0") {
            toastError("Input amount");
            return;
        }

        const payload = CryptoJS.AES.encrypt(JSON.stringify({
            isBuy: false,
            wallet: tradeWallet,
            amount,
            tokenAddress: tokenInfo.address
        }), encryptKey).toString()
        setIsTrading(true);
        axios.post("/api/trade", {
            params: {
                payload
            }
        }).then(res => {
            setIsTrading(false)
            toastInfo(`Success to sell`)
        }).catch(err => {
            setIsTrading(false);
            toastError("Failed to sell")
        })

    }

    // Private code
};

export default TradePanel;
