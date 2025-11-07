import React from "react";
import { TokenProps } from "@/lib/types";
import { GoPeople } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineCloudQueue } from "react-icons/md";
import { FaCrown } from "react-icons/fa";


const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

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
