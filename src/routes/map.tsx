import { createFileRoute } from '@tanstack/react-router'
import { chapters } from '@/content'
import { ChapterLink } from '@/components/chapter-link'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/map')({
  head: () =>
    seo({ title: 'Trail map', description: 'Jump to any stop on the trail.', path: '/map' }),
  component: TrailMap,
})

/** Phase 1 list version. Phase 2 draws the map with "You are here" and visited stops. */
function TrailMap() {
  return (
    <main id="content" className="mx-auto max-w-4xl gutter py-12 md:py-20">
      <p className="label text-lime">Switchboard map</p>
      <h1 className="mt-3 font-display text-h2">Jump to any line.</h1>
      <ol className="mt-10 grid gap-3 sm:grid-cols-2">
        {chapters.map((c) => (
          <li key={c.slug}>
            <ChapterLink
              slug={c.slug}
              className="flex min-h-11 flex-col rounded-lg bg-panel p-4 hover:outline hover:outline-lime"
            >
              <span className="label text-muted-dark">{c.number}</span>
              <span className="font-semibold">{c.title}</span>
              <span className="text-sm text-muted-dark">{c.summary}</span>
            </ChapterLink>
          </li>
        ))}
      </ol>
    </main>
  )
}
