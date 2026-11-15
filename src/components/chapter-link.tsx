import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { ChapterSlug } from '@/content'

type Props = { slug: ChapterSlug; className?: string; children: ReactNode }

/** Typed link to a chapter: `/` for the start, `/trail/<slug>` for the rest. */
export function ChapterLink({ slug, className, children }: Props) {
  if (slug === 'start') {
    return (
      <Link to="/" className={className}>
        {children}
      </Link>
    )
  }
  return (
    <Link to="/trail/$chapter" params={{ chapter: slug }} className={className}>
      {children}
    </Link>
  )
}
