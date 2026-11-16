import { useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { chapters, getChapter, isChapterSlug, site, statusBar, type ChapterSlug } from '@/content'
import { formatDuration, useCallSeconds } from '@/lib/call-timer'
import { markVisited, useVisited } from '@/lib/visited'
import { cn } from '@/lib/utils'

/** The chapter for the current path, or null off the trail (/map, /quick…). */
function useCurrentChapter(): ChapterSlug | null {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  if (pathname === '/') return 'start'
  const match = /^\/trail\/([^/]+)\/?$/.exec(pathname)
  return match?.[1] && isChapterSlug(match[1]) ? match[1] : null
}

/**
 * Always on screen: "On the line" with a running timer, the 11-segment
 * progress cable, the current chapter, the Switchboard map button and the
 * skip-to-CV link. Phones get a floating pill at the bottom.
 */
export function CallStatusBar() {
  const current = useCurrentChapter()
  const visited = useVisited()
  const seconds = useCallSeconds()

  useEffect(() => {
    if (current) markVisited(current)
  }, [current])

  const chapter = current ? getChapter(current) : null
  const time = formatDuration(seconds)
  const last = chapters.at(-1)?.number ?? '10'

  return (
    <div
      role="region"
      aria-label="Call status"
      className={cn(
        'fixed z-40 flex items-center rounded-pill bg-ink text-paper shadow-window ring-1 ring-rule',
        // Phone: floating pill at the bottom.
        'inset-x-4 bottom-4 gap-3 py-1.5 pr-1.5 pl-4',
        // Desktop: full bar at the top.
        'md:inset-x-auto md:top-4 md:bottom-auto md:left-1/2 md:w-[min(64rem,calc(100%-4rem))] md:-translate-x-1/2 md:gap-4 md:py-2.5 md:pr-3 md:pl-5',
      )}
    >
      <p className="flex shrink-0 items-center gap-2 label">
        <LiveDot />
        <span className="sr-only sm:not-sr-only">{statusBar.live} ·</span>
        <span className="tabular-nums">{time}</span>
      </p>

      <ProgressCable current={current} visited={visited} />

      <p className="min-w-0 flex-1 truncate label text-lime md:flex-none">
        {chapter ? (
          <>
            {statusBar.chapterLabel} {chapter.number}
            <span className="hidden lg:inline">
              {' '}
              / {last} · {chapter.title}
            </span>
          </>
        ) : (
          statusBar.offTrail
        )}
      </p>

      <a
        href={site.cvPath}
        className="hidden shrink-0 py-3 label text-muted-dark underline-offset-4 hover:text-paper hover:underline xl:inline"
      >
        {statusBar.skip}
      </a>

      <Link
        to="/map"
        className="inline-flex min-h-11 shrink-0 items-center rounded-pill border-[1.5px] border-rule bg-panel px-4 label hover:border-lime"
      >
        <span className="hidden sm:inline">{statusBar.map}</span>
        <span className="sm:hidden">Map</span>
      </Link>

      <a
        href={site.cvPath}
        aria-label={statusBar.skip}
        className="inline-flex min-h-11 shrink-0 items-center rounded-pill bg-lime px-4 label text-ink xl:hidden"
      >
        {statusBar.skipShort}
      </a>
    </div>
  )
}

function LiveDot() {
  return (
    <span aria-hidden="true" className="relative flex size-2.5">
      <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
      <span className="relative size-2.5 rounded-full bg-signal" />
    </span>
  )
}

function ProgressCable({
  current,
  visited,
}: {
  current: ChapterSlug | null
  visited: readonly ChapterSlug[]
}) {
  const reached = new Set(visited)
  return (
    <ol
      aria-label={`${reached.size} of ${chapters.length} chapters visited`}
      className="hidden flex-1 items-center gap-1.5 md:flex"
    >
      {chapters.map((c) => {
        const state = c.slug === current ? 'current' : reached.has(c.slug) ? 'visited' : 'ahead'
        return (
          <li
            key={c.slug}
            title={`${c.number} ${c.title}`}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors duration-500',
              state === 'current' && 'bg-lime',
              state === 'visited' && 'bg-signal',
              state === 'ahead' && 'bg-rule',
            )}
          >
            <span className="sr-only">
              {c.number} {c.title}: {state}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
