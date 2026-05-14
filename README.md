# Cargo404 ($C404)

Cargo404 is a fixed-supply ERC-20 mint terminal on **BNB Smart Chain Mainnet**. The project ships a verified Solidity contract, Hardhat admin scripts, and a Vite + React + Wagmi frontend for a simple public mint flow.

```text
ERROR 404: CARGO NOT FOUND
Route missing. Cargo loaded. Convoy deployed.
```

- **Live app:** https://cargo404.vercel.app/
- **Repository:** https://github.com/cargoterminal/cargo404
- **Network:** BNB Smart Chain Mainnet
- **Contract:** [`0x586A95703e0AeEE7fE801efB8B66243884Fde811`](https://bscscan.com/address/0x586A95703e0AeEE7fE801efB8B66243884Fde811#code)
- **Token:** Cargo404 (`C404`)

> Cargo404 is experimental meme-token software. It is not financial advice. Always verify the contract address and confirm every wallet transaction manually.

## Token economics

- **Total supply:** `1,000,000,000 C404`
- **Public mint allocation:** `700,000,000 C404`
- **Reserve allocation:** `300,000,000 C404`
- **Mint price:** `0.0025 BNB`
- **Tokens per mint unit:** `100,000 C404`
- **Max mint units:** `7,000`
- **Max per wallet:** `10 mint units`

If the public mint sells out:

```text
7,000 mint units × 0.0025 BNB = 17.5 BNB raised
```

## Raised BNB distribution

`distributeRaisedBnb()` is owner-only and can be called once after the mint phase. The split is hardcoded in the contract:

```text
70% -> Liquidity bucket / owner deployer
20% -> Treasury
10% -> Buyback wallet
```

Liquidity creation is manual. After distribution, pair reserve C404 with the liquidity BNB on PancakeSwap, then publicly lock or burn LP and post proof.

## Repository structure

```text
contracts/Cargo404.sol        ERC-20 mint contract
scripts/deploy.js             Deploy contract to BSC testnet/mainnet
scripts/enable-mint.js        Toggle public mint on/off
scripts/distribute.js         Split raised BNB after mint phase
test/Cargo404.test.js         Hardhat contract tests
frontend/                     Vite + React + Wagmi mint UI
docs/MAINNET_LAUNCH.md        Launch runbook
.github/workflows/ci.yml      GitHub Actions checks
```

## Tech stack

- **Contracts:** Solidity `0.8.28`, OpenZeppelin, Hardhat
- **Frontend:** Vite, React, TypeScript, Wagmi, Viem
- **Network:** BNB Smart Chain Mainnet + BSC Testnet config
- **CI:** GitHub Actions with Node.js 20

## Quick start

```bash
git clone https://github.com/cargoterminal/cargo404.git
cd cargo404
npm install
npm --prefix frontend install
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Fill local environment files. Never commit `.env`, private keys, seed phrases, or deployer wallets.

Root `.env`:

```env
PRIVATE_KEY=your_deployer_private_key_without_0x
BSC_RPC_URL=https://bsc-dataseed.binance.org
BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.bnbchain.org:8545
TREASURY_ADDRESS=0x...
BUYBACK_WALLET=0x...
ETHERSCAN_API_KEY=optional
BSCSCAN_API_KEY=optional_legacy_fallback
```

Frontend `.env`:

```env
VITE_CARGO404_ADDRESS=0x586A95703e0AeEE7fE801efB8B66243884Fde811
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

## Development commands

```bash
npm test                 # run Hardhat tests
npm run compile          # compile contracts
npm run frontend:dev     # run Vite dev server
npm run frontend:lint    # lint frontend
npm run frontend:build   # build frontend
npm run check            # full local check
```

## Contract operations

### Deploy to BSC Testnet

```bash
npm run deploy:bscTestnet
```

### Deploy to BNB Smart Chain Mainnet

```bash
npm run deploy:bsc
```

The deploy script prints the deployed contract address. Copy it into `frontend/.env` as `VITE_CARGO404_ADDRESS` before building or deploying the frontend.

### Enable or disable mint

Mint is disabled by default after deploy.

Enable mint:

```bash
CONTRACT_ADDRESS=0xDeployedContract npm run enable-mint:bsc
```

Disable mint:

```bash
CONTRACT_ADDRESS=0xDeployedContract MINT_ACTIVE=false npm run enable-mint:bsc
```

### Distribute raised BNB

```bash
CONTRACT_ADDRESS=0xDeployedContract npm run distribute:bsc
```

Only run this after the mint phase and after confirming the liquidity plan.

## Frontend deployment

For Vercel or Netlify:

```text
Root directory: frontend
Build command: npm run build
Publish directory: dist
Node version: 20.x
```

Environment variables:

```env
VITE_CARGO404_ADDRESS=0x586A95703e0AeEE7fE801efB8B66243884Fde811
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

## Mainnet launch checklist

See [`docs/MAINNET_LAUNCH.md`](docs/MAINNET_LAUNCH.md) for the full runbook.

Minimum launch flow:

1. Run `npm run check`.
2. Confirm frontend shows the correct contract address.
3. Verify contract source on BscScan.
4. Enable mint with `enable-mint:bsc`.
5. Test one mint from a non-owner wallet.
6. Post official website, contract, and BscScan links.
7. After mint phase, distribute raised BNB.
8. Create PancakeSwap LP, then lock or burn LP and publish proof.

## Security notes

- The frontend never asks for seed phrases or private keys.
- All mint actions require wallet confirmation.
- `.env` files are ignored and must stay local.
- Mint price, supply, wallet cap, and BNB split are hardcoded in the contract.
- Liquidity creation and LP lock/burn are manual operational steps.

For reporting security issues, see [`SECURITY.md`](SECURITY.md).

## License

MIT. See [`LICENSE`](LICENSE).
