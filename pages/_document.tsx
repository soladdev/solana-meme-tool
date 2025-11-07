import { Html, Head, Main, NextScript } from "next/document";

const meta = {
  title: 'Trojan App',
  description: '',
  icons: "../favicon.avif",
  image: "../og.png",
  type: "website",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <title>Meme core - The Ultimate Platform for Multi-Wallet Token Bundling and Pump Fun</title> */}
        <meta name="description" content='Meme core is a versatile platform designed for the Solana ecosystem, specializing in the "pump fun" experience. Make a splash by creating and buying tokens across multiple wallets in one powerful transaction, all through Meme core on pump.fun. With Raydium utility features, users can effortlessly create tokens, update metadata, manage token authority, and handle token 2022. The platform also enables adding/removing liquidity, burning/locking LP tokens, and bundling transactions to maximize impact.' />
        <meta property="og:url" content="https://clickcreate.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Unleash Ultimate pump.fun and powerful RAYDIUM tools" />
        <meta property="og:description" content='Meme core is a versatile platform designed for the Solana ecosystem, specializing in the "pump fun" experience. Make a splash by creating and buying tokens across multiple wallets in one powerful transaction, all through Meme core on pump.fun. With Raydium utility features, users can effortlessly create tokens, update metadata, manage token authority, and handle token 2022. The platform also enables adding/removing liquidity, burning/locking LP tokens, and bundling transactions to maximize impact.' />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/20aa20bf-79f1-4571-a2fe-8d6239f7ef0a.png?token=My5cNUPxRs4TJ6YQw0OMOKoj0FjNvrmnMSL03dVb_L0&height=530&width=1200&expires=33267583605" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="clickcreate.app" />
        <meta property="twitter:url" content="https://clickcreate.app/" />
        <meta name="twitter:title" content="Unleash Ultimate pump.fun and powerful RAYDIUM tools" />
        <meta name="twitter:description" content='Meme core is a versatile platform designed for the Solana ecosystem, specializing in the "pump fun" experience. Make a splash by creating and buying tokens across multiple wallets in one powerful transaction, all through Meme core on pump.fun. With Raydium utility features, users can effortlessly create tokens, update metadata, manage token authority, and handle token 2022. The platform also enables adding/removing liquidity, burning/locking LP tokens, and bundling transactions to maximize impact.' />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/20aa20bf-79f1-4571-a2fe-8d6239f7ef0a.png?token=My5cNUPxRs4TJ6YQw0OMOKoj0FjNvrmnMSL03dVb_L0&height=530&width=1200&expires=33267583605" />

        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href={`/`} />
        <link rel="icon" href={meta.icons} sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
