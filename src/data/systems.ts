import type { SystemTopic } from '../types/workstation'

export const SYSTEM_TOPICS: SystemTopic[] = [
  {
    id: 'storage-engines',
    code: 'SYS-01',
    title: 'Storage Engines & Durability Boundaries',
    subtitle: 'How bytes move from volatile process memory onto durable media without corruption.',
    diagramId: 'storage-page',
    diagramCaption:
      'Fig 1.1 — Slotted B-Tree page layout (4 KB) paired with sequential Write-Ahead Log commit boundary.',
    overview:
      'Every application eventually delegates state to a database, yet performance and recovery characteristics are governed by physical page layouts, write-ahead logs, and OS page-cache semantics (`fsync`). Studying B-Trees alongside LSM-Trees clarifies why random writes, write amplification, and compaction behave the way they do.',
    coreQuestions: [
      'What guarantees survive an abrupt power loss vs. a clean process exit?',
      'How do slotted pages pack variable-length tuples while keeping binary search over keys fast?',
      'When does append-only LSM compaction outperform in-place B-Tree page splits?',
    ],
    architecturalNotes: [
      {
        label: 'WAL Before Data Page',
        detail:
          'Dirty buffer-pool pages can flush lazily so long as their corresponding redo records have already crossed fsync into the sequential WAL.',
      },
      {
        label: 'Slotted Page Indirection',
        detail:
          'Cell pointer arrays grow downward from the page header while tuple payloads grow upward from the page end, avoiding costly byte shifting on deletes.',
      },
      {
        label: 'Checksums & Torn Pages',
        detail:
          'Hardware sectors and OS blocks do not always match database page sizes; CRCs and full-page writes after checkpoints guard against torn writes.',
      },
    ],
    references: [
      'Alex Petrov — Database Internals (Storage Engines)',
      'SQLite Database File Format Specification',
      'CMU 15-445 Database Systems Lecture Notes',
    ],
  },
  {
    id: 'distributed-messaging',
    code: 'SYS-02',
    title: 'Reliable Messaging & Idempotent State',
    subtitle: 'Designing service boundaries that tolerate retries, duplicates, and partial outages.',
    diagramId: 'outbox-relay',
    diagramCaption:
      'Fig 2.1 — Atomic relational write + Outbox Relay + Idempotent Consumer boundary.',
    overview:
      'Networks drop packets, workers restart mid-handler, and brokers redeliver unacknowledged messages. Rather than chasing fragile exactly-once infrastructure promises, resilient backend architectures pair at-least-once transport with deterministic idempotent state transitions.',
    coreQuestions: [
      'What happens if this handler runs three times with the exact same payload?',
      'How do we prevent dual-write inconsistency between SQL state and async events?',
      'Where should backpressure apply when a downstream system slows down?',
    ],
    architecturalNotes: [
      {
        label: 'Single Atomic Commit',
        detail:
          'Commit domain mutations and outgoing event records in the same local ACID transaction, then relay asynchronously.',
      },
      {
        label: 'Natural Idempotency Keys',
        detail:
          'Keying operations by deterministic client/domain identifiers turns retries from duplicate side-effects into safe no-ops.',
      },
      {
        label: 'Explicit Poison Handling',
        detail:
          'Unprocessable messages need bounded retry budgets with jitter, followed by an inspectable dead-letter table rather than infinite head-of-line blocking.',
      },
    ],
    references: [
      'Martin Kleppmann — Designing Data-Intensive Applications',
      'Pat Helland — Life Beyond Distributed Transactions',
      'Brandur Leach — Implementing Stripe-like Idempotency Keys in Postgres',
    ],
  },
  {
    id: 'language-runtimes',
    code: 'SYS-03',
    title: 'Compilers, Bytecode & Stack Runtimes',
    subtitle: 'Translating human-readable source text into compact instructions and runtime memory.',
    diagramId: 'bytecode-vm',
    diagramCaption:
      'Fig 3.1 — Single-pass compilation pipeline from source stream to bytecode chunk and VM call frames.',
    overview:
      'Building small compilers and virtual machines bridges high-level software architecture with low-level execution. Understanding lexical scoping, Pratt precedence parsing, constant pools, and garbage-collected heap objects sharpens everyday reasoning in production languages.',
    coreQuestions: [
      'How are lexical closures represented once their enclosing stack frame returns?',
      'What trade-offs separate AST tree-walking, stack bytecode, and register VMs?',
      'How do mark-and-sweep or generational collectors trace roots without leaks?',
    ],
    architecturalNotes: [
      {
        label: 'Bytecode Density',
        detail:
          'Linear bytecode chunks improve CPU cache locality dramatically compared to chasing pointer-heavy AST nodes across the heap.',
      },
      {
        label: 'Open vs. Closed Upvalues',
        detail:
          'Variables captured by closures can stay directly on the value stack while in scope, migrating to heap boxes only when the frame pops.',
      },
      {
        label: 'Observable Tooling',
        detail:
          'Disassemblers and span-accurate error reporters make language internals transparent rather than mysterious.',
      },
    ],
    references: [
      'Robert Nystrom — Crafting Interpreters',
      'Thorsten Ball — Writing An Interpreter / Compiler In Go',
      'Vaughan Pratt — Top Down Operator Precedence (POPL 1973)',
    ],
  },
  {
    id: 'physical-state-machines',
    code: 'SYS-04',
    title: 'Hardware-Edge & Operational State Machines',
    subtitle: 'Bridging noisy real-world sensors and human warehouse workflows with deterministic software.',
    diagramId: 'edge-rfid',
    diagramCaption:
      'Fig 4.1 — Edge RFID signal debouncing, local spooling, and ledger reconciliation pipeline.',
    overview:
      'Software that interacts with physical warehouses, RFID portals, barcode scanners, or weighbridges must handle disconnected networks, duplicate scans, and out-of-order human overrides. Explicit finite state machines keep operational rules legible.',
    coreQuestions: [
      'How does the local station keep operating if upstream internet drops for an hour?',
      'What separates raw hardware telemetry from an authoritative domain event?',
      'How do operators safely correct a physical mistake without breaking audit history?',
    ],
    architecturalNotes: [
      {
        label: 'Edge Debounce Window',
        detail:
          'Convert high-frequency antenna frames into stateful dwell sessions at the edge before emitting clean domain transitions.',
      },
      {
        label: 'Store-and-Forward Spool',
        detail:
          'Persist confirmed edge events to an embedded local store before forwarding upstream so network blips never lose physical scans.',
      },
      {
        label: 'Compensating Transitions',
        detail:
          'Model reversals and manual overrides as first-class state transitions rather than silent database row edits.',
      },
    ],
    references: [
      'EPCglobal UHF Class-1 Gen-2 Protocol Notes',
      'Leslie Lamport — Specifying Systems (State Machine Thinking)',
    ],
  },
]
