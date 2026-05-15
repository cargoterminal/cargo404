import { ArrowUpRight, Boxes, FileText, Flag, PackageSearch, PieChart, ShieldCheck, TerminalSquare } from 'lucide-react'
import { useMemo } from 'react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

export const officialXUrl = 'https://x.com/Cargo404BNB'
export const officialXHandle = '@Cargo404BNB'

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

const tokenomicsSplit = [
  ['Public mint', '28,280,000 C404', '70% of supply held by the contract for the public cargo mint.'],
  ['Reserve', '12,120,000 C404', '30% held by the owner wallet for liquidity and project operations.'],
]

const cargoMath = [
  ['1 cargo', '0.0025 BNB', 'Mint fee per cargo unit. Gas is separate.'],
  ['Cargo output', '4,040 C404', 'Amount delivered to the minter for each cargo.'],
  ['Total route', '7,000 cargo', 'Maximum public cargo units available.'],
  ['Wallet cap', '10 cargo', 'Per-wallet cap enforced by the contract.'],
]

const raisedRoute = [
  ['70%', 'Liquidity bucket', 'Sent to the owner/deployer by the contract distribution flow for post-mint liquidity operations.'],
  ['20%', 'Treasury', 'Sent to the treasury wallet after distribution.'],
  ['10%', 'Buyback / burn bucket', 'Sent to the buyback wallet after distribution for later public operations.'],
]

const safetyChecklist = [
  'Use only cargo404.app and the official @Cargo404BNB links.',
  'Verify the BNB Chain contract before sending BNB.',
  'Never enter a seed phrase, private key, or "wallet validation" request.',
  'Transactions are final once confirmed on-chain.',
]

const faqItems = [
  ['What is one cargo?', 'One cargo is one mint unit: 0.0025 BNB plus gas for 4,040 C404.'],
  ['How is supply split?', 'Total supply is 40,400,000 C404: 70% public mint and 30% reserve.'],
  ['Where does raised BNB go?', 'After mint, the contract can split raised BNB by fixed route: 70% liquidity bucket, 20% treasury, 10% buyback/burn bucket.'],
  ['Which chain?', 'BNB Smart Chain mainnet. Use BNB for the mint fee and network gas.'],
  ['Is this ERC404 or an NFT mint?', 'No. Cargo404 is an ERC20 cargo mint, not ERC404 and not an NFT mint.'],
  ['Can the gate be closed?', 'Yes. The contract gate stays closed until the official launch signal.'],
]

const steps = [
  {
    icon: <TerminalSquare />,
    title: '01 / connect_wallet',
    copy: 'Connect an EVM wallet. The site never asks for seed phrases, private keys, or wallet validation.',
  },
  {
    icon: <PackageSearch />,
    title: '02 / load_cargo',
    copy: 'When the gate opens, choose a cargo amount. Each cargo costs 0.0025 BNB plus gas.',
  },
  {
    icon: <Boxes />,
    title: '03 / receive_c404',
    copy: 'Confirm in your wallet. The verified contract sends C404 to the same address.',
  },
]

const roadmapItems = [
  {
    phase: 'Phase 01',
    title: 'Terminal online',
    status: 'live',
    copy: 'Website, verified contract, official X, docs, and mint terminal are live for review.',
  },
  {
    phase: 'Phase 02',
    title: 'Launch signal',
    status: 'next',
    copy: 'Open the contract gate, run the first public mint check, then post the official launch signal.',
  },
  {
    phase: 'Phase 03',
    title: 'Post-mint routing',
    status: 'planned',
    copy: 'Route raised BNB through the contract flow and publish proof links before making any claims.',
  },
  {
    phase: 'Phase 04',
    title: 'Community ops',
    status: 'planned',
    copy: 'Add public proof links, clearer holder pages, and community updates after launch.',
  },
]

const docsSections = [
  {
    title: 'Verified source',
    copy: 'Use the contract, cargo404.app, and @Cargo404BNB as the reference points before interacting.',
  },
  {
    title: 'Simple cargo math',
    copy: '1 cargo = 4,040 C404. Public allocation is 7,000 cargo units. Wallet cap is 10 cargo.',
  },
  {
    title: 'Proof before claims',
    copy: 'No audit, LP lock, burn, listing, or liquidity claim is shown as complete without public proof.',
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
        <a href={officialXUrl} target="_blank" rel="noreferrer">X</a>
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
            Cargo404 is a fixed-supply C404 cargo mint on BNB Chain. Connect a wallet, load cargo with BNB,
            and receive C404 from the verified contract. No seed phrase, no private key, no approval just to connect.
          </p>
          <div className="hero-buttons">
            <a className="primary-hero" href={routes.mint}>OPEN_CARGO_TERMINAL</a>
            <a className="secondary-hero" href={bscscanUrl} target="_blank" rel="noreferrer">VIEW_CONTRACT ↗</a>
            <a className="secondary-hero social-hero" href={officialXUrl} target="_blank" rel="noreferrer">OFFICIAL_X ↗</a>
          </div>
          <div className="terminal-chips">
            <span>[ PRICE: 0.0025 BNB ]</span>
            <span>[ CARGO: 4,040 C404 ]</span>
            <span>[ SUPPLY: 40.4M C404 ]</span>
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
          <p>The mint gate is currently closed. When the official launch signal is posted, each cargo costs 0.0025 BNB plus gas and sends 4,040 C404 to your wallet.</p>
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
            Fixed supply, fixed mint price, fixed wallet cap. One cargo costs 0.0025 BNB plus gas
            and sends 4,040 C404 to the connected wallet through the verified BNB Chain contract.
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
          <a href={officialXUrl} target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> official x</a>
          <a href="https://github.com/cargoterminal/cargo404" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> github repo</a>
        </div>
        <div className="full-contract-card">
          <span>official sources</span>
          <code>{cargo404Address}</code>
          <a href={officialXUrl} target="_blank" rel="noreferrer">{officialXHandle}</a>
        </div>
      </section>

      <section className="route-card route-card-wide tokenomics-block" id="tokenomics">
        <div className="block-heading route-heading">
          <div>
            <span>// TOKENOMICS</span>
            <h2>C404 cargo economy</h2>
          </div>
          <p>
            Fixed 40.4M supply, fixed cargo price, fixed wallet cap, and a hardcoded raised-BNB route.
            No extra token minting is exposed by the contract.
          </p>
        </div>

        <div className="supply-terminal">
          <div className="supply-terminal-main">
            <span>Total supply</span>
            <strong>40,400,000 C404</strong>
            <p>Fixed-supply ERC20 on BNB Smart Chain.</p>
          </div>
          <div className="supply-bars" aria-label="Cargo404 supply split">
            <div className="supply-bar public"><span>70% public mint</span></div>
            <div className="supply-bar reserve"><span>30% reserve</span></div>
          </div>
        </div>

        <div className="tokenomics-grid split-grid">
          {tokenomicsSplit.map(([label, value, copy]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="tokenomics-grid cargo-math-grid">
          {cargoMath.map(([label, value, copy]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="sellout-card">
          <PieChart />
          <div>
            <span>if public mint sells out</span>
            <strong>7,000 cargo × 0.0025 BNB = 17.5 BNB raised</strong>
            <p>Raised BNB stays in the contract until the owner calls the one-time distribution function.</p>
          </div>
        </div>
      </section>

      <section className="route-card route-card-wide route-flow-block" id="raised-route">
        <div className="block-heading route-heading">
          <div>
            <span>// RAISED_BNB_ROUTE</span>
            <h2>Post-mint routing</h2>
          </div>
          <p>
            The contract route only splits raised BNB by fixed percentages. Liquidity creation, LP lock/burn,
            and buyback/burn actions are manual post-mint operations that need public proof after completion.
          </p>
        </div>

        <div className="route-flow-grid">
          {raisedRoute.map(([percent, label, copy]) => (
            <article key={label}>
              <strong>{percent}</strong>
              <span>{label}</span>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="flow-terminal" aria-label="Raised BNB flow">
          <code>User mint → BNB enters contract → owner calls distributeRaisedBnb()</code>
          <code>├─ 70% → liquidity bucket</code>
          <code>├─ 20% → treasury</code>
          <code>└─ 10% → buyback / burn bucket</code>
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
        <a href={officialXUrl} target="_blank" rel="noreferrer">OFFICIAL_X <ArrowUpRight size={15} /></a>
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
          <li>No upgradeability, no NFT/ERC404 mechanics, no automatic liquidity claim.</li>
          <li>Liquidity is handled manually after mint; LP lock/burn proof will be posted only if completed.</li>
        </ul>
      </section>

      <section className="route-card route-card-wide roadmap-block" id="roadmap">
        <div className="block-heading route-heading">
          <div>
            <span>// ROADMAP</span>
            <h2>Route map</h2>
          </div>
          <p>
            Cargo404 milestones stay tied to proof. Anything not public on-chain or posted through official channels stays planned.
          </p>
        </div>
        <div className="roadmap-grid">
          {roadmapItems.map((item) => (
            <article key={item.phase} className={`roadmap-card roadmap-${item.status}`}>
              <div>
                <span>{item.phase}</span>
                <b>{item.status}</b>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="route-card route-card-wide docs-principles" id="principles">
        <div className="block-heading">
          <span>// PROJECT_DOCS</span>
          <h2>Source notes</h2>
          <p>Quick reference for checking the contract, mint math, and official links before the public launch signal.</p>
        </div>
        <div className="principle-grid">
          {docsSections.map((section) => (
            <article key={section.title}>
              <Flag />
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </article>
          ))}
        </div>
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
          <p>Connect wallet. Choose cargo. Confirm the transaction. Nothing moves until you approve it inside your own wallet.</p>
        </div>
        <div className="how-intro-card">
          <span>what is cargo404?</span>
          <p>
            Cargo404 is a fixed-supply ERC20 cargo mint on BNB Chain. One cargo is one mint unit:
            pay 0.0025 BNB plus gas and receive 4,040 C404 to the same wallet.
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
          <p>Check the chain, contract, cargo amount, and wallet prompt before confirming any transaction.</p>
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

      <section className="route-card route-card-wide roadmap-block compact-roadmap" id="roadmap">
        <div className="block-heading">
          <span>// NEXT_STOPS</span>
          <h2>Roadmap</h2>
          <p>Review the sources, wait for the official launch signal, then track proof links after launch.</p>
        </div>
        <div className="roadmap-grid">
          {roadmapItems.map((item) => (
            <article key={item.phase} className={`roadmap-card roadmap-${item.status}`}>
              <div>
                <span>{item.phase}</span>
                <b>{item.status}</b>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
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
        <a href={`${routes.docs}#tokenomics`}>TOKENOMICS</a>
        <a href={`${routes.docs}#raised-route`}>ROUTE</a>
        <a href={`${routes.docs}#security`}>SAFETY</a>
        <a href={`${routes.docs}#roadmap`}>ROADMAP</a>
        <a href={officialXUrl} target="_blank" rel="noreferrer">X</a>
      </nav>
    </footer>
  )
}

export default App
