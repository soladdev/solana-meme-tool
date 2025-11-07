import { useCallback, useEffect, useRef, useMemo } from 'react'
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { useWallet } from '@solana/wallet-adapter-react'

const localFakePubKey = '_r_f_wallet_'

function useInitConnection(props: any) {
  const { publicKey: _publicKey, signAllTransactions: _signAllTransactions, wallet, connected } = useWallet()

  // fetch rpc nodes
}

export default useInitConnection
