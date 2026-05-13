import { useMemo, useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { bsc } from 'wagmi/chains'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { cargo404Abi, cargo404Address } from '../contract'

function shortAddress(address?: string) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function MintPanel() {
  const [units, setUnits] = useState(1)
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { writeContract, data: hash, isPending: isWriting, error } = useWriteContract()

  const contractReady = cargo404Address !== '0x0000000000000000000000000000000000000000'
  const wrongChain = isConnected && chainId !== bsc.id

  const { data: mintActive } = useReadContract({
    address: cargo404Address,
    abi: cargo404Abi,
    functionName: 'mintActive',
    query: { enabled: contractReady },
  })
  const { data: totalMintUnits } = useReadContract({
    address: cargo404Address,
    abi: cargo404Abi,
    functionName: 'totalMintUnits',
    query: { enabled: contractReady },
  })
  const { data: mintedByWallet } = useReadContract({
    address: cargo404Address,
    abi: cargo404Abi,
    functionName: 'mintedUnitsByWallet',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(contractReady && address) },
  })
  const { data: receipt, isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const minted = Number(totalMintUnits || 0n)
  const walletMinted = Number(mintedByWallet || 0n)
  const progress = Math.min((minted / 7000) * 100, 100)
  const totalCost = useMemo(() => parseEther('0.0025') * BigInt(units), [units])
  const walletRemaining = Math.max(10 - walletMinted, 0)

  const canMint = contractReady && isConnected && !wrongChain && mintActive && units > 0 && units <= walletRemaining

  const onMint = () => {
    if (!canMint) return
    writeContract({
      address: cargo404Address,
      abi: cargo404Abi,
      functionName: 'mintCargo',
      args: [BigInt(units)],
      value: totalCost,
    })
  }

  return (
    <section className="terminal-card mint-card">
      <div className="card-title">▌ MINT $C404</div>
      <div className="status-grid">
        <span>PRICE</span><strong>0.0025 BNB</strong>
        <span>MAX/WALLET</span><strong>10 MINT</strong>
        <span>YOUR CARGO</span><strong>{walletMinted}/10</strong>
        <span>STATUS</span><strong className={mintActive ? 'green' : 'amber'}>{mintActive ? 'LOADING' : 'OFFLINE'}</strong>
      </div>

      <div className="supply-row">
        <span>CARGO LOADED</span>
        <span>{minted}/7000</span>
      </div>
      <div className="supply-track"><div className="supply-fill" style={{ width: `${progress}%` }} /></div>

      <div className="stepper">
        <button onClick={() => setUnits(Math.max(1, units - 1))}>−</button>
        <strong>{units}</strong>
        <button onClick={() => setUnits(Math.min(walletRemaining || 10, units + 1))}>+</button>
      </div>
      <div className="cost-line">TOTAL: {formatEther(totalCost)} BNB</div>

      {!isConnected ? (
        <button className="primary-btn" disabled={isConnecting} onClick={() => connect({ connector: connectors[0] })}>
          ◆ CONNECT WALLET
        </button>
      ) : wrongChain ? (
        <button className="primary-btn amber-btn" onClick={() => switchChain({ chainId: bsc.id })}>◆ SWITCH TO BSC</button>
      ) : (
        <>
          <button className="primary-btn" disabled={!canMint || isWriting || isConfirming} onClick={onMint}>
            {isWriting || isConfirming ? '◆ LOADING CARGO...' : '◆ LOAD CARGO'}
          </button>
          <button className="ghost-btn" onClick={() => disconnect()}>disconnect {shortAddress(address)}</button>
        </>
      )}

      {!contractReady && <p className="warning">Set VITE_CARGO404_ADDRESS after deploy.</p>}
      {walletRemaining === 0 && <p className="warning">Wallet limit reached: 10/10 cargo loaded.</p>}
      {isSuccess && receipt && <p className="success">Cargo loaded. TX confirmed.</p>}
      {error && <p className="warning">{error.message.split('\n')[0]}</p>}
    </section>
  )
}
