# Cargo404 Mainnet Launch Runbook

Use this checklist before turning on BNB Smart Chain Mainnet mint for Cargo404.

## Target mainnet deployment

- Contract: `pending redeploy for 40.4M Option A`
- BscScan: `pending new contract verification`
- Frontend: https://www.cargo404.app
- Roadmap: [`docs/ROADMAP.md`](ROADMAP.md)
- Mint price: `0.0025 BNB`
- Wallet cap: `10 mint units`
- Public mint cap: `7,000 mint units`

## 1. Pre-launch checks

- [ ] Deployer wallet has enough BNB for gas only.
- [ ] Treasury address is correct.
- [ ] Buyback wallet is correct.
- [ ] `.env` exists locally and is not committed.
- [ ] `frontend/.env` points to the mainnet contract.
- [ ] New 40.4M contract source is verified on BscScan.
- [ ] Website links to the correct new BscScan contract page.
- [x] Website copy explains Cargo404 as a BNB Chain ERC20 cargo mint, not ERC404/NFT.
- [x] Website still uses the black/neon Cargo404 terminal UI; no white/default wallet modal unless AppKit fallback is opened manually.
- [x] Wallet connect smoke-tested with the safe Cargo404 modal.
- [ ] Team has the official website + verified contract address ready to post.

Run local checks before deploying:

```bash
npm run check
git diff --check
```

Deploy and verify the new 40.4M contract:

```bash
TREASURY_ADDRESS=0x8fDe5EaD3fb051D254885bc5b47012bCDdA341b9 \
BUYBACK_WALLET=0x8F513F52f89d25B2F919427cb23E3C1aaf9d4B2e \
npm run deploy:bsc

npm run verify:bsc -- <NEW_CARGO404_ADDRESS> \
  0x8fDe5EaD3fb051D254885bc5b47012bCDdA341b9 \
  0x8F513F52f89d25B2F919427cb23E3C1aaf9d4B2e
```

## 2. Optional on-chain status check

```bash
node - <<'NODE'
const { JsonRpcProvider, Contract, formatEther } = require('ethers')
const address = process.env.CONTRACT_ADDRESS || '<NEW_CARGO404_ADDRESS>'
const abi = [
  'function mintActive() view returns (bool)',
  'function MINT_PRICE() view returns (uint256)',
  'function totalMintUnits() view returns (uint256)',
  'function MAX_MINTS() view returns (uint256)',
  'function MAX_PER_WALLET() view returns (uint256)',
  'function remainingMintUnits() view returns (uint256)',
  'function distributed() view returns (bool)'
]
;(async () => {
  const provider = new JsonRpcProvider(process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org')
  const contract = new Contract(address, abi, provider)
  console.log({
    mintActive: await contract.mintActive(),
    mintPriceBNB: formatEther(await contract.MINT_PRICE()),
    totalMintUnits: String(await contract.totalMintUnits()),
    remainingMintUnits: String(await contract.remainingMintUnits()),
    maxMintUnits: String(await contract.MAX_MINTS()),
    maxPerWallet: String(await contract.MAX_PER_WALLET()),
    distributed: await contract.distributed()
  })
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
NODE
```

## Wallet UI rule

Cargo404's public page should stay black/neon and terminal-native:

- the main connect button should try the browser wallet first;
- the fallback wallet modal should stay dark and only appear when needed for mobile/WalletConnect-style flows;
- do not replace the Cargo404 terminal shell with a white/SaaS wallet landing without explicit approval.

## 3. Enable mint

Mint is disabled by default. Turn it on only after the frontend, contract, and launch post are ready.

```bash
CONTRACT_ADDRESS=<NEW_CARGO404_ADDRESS> npm run enable-mint:bsc
```

To pause public mint again:

```bash
CONTRACT_ADDRESS=<NEW_CARGO404_ADDRESS> MINT_ACTIVE=false npm run enable-mint:bsc
```

## 4. Smoke test

Use a non-owner wallet.

- [ ] Connect wallet to BNB Smart Chain Mainnet.
- [ ] Mint `1` cargo unit for `0.0025 BNB` plus gas.
- [ ] Confirm C404 balance arrives in wallet.
- [ ] Confirm website progress updates.
- [ ] Confirm BscScan shows the mint transaction.
- [ ] Optionally test max-wallet rejection separately with tiny/non-launch wallet only if needed.

## 5. Public launch post checklist

Post these together to reduce fake-link risk:

- [ ] Website URL
- [ ] Contract address
- [ ] BscScan verified contract link
- [ ] Mint price and wallet cap
- [ ] Reminder: no seed phrase, no hidden approval, only wallet-confirmed mint transaction

## 6. After mint phase

Distribute raised BNB once:

```bash
CONTRACT_ADDRESS=<NEW_CARGO404_ADDRESS> npm run distribute:bsc
```

Then manually:

- [ ] Create PancakeSwap liquidity using reserve C404 + liquidity BNB.
- [ ] Lock or burn LP.
- [ ] Post LP creation and lock/burn proof publicly.

## Safety rules

- Never paste seed phrases or private keys into chat, docs, commits, or issue threads.
- Never commit `.env` files.
- Do not enable mint until the exact contract address is published and visible in the frontend.
- Do not call `distributeRaisedBnb()` until the mint phase and liquidity plan are final.
