import { ApiV3Token, TokenInfo } from '@raydium-io/raydium-sdk-v2';
import { Avatar, AvatarGroup } from "@heroui/react";
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TokenAvatarSize = 'xs' | 'sm' | 'smi' | 'md' | 'lg' | '2xl' | (string & {})

interface TokenAvatarProps {
  token1: TokenInfo | ApiV3Token;
  token2: TokenInfo | ApiV3Token;
  size: string;
}

const TokenAvatar: React.FC<TokenAvatarProps> = ({ token1, token2, size }) => {

  return (
    <AvatarGroup isBordered>
      <Avatar src={token1?.logoURI} alt={token1?.name} />
      <Avatar src={token2?.logoURI} alt={token2?.name}/>
    </AvatarGroup>
  );
};

export default TokenAvatar;