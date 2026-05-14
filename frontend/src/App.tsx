import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  DatabaseZap,
  LockKeyhole,
  PackageCheck,
  PackageSearch,
  Radar,
  Satellite,
  ShieldCheck,
  TerminalSquare,
  Truck,
} from 'lucide-react'
import { MintPanel } from './components/MintPanel'
import { cargo404Address } from './contract'
import './App.css'

const bscscanUrl = `https://bscscan.com/address/${cargo404Address}#code`

const terminalLogs = [
  'Initializing Cargo404 protocol...',
  'Connecting to BNB network...',
  'Scanning lost cargo packets...',
  'Validating shipment hash...',
  'Route corrupted...',
  'Error 404: Cargo not found',
  'Re-routing through decentralized cargo network...',
]

const features = [
  {
    icon: <PackageSearch />,
    title: 'Lost Cargo Protocol',
    copy: 'Every mint is framed as a corrupted shipment manifest routed through a decentralized cargo terminal.',
  },
  {
    icon: <Radar />,
    title: 'BNB Network Scan',
    copy: 'Live mint state, wallet cap, and contract status are surfaced clearly instead of hidden behind noisy UI.',
  },
  {
    icon: <Boxes />,
    title: 'Cargo Packet Mint',
    copy: 'Each cargo unit prints 100,000 C404 with a hard wallet cap, fixed public allocation, and verified source.',
  },
]

const steps = [
  {
    icon: <Satellite />,
    title: 'Connect to BNB routing',
    copy: 'Attach a BNB Smart Chain wallet and let the interface verify your route before loading cargo.',
  },
  {
    icon: <TerminalSquare />,
    title: 'Load cargo packets',
    copy: 'Choose 1–10 shipment units. The mint terminal calculates total BNB before you sign anything.',
  },
  {
    icon: <PackageCheck />,
    title: 'Receive C404 manifest',
    copy: 'Once confirmed, your C404 cargo lands on-chain and the public manifest updates through BscScan.',
  },
]

function CargoCoreVisual() {
  return (
    <div className="cargo-core" aria-label="Animated 3D Cargo404 cargo terminal visual">
      <div className="terminal-depth-grid" />
      <div className="route-beam beam-a" />
      <div className="route-beam beam-b" />
      <div className="route-beam beam-c" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, index) => (
          <i key={index} style={{ '--i': index } as React.CSSProperties} />
        ))}
      </div>
      <div className="cargo-cube-wrap">
        <div className="cargo-shadow" />
        <div className="cargo-cube">
          <div className="cube-face cube-front">
            <span>C404</span>
            <small>LOST CARGO</small>
          </div>
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>
      <div className="container-stack stack-left"><i /><i /><i /></div>
      <div className="container-stack stack-right"><i /><i /></div>
      <div className="scan-card scan-card-a">
        <span>BNB ROUTE</span>
        <b>CHAIN 56</b>
      </div>
      <div className="scan-card scan-card-b">
        <span>SHIPMENT HASH</span>
        <b>0xC404...LOST</b>
      </div>
      <div className="scan-card scan-card-c">
        <span>STATUS</span>
        <b>404 / RE-ROUTING</b>
      </div>
      <div className="hero-console">
        <span>MANIFEST ID</span>
        <b>CRG-404-BNB-0007</b>
        <em>route corrupted / decentralized reroute active</em>
      </div>
    </div>
  )
}

function AnimatedTerminal() {
  return (
    <section className="protocol-terminal" id="terminal">
      <div className="terminal-copy">
        <div className="eyebrow"><span /> protocol diagnostics</div>
        <h2>Elegant terminal logs that feel like the product.</h2>
        <p>
          Cargo404 is styled as a futuristic onchain logistics system: shipment manifests, corrupted routes,
          hash validation, BNB routing, and a clean terminal layer built into the mint experience.
        </p>
      </div>
      <div className="terminal-window">
        <div className="terminal-toolbar">
          <div><i /><i /><i /></div>
          <span>CARGO404://BNB-SCAN/ROUTER</span>
          <b>LIVE</b>
        </div>
        <div className="terminal-screen">
          {terminalLogs.map((log, index) => (
            <p key={log} style={{ '--delay': `${index * 0.55}s` } as React.CSSProperties}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{log}</b>
            </p>
          ))}
        </div>
        <div className="terminal-footerline">
          <span>routing confidence</span>
          <div><i /></div>
          <b>87.04%</b>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="site-shell">
      <div className="ambient-orb orb-a" aria-hidden="true" />
      <div className="ambient-orb orb-b" aria-hidden="true" />
      <div className="ambient-orb orb-c" aria-hidden="true" />
      <div className="cargo-grid" aria-hidden="true" />

      <header className="nav-bar">
        <a className="brand-mark" href="#top" aria-label="Cargo404 home">
          <img src="/cargo404.png" alt="Cargo404" />
          <span>
            <b>Cargo404</b>
            <small>Cyber logistics protocol</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#terminal">Terminal</a>
          <a href="#mint">Mint</a>
          <a href="#features">Features</a>
          <a href="#works">How it works</a>
        </nav>
        <a className="nav-cta" href={bscscanUrl} target="_blank" rel="noreferrer">
          Verified contract <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> BNB Smart Chain cargo terminal</div>
          <h1>
            The cargo went<br />
            missing onchain.
          </h1>
          <p className="hero-lede">
            A cinematic BNB cyber-logistics mint terminal for corrupted shipment manifests,
            floating cargo packets, decentralized routing, and the one error every degen wants to find: C404.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#mint">Open mint terminal</a>
            <a className="secondary-link" href={bscscanUrl} target="_blank" rel="noreferrer">
              View verified contract <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="trust-row" aria-label="Launch trust signals">
            <span><CheckCircle2 size={16} /> Verified source</span>
            <span><ShieldCheck size={16} /> 10 cargo / wallet</span>
            <span><LockKeyhole size={16} /> Controlled mint gate</span>
          </div>
        </div>

        <aside className="hero-visual">
          <CargoCoreVisual />
        </aside>
      </section>

      <section className="ticker-strip" aria-label="Cargo404 highlights">
        <span>PUBLIC MINT: 7,000 CARGO UNITS</span>
        <span>•</span>
        <span>700M C404 PUBLIC ALLOCATION</span>
        <span>•</span>
        <span>BNB NETWORK SCAN ENABLED</span>
        <span>•</span>
        <span>MAX 10 CARGO / WALLET</span>
      </section>

      <AnimatedTerminal />

      <section className="mint-layout" id="mint">
        <div className="section-intro">
          <div className="eyebrow"><span /> mint control room</div>
          <h2>Load cargo through a clean onchain interface.</h2>
          <p>
            The mint module keeps the important stuff readable: price, wallet cap, network, verified contract,
            cargo progress, and the exact BNB cost before signing.
          </p>
          <div className="mini-specs">
            <div><CircleDollarSign /><span>Mint price</span><b>0.0025 BNB</b></div>
            <div><Truck /><span>Per cargo</span><b>100K C404</b></div>
            <div><DatabaseZap /><span>Total supply</span><b>1B C404</b></div>
          </div>
        </div>
        <MintPanel />
      </section>

      <section className="feature-section" id="features">
        <div className="section-intro centered">
          <div className="eyebrow"><span /> cargo system modules</div>
          <h2>Not a hacker template. A cyber logistics interface.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="manifest-section" id="works">
        <div className="section-intro centered">
          <div className="eyebrow"><span /> how cargo404 works</div>
          <h2>Three-step shipment recovery.</h2>
        </div>
        <div className="timeline">
          {steps.map((step, index) => (
            <div key={step.title}>
              <b>{String(index + 1).padStart(2, '0')}</b>
              {step.icon}
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div>
          <div className="eyebrow"><span /> final manifest</div>
          <h2>Ready to recover the lost cargo?</h2>
          <p>Open the mint terminal, connect on BNB Smart Chain, and load your C404 cargo packet when the gate is active.</p>
        </div>
        <div className="final-actions">
          <a className="primary-link" href="#mint">Launch mint terminal</a>
          <a className="secondary-link" href={bscscanUrl} target="_blank" rel="noreferrer">Inspect contract <ArrowUpRight size={16} /></a>
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
