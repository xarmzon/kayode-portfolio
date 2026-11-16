import type {
  CallLogEntry,
  ChipRow,
  Classroom,
  Hero,
  Language,
  Line,
  Ring,
  StatusBar,
  Tool,
  TrailMap,
} from './schema'

/** Chapters 00–01. */
export const hero: Hero = {
  kicker:
    "Hi, I'm Kayode Samson Adelola — Rastaxarm on the wire. Full-stack lead developer in fintech.",
  heading: 'I put businesses on a live line to the people they serve.',
  sub: 'I build the Go, C# and Node services and the Angular and React screens on top of them — so every request, payment and notification actually gets through.',
  actions: { primary: 'Walk the trail', secondary: 'Grab the CV' },
}

/** Chapters 02, 03 and 05. */
export const lines: Line[] = [
  {
    id: 'yalo',
    chapter: 'yalo',
    line: 'Line 01',
    company: 'YALO',
    role: 'Full-Stack Lead Developer',
    since: 2025,
    site: 'https://yalo.ng',
    kicker: 'Connecting YALO → renters and their employers.',
    heading: 'Keeping YALO on a live line with every renter it houses.',
    body: "As lead developer, I own YALO's backend and frontend end to end — the services and APIs, the customer dashboards, the admin portals and the employee marketplace — plus the team's Zoho CRM widget platform.",
    tags: ['Angular', 'React 19', 'C# · ASP.NET Core', 'TypeScript', 'Zoho CRM + Deluge', 'AWS'],
  },
  {
    id: 'penaid',
    chapter: 'penaid',
    line: 'Line 02',
    company: 'Penaid',
    role: 'Senior Developer',
    since: 2023,
    site: 'https://penaid.co',
    heading: 'Putting Penaid on a direct line to every pensioner and student it backs.',
    body: 'Full-stack across the platform: high-performance services and APIs built for speed and concurrency, wired to frontends I take from Figma to production.',
    tags: ['Go', 'Angular', 'React', 'TypeScript', 'REST APIs', 'AWS', 'Zoho Desk'],
    action: { label: 'Visit penaid.co', href: 'https://penaid.co' },
  },
  {
    id: 'cousant',
    chapter: 'seedbed',
    line: 'Line 03',
    company: 'Cousant',
    role: 'Consultant Software Developer',
    since: 2026,
    heading: "Planting products for Cousant's clients.",
    body: 'The admin dashboard behind {fundron} — and the front end of a Zoho Sigma extension for a cooperative savings platform.',
    tags: [],
  },
]

export const fundron = { label: 'Fundron', href: 'https://fundtronpartners.com/' }

/** Chapter 06. */
export const languages: Language[] = [
  {
    name: 'TypeScript',
    usedAt: ['Penaid', 'YALO', 'Cousant'],
    uses: [
      'Node.js and Express services on AWS',
      'Angular, React and TanStack frontends',
      'Zoho CRM widgets and their Deluge functions',
      'Real-time WebSocket notifications at Penaid',
    ],
    snippet: 'const ring = (line: string) => `Ringing ${line}…`',
  },
  {
    name: 'C#',
    usedAt: ['YALO'],
    uses: [
      'Backend services and APIs in ASP.NET Core and EF Core',
      'CRM-as-code tooling that provisions Zoho CRM from version control',
      'Manager-based services over a DDD domain model',
    ],
    snippet: 'Console.WriteLine($"Ringing {line}…");',
  },
  {
    name: 'Go',
    usedAt: ['Penaid'],
    uses: [
      'API services and backend',
      'Concurrent request handling with typed contracts',
      'Lean services that keep infrastructure small',
    ],
    snippet: 'fmt.Printf("Ringing %s…\\n", line)',
  },
  {
    name: 'Deluge',
    usedAt: ['YALO', 'Cousant'],
    uses: [
      'Zoho CRM functions and workflow automation',
      'Server-side functions that power the CRM widgets',
      'Logic behind installable Zoho CRM extensions',
    ],
    snippet: 'info "Ringing " + line + "…";',
  },
]

/** Chapter 07. */
export const tools: Tool[] = [
  { name: 'React', use: 'Component UIs' },
  { name: 'TanStack Start', use: 'SSR apps' },
  { name: 'Next.js', use: 'Fast company sites and portals' },
  { name: 'Vite', use: 'Instant dev, lean builds' },
  { name: 'TanStack Router', use: 'Type-safe routes, the backbone of the Fundron admin' },
  { name: 'TanStack Query', use: 'Server state' },
  { name: 'TanStack Form', use: 'Type-safe forms' },
  { name: 'TanStack Table', use: 'Headless data grids' },
  { name: 'Zod', use: 'One schema for forms and API parsing' },
  { name: 'shadcn/ui', use: 'Accessible components owned in the codebase' },
  { name: 'Tailwind CSS', use: 'Utility-first styling' },
  { name: 'Angular', use: 'Signals-based dashboards' },
  { name: 'PrimeNG', use: 'Angular component library' },
]

export const chipRows: ChipRow[] = [
  { label: 'Backend', chips: ['Node.js', 'Express', 'ASP.NET Core', 'EF Core', 'Go'] },
  {
    label: 'Cloud',
    chips: ['AWS Lambda', 'SQS · SNS', 'API Gateway', 'S3', 'Serverless', 'Docker · Nginx'],
  },
  { label: 'Data', chips: ['MongoDB', 'PostgreSQL', 'SQL Server', 'Redis'] },
  { label: 'Zoho', chips: ['CRM', 'Sigma · ZET', 'CRM Widgets', 'WorkDrive', 'Books', 'Desk'] },
]

/** Chapter 08, newest first. */
export const callLog: CallLogEntry[] = [
  {
    year: 2026,
    where: 'Cousant Limited',
    role: 'Consultant Software Developer',
    line: 'Fundron admin frontend and a Zoho Sigma extension',
  },
  {
    year: 2025,
    where: 'YALO',
    role: 'Full-Stack Lead Developer',
    line: 'Backend and frontend end to end',
  },
  { year: 2023, where: 'Penaid', role: 'Senior Developer', line: 'Full-stack across the platform' },
  {
    year: 2023,
    where: 'Cousant Limited',
    role: 'Consultant Software Developer',
    line: 'Client and admin portals in React and Next.js — 30+ components, 90+ pages',
  },
  {
    year: 2022,
    where: 'Cousant Limited',
    role: 'Consultant (contract)',
    line: 'APIs and admin systems with React, Express and MongoDB on Docker and Nginx',
  },
  {
    year: 2022,
    where: 'Mayovest',
    role: 'Website Developer · Web Development Trainer',
    line: 'Built mayovest.com on WordPress; teaches HTML, CSS, JavaScript and React',
  },
  {
    year: 2021,
    where: 'Naurix Limited',
    role: 'Full-Stack Web Developer',
    line: 'Company site in Next.js — 11 pages, 33 components, on Vercel',
  },
  {
    year: 2019,
    where: 'University of Ilorin',
    role: 'Full-Stack Web Developer',
    line: 'A digital election platform used across faculties, plus a web CBT exam system',
  },
  {
    year: 2017,
    where: 'University of Ilorin',
    role: 'Programming Trainer',
    line: 'Taught C/C++, Fortran, LaTeX and web development, 2017–2021',
  },
]

/** Chapter 09. */
export const classroom: Classroom = {
  heading: 'The classroom',
  items: [
    {
      title: 'University of Ilorin, 2017–2021',
      body: 'Taught students to program: C/C++, Fortran, LaTeX and web development.',
    },
    {
      title: 'Mayovest, since 2022',
      body: 'Built mayovest.com on WordPress; teaches HTML, CSS, JavaScript and React to build interactive websites and apps.',
    },
    {
      title: 'Field manuals',
      body: 'Self-contained, single-file HTML developer books.',
    },
  ],
  foundation: 'B.Sc. Mathematics, University of Ilorin, 2021.',
}

/** Chapter 10. */
export const ring: Ring = {
  heading: 'Got a product that needs a live line?',
  actions: { ring: 'Ring the line', cv: 'Download CV', replay: 'Replay' },
}

/** The always-on call-status bar. */
export const statusBar: StatusBar = {
  live: 'On the line',
  chapterLabel: 'CH',
  offTrail: 'Off the trail',
  map: 'Switchboard map',
  skip: 'Skip the call — show me the CV',
  skipShort: 'CV',
}

/** /map. */
export const trailMap: TrailMap = {
  kicker: 'Switchboard map · a place to walk, not a page to scroll',
  heading: 'Welcome to the trail.',
  highlight: 'Every stop has a story.',
  sub: 'Eleven stops through one coding-in-nature world. Every stop has its own link — share /trail/penaid and it opens right there.',
  youAreHere: 'You are here',
  startHere: 'Start here',
  resume: 'Pick up where you left off',
  legend: { visited: 'Visited', here: 'You are here', ahead: 'Not yet' },
}
