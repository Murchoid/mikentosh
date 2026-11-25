import type { ProjectItem } from '../types/workstation'

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ledgercore-erp-bus',
    filename: 'ledgercore-erp-bus.doc',
    name: 'LedgerCore ERP Service Bus',
    category: 'ERP Architecture',
    technologies: ['Go', 'PostgreSQL', 'RabbitMQ', 'sqlc'],
    status: 'Maintained',
    year: '2026',
    summary:
      'Transactional outbox and event-reconciliation backbone connecting procurement, invoicing, and stock subsystems.',
    problem:
      'Growing operational software often starts as a single codebase and gradually splits into procurement, billing, and fulfilment modules. Direct synchronous HTTP calls between these modules caused partial state writes whenever downstream services timed out or restarted mid-transaction.',
    approach:
      'Introduced a relational transactional outbox inside PostgreSQL paired with a lightweight Go relay worker and idempotent message handlers. Domain state changes and outgoing integration events commit atomically in the same database transaction.',
    architecture: [
      'Append-only outbox table written within the business transaction boundary using explicit SQL queries generated via sqlc.',
      'Relay process polling batches with SELECT ... FOR UPDATE SKIP LOCKED to allow safe horizontal worker scaling without duplicate locks.',
      'Consumer-side inbox deduplication keyed by deterministic event UUIDs and domain aggregate version numbers.',
      'Dead-letter inspection CLI allowing operators to inspect, diff, and replay poisoned payloads safely.',
    ],
    tradeoffs: [
      'Eventual consistency required redesigning UI confirmation flows to communicate queued processing clearly rather than assuming instant downstream settlement.',
      'Polling with SKIP LOCKED adds mild database read overhead compared to PostgreSQL logical decoding, but dramatically simplified operational setup and backup recovery.',
    ],
    lessons: [
      'Reliability in business software comes less from exotic message brokers and more from strict idempotency keys and explicit state transitions.',
      'Keeping schema contracts plain and inspectable with raw SQL made debugging production edge cases far calmer than debugging ORM magic.',
    ],
    repositoryLabel: 'Architecture Case Study',
  },
  {
    id: 'tagstream-rfid-engine',
    filename: 'tagstream-rfid-engine.doc',
    name: 'TagStream RFID Inventory Engine',
    category: 'Inventory & Hardware',
    technologies: ['Go', 'TCP Sockets', 'Redis', 'PostgreSQL'],
    status: 'Completed',
    year: '2025',
    summary:
      'Edge-to-backend ingestion service translating noisy continuous UHF RFID antenna reads into clean warehouse stock movements.',
    problem:
      'Physical UHF RFID portals do not emit neat "pallet moved" events—they emit bursts of raw EPC tag sightings dozens of times per second, including stray reflections from nearby staging lanes and intermittent dropouts.',
    approach:
      'Built an edge ingestion daemon in Go that maintains stateful sliding-window sessions per antenna zone, filters transient cross-reads via signal-strength (RSSI) thresholds, and emits canonical stock-transition events only when dwell criteria are met.',
    architecture: [
      'Persistent TCP reader framing layer with automatic reconnection, heartbeat supervision, and backpressure-safe ring buffers.',
      'Time-windowed tag presence state machine distinguishing transient pass-bys, zone entry, dwell confirmation, and departure.',
      'Local SQLite spool buffer on the edge host so network interruptions never drop confirmed physical scans.',
      'Idempotent upstream sync API reconciling confirmed tag batches against expected dispatch manifests.',
    ],
    tradeoffs: [
      'Longer dwell-confirmation windows eliminate false positives from neighbouring lanes but add a few seconds of latency before gate indicators confirm a load.',
      'Maintaining state at the edge requires disciplined clock synchronization and clear operator diagnostics when hardware antennas degrade.',
    ],
    lessons: [
      'Software that touches the physical world cannot treat sensor input as ground truth; domain models need explicit uncertainty and correction paths.',
      'Designing deterministic replay logs from real recorded antenna captures made testing edge heuristics possible without standing in a warehouse.',
    ],
  },
  {
    id: 'stockgraph-ledger',
    filename: 'stockgraph-ledger.doc',
    name: 'StockGraph Multi-Warehouse Ledger',
    category: 'Backend Systems',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL'],
    status: 'Completed',
    year: '2025',
    summary:
      'Double-entry physical inventory engine modelling stock reservations, transfers, and cycle-count adjustments as immutable journal entries.',
    problem:
      'Conventional inventory tables that overwrite a mutable quantity_on_hand integer struggle to explain historical discrepancies when concurrent orders, warehouse transfers, returns, and manual stocktakes collide.',
    approach:
      'Modelled physical and reserved stock using double-entry accounting principles: every movement credits a source location account (e.g., Supplier, Inbound Transit, Bin A-12) and debits a destination account within balanced journal entries.',
    architecture: [
      'Immutable ledger_entries and ledger_postings tables enforcing zero-sum balance checks per transaction.',
      'Materialized balance snapshots updated transactionally with deterministic lock ordering by account ID to prevent deadlocks.',
      'Explicit In-Transit virtual accounts so stock leaving Warehouse A is never invisible before Warehouse B confirms receipt.',
      'Point-in-time reconstruction queries capable of explaining exact stock positions at any historical timestamp.',
    ],
    tradeoffs: [
      'Higher storage footprint and slightly more involved write queries compared to mutating a single counter row.',
      'Requires teaching application developers to post compensating adjustment entries rather than editing rows in place.',
    ],
    lessons: [
      'Accountants solved distributed state reconciliation centuries ago; immutable ledgers turn mysterious stock drift into an inspectable trail.',
      'Sorting account IDs before acquiring row locks eliminated subtle deadlock scenarios under concurrent batch fulfilment.',
    ],
  },
  {
    id: 'loxk-bytecode-vm',
    filename: 'loxk-bytecode-vm.doc',
    name: 'LoxK Bytecode VM & Compiler',
    category: 'Programming Languages',
    technologies: ['Rust', 'Bytecode VM', 'Pratt Parser'],
    status: 'Active Exploration',
    year: '2026',
    summary:
      'Single-pass compiler and stack-based bytecode virtual machine exploring lexical closures, value representation, and garbage collection.',
    problem:
      'Using high-level runtimes every day makes it easy to treat closures, stack frames, instruction dispatch, and heap allocation as black boxes. Tree-walk interpreters clarify syntax, but hide how real runtimes lay out memory.',
    approach:
      'Implemented a compact dynamically typed scripting language compiled directly to custom bytecode chunks, executed by a stack VM written in Rust with explicit arena/heap management and disassembly tooling.',
    architecture: [
      'Zero-copy scanner feeding a Pratt (top-down operator precedence) compiler emitting compact bytecode instructions and constant tables.',
      'Upvalue capture mechanism lifting closed-over stack slots onto the heap only when their defining lexical scope exits.',
      'Built-in bytecode disassembler and execution trace flag printing stack contents beside each opcode during debugging.',
      'Deterministic test suite running language conformance scripts and verifying exact stdout/error spans.',
    ],
    tradeoffs: [
      'Writing a GC-managed runtime in safe/controlled Rust surfaces friction around object graph ownership, requiring handle indices rather than raw pointers.',
      'Single-pass compilation keeps compilation fast and small, at the cost of fewer multi-pass AST optimization opportunities.',
    ],
    lessons: [
      'Implementing closures and upvalues firsthand permanently demystifies how functions capture state in Go, JavaScript, and Python.',
      'Good diagnostic disassemblers pay for themselves immediately; inspecting emitted bytecode caught subtle jump-offset bugs in minutes.',
    ],
  },
  {
    id: 'pg-lockcheck-cli',
    filename: 'pg-lockcheck-cli.doc',
    name: 'pg-lockcheck Migration Inspector',
    category: 'Developer Tooling',
    technologies: ['Go', 'PostgreSQL', 'SQL AST', 'CLI'],
    status: 'Maintained',
    year: '2025',
    summary:
      'Command-line preflight utility that analyses SQL migration files for lock-queue hazards and table rewrites on PostgreSQL.',
    problem:
      'A migration that runs instantaneously on an empty local database can stall production traffic if it acquires an ACCESS EXCLUSIVE lock behind a slow reporting query, causing subsequent application queries to queue up.',
    approach:
      'Built a fast, single-binary CLI in Go that parses candidate SQL migration files and flags statements requiring dangerous lock modes, missing CONCURRENTLY clauses, unvalidated foreign keys, or missing lock_timeout guards.',
    architecture: [
      'Rule engine classifying DDL statements by the PostgreSQL lock level they acquire and whether they trigger a full heap rewrite.',
      'Clear monochrome terminal and CI output explaining why a statement is risky and showing the safe multi-step expand/contract pattern.',
      'Zero external runtime service dependencies—runs offline against plain .sql migration directories.',
    ],
    tradeoffs: [
      'Static SQL analysis cannot know actual production table row counts without an optional live catalog connection, so warnings err on the side of caution.',
    ],
    lessons: [
      'Developer tools are most useful when they teach the underlying database rule right inside the warning message rather than just failing a build.',
    ],
  },
  {
    id: 'chronicle-http-replay',
    filename: 'chronicle-replay.doc',
    name: 'Chronicle HTTP Replay Proxy',
    category: 'Developer Tooling',
    technologies: ['Go', 'net/http', 'SQLite'],
    status: 'Prototype',
    year: '2024',
    summary:
      'Local reverse proxy that records outbound third-party API sessions into portable SQLite cassettes for deterministic offline testing.',
    problem:
      'Integrating against external payment, tax, or logistics sandboxes slows down local development when upstream staging environments rate-limit requests, expire credentials, or return inconsistent test data.',
    approach:
      'Created a lightweight local HTTP proxy in Go using the standard library and SQLite. Outbound traffic passes through in record mode and replays deterministically in offline mode with header scrubbing for secrets.',
    architecture: [
      'Canonical request fingerprinting over method, normalized URL path, query parameters, and selected body hashes.',
      'Single-file SQLite cassette storage inspectable with any standard SQL client.',
      'Automatic redaction rules stripping Authorization, Cookie, and API key headers before bytes touch disk.',
    ],
    tradeoffs: [
      'Stateful multi-step external APIs require sequence-aware cassette matching rather than pure request hashing.',
    ],
    lessons: [
      'Storing recorded HTTP fixtures in SQLite instead of thousands of nested JSON files makes searching, diffing, and pruning test suites remarkably pleasant.',
    ],
  },
]
