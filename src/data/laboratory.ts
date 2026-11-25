import type { LabExperiment } from '../types/workstation'

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'bitcask-kv-go',
    code: 'EXP-01',
    title: 'Casklite: Append-Only Log Storage Engine',
    domain: 'Database Experiments',
    status: 'IN PROGRESS',
    updatedAt: '2026-10',
    technologies: ['Go', 'mmap / File I/O', 'CRC32', 'Binary Framing'],
    summary:
      'Minimal Bitcask-inspired key-value store written in Go to study write-ahead segment compaction, hint files, and crash recovery.',
    hypothesis:
      'By keeping an in-memory hash directory mapping keys to fixed `(file_id, offset, size)` tuples, point reads and sequential writes stay single-seek predictable.',
    observations: [
      'Partial tail writes during simulated kill -9 tests are cleanly detected and truncated via per-record CRC32 framing headers.',
      'Generating compact hint files alongside merged data segments cuts cold-start directory reconstruction time dramatically.',
    ],
    nextSteps:
      'Benchmarking background segment merge throttling so compaction I/O does not spike foreground write tail latency.',
  },
  {
    id: 'register-vm-toy',
    code: 'EXP-02',
    title: 'RegVM vs. StackVM Dispatch Study',
    domain: 'Programming Language Design',
    status: 'EXPLORING',
    updatedAt: '2026-09',
    technologies: ['Rust', 'Bytecode', 'Instruction Encoding'],
    summary:
      'Comparing instruction count vs. decoding overhead between a classic stack-based bytecode loop and a 32-bit Lua-style register VM.',
    hypothesis:
      'Register-encoded 3-address opcodes execute fewer total instructions for arithmetic-heavy loops, at the cost of a slightly more complex register allocator.',
    observations: [
      'Fixed-width 32-bit instruction words (`8-bit op | 8-bit A | 8-bit B | 8-bit C`) simplify jump offset calculation compared to variable-length byte streams.',
    ],
    nextSteps:
      'Implementing local temporary register coalescing for nested binary expressions.',
  },
  {
    id: 'resp3-wire-parser',
    code: 'EXP-03',
    title: 'Zero-Dependency RESP Wire Protocol Server',
    domain: 'Go Utilities & Protocols',
    status: 'COMPLETED',
    updatedAt: '2026-06',
    technologies: ['Go', 'bufio', 'net', 'RESP2/RESP3'],
    summary:
      'Clean-room implementation of the Redis Serialization Protocol framing parser and in-memory command router compatible with standard redis-cli.',
    hypothesis:
      'Writing wire protocol parsers directly over buffered readers builds strong intuition for framing boundaries, pipelining, and allocation control.',
    observations: [
      'Handling pipelined client commands properly requires separating buffered frame parsing from socket read deadlines.',
      'Pre-sizing bulk string slices strictly after validating configured frame limits prevents trivial memory-exhaustion payloads.',
    ],
    nextSteps:
      'Archived as a reference package reused in local integration test harnesses.',
  },
  {
    id: 'det-scheduler-sim',
    code: 'EXP-04',
    title: 'Deterministic Retry & Queue Simulator',
    domain: 'Systems Engineering',
    status: 'IN PROGRESS',
    updatedAt: '2026-08',
    technologies: ['Go', 'Virtual Clock', 'PRNG Seed'],
    summary:
      'Single-threaded discrete-event harness simulating worker retries, exponential backoff with jitter, and downstream brownouts under a seeded clock.',
    hypothesis:
      'Replacing wall-clock sleep and OS randomness with a stepped virtual clock lets subtle retry-storm bugs reproduce deterministically from a single 64-bit seed.',
    observations: [
      'Uncorrelated full jitter prevents synchronized retry waves far more reliably than fixed exponential multipliers when a downstream dependency recovers.',
    ],
    nextSteps:
      'Adding token-bucket circuit breaker state visualizations to trace output.',
  },
  {
    id: 'sqlite-vfs-sandbox',
    code: 'EXP-05',
    title: 'SQLite Page & B-Tree Inspector CLI',
    domain: 'Database Experiments',
    status: 'EXPLORING',
    updatedAt: '2026-07',
    technologies: ['Go', 'SQLite File Format', 'Hex Dump'],
    summary:
      'Read-only binary inspector that parses raw `.db` files directly from disk without libsqlite, visualising header metadata, cell pointers, and interior/leaf B-tree pages.',
    hypothesis:
      'Parsing the 100-byte database header and varint-encoded cell payloads firsthand turns abstract B-tree diagrams into concrete byte offsets.',
    observations: [
      'SQLite’s big-endian varint encoding and reverse-growing cell content area within a 4096-byte page are remarkably compact.',
    ],
    nextSteps:
      'Adding overflow page chain traversal for large text/blob payloads.',
  },
  {
    id: 'crdt-piece-table',
    code: 'EXP-06',
    title: 'Piece-Table Text Buffer & Undo Log',
    domain: 'Data Structures',
    status: 'ON HOLD',
    updatedAt: '2025-12',
    technologies: ['TypeScript', 'Piece Table', 'Immutable Buffers'],
    summary:
      'Text editor buffer experiment implementing an append-only add buffer, descriptor piece table, and non-destructive undo/redo stack.',
    hypothesis:
      'A piece table avoids copying large contiguous strings on mid-document edits while keeping undo history trivial to represent as descriptor snapshots.',
    observations: [
      'Line-number lookup benefits from caching newline counts inside each piece descriptor rather than scanning raw character buffers.',
    ],
    nextSteps:
      'Paused while focusing on storage-engine and bytecode-runtime explorations.',
  },
]
