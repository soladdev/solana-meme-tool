import React from "react";
import { TokenProps } from "@/lib/types";
import { shortenAddress } from "@/utils/token";

const TokenCard: React.FC<TokenProps> = ({
  address,
  symbol,
  name,
  decimals,
  liquidityAddedAt,
  source,
  logoURI,
  liquidity,
}) => {
  // Private code
};

export default TokenCard;
