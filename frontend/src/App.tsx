import { MintPanel } from './components/MintPanel'
import './App.css'

const cargoWordmark = String.raw`
 ▄████▄   ▄▄▄       ██▀███    ▄████  ▒█████   ▄▄▄       ██▓███   ▒█████   ▄▄▄       ██▓
▒██▀ ▀█  ▒████▄    ▓██ ▒ ██▒ ██▒ ▀█▒▒██▒  ██▒▒████▄    ▓██░  ██▒▒██▒  ██▒▒████▄    ▓██▒
▒▓█    ▄ ▒██  ▀█▄  ▓██ ░▄█ ▒▒██░▄▄▄░▒██░  ██▒▒██  ▀█▄  ▓██░ ██▓▒▒██░  ██▒▒██  ▀█▄  ▒██▒
▒▓▓▄ ▄██▒░██▄▄▄▄██ ▒██▀▀█▄  ░▓█  ██▓▒██   ██░░██▄▄▄▄██ ▒██▄█▓▒ ▒▒██   ██░░██▄▄▄▄██ ░██░
▒ ▓███▀ ░ ▓█   ▓██▒░██▓ ▒██▒░▒▓███▀▒░ ████▓▒░ ▓█   ▓██▒▒██▒ ░  ░░ ████▓▒░ ▓█   ▓██▒░██░
░ ░▒ ▒  ░ ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ░▒   ▒ ░ ▒░▒░▒░  ▒▒   ▓▒█░▒▓▒░ ░  ░░ ▒░▒░▒░  ▒▒   ▓▒█░░▓
  ░  ▒     ▒   ▒▒ ░  ░▒ ░ ▒░  ░   ░   ░ ▒ ▒░   ▒   ▒▒ ░░▒ ░       ░ ▒ ▒░   ▒   ▒▒ ░ ▒ ░
░          ░   ▒     ░░   ░ ░ ░   ░ ░ ░ ░ ▒    ░   ▒   ░░       ░ ░ ░ ▒    ░   ▒    ▒ ░
░ ░            ░  ░   ░           ░     ░ ░        ░  ░             ░ ░        ░  ░ ░
░`

function App() {
  return (
    <main className="terminal-shell">
      <div className="crt-noise" />
      <section className="hero-terminal" id="status">
        <pre className="wordmark" aria-label="Cargo404">{cargoWordmark}</pre>
        <div className="subtitle">LOST FREIGHT NETWORK / BNB TERMINAL ACCESS</div>

        <div className="lang-switch" aria-label="language selector">
          <span>LANG ▌</span>
          <button className="active">EN</button>
          <i>·</i>
          <button>ID</button>
        </div>

        <div className="status-bar">
          <div>
            <span>○ OFFLINE</span>
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
          <a href="#activity">ACTIVITY</a>
          <a href="#stats">STATS</a>
          <a href="#faq">FAQ</a>
        </nav>

        <MintPanel />

        <section className="terminal-panel info-grid" id="activity">
          <div className="panel-head"><span>▌ ACTIVITY</span><strong>PRE-LAUNCH</strong></div>
          <div className="data-table">
            <div><span>cargo status</span><i /> <strong>delivery not found</strong></div>
            <div><span>route</span><i /> <strong>unknown terminal / bnb</strong></div>
            <div><span>shipment</span><i /> <strong>7,000 cargo units</strong></div>
          </div>
        </section>

        <section className="terminal-panel info-grid" id="stats">
          <div className="panel-head"><span>▌ STATS</span><strong>C404</strong></div>
          <div className="stat-row"><b>0.0025 BNB</b><span>mint fee</span></div>
          <div className="stat-row"><b>10</b><span>max cargo / wallet</span></div>
          <div className="stat-row"><b>100,000</b><span>C404 / cargo</span></div>
        </section>

        <section className="terminal-panel faq" id="faq">
          <div className="panel-head"><span>▌ FAQ</span><strong>404</strong></div>
          <p><b>What is Cargo404?</b><br />A lost-shipment meme mint on BNB Chain with a corrupted cargo-terminal interface.</p>
          <p><b>Mint price?</b><br />0.0025 BNB per cargo unit.</p>
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
