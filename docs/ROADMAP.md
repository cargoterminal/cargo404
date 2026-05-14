# Cargo404 Roadmap

Cargo404 is being built as a fixed-supply BNB Chain mint terminal with a transparent token flow, simple wallet UX, and public post-launch proof around liquidity, treasury, and buyback operations.

## Phase 0 — Foundation & Contract Deployment

**Status:** Completed

- Deploy fixed-supply `C404` ERC-20 contract on BNB Smart Chain.
- Set total supply: `1,000,000,000 C404`.
- Allocate:
  - `700,000,000 C404` for public mint.
  - `300,000,000 C404` for reserve/liquidity operations.
- Implement public mint rules:
  - Mint price: `0.0025 BNB`.
  - Tokens per cargo unit: `100,000 C404`.
  - Max public mint units: `7,000`.
  - Max per wallet: `10 cargo units`.
- Add owner-controlled mint activation.
- Add pause/unpause safety control.
- Add one-time raised BNB distribution:
  - `70%` liquidity bucket.
  - `20%` treasury.
  - `10%` buyback wallet.
- Publish contract source and BscScan link.
- Prepare Hardhat tests and launch scripts.

## Phase 1 — Mint Terminal Launch

**Status:** Completed / Final QA

- Build Cargo404 web mint terminal.
- Connect wallet through React + Vite + Wagmi + Viem.
- Configure Reown AppKit as a dark fallback for WalletConnect/mobile flows.
- Support BNB Smart Chain wallet connection.
- Display contract address, network status, mint status, wallet cap, and progress.
- Add cargo unit selector.
- Add mint transaction flow through Wagmi + Viem.
- Deploy frontend to the live Cargo404 domain.
- Connect GitHub auto-deployment pipeline.
- Preserve the black/neon terminal UI identity.

**Current focus:**

- Final browser QA.
- Confirm wallet connect flow from MetaMask/Rabby/Trust/WalletConnect.
- Confirm live site always points to the correct BSC contract.

## Phase 2 — Public Mint Activation

**Status:** Pending

- Announce official website and contract address.
- Publish BscScan verified contract link.
- Enable public mint only after final frontend and contract verification.
- Run first live smoke test with a non-owner wallet:
  - Connect wallet.
  - Mint `1` cargo unit.
  - Confirm C404 arrives in wallet.
  - Confirm progress updates on frontend.
  - Confirm transaction appears on BscScan.
- Monitor public mint activity:
  - total mint units,
  - remaining cargo,
  - wallet cap usage,
  - failed transaction reasons.

## Phase 3 — Liquidity & Proof of Operations

**Status:** Planned

After the mint phase or when the team decides to start market operations:

- Call the one-time raised BNB distribution function.
- Use the liquidity allocation to create PancakeSwap liquidity.
- Pair reserve C404 with liquidity BNB.
- Lock or burn LP tokens.
- Publish public proof:
  - LP pair address,
  - LP lock/burn transaction,
  - treasury distribution transaction,
  - buyback wallet transaction.
- Add liquidity/proof links to the website and README.

## Phase 4 — Community & Transparency Layer

**Status:** Planned

- Add a public “Cargo Status” page or section:
  - current mint status,
  - total minted,
  - remaining supply,
  - treasury wallet,
  - buyback wallet,
  - LP proof,
  - contract links.
- Publish short post-mint reports.
- Add official communication links.
- Add simple FAQ:
  - what is C404,
  - how mint works,
  - wallet cap,
  - token supply,
  - liquidity plan,
  - safety warnings.
- Create pinned launch thread with verified links only.

## Phase 5 — Post-Mint Utility Experiments

**Status:** Research

Cargo404 should avoid fake utility promises early. Post-mint experiments can be introduced only if they are actually shipped.

Potential directions:

- Holder-only terminal dashboard.
- Cargo manifest page showing wallet mint history.
- Community quests or proof-of-cargo badges.
- Simple leaderboard based on cargo loaded.
- Burn or buyback event tracker.
- Meme/terminal-themed NFT receipt or badge.
- Token-gated community experiments.

## Phase 6 — Long-Term Maintenance

**Status:** Ongoing

- Keep frontend and contract links updated.
- Maintain GitHub repository.
- Keep security notes visible:
  - no seed phrases,
  - no hidden approvals,
  - always verify contract address,
  - all mint transactions require wallet confirmation.
- Monitor BSC RPC reliability.
- Patch frontend issues quickly.
- Keep public docs clean and transparent.
- Archive final mint data after public mint ends.
