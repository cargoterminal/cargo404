import { ArrowUpRight, Boxes, FileText, PackageSearch, ShieldCheck, TerminalSquare } from 'lucide-react'
import { useMemo } from 'react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`
const shortContract = `${cargo404Address.slice(0, 6)}...${cargo404Address.slice(-4)}`

type PageKey = 'terminal' | 'mint' | 'docs' | 'how'

const routes: Record<PageKey, string> = {
  terminal: '/',
  mint: '/mint',
  docs: '/docs',
  how: '/how-it-works',
}

const navItems: Array<[PageKey, string]> = [
  ['terminal', 'TERMINAL'],
  ['mint', 'MINT'],
  ['docs', 'DOCS'],
  ['how', 'HOW IT WORKS'],
]

const docs = [
  ['chain', 'BNB Chain'],
  ['contract', shortContract],
  ['type', 'ERC20 cargo mint'],
  ['total supply', '40,400,000 C404'],
  ['public cargo', '7,000 units'],
  ['mint price', '0.0025 BNB + gas'],
  ['per cargo', '4,040 C404'],
  ['wallet cap', '10 cargo'],
]

const safetyChecklist = [
  'Use only cargo404.app and the official @Cargo404BNB links.',
  'Verify the BNB Chain contract before sending BNB.',
  'Never enter a seed phrase, private key, or "wallet validation" request.',
  'Transactions are final once confirmed on-chain.',
]

const faqItems = [
  ['What is one cargo?', 'One cargo is one mint unit. Each cargo costs 0.0025 BNB and sends 4,040 C404 to the connected wallet.'],
  ['Which chain?', 'Cargo404 runs on BNB Smart Chain mainnet. You need BNB for the mint price and network gas.'],
  ['Is this ERC404 or an NFT mint?', 'No. Cargo404 is a fixed-supply ERC20 cargo mint. It is not ERC404 and not an NFT mint.'],
  ['Can the gate be closed?', 'Yes. Minting only works when the verified contract gate is active. The site shows gate closed until launch.'],
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

function getPageFromPath(pathname: string): PageKey {
  if (pathname.startsWith('/mint')) return 'mint'
  if (pathname.startsWith('/docs')) return 'docs'
  if (pathname.startsWith('/how-it-works')) return 'how'
  return 'terminal'
}

function App() {
  const activePage = useMemo(() => getPageFromPath(window.location.pathname), [])

  return (
    <main className="cargo-page" id="terminal">
      <Header activePage={activePage} />
      {activePage === 'terminal' && <TerminalPage />}
      {activePage === 'mint' && <MintPage />}
      {activePage === 'docs' && <DocsPage />}
      {activePage === 'how' && <HowPage />}
      {activePage !== 'terminal' && <SiteFooter />}
    </main>
  )
}

function Header({ activePage }: { activePage: PageKey }) {
  return (
    <header className="topbar">
      <a className="brand-prompt" href={routes.terminal} aria-label="Cargo404 terminal home">
        <span>&gt;_</span>
        <b>CARGO_404</b>
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map(([page, label]) => (
          <a key={page} className={activePage === page ? 'active' : undefined} href={routes[page]}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

function TerminalPage() {
  return (
    <>
      <section className="reference-hero page-hero">
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
            <a className="primary-hero" href={routes.mint}>OPEN_CARGO_TERMINAL</a>
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

      <SiteFooter compact />
    </>
  )
}

function MintPage() {
  return (
    <div className="route-shell mint-shell">
      <section className="route-card route-card-wide" id="mint">
        <div className="block-heading route-heading">
          <span>// CARGO_GATE</span>
          <h2>Public cargo terminal</h2>
          <p>Mint gate is closed for now. When it opens, load cargo with BNB and receive C404 straight from the verified contract.</p>
        </div>
        <MintPanel />
      </section>
    </div>
  )
}

function DocsPage() {
  return (
    <div className="route-shell docs-shell">
      <section className="route-card route-card-wide" id="docs">
        <div className="block-heading route-heading">
          <span>// MANIFEST</span>
          <h2>Cargo manifest</h2>
          <p>
            The short version: fixed supply, fixed mint price, fixed wallet cap, no hidden wallet approvals.
            One cargo costs 0.0025 BNB plus gas and sends 4,040 C404 to the connected wallet.
          </p>
        </div>
        <div className="docs-grid manifest-grid">
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
        <div className="full-contract-card">
          <span>official contract</span>
          <code>{cargo404Address}</code>
        </div>
      </section>

      <section className="route-card security-block route-security" id="security">
        <ShieldCheck />
        <div>
          <span>// SAFETY</span>
          <h2>No seed phrase. No private key. No approval on connect.</h2>
          <p>
            Cargo404 is an ERC20 cargo mint on BNB Chain. It is not ERC404 and not an NFT mint.
            Check the contract, then only confirm transactions inside your own wallet. Blockchain transactions are final.
          </p>
          <ul className="safety-list">
            {safetyChecklist.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">VIEW_CONTRACT <ArrowUpRight size={15} /></a>
      </section>

      <section className="route-card compiler-note" id="compiler-note">
        <span>// COMPILER_NOTE</span>
        <h2>BscScan compiler warning clarification</h2>
        <p>
          BscScan may display Solidity 0.8.28 compiler-version warnings. They are not specific to Cargo404 logic.
          Cargo404 does not use transient storage, Cancun-specific behavior, or storage array clearing/copying patterns tied to the listed compiler bugs.
        </p>
        <ul>
          <li>Verified fixed-supply ERC20 cargo mint.</li>
          <li>No upgradeability, no NFT/ERC404 mechanics, no auto-LP claim.</li>
          <li>Liquidity is handled manually after mint; LP lock/burn proof will be posted only if completed.</li>
        </ul>
      </section>
    </div>
  )
}

function HowPage() {
  return (
    <div className="route-shell how-shell">
      <section className="route-card route-card-wide" id="how">
        <div className="block-heading route-heading">
          <span>// ROUTE</span>
          <h2>How cargo moves</h2>
          <p>Connect wallet. Load cargo. Receive C404. Nothing moves until you confirm inside your wallet.</p>
        </div>
        <div className="how-intro-card">
          <span>what is cargo404?</span>
          <p>
            Cargo404 is a fixed-supply C404 ERC20 cargo mint on BNB Chain. One cargo is one mint unit:
            pay 0.0025 BNB plus gas through the verified contract and receive 4,040 C404 to the same wallet.
          </p>
        </div>
        <div className="steps-grid route-steps">
          {steps.map((step) => (
            <article key={step.title}>
              {step.icon}
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
        <div className="route-actions">
          <a className="primary-hero" href={routes.mint}>OPEN_CARGO_TERMINAL</a>
          <a className="secondary-hero" href={routes.docs}>READ_MANIFEST</a>
        </div>
      </section>

      <section className="route-card route-card-wide faq-block">
        <div className="block-heading">
          <span>// FAQ</span>
          <h2>Before loading cargo</h2>
          <p>Quick checks for chain, wallet, cargo units, and safety before you interact with the mint terminal.</p>
        </div>
        <div className="faq-grid">
          {faqItems.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`terminal-footer ${compact ? 'compact-footer' : 'site-footer'}`}>
      <span>CARGO404_TERMINAL</span>
      <small>FIXED_SUPPLY • BNB_CHAIN</small>
      <nav>
        <a href={routes.docs}>MANIFEST</a>
        <a href={bscscanUrl} target="_blank" rel="noreferrer">CONTRACT</a>
        <a href={routes.mint}>GATE</a>
        <a href={`${routes.docs}#security`}>SAFETY</a>
      </nav>
    </footer>
  )
}

export default App
