import { Link } from '@tanstack/react-router'
import {
  callLog,
  chapters,
  chipRows,
  classroom,
  fundron,
  hero,
  languages,
  lines,
  ring,
  site,
  tools,
  type Chapter,
  type Line,
} from '@/content'
import { Button } from '@/components/ui/button'
import { ChapterLink } from '@/components/chapter-link'

/**
 * Phase 1: a plain, readable rendering of each chapter straight from content.
 * This is also the no-JavaScript fallback. Worlds and motion arrive in later phases.
 */
export function ChapterPage({ chapter }: { chapter: Chapter }) {
  const index = chapters.indexOf(chapter)
  const prev = chapters[index - 1]
  const next = chapters[index + 1]

  return (
    <main id="content" className="mx-auto max-w-4xl gutter py-12 md:py-20">
      <p className="label text-lime">
        Chapter {chapter.number} · {chapter.title}
      </p>
      <ChapterBody chapter={chapter} />
      <nav aria-label="Chapters" className="mt-16 flex justify-between gap-4 label">
        {prev ? (
          <ChapterLink slug={prev.slug} className="py-3 hover:text-lime">
            ← {prev.number} {prev.title}
          </ChapterLink>
        ) : (
          <span />
        )}
        {next && (
          <ChapterLink slug={next.slug} className="py-3 text-right hover:text-lime">
            {next.number} {next.title} →
          </ChapterLink>
        )}
      </nav>
    </main>
  )
}

function ChapterBody({ chapter }: { chapter: Chapter }) {
  switch (chapter.slug) {
    case 'start':
    case 'roots':
      return (
        <section className="mt-4">
          <p className="max-w-2xl text-muted-dark">{hero.kicker}</p>
          <h1 className="mt-4 font-display text-h1">{hero.heading}</h1>
          <p className="mt-6 max-w-2xl">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="min-h-11 rounded-pill px-6"
              render={<Link to="/trail/$chapter" params={{ chapter: 'roots' }} />}
            >
              {hero.actions.primary}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="min-h-11 rounded-pill px-6"
              render={<a href={site.cvPath} />}
            >
              {hero.actions.secondary}
            </Button>
          </div>
        </section>
      )
    case 'yalo':
    case 'penaid':
    case 'seedbed': {
      const line = lines.find((l) => l.chapter === chapter.slug)
      return line ? <LineSection line={line} /> : null
    }
    case 'river':
      return (
        <section className="mt-4">
          <h1 className="font-display text-h2">{chapter.title}</h1>
          <p className="mt-4 label text-muted-dark">USERS · ··· · ··· · BUSINESS</p>
        </section>
      )
    case 'meadow':
      return (
        <section className="mt-4">
          <h1 className="font-display text-h2">Four languages, and what each was used for.</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {languages.map((lang) => (
              <article key={lang.name} className="min-w-0 rounded-xl bg-panel p-6 shadow-window">
                <h2 className="font-display text-2xl">{lang.name}</h2>
                <p className="mt-1 label text-muted-dark">{lang.usedAt.join(' · ')}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5">
                  {lang.uses.map((use) => (
                    <li key={use}>{use}</li>
                  ))}
                </ul>
                <pre className="mt-4 overflow-x-auto font-mono text-sm text-lime">
                  <code>{lang.snippet}</code>
                </pre>
              </article>
            ))}
          </div>
        </section>
      )
    case 'vines':
      return (
        <section className="mt-4">
          <h1 className="font-display text-h2">The toolkit, each with its use.</h1>
          <dl className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <div key={tool.name}>
                <dt className="font-semibold">{tool.name}</dt>
                <dd className="text-muted-dark">{tool.use}</dd>
              </div>
            ))}
          </dl>
          {chipRows.map((row) => (
            <div key={row.label} className="mt-6">
              <h2 className="label text-lime">{row.label}</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {row.chips.map((chip) => (
                  <li key={chip} className="rounded-pill border px-3 py-1 text-sm">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )
    case 'rings':
      return (
        <section className="mt-4">
          <h1 className="font-display text-h2">{chapter.title}</h1>
          <ol className="mt-8 space-y-5">
            {callLog.map((entry) => (
              <li
                key={`${entry.year}-${entry.where}-${entry.role}`}
                className="grid gap-1 sm:grid-cols-[5rem_1fr]"
              >
                <span className="font-mono text-lime">{entry.year}</span>
                <span>
                  <strong>{entry.where}</strong> · {entry.role}
                  <br />
                  <span className="text-muted-dark">{entry.line}</span>
                </span>
              </li>
            ))}
          </ol>
          <Link to="/calendar" className="mt-8 inline-block py-3 underline">
            Open the Career Calendar
          </Link>
        </section>
      )
    case 'clearing':
      return (
        <section className="mt-4">
          <h1 className="font-display text-h2">{classroom.heading}</h1>
          <ul className="mt-8 space-y-5">
            {classroom.items.map((item) => (
              <li key={item.title}>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-muted-dark">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6">Foundation: {classroom.foundation}</p>
        </section>
      )
    case 'summit':
      return (
        <section className="mt-4">
          <h1 className="font-display text-h2">{ring.heading}</h1>
          <p className="mt-4">
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="min-h-11 rounded-pill px-6"
              render={<a href={`mailto:${site.email}`} />}
            >
              {ring.actions.ring}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="min-h-11 rounded-pill px-6"
              render={<a href={site.cvPath} />}
            >
              {ring.actions.cv}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-11 rounded-pill px-6"
              render={<a href={site.social.github} />}
            >
              GitHub
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-11 rounded-pill px-6"
              render={<a href={site.social.linkedin} />}
            >
              LinkedIn
            </Button>
          </div>
        </section>
      )
  }
}

function LineSection({ line }: { line: Line }) {
  const [before, after] = line.body.split('{fundron}')
  return (
    <section className="mt-4">
      <p className="label text-muted-dark">
        {line.line} · {line.company} · {line.role} · since {line.since}
      </p>
      {line.kicker && <p className="mt-4 text-muted-dark">{line.kicker}</p>}
      <h1 className="mt-3 font-display text-h2">{line.heading}</h1>
      <p className="mt-6 max-w-2xl">
        {before}
        {after !== undefined && (
          <>
            <a href={fundron.href} className="underline">
              {fundron.label}
            </a>
            {after}
          </>
        )}
      </p>
      {line.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {line.tags.map((tag) => (
            <li key={tag} className="rounded-pill bg-panel px-3 py-1 font-mono text-xs">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {line.action ? (
        <a href={line.action.href} className="mt-6 inline-block py-3 underline">
          {line.action.label}
        </a>
      ) : (
        line.site && (
          <a href={line.site} className="mt-6 inline-block py-3 underline">
            {new URL(line.site).host}
          </a>
        )
      )}
    </section>
  )
}
