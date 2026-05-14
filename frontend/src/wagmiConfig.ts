import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask } from 'wagmi/connectors'

const bscRpcUrl = import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org'

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: 'Cargo404' }),
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [bsc.id]: http(bscRpcUrl),
  },
})
