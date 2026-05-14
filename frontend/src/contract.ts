const configuredCargo404Address = import.meta.env.VITE_CARGO404_ADDRESS as `0x${string}` | undefined

export const cargo404Address = configuredCargo404Address || '0xEe563fe51d8903F7Bfc38489C60e4e797365b7FF'

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
