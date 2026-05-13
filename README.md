# Cargo404 — $C404

Terminal-native meme mint on **BNB Smart Chain Mainnet**.

```text
ERROR 404: CARGO NOT FOUND
Route missing. Cargo loaded. Convoy deployed.
```

- Repo: https://github.com/cargoterminal/cargo404
- Chain: BNB Smart Chain Mainnet
- Token: Cargo404 (`C404`)
- Mint price: `0.0025 BNB`
- Max per wallet: `10` mint units

> This is experimental meme-token software. It is not financial advice. Users must confirm all wallet transactions manually.

## Token spec

- Name: Cargo404
- Symbol: C404
- Network: BNB Smart Chain Mainnet
- Total supply: 1,000,000,000 C404
- Public mint allocation: 700,000,000 C404
- Reserve allocation: 300,000,000 C404
- Mint price: 0.0025 BNB
- Tokens per mint: 100,000 C404
- Max mint units: 7,000
- Max per wallet: 10 mint

If sold out:

```text
7,000 x 0.0025 BNB = 17.5 BNB raised
```

## Raised BNB split

`distributeRaisedBnb()` can be called once by the owner and uses hardcoded percentages:

```text
70% → Liquidity bucket / owner deployer
20% → Treasury
10% → Buyback wallet
```

Important: liquidity creation is manual. The contract only splits raised BNB. After distribution, create PancakeSwap liquidity with reserve C404 + liquidity BNB, then lock or burn LP publicly and post proof.

## Project structure

```text
contracts/Cargo404.sol      # ERC20 + payable BNB mint
scripts/deploy.js           # Hardhat deploy script
scripts/enable-mint.js      # Owner toggle for mainnet/testnet
scripts/distribute.js       # Owner BNB split after launch
test/Cargo404.test.js       # Contract tests
frontend/                   # Vite React + Wagmi mint UI
.github/workflows/ci.yml    # CI: contracts + frontend
```

## Local setup

```bash
npm install
npm --prefix frontend install
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Fill `.env` locally only:

```env
PRIVATE_KEY=your_deployer_private_key
BSC_RPC_URL=https://bsc-dataseed.binance.org
TREASURY_ADDRESS=0x...
BUYBACK_WALLET=0x...
BSCSCAN_API_KEY=optional
```

Never commit `.env`, private keys, seed phrases, or deployer wallets.

## Verify locally

```bash
npm test
npm run compile
npm run frontend:build
```

## Deploy directly to BNB Mainnet

Make sure the deployer wallet has enough BNB for gas. Then:

```bash
npm run deploy:bsc
```

The deploy script prints:

```text
Cargo404 deployed: 0x...
Set frontend VITE_CARGO404_ADDRESS= 0x...
```

Copy the deployed address into `frontend/.env`:

```env
VITE_CARGO404_ADDRESS=0xDeployedContract
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

Build the frontend:

```bash
npm run frontend:build
```

## Enable mainnet mint

Mint is disabled by default after deploy. Turn it on only when the website and contract address are ready:

```bash
CONTRACT_ADDRESS=0xDeployedContract npm run enable-mint:bsc
```

To disable:

```bash
CONTRACT_ADDRESS=0xDeployedContract MINT_ACTIVE=false npm run enable-mint:bsc
```

## After launch: distribute BNB

```bash
CONTRACT_ADDRESS=0xDeployedContract npm run distribute:bsc
```

Then manually create PancakeSwap liquidity and lock/burn LP.

## Frontend deploy notes

For Vercel/Netlify, use:

```text
Root directory: frontend
Build command: npm run build
Publish directory: dist
Environment:
  VITE_CARGO404_ADDRESS=0xDeployedContract
  VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

## Mainnet launch checklist

- [ ] Run `npm test`
- [ ] Run `npm run frontend:build`
- [ ] Fund deployer with BNB gas
- [ ] Deploy with `npm run deploy:bsc`
- [ ] Save deployed address
- [ ] Set `VITE_CARGO404_ADDRESS`
- [ ] Deploy frontend
- [ ] Verify contract on BscScan
- [ ] Enable mint with `enable-mint:bsc`
- [ ] Test 1 mint from a non-owner wallet
- [ ] Post contract + website + BscScan link
- [ ] After mint phase, distribute BNB
- [ ] Create PancakeSwap LP
- [ ] Lock/burn LP and post proof
