import { useMemo, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import dynamic from 'next/dynamic';
import useInitConnection from "@/hooks/useInitConnection";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { MAIN_RPC } from "@/lib/constant";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar-react/dist/simplebar.min.css';
import "@/styles/globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ThemeProvider } from "@/providers/theme";
import { AppProvider } from "@/providers/app";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";
import { WalletsProvider } from "@/providers/wallet";
import { VolumeProvider } from "@/providers/volume";

const DynamicContent = dynamic(() => import('@/components/Content'))

export default function App({ Component, pageProps }: AppProps) {

  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => MAIN_RPC, [network]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter()
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <NextTopLoader color="#07C26B" />
      <AppProvider>
        <WalletsProvider>
          <VolumeProvider>
            <ThemeProvider>
              <Head>
                <title>MemeCoin Token Launch Pad</title>
              </Head>
              <WalletProvider wallets={wallets} autoConnect={true}>
                <DynamicContent {...pageProps}>
                  <WalletModalProvider>
                    <HeroUIProvider>
                      <ToastContainer
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        theme="light"
                        transition={Bounce}
                      />
                      {isClient ? <Component {...pageProps} /> : null}
                    </HeroUIProvider>
                  </WalletModalProvider>
                </DynamicContent>
              </WalletProvider>
            </ThemeProvider>
          </VolumeProvider>
        </WalletsProvider>
      </AppProvider>
    </ConnectionProvider>
  )
}
