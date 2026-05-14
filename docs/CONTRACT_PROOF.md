# Cargo404 Contract Proof & Safety Notes

Last repo tokenomics update: pending redeploy for 40.4M Option A

## Official contract

- Network: BNB Smart Chain Mainnet
- Chain ID: `56`
- Verified contract: `pending redeploy`
- BscScan: `pending new contract verification`
- BscScan source status: pending redeploy/verification

## RPC verification result

The previous 1B-supply contract is obsolete for launch. This proof file now tracks the target 40.4M Option A redeploy until a new BNB Chain address is deployed and verified.

```json
{
  "validAddress": true,
  "chainId": "56",
  "hasCode": true,
  "codeLength": 9936,
  "contractBnbBalance": "0.0"
}
```

Interpretation:

- The address is a valid EVM address.
- The address has deployed bytecode on BNB Smart Chain.
- The contract is currently holding `0 BNB` because public mint has not started.

## Token identity

```json
{
  "name": "Cargo404",
  "symbol": "C404",
  "decimals": 18,
  "totalSupply": "40400000.0"
}
```

Public explanation:

- Token name: `Cargo404`
- Token symbol: `C404`
- Total supply: `40,400,000 C404`
- Token type: fixed-supply ERC20

## Wallets

```json
{
  "owner": "0x497C2DF2075e1f917987F6e50b9B16292C00c789",
  "treasury": "0x8fDe5EaD3fb051D254885bc5b47012bCDdA341b9",
  "buyback": "0x8F513F52f89d25B2F919427cb23E3C1aaf9d4B2e"
}
```

Operational notes:

- Owner controls mint activation and pause/unpause.
- Treasury receives the treasury portion after raised BNB distribution.
- Buyback wallet receives the buyback/burn bucket after raised BNB distribution.

## Current launch state

```json
{
  "mintActive": false,
  "paused": false,
  "distributed": false,
  "totalMintUnits": "0",
  "remainingMintUnits": "7000"
}
```

Interpretation:

- Public mint is currently closed.
- Contract is not paused.
- Raised BNB has not been distributed.
- No public cargo units have been minted yet.
- All `7,000` public cargo units remain available.

## Mint mechanics

```json
{
  "mintPriceBNB": "0.0025",
  "tokensPerCargo": "4040.0",
  "maxMints": "7000",
  "maxPerWallet": "10"
}
```

Public explanation:

- Each cargo costs `0.0025 BNB`.
- Each cargo sends `4,040 C404` to the minter.
- Public mint has a global cap of `7,000` cargo.
- Each wallet can mint up to `10` cargo.

## Allocation proof

```json
{
  "contractPublicMintBalance": "28280000.0",
  "ownerReserveBalance": "12120000.0"
}
```

Interpretation:

- The contract will hold `28,280,000 C404` for public mint after redeploy.
- The owner will hold `12,120,000 C404` reserve allocation after redeploy.

Public explanation must clearly say the reserve allocation exists and may be used for liquidity/project operations.

## Raised BNB split

```json
{
  "liquidity": "7000",
  "treasury": "2000",
  "buyback": "1000"
}
```

BPS interpretation:

- `7000` BPS = `70%` liquidity bucket
- `2000` BPS = `20%` treasury
- `1000` BPS = `10%` buyback/burn bucket

Important: the contract only splits raised BNB. It does not automatically create PancakeSwap liquidity, lock LP, burn LP, or execute a buyback. Those are manual operational steps that need public proof after they happen.

## Safe public wording

Use:

```text
Cargo404 is a BNB Chain terminal-themed ERC20 cargo mint.
Load cargo with BNB. Trigger 404. Receive C404.
```

Use:

```text
The contract is deployed on BNB Chain and public mint is currently closed until final launch checks are complete.
```

Confirmed safe wording:

```text
The contract source is verified on BscScan.
```

Do not use before proof exists:

```text
audited
renounced
LP locked
LP burned
auto-liquidity
auto-buyback
ERC404
NFT mint
```

## Owner safety gates before enabling mint

Do not call `setMintActive(true)` until all are true:

- [ ] Website shows official contract address.
- [ ] Website wallet connect and BSC switch are smoke-tested.
- [ ] Public copy says ERC20 cargo mint, not ERC404/NFT.
- [x] BscScan source verification is complete.
- [ ] X profile, pinned post/thread, and official links are ready.
- [ ] Owner wallet has enough BNB for the enable-mint transaction.
- [ ] Treasury and buyback wallet addresses are confirmed.
- [ ] Liquidity/LP proof plan is ready for after mint.

## Re-check command

Run from repo root:

```bash
CONTRACT_ADDRESS=<NEW_CARGO404_ADDRESS> node scripts/check-contract-state.js
```

If that helper script does not exist, use the RPC snippet in `docs/MAINNET_LAUNCH.md`.
