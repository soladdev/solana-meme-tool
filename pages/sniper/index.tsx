import { useState, useEffect } from "react";
import {
  Input,
  useDisclosure,
  Switch,
  Button,
  Checkbox,
  CheckboxGroup,
  Tooltip
} from "@heroui/react";
import axios from "axios";
import Layout from "@/components/Layout/layout";
import { isValidSolanaPrivateKey, toastError, toastSuccess } from "@/lib/utils";

interface IInput {
  wallet: string;
  amount: number;
}

export default function Home() {
  const [amount, setAmount] = useState("0.001");
  const [slippage, setSlippage] = useState(0.5);
  const [tipAmount, setTipAmount] = useState("0.0001");
  const [isSetMev, setIsSetMev] = useState(false);
  const [minLiquidity, setMinLiquidity] = useState(0);
  const [maxLiquidity, setMaxLiquidity] = useState(10 ** 9);
  const [marketCost, setMarketCost] = useState(0);
  const [poolSupply, setPoolSupply] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Private code
}
