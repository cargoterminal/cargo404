# Cargo404 Security Policy

## Scope

This repository contains:

- Solidity contract for Cargo404 (`contracts/Cargo404.sol`)
- Hardhat deploy/admin scripts
- Vite/Wagmi frontend for BNB Chain Mainnet minting

## Reporting issues

If you find a security issue, do not open a public issue with exploit details. Contact the project maintainer privately first.

## Safety boundaries

- The frontend never asks for seed phrases or private keys.
- All transactions require wallet confirmation.
- `.env` files are ignored and must never be committed.
- The mint contract uses hardcoded mint price and wallet limits.

## Known operational trust step

Liquidity creation and LP lock/burn are manual after `distributeRaisedBnb()`. Mainnet launch should include public proof of LP creation and lock/burn.
