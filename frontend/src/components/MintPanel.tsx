import { useEffect, useMemo, useState } from 'react'
import { useAppKit } from '@reown/appkit/react'
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
import { hasConfiguredReownProjectId } from '../wagmiConfig'

const activeCargo404Address = cargo404Address as `0x${string}`

function shortAddress(address?: string) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}


export function MintPanel() {
  const [units, setUnits] = useState(1)
  const [copyLabel, setCopyLabel] = useState('copy contract')
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [isBrowserWalletReady, setIsBrowserWalletReady] = useState(false)
  const { address, isConnected, chainId } = useAccount()
  const { connectors, connect, isPending: isConnecting, error: connectError } = useConnect()
  const { open } = useAppKit()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { writeContract, data: hash, isPending: isWriting, error } = useWriteContract()

  const contractReady = Boolean(activeCargo404Address)
  const wrongChain = isConnected && chainId !== bsc.id

  const { data: mintActive } = useReadContract({
    address: activeCargo404Address,
    abi: cargo404Abi,
    functionName: 'mintActive',
    query: { enabled: contractReady },
  })
  const { data: totalMintUnits } = useReadContract({
    address: activeCargo404Address,
    abi: cargo404Abi,
    functionName: 'totalMintUnits',
    query: { enabled: contractReady },
  })
  const { data: mintedByWallet } = useReadContract({
    address: activeCargo404Address,
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
      address: activeCargo404Address,
      abi: cargo404Abi,
      functionName: 'mintCargo',
      args: [BigInt(units)],
      value: totalCost,
    })
  }

  const injectedConnectors = connectors.filter((connector) => connector.type === 'injected')
  const injectedConnector = injectedConnectors[0]
  const browserWalletConnector = injectedConnectors.find((connector) => connector.id === 'injected') || injectedConnector
  useEffect(() => {
    const detectBrowserWallet = () => {
      setIsBrowserWalletReady(typeof window !== 'undefined' && Boolean(window.ethereum))
    }

    detectBrowserWallet()
    const timer = window.setTimeout(detectBrowserWallet, 700)
    window.addEventListener('eip6963:announceProvider', detectBrowserWallet)
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('eip6963:announceProvider', detectBrowserWallet)
    }
  }, [])
  const hasInjectedWallet = isBrowserWalletReady || Boolean(browserWalletConnector)
  const walletStatus = isConnected
    ? shortAddress(address)
    : hasInjectedWallet
      ? 'Browser wallet detected'
      : hasConfiguredReownProjectId
        ? 'Mobile wallet available'
        : 'Not connected'
  const statusLabel = !contractReady ? 'offline' : mintActive ? 'live' : 'gate closed'
  const lockReason = !mintActive
    ? 'Gate closed — minting unlocks only after the official launch signal.'
    : !isConnected
      ? 'Connect wallet to load cargo.'
      : wrongChain
        ? 'Switch wallet to BNB Smart Chain.'
        : walletRemaining === 0
          ? 'Wallet limit reached.'
          : ''
  const copyContract = () => {
    if (!contractReady || !navigator.clipboard) return
    navigator.clipboard.writeText(cargo404Address)
    setCopyLabel('contract copied')
    window.setTimeout(() => setCopyLabel('copy contract'), 1600)
  }
  const connectWithConnector = (connector: typeof connectors[number]) => {
    connect({ connector }, { onSuccess: () => setWalletModalOpen(false) })
  }

  const connectMainWallet = () => {
    if (isConnected) return
    setWalletModalOpen(true)
  }

  const openAppKitFallback = () => {
    if (!hasConfiguredReownProjectId) return
    setWalletModalOpen(false)
    open({ view: 'Connect' })
  }

  return (
    <section className="terminal-panel mint-panel" id="mint">
      <div className="panel-head">
        <span>▌ MINT CARGO</span>
        <strong>{minted}/7000 loaded</strong>
      </div>

      <div className="mint-summary">
        <div><span>mint fee</span><strong>0.0025 BNB</strong></div>
        <div><span>per cargo</span><strong>4,040 C404</strong></div>
        <div><span>wallet cap</span><strong>{walletMinted}/10 cargo used</strong></div>
      </div>

      <div className="data-table compact">
        <div><span>contract</span><i /> <strong>{contractReady ? shortAddress(cargo404Address) : 'pending deployment'}</strong></div>
        <div><span>network</span><i /> <strong>bnb smart chain</strong></div>
        <div><span>status</span><i /> <strong className={mintActive ? 'hot' : 'dim'}>{statusLabel}</strong></div>
      </div>

      <div className="contract-verify-row">
        <code>{cargo404Address}</code>
        <a href={`https://bscscan.com/address/${cargo404Address}#code`} target="_blank" rel="noreferrer">BscScan ↗</a>
      </div>

      <button type="button" className="copy-contract" onClick={copyContract} disabled={!contractReady}>
        {copyLabel}
      </button>

      <div className="mint-hint">
        One cargo costs 0.0025 BNB and sends 4,040 C404 to your connected wallet. Gas fee is separate.
      </div>

      <div className="progress-line">
        <span>cargo loaded</span>
        <b>{minted}/7000</b>
      </div>
      <div className="supply-track"><div className="supply-fill" style={{ width: `${progress}%` }} /></div>

      <div className="terminal-section" id="cargo-wallet-connect">
        <div className="section-head"><span>▌ ACTIVATE CARGO LINK</span><b>{isConnected ? '○ ACTIVE' : '○ INACTIVE'}</b></div>
        <div className="terminal-field wallet-address-row">
          <span>wallet status</span>
          {!isConnected ? (
            <strong>{walletStatus}</strong>
          ) : (
            <button type="button" onClick={() => disconnect()}>{walletStatus} · disconnect</button>
          )}
        </div>
        {!isConnected ? (
          <>
            <button
              type="button"
              className="primary-btn wallet-select-btn"
              onClick={connectMainWallet}
              disabled={isConnecting}
            >
              {isConnecting
                ? '◆ CONNECTING...'
                : hasInjectedWallet
                  ? '◆ CONNECT WALLET'
                  : hasConfiguredReownProjectId
                    ? '◆ CONNECT VIA APPKIT'
                    : '◆ CONNECT WALLET'}
            </button>
            {walletModalOpen && (
              <div className="wallet-modal-backdrop" role="presentation" onClick={() => setWalletModalOpen(false)}>
                <div
                  className="wallet-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="wallet-modal-title"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="wallet-modal-head">
                    <div>
                      <span>connect wallet</span>
                      <h3 id="wallet-modal-title">Choose wallet</h3>
                    </div>
                    <button type="button" onClick={() => setWalletModalOpen(false)} aria-label="Close wallet connector">×</button>
                  </div>

                  <div className="wallet-safety-strip">
                    <strong>Before you connect</strong>
                    <span>No seed phrase. No private key. No approval just to connect.</span>
                  </div>

                  <div className="wallet-option-list">
                    {hasInjectedWallet && browserWalletConnector && (
                      <button type="button" disabled={isConnecting} onClick={() => connectWithConnector(browserWalletConnector)}>
                        <span className="wallet-icon">◆</span>
                        <span><b>Browser wallet</b><small>{browserWalletConnector.name}</small></span>
                        <i>best</i>
                      </button>
                    )}

                    {injectedConnectors
                      .filter((connector) => connector.uid !== browserWalletConnector?.uid)
                      .slice(0, 4)
                      .map((connector) => (
                        <button key={connector.uid} type="button" disabled={isConnecting} onClick={() => connectWithConnector(connector)}>
                          <span className="wallet-icon">◇</span>
                          <span><b>{connector.name}</b><small>wallet found</small></span>
                          <i>use</i>
                        </button>
                      ))}

                    {hasConfiguredReownProjectId && (
                      <button type="button" disabled={isConnecting} onClick={openAppKitFallback}>
                        <span className="wallet-icon">◎</span>
                        <span><b>WalletConnect / Mobile</b><small>open mobile wallet</small></span>
                        <i>mobile</i>
                      </button>
                    )}
                  </div>

                  {!hasInjectedWallet && !hasConfiguredReownProjectId && (
                    <p className="warning">No wallet found. Install MetaMask, Rabby, or OKX Wallet.</p>
                  )}
                  {connectError && <p className="warning">{connectError.message.split('\n')[0]}</p>}

                  <p className="wallet-modal-foot">
                    Connect first. If your wallet is on the wrong network, switch to BNB Chain. Mint opens only when the gate is live.
                  </p>
                </div>
              </div>
            )}
            {!hasInjectedWallet && hasConfiguredReownProjectId && (
              <p className="wallet-help">No browser wallet found. Use WalletConnect for mobile.</p>
            )}
            {!hasInjectedWallet && !hasConfiguredReownProjectId && (
              <p className="warning">No browser wallet found. Open this page in a wallet browser or install MetaMask/Rabby/OKX.</p>
            )}
            {connectError && <p className="warning">{connectError.message.split('\n')[0]}</p>}
          </>
        ) : wrongChain ? (
          <button className="primary-btn" onClick={() => switchChain({ chainId: bsc.id })}>◆ SWITCH TO BSC</button>
        ) : null}
      </div>

      <div className="terminal-section nested">
        <div className="section-head"><span>▌ LOAD CARGO</span><b>{canMint ? 'READY' : 'LOCKED'}</b></div>
        {lockReason && <p className="lock-reason">{lockReason}</p>}
        <div className="stepper">
          <button disabled={!canMint} onClick={() => setUnits(Math.max(1, units - 1))}>−</button>
          <strong>{units}</strong>
          <button disabled={!canMint} onClick={() => setUnits(Math.min(walletRemaining || 10, units + 1))}>+</button>
        </div>
        <div className="cost-line">total / {formatEther(totalCost)} bnb + gas</div>
        <button className="primary-btn" disabled={!canMint || isWriting || isConfirming} onClick={onMint}>
          {isWriting || isConfirming ? '◆ LOADING CARGO...' : '◆ LOAD CARGO'}
        </button>
      </div>

      <div className="bottom-actions">
        <button type="button" onClick={() => window.location.reload()}>◆ REFRESH DATA</button>
        <button type="button" onClick={() => { window.location.href = '/docs' }}>◆ REVIEW MANIFEST</button>
      </div>

      {!contractReady && <p className="warning">Contract not ready yet.</p>}
      {walletRemaining === 0 && <p className="warning">Wallet limit reached: 10/10 cargo loaded.</p>}
      {isSuccess && receipt && <p className="success">Cargo loaded. TX confirmed.</p>}
      {error && <p className="warning">{error.message.split('\n')[0]}</p>}
    </section>
  )
}
