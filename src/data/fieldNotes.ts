import type { FieldNote } from '../types/workstation'

export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'double-entry-inventory',
    filename: '01-double-entry-inventory.txt',
    title: 'Why Double-Entry Accounting Belongs in Inventory Systems',
    publishedAt: '2026-10-14',
    category: 'Architecture',
    readingTime: '6 min read',
    excerpt:
      'Mutable stock counters quietly lose history under concurrency. Treating physical stock movements as balanced journal postings makes discrepancies auditable.',
    sections: [
      {
        paragraphs: [
          'Almost every first version of an inventory system starts with the same schema: a products table with an integer column named quantity_on_hand. When a shipment arrives, you add to the integer. When an order ships, you subtract from it.',
          'For a small shop with a single operator, that works fine. The trouble begins the moment physical reality gets messy: two warehouse clerks scan items simultaneously, a delivery van is loaded in the morning but turned back in the afternoon, or a quarterly stocktake reveals three missing units and nobody knows whether they vanished yesterday or two months ago.',
        ],
      },
      {
        heading: 'The Problem with Destructive Updates',
        paragraphs: [
          'An UPDATE statement overwrites history. Even if you bolt on an audit_logs table later, application-level logs tend to drift from actual state transitions whenever a background job or manual SQL fix forgets to emit a log row.',
          'Bookkeepers solved this exact problem centuries ago. Instead of storing a mutable balance as the source of truth, double-entry accounting stores an append-only journal of balanced transfers between named accounts.',
        ],
        code: {
          caption: 'Balanced warehouse transfer posting',
          snippet: `-- Moving 12 units from Receiving Dock to Bin A-04
INSERT INTO stock_postings (journal_id, account_code, sku, delta)
VALUES
  ('jrn_01928a', 'WAREHOUSE:NAIROBI:RECEIVING', 'SKU-4410', -12),
  ('jrn_01928a', 'WAREHOUSE:NAIROBI:BIN-A04',   'SKU-4410', +12);`,
        },
      },
      {
        heading: 'Invariants You Can Actually Enforce',
        paragraphs: [
          'When every stock movement must sum to zero across participating accounts—including virtual accounts like SUPPLIER_INBOUND, CUSTOMER_FULFILLED, IN_TRANSIT, and SHRINKAGE_ADJUSTMENT—units can neither appear out of thin air nor vanish silently.',
          'You still maintain a materialized balance table for fast reads and row-level locking, updated inside the exact same database transaction. Lock accounts in deterministic lexicographical order so concurrent transfers between the same bins cannot deadlock.',
        ],
      },
    ],
  },
  {
    id: 'transactional-outbox-postgres',
    filename: '02-transactional-outbox.txt',
    title: 'Anatomy of the Transactional Outbox Pattern in PostgreSQL',
    publishedAt: '2026-08-03',
    category: 'Backend',
    readingTime: '7 min read',
    excerpt:
      'What goes wrong when a service commits to PostgreSQL and publishes to a broker in the same handler—and how to keep the fix boring.',
    sections: [
      {
        paragraphs: [
          'A classic distributed systems bug hides inside four innocent lines of backend code: commit a database transaction, then publish an event to RabbitMQ or Kafka. Nine hundred and ninety-nine times out of a thousand, both succeed.',
          'On the thousandth call, the process crashes or loses network connectivity right after COMMIT returns and right before the broker acknowledges the message. Your database says the invoice is paid; every downstream consumer never heard about it.',
        ],
      },
      {
        heading: 'Flipping the Order Does Not Save You',
        paragraphs: [
          'Publishing the message before committing the database transaction merely inverts the failure mode: if the transaction rolls back on a constraint violation or serialization error, downstream consumers have already reacted to an event that never happened.',
          'Unless you want two-phase commit across heterogeneous infrastructure, the cleanest boundary is the database transaction you already trust. Write both the domain row and an outbox_events row in one transaction.',
        ],
        code: {
          caption: 'Claiming outbox batches without blocking sibling workers',
          snippet: `WITH claimed AS (
  SELECT id
  FROM outbox_events
  WHERE published_at IS NULL
  ORDER BY id ASC
  LIMIT 50
  FOR UPDATE SKIP LOCKED
)
UPDATE outbox_events e
SET attempts = e.attempts + 1
FROM claimed
WHERE e.id = claimed.id
RETURNING e.id, e.topic, e.payload;`,
        },
      },
      {
        heading: 'At-Least-Once Means Consumers Must Be Idempotent',
        paragraphs: [
          'An outbox guarantees at-least-once delivery, not magically-once delivery. If the relay publishes to the broker and crashes before marking published_at, the next relay tick will publish that same event ID again.',
          'Every consumer therefore needs a natural idempotency key—either an explicit processed_events table keyed by event_id, or domain state transitions that naturally ignore already-applied versions.',
        ],
      },
    ],
  },
  {
    id: 'pratt-parsing-intuition',
    filename: '03-pratt-parsing-intuition.txt',
    title: 'Writing a Pratt Parser Without Losing the Plot',
    publishedAt: '2026-05-19',
    category: 'Languages',
    readingTime: '8 min read',
    excerpt:
      'Recursive descent expression grammars often drown in precedence layers. Vaughan Pratt’s 1973 paper replaces the ladder with two binding numbers.',
    sections: [
      {
        paragraphs: [
          'When you write your first recursive-descent parser for arithmetic and boolean expressions, textbook grammars push you toward a staircase of mutually recursive functions: parseExpression calls parseOr, which calls parseAnd, which calls parseEquality, all the way down to parsePrimary.',
          'It works, and it is completely clear—until your language has twelve precedence levels, mix of left- and right-associative operators, prefix unary operators, and postfix call or index expressions.',
        ],
      },
      {
        heading: 'Left and Right Binding Power',
        paragraphs: [
          'Vaughan Pratt’s insight is wonderfully mechanical: imagine every operator standing between operands, pulling on its neighbours with a numeric tug-of-war strength on its left and on its right.',
          'In `1 + 2 * 3`, the `+` pulls on `2` from the left with low strength, while `*` pulls on `2` from the right with higher strength. Because `*` wins the tug-of-war, `2` gets grouped into `(2 * 3)` before `+` finishes.',
        ],
        code: {
          caption: 'Core precedence loop in ~15 lines',
          snippet: `fn parse_expr(&mut self, min_bp: u8) -> Expr {
    let mut lhs = self.parse_prefix();
    while let Some(op) = self.peek_infix_op() {
        let (l_bp, r_bp) = infix_binding_power(op);
        if l_bp < min_bp {
            break;
        }
        self.advance();
        let rhs = self.parse_expr(r_bp);
        lhs = Expr::Binary(op, Box::new(lhs), Box::new(rhs));
    }
    lhs
}`,
        },
      },
      {
        heading: 'Associativity Falls Out of Asymmetry',
        paragraphs: [
          'Once you see the tug-of-war, left vs. right associativity stops being a special case. Give `+` binding power `(10, 11)` and it associates left: `(a + b) + c`. Give assignment or exponentiation `(14, 13)` and the recursive call accepts another operator of the same rank on the right: `a = (b = c)`.',
        ],
      },
    ],
  },
  {
    id: 'deduplicating-rfid-streams',
    filename: '04-rfid-edge-streams.txt',
    title: 'Taming Noisy Hardware: Deduplicating Continuous RFID Streams',
    publishedAt: '2026-02-11',
    category: 'Systems',
    readingTime: '5 min read',
    excerpt:
      'Hardware sensors report raw physics, not clean domain events. Notes on turning chatty UHF antenna frames into calm backend state.',
    sections: [
      {
        paragraphs: [
          'Backend engineers used to clean JSON webhooks are often surprised the first time they open a TCP socket to an industrial UHF RFID reader. A single tagged crate sitting near a loading bay door can generate forty sightings per second—followed by two seconds of silence when a forklift drives past and blocks the radio path.',
          'If you forward raw tag sightings straight to your primary database, you quickly saturate writes with noise and trigger oscillating "arrived / departed" transitions.',
        ],
      },
      {
        heading: 'Separate Physics from Business Meaning',
        paragraphs: [
          'The cleanest architecture draws a hard boundary at the edge daemon. Downstream business services should never know about antenna port numbers, RSSI decibel readings, or radio duty cycles.',
          'Instead, the edge process maintains an in-memory presence table per zone: a tag enters CANDIDATE state on first sight, promotes to PRESENT after N sightings across a minimum dwell window, and only transitions to DEPARTED once a quiet grace timer expires.',
        ],
      },
    ],
  },
  {
    id: 'postgres-locks-migration-day',
    filename: '05-postgres-lock-queues.txt',
    title: 'Reading PostgreSQL Locks Before Migration Day',
    publishedAt: '2025-11-22',
    category: 'Databases',
    readingTime: '6 min read',
    excerpt:
      'Why fast metadata-only ALTER TABLE statements can still bring an API to a halt when lock queues form behind long-running transactions.',
    sections: [
      {
        paragraphs: [
          'Modern PostgreSQL versions can add a nullable column or even a column with a non-volatile default in milliseconds without rewriting the table heap. That speed creates a dangerous illusion of safety.',
          'Even a metadata-only ALTER TABLE still requires an ACCESS EXCLUSIVE lock for a brief instant. If an analytics query or idle-in-transaction session already holds a simple ACCESS SHARE read lock on that table, your ALTER TABLE must wait in line.',
        ],
      },
      {
        heading: 'The Lock Queue Domino Effect',
        paragraphs: [
          'While your ALTER TABLE waits patiently in the lock queue, PostgreSQL fairness rules prevent new ordinary SELECT, INSERT, and UPDATE queries from jumping ahead of the queued exclusive lock. Within seconds, every web worker touching that table blocks.',
        ],
        code: {
          caption: 'Defensive lock_timeout wrapper for production DDL',
          snippet: `BEGIN;
SET LOCAL lock_timeout = '2s';
SET LOCAL statement_timeout = '10s';

ALTER TABLE inventory_movements
  ADD COLUMN reference_batch text;

COMMIT;`,
        },
      },
      {
        heading: 'Fail Fast, Retry Calmly',
        paragraphs: [
          'Setting a short `lock_timeout` reverses the failure mode: if the migration cannot acquire the lock within two seconds, the migration aborts harmlessly instead of stalling live customer requests.',
        ],
      },
    ],
  },
]
