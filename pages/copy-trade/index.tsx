import { useState } from "react";
import axios from "axios";
import { Input, useDisclosure, Textarea, Switch, Button } from "@heroui/react";

import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import Layout from "@/components/Layout/layout";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { isValidSolanaAddress, isValidSolanaPrivateKey, toastError, toastSuccess } from "@/lib/utils";

export default function Home() {

  const anchorWallet = useAnchorWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  // target wallet publickey
  const [targetWallet, setTargetWallet] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  // Private code
}
