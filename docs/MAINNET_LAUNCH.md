# Cargo404 Mainnet Launch Checklist

Use this before turning on BNB Mainnet mint.

## Pre-deploy

- [ ] Deployer wallet has BNB for gas only; no unnecessary funds
- [ ] Treasury address checked twice
- [ ] Buyback wallet checked twice
- [ ] `.env` exists locally and is not committed
- [ ] `npm test` passes
- [ ] `npm run frontend:build` passes

## Deploy

```bash
npm run deploy:bsc
```

Save:

- Contract address:
- Deploy TX:
- BscScan link:

## Frontend

Set frontend env:

```env
VITE_CARGO404_ADDRESS=0xDeployedContract
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
```

Deploy frontend with:

```text
Root directory: frontend
Build command: npm run build
Publish directory: dist
```

## Before enabling mint

- [ ] Website shows correct contract address
- [ ] Wallet switch targets BNB Smart Chain Mainnet
- [ ] BscScan contract link is available
- [ ] Team has posted official contract address

Enable mint:

```bash
CONTRACT_ADDRESS=0xDeployedContract npm run enable-mint:bsc
```

## Smoke test

- [ ] Non-owner wallet mints 1 cargo for 0.0025 BNB
- [ ] Wallet counter updates
- [ ] Token appears in wallet after adding contract address
- [ ] Max wallet cap rejects >10 units

## After mint phase

```bash
CONTRACT_ADDRESS=0xDeployedContract npm run distribute:bsc
```

Then:

- [ ] Create PancakeSwap liquidity with reserve C404 + liquidity BNB
- [ ] Lock or burn LP
- [ ] Post LP proof link publicly
