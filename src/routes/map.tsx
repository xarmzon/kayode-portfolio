import { createFileRoute } from '@tanstack/react-router'
import { trailMap } from '@/content'
import { TrailMap } from '@/components/trail-map'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/map')({
  head: () => seo({ title: 'Switchboard map', description: trailMap.sub, path: '/map' }),
  component: MapPage,
})

function MapPage() {
  return (
    <main id="content" className="mx-auto max-w-6xl gutter py-8 md:py-12">
      <p className="label text-muted-dark">{trailMap.kicker}</p>
      <h1 className="mt-3 max-w-4xl font-display text-h2">
        {trailMap.heading}{' '}
        <span className="inline-block -rotate-[1.5deg] rounded-md bg-lime px-3 text-ink">
          {trailMap.highlight}
        </span>
      </h1>
      <p className="mt-4 max-w-3xl text-muted-dark">{trailMap.sub}</p>
      <TrailMap />
    </main>
  )
}
