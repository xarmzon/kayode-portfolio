import { Link } from '@tanstack/react-router'
import { site } from '@/content'

/**
 * Phase 1 placeholder navigation. Phase 2 replaces it with the call-status bar.
 */
export function SiteNav() {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 gutter py-4">
      <Link to="/" className="font-display text-lg tracking-tight">
        {site.shortName.toUpperCase()}
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-2 label">
        <Link to="/map" className="py-3 hover:text-lime">
          Map
        </Link>
        <Link to="/calendar" className="py-3 hover:text-lime">
          Calendar
        </Link>
        <Link to="/quick" className="py-3 hover:text-lime">
          60-second version
        </Link>
        <a href={site.cvPath} className="py-3 hover:text-lime">
          CV
        </a>
      </nav>
    </header>
  )
}
