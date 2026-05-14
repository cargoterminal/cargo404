import { ArrowUpRight, Boxes, PackageSearch, ShieldCheck, TerminalSquare } from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address, hasCargo404Address } from './contract'
import './App.css'

const bscscanUrl = hasCargo404Address ? `https://bscscan.com/address/${cargo404Address}#code` : '#'

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
    <main className="minimal-shell">
      <header className="minimal-nav">
        <a className="minimal-brand" href="#top" aria-label="Cargo404 home">
          <img src="/cargo404.png" alt="Cargo404" />
          <span>cargo404</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#top">home</a>
          <a href="#mint">mint</a>
          <a href="#how">how</a>
          {hasCargo404Address ? (
            <a href={bscscanUrl} target="_blank" rel="noreferrer">contract ↗</a>
          ) : (
            <span>contract pending</span>
          )}
        </nav>
      </header>

      <section className="minimal-hero" id="top">
        <p className="kicker">BNB Smart Chain · ERC20 cargo mint terminal</p>
        <div className="hero-lockup" aria-label="Cargo404 BNB cargo mint terminal">
          <h1>Cargo404</h1>
          <span>load cargo · trigger 404 · receive c404</span>
        </div>
        <p className="hero-note">
          Cargo404 is a terminal-themed BNB Chain mint. Load cargo with BNB and receive
          fixed C404 directly from the contract under clear onchain limits.
        </p>
        <div className="hero-chips" aria-label="Cargo404 mint quick facts">
          <span>0.0025 BNB</span>
          <span>4,040 C404 / cargo</span>
          <span>10 cargo cap</span>
        </div>
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
            <b>28,280,000 C404</b>
          </div>
          <div>
            <span>reserve allocation</span>
            <b>12,120,000 C404</b>
          </div>
          <div>
            <span>contract</span>
            {hasCargo404Address ? (
              <a href={bscscanUrl} target="_blank" rel="noreferrer">
                {cargo404Address.slice(0, 6)}...{cargo404Address.slice(-4)} ↗
              </a>
            ) : (
              <b>pending redeploy</b>
            )}
          </div>
        </div>
      </section>

      <section className="mint-section" id="mint">
        <div className="section-heading">
          <h2>Mint terminal</h2>
          <p>Connect wallet, switch to BNB Smart Chain, select cargo amount, then load cargo.</p>
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

      <section className="safety-note">
        <ShieldCheck />
        <div>
          <h2>Clear mint rules</h2>
          <p>
            Fixed-supply ERC20 cargo mint. Not ERC404, not NFT, and not auto-liquidity. Always verify the official contract and only mint what you can afford to lose.
          </p>
        </div>
        {hasCargo404Address ? (
          <a href={bscscanUrl} target="_blank" rel="noreferrer">view contract <ArrowUpRight size={15} /></a>
        ) : (
          <span>contract pending redeploy</span>
        )}
      </section>

      <footer className="minimal-footer">
        <span>cargo404 · c404 · bnb smart chain</span>
        <div>
          {hasCargo404Address && <a href={bscscanUrl} target="_blank" rel="noreferrer">source</a>}
          <a href="#mint">mint</a>
          <a href="#top">top</a>
        </div>
      </footer>
    </main>
  )
}

export default App
