import { ArrowUpRight, Boxes, CheckCircle2, CircleDollarSign, LockKeyhole, PackageSearch, ShieldCheck, Sparkles, TerminalSquare, Truck } from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`

function App() {
  return (
    <main className="site-shell">
      <div className="ambient-orb orb-a" aria-hidden="true" />
      <div className="ambient-orb orb-b" aria-hidden="true" />
      <div className="cargo-grid" aria-hidden="true" />

      <header className="nav-bar">
        <a className="brand-mark" href="#top" aria-label="Cargo404 home">
          <img src="/cargo404.png" alt="Cargo404" />
          <span>
            <b>Cargo404</b>
            <small>BNB mainnet mint</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#mint">Mint</a>
          <a href="#mechanism">Mechanism</a>
          <a href="#manifest">Manifest</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href={bscscanUrl} target="_blank" rel="noreferrer">
          Verified contract <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> verified on BNB Smart Chain</div>
          <h1>
            Lost cargo.<br />
            Found alpha.
          </h1>
          <p className="hero-lede">
            Cargo404 is a polished meme-token mint terminal for degens who found the wrong warehouse,
            but the right ticker. Public mint, hard wallet cap, verified contract, clean launch flow.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#mint">Open mint terminal</a>
            <a className="secondary-link" href={bscscanUrl} target="_blank" rel="noreferrer">
              View BscScan <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="trust-row" aria-label="Launch trust signals">
            <span><CheckCircle2 size={16} /> Contract verified</span>
            <span><ShieldCheck size={16} /> 10 max / wallet</span>
            <span><LockKeyhole size={16} /> Mint gate controlled</span>
          </div>
        </div>

        <aside className="hero-visual" aria-label="Cargo404 launch card">
          <div className="shipment-card">
            <div className="shipment-topline">
              <span>C404 / MANIFEST</span>
              <b>CHAIN 56</b>
            </div>
            <div className="crate-stage">
              <div className="crate-glow" />
              <img src="/cargo404.png" alt="Cargo404 cargo badge" />
            </div>
            <div className="scan-line">
              <span>route</span>
              <strong>BNB MAINNET → LOST TERMINAL</strong>
            </div>
            <div className="shipment-stats">
              <div><small>Mint price</small><b>0.0025 BNB</b></div>
              <div><small>Per cargo</small><b>100K C404</b></div>
              <div><small>Supply</small><b>1B C404</b></div>
            </div>
          </div>
        </aside>
      </section>

      <section className="ticker-strip" aria-label="Cargo404 highlights">
        <span>PUBLIC MINT: 7,000 CARGO UNITS</span>
        <span>•</span>
        <span>700M C404 PUBLIC ALLOCATION</span>
        <span>•</span>
        <span>300M C404 RESERVE</span>
        <span>•</span>
        <span>MAX 10 CARGO / WALLET</span>
      </section>

      <section className="mint-layout" id="mint">
        <div className="section-intro">
          <div className="eyebrow"><span /> live mint interface</div>
          <h2>Professional mint flow, not a random terminal toy.</h2>
          <p>
            The UI is built to feel like a premium crypto launch page: strong hero, clear tokenomics,
            visible trust signals, and the mint panel always focused on the action.
          </p>
        </div>
        <MintPanel />
      </section>

      <section className="feature-grid" id="mechanism">
        <article>
          <CircleDollarSign />
          <h3>Fair public mint</h3>
          <p>Each cargo unit costs 0.0025 BNB and prints 100,000 C404. Simple numbers, easy to verify.</p>
        </article>
        <article>
          <ShieldCheck />
          <h3>Wallet cap</h3>
          <p>Hard cap of 10 cargo units per wallet keeps early distribution cleaner and reduces whale pressure.</p>
        </article>
        <article>
          <Boxes />
          <h3>Fixed allocation</h3>
          <p>700M C404 for public mint and 300M C404 reserve allocation for launch operations/liquidity.</p>
        </article>
      </section>

      <section className="manifest-section" id="manifest">
        <div className="section-intro centered">
          <div className="eyebrow"><span /> launch manifest</div>
          <h2>Three-step cargo loading.</h2>
        </div>
        <div className="timeline">
          <div><b>01</b><Truck /><h3>Connect wallet</h3><p>Use a BNB Smart Chain wallet and open the verified mint panel.</p></div>
          <div><b>02</b><TerminalSquare /><h3>Load cargo</h3><p>Choose 1–10 cargo units. The UI calculates BNB cost before you sign.</p></div>
          <div><b>03</b><PackageSearch /><h3>Claim signal</h3><p>After confirmation, C404 lands in your wallet and progress updates on-chain.</p></div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-card">
          <Sparkles />
          <h2>What is Cargo404?</h2>
          <p>A BNB Chain meme mint with cargo-terminal lore, cleaner launch UX, verified source code, and public mint mechanics.</p>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Is the contract verified?</summary>
            <p>Yes. The Cargo404 contract is verified on BscScan at {cargo404Address}.</p>
          </details>
          <details>
            <summary>How much can one wallet mint?</summary>
            <p>Maximum 10 cargo units per wallet. Each cargo unit receives 100,000 C404.</p>
          </details>
          <details>
            <summary>Is this financial advice?</summary>
            <p>No. Cargo404 is a meme-token experiment. DYOR, manage risk, and only mint what you can afford to lose.</p>
          </details>
        </div>
      </section>

      <footer className="site-footer">
        <span>CARGO404 / C404</span>
        <span>BNB SMART CHAIN</span>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">BscScan</a>
      </footer>
    </main>
  )
}

export default App
