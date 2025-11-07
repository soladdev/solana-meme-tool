import { useEffect, useState } from "react";
import { useDisclosure, Textarea, Switch, Button } from "@heroui/react";
import { Input } from "@heroui/input";
import { FaUpload } from "react-icons/fa6";
import ImageUploading from 'react-images-uploading';
import Layout from "@/components/Layout/layout";
import PumpBundleModal from "@/components/PumpBundleModal";
import { isValidSolanaPrivateKey, toastError } from "@/lib/utils";
import { Keypair } from "@solana/web3.js";
import { FaExternalLinkAlt } from "react-icons/fa";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import axios from "axios";
import { useRouter } from "next/router";
import { useWalletContext } from "@/providers/wallet";
import { shortenAddress } from "@/base/utils";

export default function Home() {
  
  // Private code  
}
