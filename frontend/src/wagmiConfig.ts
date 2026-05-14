import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc } from '@reown/appkit/networks'
import { http } from 'wagmi'
import { injected } from 'wagmi/connectors'

const bscRpcUrl = import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org'
const configuredReownProjectId = import.meta.env.VITE_REOWN_PROJECT_ID?.trim() || ''
export const hasConfiguredReownProjectId = Boolean(
  configuredReownProjectId && configuredReownProjectId !== 'your_reown_project_id',
)
const reownProjectId = hasConfiguredReownProjectId ? configuredReownProjectId : 'cargo404-local-dev'

const wagmiAdapter = new WagmiAdapter({
  networks: [bsc],
  projectId: reownProjectId,
  connectors: [
    injected({
      shimDisconnect: false,
      unstable_shimAsyncInject: false,
    }),
  ],
  transports: {
    [bsc.id]: http(bscRpcUrl),
  },
  ssr: false,
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: [bsc],
  defaultNetwork: bsc,
  projectId: reownProjectId,
  metadata: {
    name: 'Cargo404',
    description: 'Cargo404 BNB mint terminal',
    url: 'https://www.cargo404.app',
    icons: ['https://www.cargo404.app/cargo404.png'],
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8fd737',
    '--w3m-border-radius-master': '2px',
    '--w3m-font-family': 'JetBrains Mono, monospace',
  },
  allWallets: 'HIDE',
  enableCoinbase: false,
  enableEIP6963: true,
  enableWalletGuide: false,
  features: {
    analytics: false,
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    history: false,
    allWallets: false,
  },
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
