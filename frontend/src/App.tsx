import { ArrowUpRight, Boxes, FileText, PackageSearch, ShieldCheck, TerminalSquare } from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`
const shortContract = `${cargo404Address.slice(0, 6)}...${cargo404Address.slice(-4)}`

const docs = [
  ['chain', 'BNB Smart Chain'],
  ['standard', 'ERC20 cargo mint'],
  ['total supply', '40,400,000 C404'],
  ['public allocation', '28,280,000 C404'],
  ['reserve allocation', '12,120,000 C404'],
  ['mint price', '0.0025 BNB'],
  ['tokens per cargo', '4,040 C404'],
  ['wallet cap', '10 cargo'],
]

const steps = [
  {
    icon: <TerminalSquare />,
    title: '01 / connect_wallet',
    copy: 'Connect a browser EVM wallet. Cargo404 never asks for seed phrase, private key, or token approval on connect.',
  },
  {
    icon: <PackageSearch />,
    title: '02 / load_cargo',
    copy: 'When the gate opens, select cargo units. Each cargo costs 0.0025 BNB and routes 4,040 C404 to your wallet.',
  },
  {
    icon: <Boxes />,
    title: '03 / receive_c404',
    copy: 'Confirm the wallet transaction. C404 is delivered from the verified contract, with a 10 cargo cap per wallet.',
  },
]

function App() {
  return (
    <main className="cargo-page" id="terminal">
      <header className="topbar">
        <a className="brand-prompt" href="#terminal" aria-label="Cargo404 terminal home">
          <span>&gt;_</span>
          <b>CARGO_404</b>
        </a>
        <nav aria-label="Primary navigation">
          <a className="active" href="#terminal">TERMINAL</a>
          <a href="#mint">MINT</a>
          <a href="#docs">DOCS</a>
          <a href="#how">HOW IT WORKS</a>
        </nav>
        <a className="wallet-top" href="#mint">[ CONNECT_WALLET ]</a>
      </header>

      <section className="reference-hero">
        <div className="hero-left">
          <div className="status-pill"><i /> BNB_MAINNET • VERIFIED_LINK</div>
          <h1>
            <span>ERROR 404:</span>
            <em>CARGO FOUND.</em>
          </h1>
          <p>
            Black/neon mint interface for Cargo404 — fixed-supply C404 token on BNB Smart Chain.
            Clean wallet flow, no hidden approvals, and contract-first launch proof. Tactical asset distribution protocol initiated.
          </p>
          <div className="hero-buttons">
            <a className="primary-hero" href="#mint">OPEN_MINT_TERMINAL</a>
            <a className="secondary-hero" href={bscscanUrl} target="_blank" rel="noreferrer">VIEW_BSCSCAN ↗</a>
          </div>
          <div className="terminal-chips">
            <span>[ PRICE: 0.0025 BNB ]</span>
            <span>[ PER_CARGO: 4,040 C404 ]</span>
            <span>[ CAP: 10_CARGO_CAP ]</span>
          </div>
        </div>

        <aside className="hero-terminal" aria-label="Cargo404 terminal preview">
          <div className="hero-terminal-head">
            <div><i className="dot-red" /><i className="dot-yellow" /><i className="dot-green" /></div>
            <span>CONSOLE_V1.0.4 - SYSTEM:404</span>
          </div>
          <div className="hero-terminal-body">
            <p><b>&gt;</b> boot cargo404.exe</p>
            <p><b>&gt;</b> route: BNB_SMART_CHAIN</p>
            <p><b>&gt;</b> handshake: {shortContract}</p>

            <div className="terminal-divider" />
            <div className="terminal-mark">C404</div>
            <div className="terminal-encryption">ENCRYPTION_STANDARD_ACTIVE</div>
            <div className="terminal-divider" />

            <div className="terminal-status-list">
              <span>↯ [SYSTEM_STABLE]</span>
              <span>⌂ [VERIFIED_SOURCE]</span>
              <span>◉ [LATENCY: 12ms]</span>
            </div>
          </div>
          <div className="hero-terminal-foot">
            <span>[STATUS] GATE_CLOSED</span>
            <span>MODE: PUBLIC_MINT</span>
          </div>
        </aside>
      </section>

      <footer className="terminal-footer compact-footer">
        <span>CARGO404_TERMINAL_V1.0.4</span>
        <small>©2026 ALL_RIGHTS_RESERVED</small>
        <nav>
          <a href="#docs">DOCUMENTATION</a>
          <a href={bscscanUrl} target="_blank" rel="noreferrer">EXPLORER</a>
          <a href="#mint">STATUS</a>
          <a href="#security">SECURITY</a>
        </nav>
      </footer>

      <section className="content-block mint-block" id="mint">
        <div className="block-heading">
          <span>// MINT_INTERFACE</span>
          <h2>Public mint terminal</h2>
          <p>On-chain module stays locked until the official gate opens. Wallet flow remains Wagmi + Viem + Reown AppKit optional fallback.</p>
        </div>
        <MintPanel />
      </section>

      <section className="content-block docs-block" id="docs">
        <div className="block-heading">
          <span>// DOCUMENTATION</span>
          <h2>Cargo manifest</h2>
          <p>Public reference for supply, mint rules, contract proof, and launch safety.</p>
        </div>
        <div className="docs-grid">
          {docs.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
        <div className="doc-actions">
          <a href={bscscanUrl} target="_blank" rel="noreferrer"><FileText size={16} /> verified contract</a>
          <a href="https://github.com/cargoterminal/cargo404" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> source repository</a>
        </div>
      </section>

      <section className="content-block how-block" id="how">
        <div className="block-heading">
          <span>// HOW_IT_WORKS</span>
          <h2>Route protocol</h2>
          <p>Three-step cargo route. Connect, load, receive.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.title}>
              {step.icon}
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block security-block" id="security">
        <ShieldCheck />
        <div>
          <span>// SECURITY_NOTE</span>
          <h2>No hidden approvals. No seed phrase. No private key.</h2>
          <p>
            Cargo404 is a fixed-supply ERC20 cargo mint on BNB Smart Chain. It is not ERC404 and not an NFT mint.
            Verify the official contract before interacting and only confirm transactions in your own wallet.
          </p>
        </div>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">VIEW_CONTRACT <ArrowUpRight size={15} /></a>
      </section>
    </main>
  )
}

export default App
