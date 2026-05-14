# Cargo404 Mainnet Launch Runbook

Use this checklist before turning on BNB Smart Chain Mainnet mint for Cargo404.

## Current mainnet deployment

- Contract: `0x586A95703e0AeEE7fE801efB8B66243884Fde811`
- BscScan: https://bscscan.com/address/0x586A95703e0AeEE7fE801efB8B66243884Fde811#code
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
- [ ] Contract source is verified on BscScan.
- [ ] Website links to the correct BscScan contract page.
- [ ] Website still uses the black/neon Cargo404 terminal UI; no white/default wallet modal unless AppKit fallback is opened manually.
- [ ] Team has the official website + contract address ready to post.

Run local checks:

```bash
npm run check
```

## 2. Optional on-chain status check

```bash
node - <<'NODE'
const { JsonRpcProvider, Contract, formatEther } = require('ethers')
const address = '0x586A95703e0AeEE7fE801efB8B66243884Fde811'
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
CONTRACT_ADDRESS=0x586A95703e0AeEE7fE801efB8B66243884Fde811 npm run enable-mint:bsc
```

To pause public mint again:

```bash
CONTRACT_ADDRESS=0x586A95703e0AeEE7fE801efB8B66243884Fde811 MINT_ACTIVE=false npm run enable-mint:bsc
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
CONTRACT_ADDRESS=0x586A95703e0AeEE7fE801efB8B66243884Fde811 npm run distribute:bsc
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
