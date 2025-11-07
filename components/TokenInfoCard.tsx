import { TokenInfo } from '@/lib/types';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlinePriceCheck } from "react-icons/md";
import { SiCoinmarketcap, SiExpertsexchange } from "react-icons/si";

type TokenInfoProps = {
    token: TokenInfo;
};

const TokenInfoCard: React.FC<TokenInfoProps> = ({ token }) => {
    if (!token) return null; // Return nothing if token is null

    // Private code
};

export default TokenInfoCard;
