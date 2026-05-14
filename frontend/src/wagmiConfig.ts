import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { bsc, type AppKitNetwork } from '@reown/appkit/networks'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '6f3d9e2b7c9a4f1a8b2e5d6c7a9b0c1d'
const bscRpcUrl = import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org'
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bsc]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
  transports: {
    [bsc.id]: bscRpcUrl,
  },
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: bsc,
  projectId,
  metadata: {
    name: 'Cargo404',
    description: 'Cargo404 C404 mint terminal on BNB Smart Chain.',
    url: 'https://frontend-caro-404.vercel.app',
    icons: ['https://frontend-caro-404.vercel.app/cargo404.png'],
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8fd737',
    '--w3m-color-mix': '#090d07',
    '--w3m-color-mix-strength': 45,
    '--w3m-border-radius-master': '2px',
    '--w3m-font-family': 'JetBrains Mono, monospace',
    '--w3m-z-index': 1000,
    '--apkt-accent': '#8fd737',
    '--apkt-color-mix': '#090d07',
    '--apkt-color-mix-strength': 45,
    '--apkt-border-radius-master': '2px',
    '--apkt-font-family': 'JetBrains Mono, monospace',
    '--apkt-z-index': 1000,
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: false,
  enableCoinbase: false,
  enableWalletGuide: false,
  allWallets: 'HIDE',
  includeWalletIds: [],
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
