# Cargo404 ($C404)

Cargo404 is a BNB Chain mint terminal for `$C404`: fixed supply, simple wallet mint, transparent limits, and a public post-mint liquidity/proof workflow.

```text
ERROR 404: CARGO NOT FOUND
Route missing. Cargo loaded. Convoy deployed.
```

- **Live app:** https://www.cargo404.app/
- **Repository:** https://github.com/cargoterminal/cargo404
- **Network:** BNB Smart Chain Mainnet
- **Verified contract:** [`0x586A95703e0AeEE7fE801efB8B66243884Fde811`](https://bscscan.com/address/0x586A95703e0AeEE7fE801efB8B66243884Fde811#code)
- **Token:** Cargo404 (`C404`)

> Cargo404 is experimental meme-token software. It is not financial advice. Always verify the contract address and confirm every wallet transaction manually.

## Project status

Cargo404 is already deployed and prepared for public mint operations. The remaining steps are operational, not core development:

- Contract deployed on BNB Smart Chain Mainnet.
- Contract source published on BscScan.
- Web mint terminal is live.
- Public repo is cleaned and documented.
- Mint is controlled by an owner switch and should only be enabled when the launch post, wallet QA, and liquidity plan are ready.
- Liquidity creation and LP lock/burn proof happen after the mint phase.

## Mint details

- **Total supply:** `1,000,000,000 C404`
- **Public mint allocation:** `700,000,000 C404`
- **Reserve allocation:** `300,000,000 C404`
- **Mint price:** `0.0025 BNB`
- **Tokens per cargo unit:** `100,000 C404`
- **Max cargo units:** `7,000`
- **Max per wallet:** `10 cargo units`

If the public mint sells out:

```text
7,000 cargo units × 0.0025 BNB = 17.5 BNB raised
```

## Raised BNB plan

Raised BNB stays in the contract until the owner calls the one-time distribution function after the mint phase:

```text
70% -> Liquidity bucket / owner deployer
20% -> Treasury
10% -> Buyback wallet
```

Liquidity creation is manual. After distribution, reserve C404 should be paired with the liquidity BNB on PancakeSwap, then LP should be locked or burned and proof should be posted publicly.

## How Cargo404 works

1. User opens the official Cargo404 site.
2. User connects a wallet on BNB Smart Chain.
3. User chooses how many cargo units to mint.
4. Wallet confirms the mint transaction.
5. C404 lands directly in the user's wallet.
6. Public mint progress and wallet limits are read from the contract.

The frontend never asks for seed phrases or private keys.

## Repository contents

```text
contracts/                    C404 contract source
scripts/                      owner operation scripts
frontend/                     live mint terminal
frontend/public/              Cargo404 logo and favicon assets
frontend/src/                 mint UI and wallet logic
docs/MAINNET_LAUNCH.md        operator launch checklist
docs/ROADMAP.md               public roadmap
.github/workflows/ci.yml      automated contract/frontend checks
SECURITY.md                   security reporting notes
```

## For operators

Use the launch runbook for owner-side actions:

- [`docs/MAINNET_LAUNCH.md`](docs/MAINNET_LAUNCH.md)

Minimum launch flow:

1. Confirm the live site shows the correct contract address.
2. Confirm the wallet connect and mint panel work in-browser.
3. Prepare the official website + contract announcement post.
4. Enable mint from the owner wallet.
5. Test one mint from a non-owner wallet.
6. Monitor mint progress and failed transactions.
7. After the mint phase, distribute raised BNB.
8. Create PancakeSwap liquidity, then lock or burn LP and publish proof.

## Local verification

For maintainers who want to verify the repo locally:

```bash
git clone https://github.com/cargoterminal/cargo404.git
cd cargo404
npm install
npm --prefix frontend install
npm run check
```

Local environment files are intentionally ignored. Never commit `.env`, private keys, seed phrases, or deployer wallets.

Frontend deployment uses the `frontend/` folder:

```text
Root directory: frontend
Build command: npm run build
Publish directory: dist
Node version: 20.x
```

Required public frontend variables:

```env
VITE_CARGO404_ADDRESS=0x586A95703e0AeEE7fE801efB8B66243884Fde811
VITE_BSC_RPC_URL=https://bsc-dataseed.binance.org
VITE_REOWN_PROJECT_ID=your_reown_project_id
```

## Roadmap

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the public Cargo404 roadmap covering completed foundation/terminal work, liquidity proof, transparency, and post-mint experiments.

## Security notes

- The site never asks for seed phrases or private keys.
- All mint actions require wallet confirmation.
- Verify the official contract address before minting.
- Mint price, supply, wallet cap, and BNB split are fixed in the contract.
- Liquidity creation and LP lock/burn are manual operational steps.

For reporting security issues, see [`SECURITY.md`](SECURITY.md).

## License

MIT. See [`LICENSE`](LICENSE).
