import { createFileRoute } from '@tanstack/react-router'
import { callLog, languages, site } from '@/content'
import { Button } from '@/components/ui/button'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/quick')({
  head: () =>
    seo({
      title: 'The 60-second version',
      description: `${site.role}, ${site.location}. Roles, stack and CV in one screen.`,
      path: '/quick',
    }),
  component: Quick,
})

function Quick() {
  return (
    <main id="content" className="mx-auto max-w-4xl gutter py-8 md:py-16">
      <p className="label text-lime">The 60-second version</p>
      <h1 className="mt-2 font-display text-h2">{site.name}</h1>
      <p className="mt-2">
        {site.role} · {site.location}
      </p>
      <p className="mt-1 text-muted-dark">Availability: {site.availability}</p>
      <p className="mt-1 text-muted-dark">Stack: {languages.map((l) => l.name).join(' · ')}</p>
      <Button
        size="lg"
        variant="secondary"
        className="mt-5 min-h-11 rounded-pill px-6"
        render={<a href={site.cvPath} />}
      >
        Download CV
      </Button>
      <ul className="mt-8 space-y-3">
        {callLog.map((e) => (
          <li key={`${e.year}-${e.where}-${e.role}`}>
            <span className="font-mono text-lime">{e.year}</span> <strong>{e.where}</strong> —{' '}
            {e.role}. <span className="text-muted-dark">{e.line}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
