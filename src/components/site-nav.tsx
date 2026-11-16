import { Link } from '@tanstack/react-router'
import { site } from '@/content'

/**
 * Brand and secondary links. The call-status bar carries the map and CV.
 */
export function SiteNav() {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 gutter py-4">
      <Link to="/" className="font-display text-lg tracking-tight">
        {site.shortName.toUpperCase()}
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-2 label">
        <Link to="/calendar" className="py-3 hover:text-lime">
          Calendar
        </Link>
        <Link to="/quick" className="py-3 hover:text-lime">
          60-second version
        </Link>
      </nav>
    </header>
  )
}
