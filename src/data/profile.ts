import type { OperatorProfile } from '../types/workstation'

export const OPERATOR_PROFILE: OperatorProfile = {
  name: 'Michael Kamau',
  tagline: 'Software engineer. Systems enthusiast. Independent builder.',
  quote:
    'I enjoy understanding how software works beneath the surface, designing dependable systems, and building things that solve real problems. Ocassionaly, I will start a technical book, read it halfway and start another :)',
  location: 'Nairobi, Kenya',
  email: 'kamaucoder@gmail.com',
  introduction: [
    'I am a software engineer based in Nairobi focused on backend engineering, operational software architecture, and the mechanics that sit underneath everyday abstractions.',
    'Much of my practical work centres on systems where correctness matters: enterprise resource planning workflows, multi-location inventory ledgers, hardware-to-backend integrations, and internal developer tooling.',
    'Outside client and production work, I treat my computer as a small engineering workshop—building toy interpreters, inspecting database internals, reading protocol specifications, and keeping field notes on what holds up in practice.',
  ],
  engineeringInterests: [
    'Relational data modelling & transactional invariants',
    'Distributed messaging, idempotency & failure recovery',
    'Programming language implementation & bytecode runtimes',
    'Storage engines, write-ahead logs & binary wire protocols',
    'Operational backend systems (ERP, inventory & edge hardware)',
    'Small, sharp command-line tools with minimal dependencies',
  ],
  technicalFocus: [
    {
      area: 'Backend & Systems',
      details:
        'Go, TypeScript/Node.js, HTTP/TCP services, background job pipelines, event-driven service boundaries.',
    },
    {
      area: 'Data & Persistence',
      details:
        'PostgreSQL, SQLite, Redis, schema design, lock-aware migrations, append-only audit ledgers, transactional outbox.',
    },
    {
      area: 'Architecture & Integration',
      details:
        'Domain state machines, ERP/procurement workflows, RFID & serial reader ingestion, deterministic reconciliation.',
    },
    {
      area: 'Tooling & Environment',
      details:
        'Linux, Git, Docker, SQL inspection tooling, automated integration harnesses, structured observability.',
    },
  ],
  experience: [
    {
      period: 'Recent — Present',
      role: 'Independent Backend & Systems Software Engineer',
      context: 'Operational Software, Integrations & Custom Engineering · Nairobi',
      highlights: [
        'Designed and maintained backend services for inventory tracking, procurement, and operational ERP workflows backed by PostgreSQL.',
        'Built edge ingestion pipelines bridging physical RFID hardware readers with cloud stock-movement state machines.',
        'Replaced fragile synchronous cross-service calls with transactional outbox relays and idempotent consumers.',
      ],
    },
    {
      period: 'Previous',
      role: 'Software Engineer — Full-Stack & Backend Systems',
      context: 'Business Applications & Internal Tooling',
      highlights: [
        'Developed domain APIs, reporting pipelines, and multi-warehouse reconciliation models with strict auditability requirements.',
        'Created internal schema inspection scripts and local integration fixtures to make deployments and debugging predictable.',
      ],
    },
  ],
  education: [
    {
      period: 'University Study',
      qualification: 'B.Sc. in Computer Science / Software Engineering',
      institution: 'Kenya',
      notes:
        'Foundations in data structures, operating systems, relational databases, computer networks, and language theory.',
    },
    {
      period: 'Ongoing Independent Study',
      qualification: 'Systems, Compilers & Database Internals',
      institution: 'Self-Directed Reading & Implementation',
      notes:
        'Hands-on study through Crafting Interpreters, Designing Data-Intensive Applications, PostgreSQL documentation, and RFC specifications.',
    },
  ],
  channels: [
    {
      id: 'email',
      label: 'Electronic Mail',
      value: 'kamaucoder@gmail.com',
      href: 'mailto:kamaucoder@gmail.com',
      protocol: 'SMTP / Direct',
      description: 'Best channel for engineering roles, architecture discussions, or project inquiries.',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/Murchoid',
      href: 'https://github.com/Murchoid',
      protocol: 'Git / Source',
      description: 'Open-source repositories, language experiments, and command-line utilities.',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/michale-kamau-084831250',
      href: 'https://www.linkedin.com/in/michael-kamau-084831250',
      protocol: 'Directory',
      description: 'Professional history and work updates.',
    },
    {
      id: 'x',
      label: 'X',
      value: 'x.com/MurchoidCoder',
      href: 'https://www.x.com/MurchoidCoder',
      protocol: 'Directory',
      description: 'When I am not talking to my 1.6K followe in linkedIn, I am talking to my 1 liker in X.',
    },
  ],
}

export function buildPlainTextResume(profile: OperatorProfile): string {
  const lines: string[] = [
    '========================================================================',
    `${profile.name.toUpperCase()}`,
    profile.tagline,
    `Location: ${profile.location} | Email: ${profile.email}`,
    '========================================================================',
    '',
    'SUMMARY',
    '-------',
    ...profile.introduction,
    '',
    'TECHNICAL FOCUS',
    '---------------',
    ...profile.technicalFocus.map((item) => `* ${item.area}: ${item.details}`),
    '',
    'EXPERIENCE',
    '----------',
    ...profile.experience.flatMap((exp) => [
      `${exp.role} (${exp.period})`,
      `${exp.context}`,
      ...exp.highlights.map((h) => `  - ${h}`),
      '',
    ]),
    'EDUCATION & STUDY',
    '-----------------',
    ...profile.education.flatMap((edu) => [
      `${edu.qualification} — ${edu.institution} (${edu.period})`,
      `  ${edu.notes}`,
      '',
    ]),
    'ENGINEERING INTERESTS',
    '---------------------',
    ...profile.engineeringInterests.map((interest) => `* ${interest}`),
    '',
    'CONTACT',
    '-------',
    ...profile.channels.map((ch) => `${ch.label}: ${ch.value}`),
  ]

  return lines.join('\n')
}
