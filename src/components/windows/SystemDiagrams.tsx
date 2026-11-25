import type { DiagramId } from '../../types/workstation'

export function SystemSchematic({ diagramId }: { diagramId: DiagramId }) {
  switch (diagramId) {
    case 'storage-page':
      return (
        <svg viewBox="0 0 560 155" role="img" aria-label="Slotted B-Tree page and WAL commit diagram">
          <rect x="8" y="14" width="168" height="126" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <rect x="8" y="14" width="168" height="24" fill="#111111" />
          <text x="18" y="30" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="10.5">
            APPEND-ONLY WAL
          </text>
          <rect x="18" y="48" width="148" height="20" fill="#E5E5E5" stroke="#111111" />
          <text x="24" y="62" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            LSN 1041 | CRC | PUT k1
          </text>
          <rect x="18" y="74" width="148" height="20" fill="#E5E5E5" stroke="#111111" />
          <text x="24" y="88" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            LSN 1042 | CRC | PUT k2
          </text>
          <line x1="18" y1="108" x2="166" y2="108" stroke="#111111" strokeDasharray="3 2" />
          <text x="24" y="124" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            fsync() commit barrier
          </text>

          <line x1="182" y1="76" x2="232" y2="76" stroke="#111111" strokeWidth="1.2" />
          <polygon points="232,76 225,72 225,80" fill="#111111" />
          <text x="186" y="68" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            checkpoint
          </text>

          <rect x="238" y="14" width="312" height="126" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <rect x="238" y="14" width="312" height="24" fill="#E5E5E5" stroke="#111111" />
          <text x="248" y="30" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10.5">
            4096-BYTE SLOTTED PAGE [HDR | PTRS →  ← CELLS]
          </text>
          <rect x="248" y="48" width="112" height="24" fill="#F4F4F4" stroke="#111111" />
          <text x="255" y="64" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            Slot[0] → 0x0FC0
          </text>
          <rect x="364" y="48" width="84" height="24" fill="#FFFFFF" stroke="#808080" strokeDasharray="3 2" />
          <text x="373" y="64" fill="#808080" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            Free Space
          </text>
          <rect x="248" y="96" width="292" height="32" fill="#E5E5E5" stroke="#111111" />
          <text x="258" y="116" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            Cell Tuple Payloads (grow ← upward from page end 0x1000)
          </text>
        </svg>
      )

    case 'outbox-relay':
      return (
        <svg viewBox="0 0 560 145" role="img" aria-label="Transactional outbox and idempotent consumer pipeline">
          <rect x="8" y="16" width="166" height="112" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <text x="18" y="34" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            ACID TX (POSTGRESQL)
          </text>
          <rect x="18" y="44" width="146" height="30" fill="#E5E5E5" stroke="#111111" />
          <text x="26" y="63" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            1. Domain Row Write
          </text>
          <rect x="18" y="82" width="146" height="34" fill="#111111" />
          <text x="26" y="103" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="9.5">
            2. Outbox Event Row
          </text>

          <line x1="176" y1="74" x2="220" y2="74" stroke="#111111" strokeWidth="1.2" />
          <polygon points="220,74 213,70 213,78" fill="#111111" />

          <rect x="224" y="38" width="124" height="68" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <text x="234" y="60" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            OUTBOX RELAY
          </text>
          <text x="234" y="78" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            SKIP LOCKED poll
          </text>
          <text x="234" y="93" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            At-least-once pub
          </text>

          <line x1="350" y1="74" x2="394" y2="74" stroke="#111111" strokeWidth="1.2" />
          <polygon points="394,74 387,70 387,78" fill="#111111" />

          <rect x="398" y="24" width="152" height="96" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <text x="408" y="44" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            CONSUMER BOUNDARY
          </text>
          <rect x="408" y="54" width="132" height="24" fill="#E5E5E5" stroke="#111111" />
          <text x="415" y="70" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Dedupe: event_uuid
          </text>
          <rect x="408" y="84" width="132" height="24" fill="#F4F4F4" stroke="#111111" />
          <text x="415" y="100" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Apply State Transition
          </text>
        </svg>
      )

    case 'bytecode-vm':
      return (
        <svg viewBox="0 0 560 140" role="img" aria-label="Single-pass bytecode compiler and stack VM diagram">
          <rect x="8" y="34" width="104" height="70" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <text x="18" y="58" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            SOURCE / LEX
          </text>
          <text x="18" y="76" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Token Slices
          </text>

          <line x1="114" y1="69" x2="146" y2="69" stroke="#111111" strokeWidth="1.2" />
          <polygon points="146,69 139,65 139,73" fill="#111111" />

          <rect x="150" y="34" width="122" height="70" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <text x="160" y="58" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            PRATT COMPILER
          </text>
          <text x="160" y="76" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Binding Power
          </text>
          <text x="160" y="90" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Scope & Upvalues
          </text>

          <line x1="274" y1="69" x2="306" y2="69" stroke="#111111" strokeWidth="1.2" />
          <polygon points="306,69 299,65 299,73" fill="#111111" />

          <rect x="310" y="24" width="114" height="90" fill="#E5E5E5" stroke="#111111" strokeWidth="1.2" />
          <text x="320" y="44" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            CHUNK
          </text>
          <text x="320" y="62" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            OP_GET_UPVAL 0
          </text>
          <text x="320" y="76" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            OP_CONST 1
          </text>
          <text x="320" y="90" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            OP_ADD / OP_RET
          </text>

          <line x1="426" y1="69" x2="454" y2="69" stroke="#111111" strokeWidth="1.2" />
          <polygon points="454,69 447,65 447,73" fill="#111111" />

          <rect x="458" y="24" width="94" height="90" fill="#111111" />
          <text x="468" y="46" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600">
            STACK VM
          </text>
          <text x="468" y="66" fill="#E5E5E5" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            CallFrames[]
          </text>
          <text x="468" y="82" fill="#E5E5E5" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Value Stack
          </text>
          <text x="468" y="98" fill="#E5E5E5" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Mark-Sweep GC
          </text>
        </svg>
      )

    case 'edge-rfid':
      return (
        <svg viewBox="0 0 560 140" role="img" aria-label="Edge RFID debounce and ledger sync state diagram">
          <rect x="8" y="32" width="112" height="74" fill="#FFFFFF" stroke="#111111" strokeDasharray="4 2" strokeWidth="1.2" />
          <text x="16" y="54" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fontWeight="600">
            UHF ANTENNA
          </text>
          <text x="16" y="72" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            ~40 reads/sec
          </text>
          <text x="16" y="87" fill="#808080" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Noisy RSSI stream
          </text>

          <line x1="122" y1="69" x2="154" y2="69" stroke="#111111" strokeWidth="1.2" />
          <polygon points="154,69 147,65 147,73" fill="#111111" />

          <rect x="158" y="26" width="136" height="86" fill="#E5E5E5" stroke="#111111" strokeWidth="1.2" />
          <text x="168" y="46" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fontWeight="600">
            EDGE DWELL FSM
          </text>
          <text x="168" y="65" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            CANDIDATE → PRESENT
          </text>
          <text x="168" y="81" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Grace window timer
          </text>
          <text x="168" y="97" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Local SQLite Spool
          </text>

          <line x1="296" y1="69" x2="334" y2="69" stroke="#111111" strokeWidth="1.2" />
          <polygon points="334,69 327,65 327,73" fill="#111111" />

          <rect x="338" y="32" width="212" height="74" fill="#FFFFFF" stroke="#111111" strokeWidth="1.2" />
          <text x="348" y="54" fill="#111111" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fontWeight="600">
            STOCK LEDGER SETTLEMENT
          </text>
          <text x="348" y="73" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            1 Confirmed Domain Event
          </text>
          <text x="348" y="89" fill="#333333" fontFamily="IBM Plex Mono, monospace" fontSize="9">
            Balanced Warehouse Posting
          </text>
        </svg>
      )
  }
}
