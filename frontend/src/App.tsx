import { Terminal, Truck, Route, ShieldCheck } from 'lucide-react'
import { MatrixRain } from './components/MatrixRain'
import { MintPanel } from './components/MintPanel'
import './App.css'

const ascii = String.raw`
 ██████╗ █████╗ ██████╗  ██████╗  ██████╗ ██╗  ██╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗██╔════╝ ██╔═══██╗██║  ██║██╔═████╗██║  ██║
██║     ███████║██████╔╝██║  ███╗██║   ██║███████║██║██╔██║███████║
██║     ██╔══██║██╔══██╗██║   ██║██║   ██║╚════██║████╔╝██║╚════██║
╚██████╗██║  ██║██║  ██║╚██████╔╝╚██████╔╝     ██║╚██████╔╝     ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝      ╚═╝ ╚═════╝      ╚═╝
`

function App() {
  return (
    <main className="app-shell">
      <MatrixRain />
      <header className="topbar">
        <div className="brand"><Terminal size={18} /> CARGO404 :: BNB ERROR TERMINAL</div>
        <nav>
          <a href="#status">STATUS</a>
          <a href="#mint">MINT</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section className="hero" id="status">
        <div className="hero-copy">
          <pre className="ascii">{ascii}</pre>
          <div className="subtitle">ERROR 404: CARGO NOT FOUND</div>
          <h1>Route missing. Cargo loaded. Convoy deployed.</h1>
          <p>
            Terminal-native meme mint on BNB Chain. Connect wallet, load cargo,
            mint <strong>$C404</strong>, and join the lost convoy.
          </p>
          <div className="tag-row">
            <span>BNB CHAIN</span>
            <span>0.0025 BNB</span>
            <span>MAX 10/WALLET</span>
            <span>7,000 CARGO</span>
          </div>
        </div>
        <div id="mint"><MintPanel /></div>
      </section>

      <section className="panels">
        <div className="terminal-card mini"><Truck /><h3>LOAD CARGO</h3><p>100,000 C404 per mint unit. Max 10 cargo per wallet.</p></div>
        <div className="terminal-card mini"><Route /><h3>ROUTE 404</h3><p>No GPS. No VC lane. Just BNB rails and heavy bags.</p></div>
        <div className="terminal-card mini"><ShieldCheck /><h3>FAIR LIMITS</h3><p>Fixed supply, hardcoded mint price, per-wallet mint cap.</p></div>
      </section>

      <section className="terminal-card faq" id="faq">
        <div className="card-title">▌ FAQ</div>
        <p><strong>What is Cargo404?</strong><br />A terminal-styled meme mint on BNB Chain.</p>
        <p><strong>Mint price?</strong><br />0.0025 BNB per cargo.</p>
        <p><strong>Max per wallet?</strong><br />10 mint units per wallet.</p>
        <p><strong>Financial advice?</strong><br />No. Cargo may be missing. DYOR.</p>
      </section>

      <footer>TR4CK :: TERMINAL v4.04 <span className="cursor" /></footer>
    </main>
  )
}

export default App
