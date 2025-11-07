import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Switch } from "@heroui/react";
import { useEffect, useState } from 'react'
import CryptoJS from "crypto-js";
import { Bounce, toast } from 'react-toastify';
import { CiWallet } from "react-icons/ci";
import { PiCoinsLight } from "react-icons/pi";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import { useRouter } from 'next/router'
import BN from "bn.js";
import bs58 from 'bs58'
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { isValidSolanaAddress, toastError, toastInfo, toastSuccess } from "@/lib/utils";
import { div } from "@raydium-io/raydium-sdk-v2";
import { getSOLBalance, getSPLBalance } from "@/base/utils";
import { solanaConnection } from "@/lib/constant";
import { TokenInfo } from "@/lib/types";
import TokenInfoCard from "./TokenInfoCard";
import { shortenAddress } from "@/utils/token";
import { estimateHoldingPercent } from "@/base/pump/utils";
import { useWalletContext } from "@/providers/wallet";

interface IInput {
  wallet: string;
  amount: string;
}

interface IWallet {
  address: string;
  privateKey: string;
  solAmount: string | null;
  tokenAmount: string | null;
}

function PumpBundleModal({
  isOpen,
  onClose,
  createMarketLp,
  bmLoading,
  setBmLoading,
  blLoading,
  setBlLoading,
  images,
  mintTokenName,
  mintTokenSymbol,
  mintTokenDesc,
  socialState
}: {
  isOpen: boolean
  onClose: () => void,
  createMarketLp?: () => Promise<{ lpTx: VersionedTransaction; lpId: string; baseTokenAmount: BN; quoteTokenAmount: BN; } | undefined>,
  bmLoading: boolean,
  setBmLoading: (loading: boolean) => void,
  blLoading: boolean,
  setBlLoading: (loading: boolean) => void,
  images: Array<any>,
  mintTokenName: string,
  mintTokenSymbol: string,
  mintTokenDesc: string,
  socialState: {
    website: string,
    twitter: string,
    telegram: string,
    discord: string
  }
}) {

  const router = useRouter();

  // Private code


  const validator = () => {
    const filtered = inputs.filter((item) => Number(item.amount) > 0 && item.wallet != '')
    for (let i = 0; i < filtered.length; i++) {
      try {
        Keypair.fromSecretKey(bs58.decode(filtered[i].wallet))
      } catch (e) {
        return { err: true }
      }
    }
    if (filtered.length == 0) return { err: true }
    else return { ok: filtered }
  }

  useEffect(() => {
    let buff: IInput[] = []

    Array.from({ length: 5 }).forEach(element => {
      buff.push({
        wallet: "",
        amount: "0"
      })
    });


    setInputs(buff)
  }, [])

  return (
    <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} isDismissable={false} size="2xl" className="bg-background p-2 font-IT">
      {/* Private code */}
    </Modal >
  )
}

export default PumpBundleModal
