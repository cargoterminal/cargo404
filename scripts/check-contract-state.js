const { JsonRpcProvider, Contract, formatEther, isAddress } = require('ethers')

const address = process.env.CONTRACT_ADDRESS || ''
const rpcUrl = process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org'

if (!address) {
  throw new Error('Set CONTRACT_ADDRESS=0x... before running this script')
}

const abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function owner() view returns (address)',
  'function treasury() view returns (address)',
  'function buybackWallet() view returns (address)',
  'function mintActive() view returns (bool)',
  'function paused() view returns (bool)',
  'function distributed() view returns (bool)',
  'function MINT_PRICE() view returns (uint256)',
  'function TOKENS_PER_MINT() view returns (uint256)',
  'function MAX_MINTS() view returns (uint256)',
  'function MAX_PER_WALLET() view returns (uint256)',
  'function totalMintUnits() view returns (uint256)',
  'function remainingMintUnits() view returns (uint256)',
  'function LIQUIDITY_BPS() view returns (uint16)',
  'function TREASURY_BPS() view returns (uint16)',
  'function BUYBACK_BPS() view returns (uint16)',
]

async function main() {
  const provider = new JsonRpcProvider(rpcUrl)
  const network = await provider.getNetwork()
  const code = await provider.getCode(address)
  const balance = await provider.getBalance(address)
  const contract = new Contract(address, abi, provider)

  const [
    name,
    symbol,
    decimals,
    totalSupply,
    owner,
    treasury,
    buyback,
    mintActive,
    paused,
    distributed,
    mintPrice,
    tokensPerMint,
    maxMints,
    maxPerWallet,
    totalMintUnits,
    remainingMintUnits,
    liquidityBps,
    treasuryBps,
    buybackBps,
  ] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
    contract.owner(),
    contract.treasury(),
    contract.buybackWallet(),
    contract.mintActive(),
    contract.paused(),
    contract.distributed(),
    contract.MINT_PRICE(),
    contract.TOKENS_PER_MINT(),
    contract.MAX_MINTS(),
    contract.MAX_PER_WALLET(),
    contract.totalMintUnits(),
    contract.remainingMintUnits(),
    contract.LIQUIDITY_BPS(),
    contract.TREASURY_BPS(),
    contract.BUYBACK_BPS(),
  ])

  const [contractTokenBalance, ownerTokenBalance] = await Promise.all([
    contract.balanceOf(address),
    contract.balanceOf(owner),
  ])

  console.log(JSON.stringify({
    checkedAt: new Date().toISOString(),
    address,
    bscscan: `https://bscscan.com/address/${address}#code`,
    validAddress: isAddress(address),
    chainId: network.chainId.toString(),
    hasCode: code !== '0x',
    codeLength: code.length,
    contractBnbBalance: formatEther(balance),
    token: {
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: formatEther(totalSupply),
    },
    wallets: {
      owner,
      treasury,
      buyback,
    },
    state: {
      mintActive,
      paused,
      distributed,
      totalMintUnits: totalMintUnits.toString(),
      remainingMintUnits: remainingMintUnits.toString(),
    },
    mint: {
      mintPriceBNB: formatEther(mintPrice),
      tokensPerCargo: formatEther(tokensPerMint),
      maxMints: maxMints.toString(),
      maxPerWallet: maxPerWallet.toString(),
    },
    allocations: {
      contractPublicMintBalance: formatEther(contractTokenBalance),
      ownerReserveBalance: formatEther(ownerTokenBalance),
    },
    splitBps: {
      liquidity: liquidityBps.toString(),
      treasury: treasuryBps.toString(),
      buyback: buybackBps.toString(),
    },
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
