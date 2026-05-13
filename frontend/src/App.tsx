import { Box, Route, ShieldCheck, Terminal, Truck } from 'lucide-react'
import { MatrixRain } from './components/MatrixRain'
import { MintPanel } from './components/MintPanel'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <MatrixRain />
      <header className="topbar">
        <a className="brand" href="#status" aria-label="Cargo404 home">
          <img src="/cargo404-logo.svg" alt="Cargo404" />
          <span><strong>CARGO</strong><em>404</em></span>
        </a>
        <nav>
          <a href="#status">STATUS</a>
          <a href="#mint">MINT</a>
          <a href="#manifest">MANIFEST</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section className="hero" id="status">
        <div className="hero-copy">
          <div className="terminal-line"><Terminal size={17} /> TERMINAL-NATIVE MEME MINT ON BNB CHAIN</div>
          <div className="subtitle">ERROR 404: CARGO NOT FOUND</div>
          <h1>Your package is lost. Your bags are not.</h1>
          <p>
            <strong>Cargo404</strong> is a pixel-terminal meme mint built around missing shipments,
            broken tracking, and BNB Chain degens waiting at the wrong cargo terminal.
          </p>
          <div className="tag-row">
            <span>BNB CHAIN</span>
            <span>0.0025 BNB</span>
            <span>MAX 10/WALLET</span>
            <span>7,000 CARGO</span>
          </div>
        </div>

        <aside className="hero-visual" aria-label="Cargo404 logo and status">
          <div className="logo-orbit">
            <img src="/cargo404.png" alt="Cargo404 terminal-native meme mint logo" />
          </div>
          <div className="scan-card">
            <span>TRACKING STATUS</span>
            <strong>404_DELIVERY_NOT_FOUND</strong>
          </div>
        </aside>
      </section>

      <section className="mint-layout" id="mint">
        <div className="manifest-card terminal-card">
          <div className="card-title">▌ CARGO MANIFEST</div>
          <p className="manifest-copy">Mint cargo. Lose tracking. Find bags.</p>
          <div className="manifest-list">
            <span><Box size={16} /> 100,000 C404 / mint unit</span>
            <span><Truck size={16} /> Terminal opens on BNB Mainnet</span>
            <span><Route size={16} /> Route: 404 / Convoy: early</span>
          </div>
        </div>
        <MintPanel />
      </section>

      <section className="panels" id="manifest">
        <div className="terminal-card mini"><Truck /><h3>LOAD CARGO</h3><p>100,000 C404 per mint unit. Max 10 cargo per wallet.</p></div>
        <div className="terminal-card mini"><Route /><h3>ROUTE 404</h3><p>No GPS. No VC lane. Just BNB rails, pixel crates, and heavy bags.</p></div>
        <div className="terminal-card mini"><ShieldCheck /><h3>FAIR LIMITS</h3><p>Fixed supply, hardcoded mint price, per-wallet mint cap.</p></div>
      </section>

      <section className="terminal-card faq" id="faq">
        <div className="card-title">▌ FAQ</div>
        <p><strong>What is Cargo404?</strong><br />A terminal-styled meme mint on BNB Chain inspired by lost cargo, pixel crates, and broken tracking systems.</p>
        <p><strong>Mint price?</strong><br />0.0025 BNB per cargo.</p>
        <p><strong>Max per wallet?</strong><br />10 mint units per wallet.</p>
        <p><strong>Financial advice?</strong><br />No. Cargo may be missing. DYOR.</p>
      </section>

      <footer>&gt;_ CARGO404 :: TERMINAL v4.04 <span className="cursor" /></footer>
    </main>
  )
}

export default App
