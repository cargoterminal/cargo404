import { MintPanel } from './components/MintPanel'
import './App.css'

function App() {
  return (
    <main className="terminal-shell">
      <div className="crt-noise" />
      <section className="hero-terminal" id="status">
        <header className="brand-hero glitch-hero">
          <div className="glitch-logo" aria-label="Cargo404 logo">
            <img src="/cargo404.png" alt="Cargo404 logo" />
          </div>
          <div className="hero-copy">
            <h1 className="glitch-title" data-text="CARGO404">CARGO404</h1>
            <div className="terminal-subtitle">LOST FREIGHT NETWORK / BNB CARGO TERMINAL ACCESS</div>
            <div className="tagline-card compact">
              <p>Your package is lost.</p>
              <strong>Your bags are not.</strong>
            </div>
          </div>
        </header>

        <div className="quick-stats" aria-label="Cargo404 launch stats">
          <div><span>mint price</span><strong>0.0025 BNB</strong></div>
          <div><span>max wallet</span><strong>10 cargo</strong></div>
          <div><span>per cargo</span><strong>100K C404</strong></div>
        </div>

        <div className="status-bar">
          <div>
            <span>○ PRE-LAUNCH</span>
            <i>·</i>
            <span>chain 56</span>
            <i>·</i>
            <span>manifest pending</span>
          </div>
          <a href="#mint">connect cargo wallet →</a>
        </div>

        <nav className="tabs" aria-label="Cargo404 terminal tabs">
          <a href="#status">STATUS</a>
          <a className="active" href="#mint">▌MINT</a>
          <a href="#manifest">MANIFEST</a>
          <a href="#stats">STATS</a>
          <a href="#faq">FAQ</a>
        </nav>

        <MintPanel />

        <section className="terminal-panel manifest-panel" id="manifest">
          <div className="panel-head"><span>▌ MANIFEST</span><strong>LOST CARGO</strong></div>
          <p className="section-copy">A cleaner mint terminal for degens who found the wrong warehouse but the right ticker.</p>
          <div className="manifest-grid">
            <div><b>01</b><strong>Connect wallet</strong><span>Open the cargo terminal on BNB Chain.</span></div>
            <div><b>02</b><strong>Load cargo</strong><span>Pick 1–10 cargo units per wallet.</span></div>
            <div><b>03</b><strong>Find bags</strong><span>Receive C404 after the shipment confirms.</span></div>
          </div>
        </section>

        <section className="terminal-panel info-grid" id="stats">
          <div className="panel-head"><span>▌ STATS</span><strong>C404</strong></div>
          <div className="stat-row"><b>7000</b><span>total public cargo units</span></div>
          <div className="stat-row"><b>700M</b><span>public mint allocation</span></div>
          <div className="stat-row"><b>300M</b><span>reserve allocation</span></div>
        </section>

        <section className="terminal-panel faq" id="faq">
          <div className="panel-head"><span>▌ FAQ</span><strong>404</strong></div>
          <p><b>What is Cargo404?</b><br />A lost-shipment meme mint on BNB Chain with a modern cargo-terminal interface.</p>
          <p><b>Mint price?</b><br />0.0025 BNB per cargo unit. Each cargo unit mints 100,000 C404.</p>
          <p><b>Why pre-launch?</b><br />The site can go live first. Mint unlocks after the contract address is deployed and the gate is enabled.</p>
          <p><b>Financial advice?</b><br />No. The terminal only prints errors. DYOR.</p>
        </section>

        <footer className="terminal-footer">
          <span>C404 :: TERMINAL v4.04</span>
          <span>CHAIN : BNB</span>
          <span>/ LOST-CARGO</span>
        </footer>
      </section>
    </main>
  )
}

export default App
