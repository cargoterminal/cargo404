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
- Prepare contract tests and owner launch scripts.

## Phase 1 — Mint Terminal Launch

**Status:** Completed

- Launch the Cargo404 web mint terminal.
- Keep the black/neon terminal identity consistent with the Cargo404 brand.
- Show official contract, mint status, wallet limit, and public progress clearly.
- Let users connect a wallet, choose cargo units, and mint directly from the site.
- Deploy the site to the official Cargo404 domain.
- Publish official website, verified contract address, and BscScan link.
- Keep public mint activation behind the owner-controlled contract switch.

## Phase 2 — Liquidity & Proof of Operations

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

## Phase 3 — Community & Transparency Layer

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

## Phase 4 — Post-Mint Utility Experiments

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

## Phase 5 — Long-Term Maintenance

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
