import { ArrowUpRight, Boxes, PackageSearch, ShieldCheck, TerminalSquare, Zap } from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`

const stats = [
  ['mint price', '0.0025 BNB'],
  ['per cargo', '100,000 C404'],
  ['wallet cap', '10 cargo'],
]

const steps = [
  {
    icon: <TerminalSquare />,
    title: 'connect wallet',
    copy: 'Open the BNB Smart Chain cargo link via Reown AppKit. No seed phrase. No stealth approval.',
  },
  {
    icon: <PackageSearch />,
    title: 'load cargo units',
    copy: 'Pick 1–10 cargo units. Each unit mints 100,000 C404 for exactly 0.0025 BNB.',
  },
  {
    icon: <Boxes />,
    title: 'receive C404',
    copy: 'Confirm in wallet. Cargo lands directly onchain after the BSC transaction confirms.',
  },
]

function App() {
  return (
    <main className="cargo-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="cargo-nav">
        <a className="cargo-brand" href="#top" aria-label="Cargo404 home">
          <img src="/cargo404.png" alt="Cargo404" />
          <span>cargo404</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#mint">mint</a>
          <a href="#how">how</a>
          <a href={bscscanUrl} target="_blank" rel="noreferrer">contract ↗</a>
        </nav>
      </header>

      <section className="hero-grid" id="top">
        <div className="hero-copy">
          <p className="kicker"><Zap size={13} /> BNB MAINNET · VERIFIED C404 TERMINAL</p>
          <h1>
            ERROR 404:<br />
            <span>CARGO FOUND.</span>
          </h1>
          <p className="hero-note">
            Black/neon mint interface for Cargo404 — fixed-supply C404 token on BNB Smart Chain.
            Clean wallet flow, no hidden approvals, and contract-first launch proof.
          </p>
          <div className="hero-actions">
            <a className="hero-primary" href="#mint">◆ open mint terminal</a>
            <a className="hero-secondary" href={bscscanUrl} target="_blank" rel="noreferrer">view bscscan <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-chips" aria-label="Cargo404 mint quick facts">
            <span>0.0025 BNB</span>
            <span>100,000 C404 / cargo</span>
            <span>10 cargo wallet cap</span>
          </div>
        </div>

        <aside className="ascii-card" aria-label="Cargo404 terminal visual">
          <div className="terminal-dots"><i /><i /><i /></div>
          <pre>{String.raw`> boot cargo404.exe
> route: BNB_MAINNET
> contract: 0x586A...811

      ██████╗ █████╗ ██████╗  ██████╗  ██████╗
     ██╔════╝██╔══██╗██╔══██╗██╔════╝ ██╔═══██╗
     ██║     ███████║██████╔╝██║  ███╗██║   ██║
     ██║     ██╔══██║██╔══██╗██║   ██║██║   ██║
     ╚██████╗██║  ██║██║  ██║╚██████╔╝╚██████╔╝
      ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝

[status] convoy deployed
[mode] public mint terminal`}</pre>
        </aside>
      </section>

      <section className="progress-card" aria-label="Cargo404 mint overview">
        <div className="progress-topline">
          <span>mint progress</span>
          <strong>0 / 7,000 (0.00%)</strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: '0%' }} />
        </div>
        <div className="stats-grid">
          <div>
            <span>public allocation</span>
            <b>700,000,000 C404</b>
          </div>
          <div>
            <span>reserve allocation</span>
            <b>300,000,000 C404</b>
          </div>
          <div>
            <span>contract</span>
            <a href={bscscanUrl} target="_blank" rel="noreferrer">
              {cargo404Address.slice(0, 6)}...{cargo404Address.slice(-4)} ↗
            </a>
          </div>
        </div>
      </section>

      <section className="mint-section" id="mint">
        <div className="section-heading">
          <p>LIVE MODULE</p>
          <h2>Mint terminal</h2>
          <span>React + Vite + Wagmi + Viem + Reown AppKit wallet flow.</span>
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
        <div className="section-heading">
          <p>FLOW</p>
          <h2>How it works</h2>
          <span>Fast mint path with visible state, readable limits, and BSC contract link.</span>
        </div>
        <div className="step-list">
          {steps.map((step, index) => (
            <article key={step.title}>
              <b>0{index + 1}</b>
              {step.icon}
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="safety-note">
        <ShieldCheck />
        <div>
          <h2>Mint rules</h2>
          <p>Fixed mint price, max 10 cargo per wallet, verified contract. Always confirm the contract before signing.</p>
        </div>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">view contract <ArrowUpRight size={15} /></a>
      </section>

      <footer className="cargo-footer">
        <span>cargo404 · c404 · bnb smart chain</span>
        <div>
          <a href={bscscanUrl} target="_blank" rel="noreferrer">source</a>
          <a href="#mint">mint</a>
          <a href="#top">top</a>
        </div>
      </footer>
    </main>
  )
}

export default App
