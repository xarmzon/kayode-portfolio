import { chapters, trailMap, type Chapter, type ChapterSlug } from '@/content'
import { ChapterLink } from '@/components/chapter-link'
import { worldSky } from '@/components/world/palette'
import { useVisited } from '@/lib/visited'
import { cn } from '@/lib/utils'

/** Map canvas size and each stop's position on it, from the design canvas. */
const W = 1328
const H = 760
const stops: Record<ChapterSlug, { x: number; y: number }> = {
  start: { x: 70, y: 600 },
  roots: { x: 250, y: 470 },
  yalo: { x: 170, y: 250 },
  penaid: { x: 400, y: 120 },
  river: { x: 560, y: 330 },
  seedbed: { x: 720, y: 560 },
  meadow: { x: 880, y: 380 },
  vines: { x: 820, y: 130 },
  rings: { x: 1040, y: 200 },
  clearing: { x: 1100, y: 470 },
  summit: { x: 1210, y: 640 },
}

/** The trail from the first stop through the first `count` stops: one S-curve per leg. */
export function trailPath(count = chapters.length) {
  const points = chapters.slice(0, count).map((c) => stops[c.slug])
  const [first, ...rest] = points
  if (!first) return ''
  let d = `M${first.x} ${first.y}`
  let prev = first
  for (const p of rest) {
    const midX = (prev.x + p.x) / 2
    const midY = (prev.y + p.y) / 2
    d += ` Q ${prev.x} ${midY} ${midX} ${midY} T ${p.x} ${p.y}`
    prev = p
  }
  return d
}

type StopState = 'here' | 'visited' | 'ahead'

function useStopStates() {
  const visited = useVisited()
  const here = visited.at(-1) ?? null
  const seen = new Set(visited)
  const furthest = Math.max(-1, ...chapters.map((c, i) => (seen.has(c.slug) ? i : -1)))
  const state = (slug: ChapterSlug): StopState =>
    slug === here ? 'here' : seen.has(slug) ? 'visited' : 'ahead'
  return { here, state, furthest }
}

/** The Switchboard map: every stop, "You are here" and the stops already visited. */
export function TrailMap() {
  const { here, state, furthest } = useStopStates()
  const resume = here ? chapters.find((c) => c.slug === here) : undefined

  return (
    <>
      {resume && (
        <p className="mt-6">
          <span className="label text-muted-dark">{trailMap.resume}: </span>
          <ChapterLink slug={resume.slug} className="font-semibold text-lime underline">
            {resume.number} {resume.title}
          </ChapterLink>
        </p>
      )}

      {/* Desktop and tablet: the drawn map. */}
      <div
        className="relative mt-8 hidden overflow-hidden rounded-xl border-2 border-ink bg-[#E4EAD8] text-ink md:block"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <MapBackdrop />
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <path
            d={trailPath()}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeDasharray="2 12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {furthest > 0 && (
            <path
              d={trailPath(furthest + 1)}
              fill="none"
              stroke="var(--signal)"
              strokeWidth="8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
        <ol>
          {chapters.map((c) => (
            <li
              key={c.slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(stops[c.slug].x / W) * 100}%`,
                top: `${(stops[c.slug].y / H) * 100}%`,
              }}
            >
              <MapStop chapter={c} state={state(c.slug)} />
            </li>
          ))}
        </ol>
        {!here && (
          <p
            className="absolute rounded-pill bg-ink px-2 py-1 label text-lime"
            style={{
              left: `${(stops.start.x / W) * 100}%`,
              top: `calc(${(stops.start.y / H) * 100}% + 3.5rem)`,
            }}
          >
            {trailMap.startHere}
          </p>
        )}
      </div>

      {/* Phones: the same trail as a vertical list. */}
      <ol className="relative mt-8 space-y-2 md:hidden">
        {chapters.map((c) => {
          const s = state(c.slug)
          return (
            <li key={c.slug}>
              <ChapterLink
                slug={c.slug}
                className={cn(
                  'flex min-h-14 items-center gap-4 rounded-lg border-[1.5px] p-3',
                  s === 'here' ? 'border-lime bg-panel' : 'border-rule',
                )}
              >
                <StopBadge chapter={c} state={s} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{c.place}</span>
                  <span className="block label text-muted-dark">{c.mapNote}</span>
                </span>
                {s === 'here' && <span className="label text-lime">● {trailMap.youAreHere}</span>}
              </ChapterLink>
            </li>
          )
        })}
      </ol>

      <Legend />
    </>
  )
}

function MapStop({ chapter, state }: { chapter: Chapter; state: StopState }) {
  return (
    <ChapterLink
      slug={chapter.slug}
      className="group flex flex-col items-center gap-1.5 rounded-xl focus-visible:outline-ink"
    >
      <span className="relative">
        <span
          className={cn(
            'block size-12 rounded-full border-[3px] border-ink shadow-[0_0_0_4px_var(--paper)] transition-transform group-hover:scale-110 lg:size-16',
            state === 'ahead' && 'opacity-60 saturate-50',
          )}
          style={{ backgroundColor: worldSky[chapter.slug] }}
          aria-hidden="true"
        />
        <span className="absolute -top-2 -right-2">
          <StopBadge chapter={chapter} state={state} />
        </span>
      </span>
      <span className="hidden rounded-md border-2 border-ink bg-paper px-2.5 py-1 text-center shadow-window lg:block">
        <span className="block text-sm font-bold whitespace-nowrap">{chapter.place}</span>
        <span className="block label whitespace-nowrap text-muted-ink">{chapter.mapNote}</span>
      </span>
      <span className="sr-only lg:hidden">
        {chapter.place}, {chapter.mapNote}
      </span>
      {state === 'here' && (
        <span className="rounded-pill bg-ink px-2 py-1 label whitespace-nowrap text-lime">
          ● {trailMap.youAreHere}
        </span>
      )}
      {state === 'visited' && <span className="sr-only">({trailMap.legend.visited})</span>}
    </ChapterLink>
  )
}

function StopBadge({ chapter, state }: { chapter: Chapter; state: StopState }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-sm text-ink',
        state === 'here' && 'bg-lime',
        state === 'visited' && 'bg-signal',
        state === 'ahead' && 'bg-paper',
      )}
    >
      {chapter.number}
    </span>
  )
}

function Legend() {
  const items = [
    { label: trailMap.legend.visited, className: 'bg-signal' },
    { label: trailMap.legend.here, className: 'bg-lime' },
    { label: trailMap.legend.ahead, className: 'bg-paper' },
  ]
  return (
    <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 label text-muted-dark">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2">
          <span className={cn('size-3 rounded-full border border-ink', i.className)} />
          {i.label}
        </li>
      ))}
    </ul>
  )
}

/** Contour lines, a stream and code hidden in the landscape. Decorative only. */
function MapBackdrop() {
  const contours = [
    { cx: 330, cy: 260, r: 60 },
    { cx: 980, cy: 300, r: 70 },
    { cx: 700, cy: 640, r: 50 },
  ]
  const notes = [
    { x: 980, y: 90, text: 'if (curious) walk();' },
    { x: 60, y: 730, text: '// start here' },
    { x: 1060, y: 740, text: 'return ring();' },
    { x: 640, y: 470, text: 'queue.push(leaf)' },
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      {contours.flatMap(({ cx, cy, r }) =>
        [1, 1.6, 2.2, 2.8].map((k) => (
          <ellipse
            key={`${cx}-${k}`}
            cx={cx}
            cy={cy}
            rx={r * k}
            ry={r * k * 0.6}
            fill="none"
            stroke="#C9D2BD"
            strokeWidth="1.5"
          />
        )),
      )}
      <path
        d="M460 0 C 520 120, 470 220, 590 320 S 640 470, 560 760"
        fill="none"
        stroke="#9FD8B6"
        strokeWidth="26"
        strokeLinecap="round"
        opacity="0.7"
      />
      {notes.map((n) => (
        <text
          key={n.text}
          x={n.x}
          y={n.y}
          fill="#A9B5A8"
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight="600"
        >
          {n.text}
        </text>
      ))}
    </svg>
  )
}
