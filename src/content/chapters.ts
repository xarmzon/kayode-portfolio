import type { Chapter } from './schema'
import type { ChapterSlug } from './slugs'

export const chapters: Chapter[] = [
  {
    slug: 'start',
    number: '00',
    title: 'Dial in',
    world: 'Night forest, fireflies blinking in binary',
    action: 'Press any key or tap; the cursor becomes a plug',
    place: 'Trailhead',
    mapNote: 'Dial in',
    summary: 'Pick up the line and meet the operator.',
  },
  {
    slug: 'roots',
    number: '01',
    title: 'Operator on duty',
    world: 'Root exchange, roots as patch cables',
    action: 'Drag a plug into the board (tap on phones)',
    place: 'Root Exchange',
    mapNote: 'Meet the operator',
    summary: 'Kayode puts businesses on a live line to the people they serve.',
  },
  {
    slug: 'yalo',
    number: '02',
    title: 'Line 01 — YALO',
    world: 'Homes in the canopy',
    action: 'Watch the line go DIALING → RINGING → LIVE',
    place: 'Canopy Homes',
    mapNote: 'YALO',
    summary: 'Full-Stack Lead Developer at YALO since 2025.',
  },
  {
    slug: 'penaid',
    number: '03',
    title: 'Line 02 — Penaid',
    world: 'Old-growth grove with saplings',
    action: 'Scroll; the Penaid tags snap on',
    place: 'Old-Growth Grove',
    mapNote: 'Penaid',
    summary: 'Senior Developer at Penaid since 2023.',
  },
  {
    slug: 'river',
    number: '04',
    title: 'Send a packet',
    world: 'Data river carrying packets',
    action: 'Play the river toy',
    place: 'Data River',
    mapNote: 'Send a packet',
    summary: 'Send a packet from the users to the business.',
  },
  {
    slug: 'seedbed',
    number: '05',
    title: 'Line 03 — Consulting',
    world: 'The seedbed',
    action: 'Scroll; the Cousant work sprouts',
    place: 'The Seedbed',
    mapNote: 'Cousant',
    summary: 'Consultant Software Developer at Cousant, 2026.',
  },
  {
    slug: 'meadow',
    number: '06',
    title: 'The switch room',
    world: 'Language meadow, one flower per language',
    action: 'Pick a language plug',
    place: 'Language Meadow',
    mapNote: 'TS · C# · Go · Deluge',
    summary: 'TypeScript, C#, Go and Deluge, and what each was used for.',
  },
  {
    slug: 'vines',
    number: '07',
    title: 'Patch cables',
    world: 'Vine wall',
    action: "Pull a tool's cable to see where it was used",
    place: 'Vine Wall',
    mapNote: 'The toolkit',
    summary: 'The toolkit, and where each tool was used.',
  },
  {
    slug: 'rings',
    number: '08',
    title: 'The call log',
    world: 'Tree rings, one ring per year',
    action: 'Rewind the years, or open the Career Calendar',
    place: 'Ring Archive',
    mapNote: 'Call log 2017 → 2026',
    summary: 'Every role from 2017 to today.',
  },
  {
    slug: 'clearing',
    number: '09',
    title: 'The classroom',
    world: 'A clearing at dusk, code in the stars',
    action: "Tap the board to change the lesson's language",
    place: 'The Clearing',
    mapNote: 'Teaching',
    summary: 'Teaching programming since 2017.',
  },
  {
    slug: 'summit',
    number: '10',
    title: 'Ring the line',
    world: 'Summit at sunrise with a signal tower',
    action: 'Hold to dial; get your own call log',
    place: 'The Summit',
    mapNote: 'Ring the line',
    summary: 'Got a product that needs a live line?',
  },
]

export function getChapter(slug: ChapterSlug) {
  const chapter = chapters.find((c) => c.slug === slug)
  if (!chapter) throw new Error(`Unknown chapter: ${slug}`)
  return chapter
}

export function chapterPath(slug: ChapterSlug) {
  return slug === 'start' ? '/' : `/trail/${slug}`
}
