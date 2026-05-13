export const cargo404Address = (import.meta.env.VITE_CARGO404_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`

export const cargo404Abi = [
  {
    type: 'function',
    name: 'mintCargo',
    stateMutability: 'payable',
    inputs: [{ name: 'units', type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'mintActive',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'totalMintUnits',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'mintedUnitsByWallet',
    stateMutability: 'view',
    inputs: [{ type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'MINT_PRICE',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'MAX_MINTS',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'MAX_PER_WALLET',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
] as const
