import { useSyncExternalStore } from 'react'
import { isChapterSlug, type ChapterSlug } from '@/content'

/*
 * Visited chapters and the resume point, kept in localStorage so the map stays
 * lit and returning visitors resume where they left off. Every access is
 * wrapped in try/catch; the site works the same without storage.
 */

const KEY = 'kayode:visited'
const EMPTY: readonly ChapterSlug[] = []

let cache: readonly ChapterSlug[] | null = null
const listeners = new Set<() => void>()

function read(): readonly ChapterSlug[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((s): s is ChapterSlug => typeof s === 'string' && isChapterSlug(s))
      : EMPTY
  } catch {
    return EMPTY
  }
}

function getSnapshot() {
  cache ??= read()
  return cache
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Records a visit. The last slug in the list is the resume point. */
export function markVisited(slug: ChapterSlug) {
  const current = getSnapshot()
  if (current.at(-1) === slug) return
  cache = [...current.filter((s) => s !== slug), slug]
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {
    // Storage unavailable (private mode, blocked); keep the in-memory copy.
  }
  listeners.forEach((l) => l())
}

/** Visited chapters, oldest first. Empty during SSR and the first client render. */
export function useVisited() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}
