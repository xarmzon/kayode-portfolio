import { createFileRoute } from '@tanstack/react-router'
import { callLog } from '@/content'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/calendar')({
  head: () =>
    seo({
      title: 'Career Calendar',
      description: 'Every role from 2017 to today on one timeline.',
      path: '/calendar',
    }),
  component: CareerCalendar,
})

/** Phase 1 list version. Phase 3 builds the KayodeOS Career Calendar app. */
function CareerCalendar() {
  return (
    <main id="content" className="mx-auto max-w-4xl gutter py-12 md:py-20">
      <p className="label text-lime">Career Calendar · timeline</p>
      <h1 className="mt-3 font-display text-h2">2017 to today.</h1>
      <ol className="mt-10 space-y-4">
        {callLog.map((e) => (
          <li key={`${e.year}-${e.where}-${e.role}`} className="rounded-lg bg-panel p-4">
            <span className="font-mono text-lime">{e.year}</span> · <strong>{e.where}</strong> ·{' '}
            {e.role}
          </li>
        ))}
      </ol>
    </main>
  )
}
