# Cargo404 — $C404

Terminal-native meme mint on BNB Smart Chain.

```text
ERROR 404: CARGO NOT FOUND
Route missing. Cargo loaded. Convoy deployed.
```

## Token spec

- Name: Cargo404
- Symbol: C404
- Network: BNB Smart Chain
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

`distributeRaisedBnb()` uses hardcoded percentages:

```text
70% → Liquidity bucket / owner deployer
20% → Treasury
10% → Buyback wallet
```

Important: liquidity creation/LP lock is manual after distribution. Pair the liquidity BNB with reserve C404, then lock or burn LP publicly.

## Setup

```bash
npm install
cp .env.example .env
npm --prefix frontend install
cp frontend/.env.example frontend/.env
```

Fill `.env`:

```env
PRIVATE_KEY=your_deployer_private_key
TREASURY_ADDRESS=0x...
BUYBACK_WALLET=0x...
BSCSCAN_API_KEY=optional
```

Never commit `.env`.

## Test

```bash
npm test
```

## Deploy BSC Testnet

```bash
npm run deploy:bscTestnet
```

Copy deployed address into `frontend/.env`:

```env
VITE_CARGO404_ADDRESS=0xDeployedContract
```

Then build frontend:

```bash
npm run frontend:build
```

## Start mint

After deploy, owner must enable mint:

```js
await cargo404.setMintActive(true)
```

You can do this from Hardhat console:

```bash
npx hardhat console --network bscTestnet
```

```js
const c = await ethers.getContractAt('Cargo404', '0xDeployedContract')
await c.setMintActive(true)
```

## Frontend dev

```bash
npm run frontend:dev
```

## Mainnet checklist

- [ ] Test deploy on BSC Testnet
- [ ] Test connect wallet + switch BSC
- [ ] Test mint 1 unit
- [ ] Test max 10 per wallet
- [ ] Verify contract on BscScan
- [ ] Set mint active only when ready
- [ ] After launch, distribute BNB
- [ ] Create PancakeSwap liquidity
- [ ] Lock/burn LP and post proof
