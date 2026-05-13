import { createConfig, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const bscRpcUrl = import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org'

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [injected({ target: 'metaMask' }), injected()],
  transports: {
    [bsc.id]: http(bscRpcUrl),
  },
})
