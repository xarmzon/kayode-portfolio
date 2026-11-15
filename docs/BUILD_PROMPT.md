# Kayode Portfolio — Build Prompt

2026-11-08 · Adelola Kayode Samson

## How to use this prompt

**Save this doc as docs/BUILD_PROMPT.md at the root of an empty repository and point Claude Code at it one phase at a time (see the last section); review each phase before moving on. The design canvas "Kayode Portfolio" is the visual source of truth; this prompt is the written spec. Deploy target: Cloudflare Workers**.

**Role and goal**

You are a senior front-end engineer and motion designer. Build the personal portfolio of Adelola Kayode Samson ("Kayode", also Rastaxarm), a full-stack lead developer and educator in fintech, based in Ilorin, Nigeria.

The site is not a page to scroll. It is a **journey through one living world, "coding in nature"**, where the visitor is an incoming call and Kayode, the operator, patches them through his career. Every interaction acts out the work: connecting companies to the people they serve. It must feel unique, playful and energising, load fast on a mid-range Android phone, and stay fully usable for a recruiter in a hurry.

Success means:

1. A first-time visitor walks the whole journey and ends on "Ring the line" or "Download CV".
2. A recruiter gets every fact they need in under 60 seconds through the quick version.
3. Every chapter has its own shareable link.
4. Nothing reveals an employer's internal system design (see Confidentiality).

## Tech stack and constraints

Use library primitives directly; never hand-roll what the libraries already provide.

| Area | Use | Notes |
|---|---|---|
| Framework | React 19 + TanStack Start | SSR and prerender every route to static HTML |
| Routing | TanStack Router (file-based, type-safe) | Real paths such as `/trail/penaid`, not hash routes |
| Language | TypeScript, strict mode | No `any` |
| Styling | Tailwind CSS v4 with CSS variables for tokens | Tokens live in one theme file |
| Components | shadcn/ui on Base UI | Dialog, Tabs, Drawer, Tooltip, Toggle and Sheet come from here |
| Motion | Motion (motion.dev) + native CSS scroll-driven animations | GSAP only if a single scene truly needs it |
| Content | Typed TS content files validated with Zod | All copy lives in `src/content/`, none in components |
| Forms | TanStack Form + Zod | Only for the optional "Book a call" form |
| Tests | Vitest + Testing Library; Playwright for key journeys | One check command: types, lint, format, tests, build |
| Hosting | Cloudflare Workers: @cloudflare/vite-plugin + wrangler, prerendered routes served as static assets, custom domain on Cloudflare | No server needed at runtime |

**Hard constraints**

- Self-contained: fonts self-hosted, no third-party trackers, no runtime API calls.
- Total JS on first load at most 150 KB gzipped; the mini-game, river toy and easter egg load only when opened.
- Works without JavaScript as a readable, chaptered page (SSR output).
- Commit messages in Conventional Commits style. Never add a co-author or AI attribution trailer.

## Design system

The look is green, dark-first and nature-meets-code; every colour must pass WCAG AA contrast.

**Colour tokens**

| Token | Hex | Use |
|---|---|---|
| `--ink` | #0E1712 | Text on light, dark surfaces |
| `--paper` | #EEF0E4 | Light surfaces, text on dark |
| `--signal` | #22D46B | Live states, primary actions, the trail cable |
| `--lime` | #C8F25A | Highlights, labels on dark, stamps |
| `--panel` | #18241D | Dark cards and toolbars |
| `--rule` | #2C3B31 | Borders on dark |
| `--muted` | #4F5A50 | Secondary text on light (6.3:1) |
| `--muted-dark` | #9AAA9E | Secondary text on dark (6.6:1) |
| `--alert` | #E35D5D | "Now" markers and the window close button only |

**Type** (uncommon fonts, self-hosted)

- Display: **Tilt Warp**, weight 400, tight tracking (−0.02 to −0.03em).
- Body: **Geologica**, 400 to 700.
- Labels, routes, code: **Martian Mono**, 500 to 600, uppercase labels with 0.1em tracking.
- Fluid sizes with `clamp()`: H1 42–104 px, H2 32–64 px, body 15–17 px.

**Shapes and elevation**

- Corners: 999 px pills, 16–28 px cards and windows.
- Soft elevation only: `0 24px 60px rgba(14,23,18,.18)` and a 2 px contact shadow. **No hard offset shadows and no heavy right or bottom borders.**
- Cards are OS-style windows: three title-bar dots, a title, and the route in the title bar.
- Icons are inline stroke SVGs; no emoji.

**The world**

Eleven flat, layered SVG scenes (sky, far and near layers), with code hidden in the nature. Roots and vines are the patch cables, a data river carries packets, and tree rings count the years. No gradient washes.

## Experience model and routes

There are three ways in: the journey (default), the trail map (jump anywhere), and the 60-second version (recruiters). They share one content source.

**The journey** is eleven chapters, 00 to 10. Each fills the viewport on phones and has one thing to do; doing it lights up the next line. Scrolling always continues: every gate is a soft gate.

**Always on screen** is a call-status bar. It shows "On the line" with a running timer, an 11-segment progress cable, the current chapter, a **Switchboard map** button, and a "Skip the call — show me the CV" link. On phones it collapses to a floating pill.

**The OS layer** is a "KayodeOS" frame used for the map, the calendar and the files:

- Desktop (macOS-style): a menu bar with the call timer, a dock (Trail, Calendar, Files, Terminal, Toolkit, Classroom, Ring, CV), desktop icons for the CV and the company sites, and toast notifications.
- **Career Calendar** app (Google Calendar-style): mini month, colour-coded calendars (YALO, Penaid, Cousant, Teaching, Builds), Day / Week / Month / Year / **Timeline** views. The timeline runs 2017 to today, every role is an event bar, and a red "now" line marks today. Clicking an event opens a popover with the role, years, one line on what Kayode does there, and a link to the company site.
- Phone lock screen (iOS-style): a Dynamic Island "On the line" pill, a big clock, widgets, and one notification per role. "Swipe up to place your call" enters the journey.
- Phone home screen (Android-style): languages as quick-settings tiles, a Today agenda widget, an app grid and a "Search my work" bar.

**Routes**

| Route | Screen |
|---|---|
| `/` | Chapter 00, Dial in (the journey starts here) |
| `/trail/<chapter>` | Each chapter: `start`, `roots`, `yalo`, `penaid`, `river`, `seedbed`, `meadow`, `vines`, `rings`, `clearing`, `summit` |
| `/map` | Trail map with "You are here" and visited stops |
| `/calendar` | Career Calendar (timeline view by default) |
| `/quick` | The 60-second version |
| `/cv` | Downloads `cv.pdf` |

Remember visited chapters in `localStorage` (wrapped in try/catch) so the map stays lit and returning visitors resume where they left off.

## Chapters and content

Each chapter pairs one world, one action and one block of content. Use the copy below as written.

| # | Chapter | World (background) | The visitor does |
|---|---|---|---|
| 00 | Dial in | Night forest, fireflies blinking in binary | Presses any key or taps; the cursor becomes a plug |
| 01 | Operator on duty | Root exchange, roots as patch cables | Drags a plug into the board (tap on phones) |
| 02 | Line 01 — YALO | Homes in the canopy | Watches the line go DIALING → RINGING → LIVE |
| 03 | Line 02 — Penaid | Old-growth grove with saplings | Scrolls; the Penaid tags snap on |
| 04 | Send a packet (interlude) | Data river carrying packets | Plays the river toy |
| 05 | Line 03 — Consulting | The seedbed | Scrolls; the Cousant work sprouts |
| 06 | The switch room | Language meadow, one flower per language | Picks a language plug |
| 07 | Patch cables | Vine wall | Pulls a tool's cable to see where it was used |
| 08 | The call log | Tree rings, one ring per year | Rewinds the years, or opens the Career Calendar |
| 09 | The classroom | A clearing at dusk, code in the stars | Taps the board to change the lesson's language |
| 10 | Ring the line | Summit at sunrise with a signal tower | Holds to dial; gets their own call log |

**00 – 01 · Intro and hero**

- Kicker: "Hi, I'm Kayode Samson Adelola — Rastaxarm on the wire. Full-stack lead developer in fintech."
- H1: "I put businesses on a **live line** to the people they serve."
- Sub: "I build the Go, C# and Node services and the Angular and React screens on top of them — so every request, payment and notification actually gets through."
- Actions: "Walk the trail" and "Grab the CV".

**02 · YALO** (Line 01, since 2025, Full-Stack Lead Developer, links to yalo.ng)

- Kicker: "Connecting YALO → renters and their employers."
- Heading: "Keeping YALO on a live line with every renter it houses."
- Body: "As lead developer, I own YALO's backend and frontend end to end — the services and APIs, the customer dashboards, the admin portals and the employee marketplace — plus the team's Zoho CRM widget platform."
- Tags: Angular, React 19, C# · ASP.NET Core, TypeScript, Zoho CRM + Deluge, AWS.

**03 · Penaid** (Line 02, since 2023, Senior Developer, links to penaid.co)

- Heading: "Putting Penaid on a direct line to every pensioner and student it backs."
- Body: "Full-stack across the platform: high-performance services and APIs built for speed and concurrency, wired to frontends I take from Figma to production."
- Tags: Go, Angular, React, TypeScript, REST APIs, AWS, Zoho Desk. Action: "Visit penaid.co".

**05 · Cousant** (Line 03, 2026, Consultant Software Developer)

- Heading: "Planting products for Cousant's clients."
- Body: "The admin dashboard behind Fundron (link Fundron to https://fundtronpartners.com/) — and the front end of a Zoho Sigma extension for a cooperative savings platform." Kayode works on the admin side only, never the public site. No action button.

**06 · The switch room: four languages and what each was used for**

- **TypeScript** (Penaid · YALO · Cousant): Node.js and Express services on AWS; Angular, React and TanStack frontends; Zoho CRM widgets and their Deluge functions; real-time WebSocket notifications at Penaid.
- **C#** (YALO): backend services and APIs in ASP.NET Core and EF Core; CRM-as-code tooling that provisions Zoho CRM from version control; manager-based services over a DDD domain model.
- **Go** (Penaid): API services and backend; concurrent request handling with typed contracts; lean services that keep infrastructure small.
- **Deluge** (YALO · Cousant): Zoho CRM functions and workflow automation; server-side functions that power the CRM widgets; logic behind installable Zoho CRM extensions.
- Each card types a one-line "ring the line" snippet in its own syntax.

**07 · Patch cables: the toolkit, each with its use**

- React (component UIs), TanStack Start (SSR apps), Next.js (fast company sites and portals), Vite (instant dev, lean builds), TanStack Router (type-safe routes, the backbone of the Fundron admin), TanStack Query (server state), TanStack Form (type-safe forms), TanStack Table (headless data grids), Zod (one schema for forms and API parsing), shadcn/ui (accessible components owned in the codebase), Tailwind CSS, Angular (signals-based dashboards), **PrimeNG as its own item, not merged with Angular**.
- Chip rows: Backend (Node.js, Express, ASP.NET Core, EF Core, Go); Cloud (AWS Lambda, SQS · SNS, API Gateway, S3, Serverless, Docker · Nginx); Data (MongoDB, PostgreSQL, SQL Server, Redis); Zoho (CRM, Sigma · ZET, CRM Widgets, WorkDrive, Books, Desk as separate chips).

**08 · The call log** (newest first; years only)

| Year | Where | Role | One line |
|---|---|---|---|
| 2026 | Cousant Limited | Consultant Software Developer | Fundron admin frontend and a Zoho Sigma extension |
| 2025 | YALO | Full-Stack Lead Developer | Backend and frontend end to end |
| 2023 | Penaid | Senior Developer | Full-stack across the platform |
| 2023 | Cousant Limited | Consultant Software Developer | Client and admin portals in React and Next.js — 30+ components, 90+ pages |
| 2022 | Cousant Limited | Consultant (contract) | APIs and admin systems with React, Express and MongoDB on Docker and Nginx |
| 2022 | Mayovest | Website Developer · Web Development Trainer | Built mayovest.com on WordPress; teaches HTML, CSS, JavaScript and React |
| 2021 | Naurix Limited | Full-Stack Web Developer | Company site in Next.js — 11 pages, 33 components, on Vercel |
| 2019 | University of Ilorin | Full-Stack Web Developer | A digital election platform used across faculties, plus a web CBT exam system |
| 2017 | University of Ilorin | Programming Trainer | Taught C/C++, Fortran, LaTeX and web development, 2017–2021 |

**09 · The classroom**

- University of Ilorin, 2017–2021: taught students to program (C/C++, Fortran, LaTeX, web development).
- Mayovest, since 2022: built mayovest.com on WordPress; teaches HTML, CSS, JavaScript and React to build interactive websites and apps.
- Field manuals: self-contained, single-file HTML developer books.
- Foundation: B.Sc. Mathematics, University of Ilorin, 2021.
- No conference-talks card.

**10 · Ring the line**

- Heading: "Got a product that needs a live line?"
- Email xarmzon@gmail.com; buttons labelled just "GitHub" (github.com/xarmzon) and "LinkedIn" (linkedin.com/in/rastaxarm); "Download CV".
- The finale card is the visitor's own call log: lines connected, packets sent, languages spoken, chapters visited, with "Ring the line", "Download CV" and "Replay".

## Motion and interaction

Motion should be basic but mouthwatering: every effect acts out the story, runs at 60 fps on a mid-range Android, and has a calm alternative.

| Moment | Desktop | Phone | Calm mode (reduced motion) |
|---|---|---|---|
| World backdrop | 3 parallax layers; cross-fades into the next world | 2 layers, no parallax on low power | Still image per chapter |
| Operator boot (00) | Jacks light up, KAYODE types in, optional dial tone (muted by default); max 1.2 s, once per session | Same, shorter | Show the hero at once |
| Patch the line (01) | Drag a plug into "Their users"; the cable goes live and the page glides on | Tap a jack to auto-patch | Cables already connected |
| One cable down the page | A live cable draws as you scroll and clicks into each section jack; it is the progress bar | A thin rail on the left edge | Static rail, filled by section |
| Lines connecting (02–05) | Window dials in: DIALING → RINGING → LIVE, cable draws to the users | Triggers at 40% in view, once | Appear already LIVE |
| River toy (04) | A packet rides the river from users to a business and lands on the far bank. Labels: USERS · ··· · ··· · BUSINESS | Vertical pipeline, big tap target | Step-by-step with a Next button |
| Language plugs (06) | Momentum slider; the active card types its snippet | Native swipe with scroll-snap | Snippets shown in full |
| Where I used it (07) | Hover a tool; cables snap out to the jobs | Tap a tool to reveal the jobs | Jobs always visible |
| Call log (08) | Split-flap years flip 2026 → 2017 | Fewer flips | Years shown at once |
| Classroom (09) | "Hello, line" written in C, Fortran, LaTeX, then HTML | Plays in view; tap to replay | All lines at once |
| Hold to dial (10) | Press and hold: a rotary ring fills, then email opens; release early and it spins back | Short vibration where supported; a plain email link beside it | Plain button |
| "Kayode is calling…" | Type "ring" or idle; an incoming-call card slides in (Accept / Decline) | Shake or long-press the logo | Off |
| Switchboard Rush | Optional 30-second game: patch calls to the right line; score and share card | Tap to patch; lazy-loaded | Not offered |
| Plug cursor | Cursor becomes a plug near clickables; buttons lean in magnetically | Disabled on touch | System cursor |

Animate `transform` and `opacity` only; never animate layout.

## Confidentiality and copy rules

Describe outcomes and approach, never an employer's internal system.

- **Never write:** internal service or queue names, trigger rules, schedules or times of day, API budgets or credit numbers, infrastructure counts (repos, functions, bundles), excluded data fields, exact record counts, internal IDs, URLs, credentials or customer data.
- **Fine to write:** employer names and their public sites, job titles, years, public tech stacks.
- Name employers (YALO, Penaid, Cousant, Mayovest). Never name the cooperative client; call it "a cooperative savings platform".
- No case studies or project write-ups. Say where Kayode works and what he does there; the CV carries the detail.
- Titles exactly: Full-Stack Lead Developer (YALO), Senior Developer (Penaid), Consultant Software Developer (Cousant), Website Developer · Web Development Trainer (Mayovest).
- Dates show the start year only, except University of Ilorin teaching (2017–2021).
- Voice: short, energetic sentences; the switchboard and nature metaphors in headings, plain facts in body text.

## Performance, accessibility and mobile

Design for a mid-range Android on a 4G connection first, then scale up.

- **Budgets:** LCP under 2.0 s on 4G; CLS under 0.05; first-load JS at most 150 KB gzipped; each world scene under 25 KB as inline SVG.
- **Lazy loading:** game, river toy, easter egg and calendar views load on demand. The intro never blocks LCP.
- **Phones:** one scene per viewport with snap; tap targets at least 44 px; nothing important hidden behind hover; a 16 px side gutter; no horizontal page scroll.
- **Reduced motion:** honour `prefers-reduced-motion` everywhere using the calm-mode column above.
- **Accessibility:** real `<a>` and `<button>` elements; visible focus rings; skip link to content; `aria-label` on icon buttons; decorative SVGs `aria-hidden`; text contrast at least 4.5:1; every toy has a keyboard path.
- **SEO:** prerendered HTML per route, meta and Open Graph tags per chapter, and a generated share image per route.
- **Storage:** `localStorage` only for visited chapters and the resume point, always inside try/catch; the site works without it.

## Build order and acceptance

Build in five phases and stop for review after each one.

1. **Foundation:** scaffold TanStack Start for Cloudflare (`npm create cloudflare@latest -- kayode-portfolio --framework=tanstack-start`, or add `@cloudflare/vite-plugin` and `wrangler.jsonc` by hand), Tailwind tokens, fonts, shadcn/ui on Base UI, Zod content schema, and all copy in `src/content/`. Turn on prerendering (`tanstackStart({ prerender: { enabled: true } })`) so every route ships as static HTML, and add `npm run deploy` (`vite build && wrangler deploy`).
2. **The world:** the eleven SVG scenes, the parallax layers, the call-status bar, the trail map and "You are here".
3. **Chapters**: OS-style line windows, the Career Calendar timeline, the lock-screen and home-screen frames, and the 60-second page.
4. **Motion:** the motion table in priority order (boot, patch, cable rail, line dial-in, river toy, hold to dial), then the extras (easter egg, Switchboard Rush, plug cursor).
5. **Polish:** performance budgets, accessibility pass, share images, and `cv.pdf` in `/public`.

**Deliverables:** the repository, a README (setup, scripts, where content lives, how to add a chapter, how to deploy), and a live preview on Cloudflare (*.workers.dev) before the custom domain is attached.

**Acceptance checklist**

- [ ] Every route in the routes table loads directly and has its own title and share image.
- [ ] The journey can be completed by keyboard only.
- [ ] With reduced motion on, every chapter is readable with no movement.
- [ ] `/quick` shows roles, stack, location, availability, one line per job (where and what) and the CV link above the fold on a phone.
- [ ] Lighthouse mobile: Performance 90 or more, Accessibility 100.
- [ ] No text breaks a rule in Confidentiality and copy rules.
- [ ] Links: yalo.ng, penaid.co, mayovest.com, github.com/xarmzon, linkedin.com/in/rastaxarm, mailto:xarmzon@gmail.com.
- [ ] Availability line on `/quick`: [YOUR AVAILABILITY].
- [ ] Domain chosen (shortlist: kayode.dev, rastaxarm.dev, kayodeadelola.dev, xarmzon.dev, kayode.com.ng).
