import { ArrowUpRight, Boxes, PackageSearch, ShieldCheck, TerminalSquare } from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`

const stats = [
  ['mint price', '0.0025 BNB'],
  ['per cargo', '4,040 C404'],
  ['wallet cap', '10 cargo'],
]

const steps = [
  {
    icon: <TerminalSquare />,
    title: 'step 1 — connect wallet',
    copy: 'Connect your EVM browser wallet. No seed phrase, no hidden approval, only wallet-confirmed transactions.',
  },
  {
    icon: <PackageSearch />,
    title: 'step 2 — load cargo',
    copy: 'Choose how many cargo units to load. Each cargo costs 0.0025 BNB and delivers 4,040 C404.',
  },
  {
    icon: <Boxes />,
    title: 'step 3 — receive c404',
    copy: 'Confirm the mint and your C404 cargo lands directly in your wallet from the contract.',
  },
]

function App() {
  return (
    <main className="cargo-shell" id="top">
      <header className="cargo-nav">
        <a className="cargo-brand" href="#top" aria-label="Cargo404 home">
          <img src="/cargo404.png" alt="Cargo404" />
          <span>CARGO404</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#mint">MINT</a>
          <a href="#how">HOW</a>
          <a href="#docs">DOCS</a>
          <a href={bscscanUrl} target="_blank" rel="noreferrer">CONTRACT ↗</a>
        </nav>
        <a className="nav-wallet-cta" href="#mint">[ CONNECT_WALLET ]</a>
      </header>

      <section className="cargo-hero">
        <div className="hero-copy">
          <div className="system-badge">
            <span />
            <b>BNB MAINNET • VERIFIED C404 TERMINAL</b>
          </div>
          <h1>
            ERROR 404:<br />
            <span>CARGO FOUND.</span>
          </h1>
          <p>
            Black/neon mint interface for Cargo404 — fixed-supply C404 token on BNB Smart Chain.
            Clean wallet flow, no hidden approvals, and contract-first launch proof.
          </p>
          <div className="hero-actions">
            <a className="solid-action" href="#mint">OPEN MINT TERMINAL</a>
            <a className="ghost-action" href={bscscanUrl} target="_blank" rel="noreferrer">VIEW BSCSCAN ↗</a>
          </div>
          <div className="hero-stat-row">
            <span>[ PRICE ] <b>0.0025 BNB</b></span>
            <span>[ SUPPLY ] <b>4,040 C404 / CARGO</b></span>
            <span>[ LIMIT ] <b>10 CARGO WALLET CAP</b></span>
          </div>
        </div>

        <aside className="console-card" aria-label="Cargo404 verified contract terminal">
          <div className="console-inner">
            <div className="console-head">
              <div><i className="red" /><i className="yellow" /><i className="green" /></div>
              <span>CONSOLE_TERMINAL_V1.0.4</span>
            </div>
            <div className="console-body scanline-panel">
              <p><span>&gt;</span> boot cargo404.exe</p>
              <p><span>&gt;</span> route: BNB_MAINNET</p>
              <p><span>&gt;</span> contract: {cargo404Address.slice(0, 6)}...{cargo404Address.slice(-4)}</p>
              <div className="console-symbol">C404</div>
              <div className="console-secure">SECURE_ENCRYPTION_ACTIVE</div>
              <div className="console-status">
                <span>[SYSTEM_STABLE]</span>
                <span>[VERIFIED_SOURCE]</span>
              </div>
            </div>
            <div className="console-foot">
              <span>[STATUS] GATE CLOSED</span>
              <span>[MODE] PUBLIC MINT TERMINAL</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="mint-section" id="mint">
        <div className="section-heading terminal-heading">
          <span>[ LIVE MODULE ]</span>
          <h2>Mint Terminal</h2>
          <p>React + Vite + Wagmi + Viem injected browser-wallet flow. Precision on-chain distribution module.</p>
        </div>
        <MintPanel />
      </section>

      <section className="quick-specs" aria-label="Cargo404 specs">
        {stats.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </section>

      <section className="how-section" id="how">
        <div className="section-heading terminal-heading">
          <span>[ CARGO ROUTE ]</span>
          <h2>How it works</h2>
          <p>A simple cargo mint flow with clear wallet and contract states.</p>
        </div>
        <div className="step-list">
          {steps.map((step) => (
            <article key={step.title}>
              {step.icon}
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="safety-note" id="docs">
        <ShieldCheck />
        <div>
          <h2>Clear mint rules</h2>
          <p>
            Fixed-supply ERC20 cargo mint. Not ERC404, not NFT, and not auto-liquidity. Always verify the official contract and only mint what you can afford to lose.
          </p>
        </div>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">view contract <ArrowUpRight size={15} /></a>
      </section>

      <footer className="minimal-footer">
        <span>CARGO404_TERMINAL</span>
        <div>
          <a href="#docs">DOCUMENTATION</a>
          <a href={bscscanUrl} target="_blank" rel="noreferrer">EXPLORER</a>
          <a href="#mint">STATUS</a>
          <a href="#top">TOP</a>
        </div>
        <span>©2026 CARGO404_TERMINAL // ALL_RIGHTS_RESERVED</span>
      </footer>
    </main>
  )
}

export default App
