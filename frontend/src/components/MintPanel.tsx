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

const placeholderAddress = '0x0000000000000000000000000000000000000000'

export function MintPanel() {
  const [units, setUnits] = useState(1)
  const { address, isConnected, chainId } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { writeContract, data: hash, isPending: isWriting, error } = useWriteContract()

  const contractReady = cargo404Address !== placeholderAddress
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

  const connectWallet = () => connect({ connector: connectors[0] })
  const displayedAddress = isConnected ? shortAddress(address) : 'not connected'
  const statusLabel = !contractReady ? 'offline' : mintActive ? 'live' : 'gate closed'
  const copyContract = () => {
    if (contractReady && navigator.clipboard) navigator.clipboard.writeText(cargo404Address)
  }

  return (
    <section className="terminal-panel mint-panel" id="mint">
      <div className="panel-head">
        <span>▌ MINT CARGO</span>
        <strong>{minted}/7000 loaded</strong>
      </div>

      <div className="mint-summary">
        <div><span>mint fee</span><strong>0.0025 BNB</strong></div>
        <div><span>you receive</span><strong>100,000 C404</strong></div>
        <div><span>wallet cap</span><strong>{walletMinted}/10 used</strong></div>
      </div>

      <div className="data-table compact">
        <div><span>contract</span><i /> <strong>{contractReady ? shortAddress(cargo404Address) : 'pending deployment'}</strong></div>
        <div><span>network</span><i /> <strong>bnb smart chain</strong></div>
        <div><span>status</span><i /> <strong className={mintActive ? 'hot' : 'dim'}>{statusLabel}</strong></div>
      </div>

      <button type="button" className="copy-contract" onClick={copyContract} disabled={!contractReady}>
        copy verified contract address
      </button>

      <div className="progress-line">
        <span>cargo loaded</span>
        <b>{minted}/7000</b>
      </div>
      <div className="supply-track"><div className="supply-fill" style={{ width: `${progress}%` }} /></div>

      <div className="terminal-section">
        <div className="section-head"><span>▌ ACTIVATE CARGO LINK</span><b>{isConnected ? '○ ACTIVE' : '○ INACTIVE'}</b></div>
        <p>
          Connect wallet to open the Cargo404 terminal. If the gate is still closed, the contract is live
          but public mint has not been enabled yet.
        </p>
        <div className="terminal-field">
          <span>wallet address</span>
          {!isConnected ? (
            <button type="button" onClick={connectWallet} disabled={isConnecting}>connect cargo wallet →</button>
          ) : (
            <button type="button" onClick={() => disconnect()}>{displayedAddress} · disconnect</button>
          )}
        </div>
        {!isConnected ? (
          <button className="primary-btn" disabled={isConnecting} onClick={connectWallet}>◆ CONNECT WALLET FIRST</button>
        ) : wrongChain ? (
          <button className="primary-btn" onClick={() => switchChain({ chainId: bsc.id })}>◆ SWITCH TO BSC</button>
        ) : null}
      </div>

      <div className="terminal-section nested">
        <div className="section-head"><span>▌ LOAD CARGO</span><b>{canMint ? 'READY' : 'LOCKED'}</b></div>
        <div className="stepper">
          <button onClick={() => setUnits(Math.max(1, units - 1))}>−</button>
          <strong>{units}</strong>
          <button onClick={() => setUnits(Math.min(walletRemaining || 10, units + 1))}>+</button>
        </div>
        <div className="cost-line">total / {formatEther(totalCost)} bnb</div>
        <button className="primary-btn" disabled={!canMint || isWriting || isConfirming} onClick={onMint}>
          {isWriting || isConfirming ? '◆ LOADING CARGO...' : '◆ LOAD CARGO'}
        </button>
      </div>

      <div className="bottom-actions">
        <button type="button" onClick={() => window.location.reload()}>◆ REFRESH DATA</button>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>◆ OVERVIEW</button>
      </div>

      {!contractReady && <p className="warning">Contract address pending deployment. Mint unlocks after launch.</p>}
      {walletRemaining === 0 && <p className="warning">Wallet limit reached: 10/10 cargo loaded.</p>}
      {isSuccess && receipt && <p className="success">Cargo loaded. TX confirmed.</p>}
      {error && <p className="warning">{error.message.split('\n')[0]}</p>}
    </section>
  )
}
