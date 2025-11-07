import { useState, useEffect } from "react";
import { PublicKey, Keypair } from "@solana/web3.js";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  Input,
  Button,
} from "@heroui/react";
import { PiCoinsLight } from "react-icons/pi";
import { CiWallet } from "react-icons/ci";
import { MdToken } from "react-icons/md";
import Layout from "@/components/Layout/layout";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import bs58 from 'bs58'
import { isValidSolanaAddress, toastError, toastSuccess } from "@/lib/utils";

interface IInput {
  wallet: string;
  amount: string;
}

export default function Home() {
  const [inputs, setInputs] = useState<IInput[]>([])
  const [tokenAddress, setTokenAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleWalletChange = (index: number, value: string) => {
    const newWallets = [...inputs];
    newWallets[index].wallet = value;
    setInputs(newWallets);
  };

  const handleAmountChange = (index: number, value: string) => {
    const newAmounts = [...inputs];
    newAmounts[index].amount = value;
    setInputs(newAmounts);
  };

  // Private code
}
