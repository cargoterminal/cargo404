import { ArrowUpRight, Boxes, FileText, PackageSearch, ShieldCheck, TerminalSquare } from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`
const shortContract = `${cargo404Address.slice(0, 6)}...${cargo404Address.slice(-4)}`

const docs = [
  ['chain', 'BNB Chain'],
  ['contract', shortContract],
  ['type', 'ERC20 cargo mint'],
  ['total supply', '40,400,000 C404'],
  ['public cargo', '7,000 units'],
  ['mint price', '0.0025 BNB'],
  ['per cargo', '4,040 C404'],
  ['wallet cap', '10 cargo'],
]

const steps = [
  {
    icon: <TerminalSquare />,
    title: '01 / connect_wallet',
    copy: 'Connect your EVM wallet. Cargo404 will never ask for your seed phrase or private key.',
  },
  {
    icon: <PackageSearch />,
    title: '02 / load_cargo',
    copy: 'When the gate opens, choose how many cargo units to load. Each cargo costs 0.0025 BNB.',
  },
  {
    icon: <Boxes />,
    title: '03 / receive_c404',
    copy: 'Confirm the transaction in your wallet. The verified contract sends C404 to the same address.',
  },
]

function scrollToMintTerminal() {
  const mintTerminal = document.getElementById('cargo-wallet-connect') || document.getElementById('mint')
  mintTerminal?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

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
        <button type="button" className="wallet-top" onClick={scrollToMintTerminal}>[ CONNECT_WALLET ]</button>
      </header>

      <section className="reference-hero">
        <div className="hero-left">
          <div className="status-pill"><i /> BNB_MAINNET • VERIFIED_CONTRACT</div>
          <h1>
            <span>ERROR 404:</span>
            <em>CARGO FOUND.</em>
          </h1>
          <p>
            Lost shipment. Found bags. Cargo404 is a fixed-supply C404 cargo mint on BNB Chain.
            Load cargo with BNB, confirm in your wallet, receive C404. No seed phrase. No private key. No mystery approvals.
          </p>
          <div className="hero-buttons">
            <button type="button" className="primary-hero" onClick={scrollToMintTerminal}>OPEN_CARGO_TERMINAL</button>
            <a className="secondary-hero" href={bscscanUrl} target="_blank" rel="noreferrer">VIEW_CONTRACT ↗</a>
          </div>
          <div className="terminal-chips">
            <span>[ PRICE: 0.0025 BNB ]</span>
            <span>[ CARGO: 4,040 C404 ]</span>
            <span>[ WALLET_CAP: 10 ]</span>
          </div>
        </div>

        <aside className="hero-terminal" aria-label="Cargo404 terminal preview">
          <div className="hero-terminal-head">
            <div><i className="dot-red" /><i className="dot-yellow" /><i className="dot-green" /></div>
            <span>CARGO404_TERMINAL</span>
          </div>
          <div className="hero-terminal-body">
            <p><b>&gt;</b> terminal online</p>
            <p><b>&gt;</b> chain: BNB_MAINNET</p>
            <p><b>&gt;</b> contract: {shortContract}</p>

            <div className="terminal-divider" />
            <div className="terminal-mark">C404</div>
            <div className="terminal-encryption">LOST_SHIPMENT_FOUND_BAGS</div>
            <div className="terminal-divider" />

            <div className="terminal-status-list">
              <span>↯ [GATE_CLOSED]</span>
              <span>⌂ [SOURCE_VERIFIED]</span>
              <span>◉ [NO_APPROVAL_ON_CONNECT]</span>
            </div>
          </div>
          <div className="hero-terminal-foot">
            <span>[STATUS] WAITING_SIGNAL</span>
            <span>MODE: CARGO_MINT</span>
          </div>
        </aside>
      </section>

      <footer className="terminal-footer compact-footer">
        <span>CARGO404_TERMINAL</span>
        <small>FIXED_SUPPLY • BNB_CHAIN</small>
        <nav>
          <a href="#docs">MANIFEST</a>
          <a href={bscscanUrl} target="_blank" rel="noreferrer">CONTRACT</a>
          <a href="#mint">GATE</a>
          <a href="#security">SAFETY</a>
        </nav>
      </footer>

      <section className="content-block mint-block" id="mint">
        <div className="block-heading">
          <span>// CARGO_GATE</span>
          <h2>Public cargo terminal</h2>
          <p>Mint gate is closed for now. When it opens, load cargo with BNB and receive C404 straight from the verified contract.</p>
        </div>
        <MintPanel />
      </section>

      <section className="content-block docs-block" id="docs">
        <div className="block-heading">
          <span>// MANIFEST</span>
          <h2>Cargo manifest</h2>
          <p>The short version: fixed supply, fixed mint price, fixed wallet cap. The contract is verified on BscScan.</p>
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
          <a href="https://github.com/cargoterminal/cargo404" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> github repo</a>
        </div>
      </section>

      <section className="content-block how-block" id="how">
        <div className="block-heading">
          <span>// ROUTE</span>
          <h2>How cargo moves</h2>
          <p>Connect wallet. Load cargo. Receive C404.</p>
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
          <span>// SAFETY</span>
          <h2>No seed phrase. No private key. No approval on connect.</h2>
          <p>
            Cargo404 is an ERC20 cargo mint on BNB Chain. It is not ERC404 and not an NFT mint.
            Check the contract, then only confirm transactions inside your own wallet.
          </p>
        </div>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">VIEW_CONTRACT <ArrowUpRight size={15} /></a>
      </section>
    </main>
  )
}

export default App
