# Meme Tool

Meme Tool is an opinionated automation stack for Solana meme-coin launches and post-launch trading. The app wraps bundled token deployments, high-frequency trading automations, copy trading, and risk analytics into a single operational dashboard built with Next.js 14.

## Feature Highlights

- **Launchpad with Bundled Liquidity** – Create pump.fun tokens, upload creative assets, attach socials, and immediately provision sniper wallets through the launch flow in `pages/launch` and the `PumpBundleModal` component. Bundle buys and initial liquidity distribution are executed server-side for consistent debuts.
- **Bundle Buy Coordinator** – `pages/bundle-buy` lets you submit up to 15 managed wallets, decode secret keys, and send synchronized buy orders for an existing token. Balance tracking, input validation, and toast feedback keep operators informed.
- **Sniper Automation** – Configure MEV protection, slippage, liquidity guards, supported DEXes, and social signal filters from `pages/sniper`. The `/api/sniper` route streams new pools and submits Jito-enabled entries once criteria are met.
- **Copy Trading Bot** – Mirror any wallet’s trades by enrolling a bot wallet and a target address in `pages/copy-trade`. Trades are executed through `/api/copy` using the same price routing as manual swaps.
- **Limit Order Engine** – Build buy or sell brackets in `pages/limit-order`, including market-cap triggers, expiry windows, and amount thresholds. Orders persist in MongoDB and are surfaced back through the `OrderCard` list.
- **Token Control Center** – The dynamic route `pages/control/[payload]` aggregates wallet balances, token info, TradingView charts, and supply distribution tooling. Generate new wallets, distribute SOL and tokens, or recall funds once campaigns conclude.
- **Volume Boosting Suite** – `pages/volume-boost` exposes configurable plans (wallet count, TPS, delays) that encrypt execution payloads before they reach `/api/volume-boost`. Operators can start, stop, and gather SOL without exposing secret keys.
- **Wallet Risk Intelligence** – Assess counterparties in `pages/wallet-check`. The UI hydrates SOL balances, SPL portfolios, scraped trader leaderboards, and the machine-learned risk score with feature breakdowns from `/api/wallet-check`.
- **Market Trenches Radar** – Browse curated pump.fun and Raydium launches in `pages/trenches` to spot fresh liquidity, graduating pools, or post-graduate momentum in a dashboard-friendly feed.

## Architecture Snapshot

- **Frontend:** Next.js 14 with the `/pages` directory, HeroUI components, Tailwind styling, and Zustand stores for lightweight state sharing.
- **APIs:** Next.js API routes under `pages/api/*` orchestrate Solana RPC calls, Jito bundling, MongoDB order persistence, Redis caching, and third-party integrations (BirdEye, GeckoTerminal, Dexscreener).
- **Base Services:** The `base/` directory encapsulates wallet management, bundling logic, sniper streams, liquidity orchestration, and risk scoring helpers used across UI and API layers.
- **Providers:** React context wrappers in `providers/` expose wallet connections, theming, and volume session data to the component tree.

## Getting Started

1. **Install dependencies**
   ```bash
   yarn install
   ```
2. **Create an environment file** based on the template below and place it at the project root as `.env.local` (Next.js automatically loads it).
3. **Run the development server**
   ```bash
   yarn dev
   ```
4. Open `http://localhost:3000` to access the dashboard.

## Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_MAIN_RPC` / `NEXT_PUBLIC_MAIN_WSS` | Primary Solana RPC HTTP and WebSocket endpoints used by the app.
| `NEXT_PUBLIC_GRPC` / `NEXT_PUBLIC_GRPC_TOKEN` | Yellowstone gRPC connection and access token for high-performance streaming.
| `NEXT_PUBLIC_ASTRALANE_KEY` | Astralane service key for jito bundle orchestration.
| `NEXT_PUBLIC_JITO_UUID` | Jito bundle UUID for block engine submissions.
| `NEXT_PUBLIC_BIRD_EYE_API` | BirdEye API key leveraged for market data and wallet analytics.
| `NEXT_PUBLIC_MONGODB_URL` | Connection string for the MongoDB instance backing orders, tokens, and wallets.
| `NEXT_PUBLIC_REDIS_URI` | Redis URI supporting caching and task coordination.
| `NEXT_PUBLIC_ENCRYPT_KEY` | AES key shared by client and server to encrypt sensitive payloads (private keys, wallet arrays).

Optional operational toggles sourced in `lib/constant.ts` and the base modules:

- `CHECK_IF_MINT_IS_RENOUNCED`, `CHECK_IF_MINT_IS_MUTABLE`, `CHECK_IF_MINT_IS_BURNED`, `WAIT_UNTIL_LP_IS_BURNT`, `LP_BURN_WAIT_TIME`
- `AMOUNT_TO_WSOL`, `MAX_RETRY`, `FREEZE_AUTHORITY`, `IS_JITO`

> **Security Note:** Never commit `.env.local`. The UI encrypts private keys before sending them to API routes, but you are responsible for securing storage, runtime secrets, and infrastructure.

## Available Scripts

- `yarn dev` – start the Next.js dev server with extended memory headroom.
- `yarn build` – create an optimized production build.
- `yarn start` – serve the production build (defaults to port `3001`).
- `yarn lint` – run ESLint on the project.
- `yarn test` – execute the TypeScript integration test harness in `test.mts`.

## Project Structure

- `pages/` – Route-driven UIs (launchpad, sniper, copy trade, limit orders, volume boost, wallet risk, trenches) and API endpoints.
- `base/` – Core Solana utilities for bundling, liquidity, sniper streaming, wallet monitoring, and transaction builders.
- `components/` – Reusable UI building blocks such as `TradePanel`, `TokenCard`, `PumpBundleModal`, and layout primitives.
- `providers/` – React context providers for theme handling, wallet key management, and volume bot state.
- `store/` – Zustand slices powering cross-component state like drawer visibility and cached settings.
- `lib/` – Helper constants, shared types, Redis utilities, and formatting helpers (`lib/utils.ts`).

## Operational Guidance

- **Wallet Hygiene:** Many screens accept plaintext private keys to unlock automation. Use burner wallets, limit stored SOL, and rotate keys often.
- **RPC Throughput:** The sniper, bundler, and volume modules depend on fast Solana RPC and gRPC streams. Provision premium providers or self-hosted RPC nodes to avoid rate limiting.
- **Observability:** API routes return toast feedback in the UI. For production, wire these routes into your logging and alerting stack to monitor automation health.
- **Extensibility:** New automation flows can inherit from the existing patterns—co-locate UI under `pages/`, implement orchestration inside `base/`, and expose a thin API in `pages/api/` that handles encryption and validation.

Happy launching, sniping, and monitoring! 🎯
