import { ArrowUpRight, Boxes, PackageSearch, ShieldCheck, TerminalSquare } from 'lucide-react'
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
    title: 'step 1 — connect wallet',
    copy: 'Click once to connect your browser wallet. No seed phrase, no hidden approval, no weird signature flow.',
  },
  {
    icon: <PackageSearch />,
    title: 'step 2 — select cargo',
    copy: 'Choose how many cargo units to load. Each unit mints 100,000 C404 for 0.0025 BNB.',
  },
  {
    icon: <Boxes />,
    title: 'step 3 — receive c404',
    copy: 'Confirm the transaction and your C404 cargo lands directly in your wallet.',
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
          <a href={bscscanUrl} target="_blank" rel="noreferrer">contract ↗</a>
        </nav>
      </header>

      <section className="minimal-hero" id="top">
        <p className="kicker">BNB Smart Chain · verified mint terminal</p>
        <div className="hero-lockup" aria-label="Cargo404 BNB mint terminal">
          <h1>Cargo404</h1>
          <span>BNB mint terminal</span>
        </div>
        <p className="hero-note">
          A verified mint flow for C404 cargo units. Fixed price, clear wallet cap,
          and direct onchain settlement on BNB Smart Chain.
        </p>
        <div className="hero-chips" aria-label="Cargo404 mint quick facts">
          <span>0.0025 BNB</span>
          <span>100,000 C404 / cargo</span>
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
          <p>A simple mint flow with clear wallet and contract states.</p>
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
          <h2>Mint rules</h2>
          <p>
            Verified contract, fixed mint price, max 10 cargo per wallet. Always DYOR and only mint what you can afford to lose.
          </p>
        </div>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">view contract <ArrowUpRight size={15} /></a>
      </section>

      <footer className="minimal-footer">
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
