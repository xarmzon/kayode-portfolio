import { createFileRoute } from '@tanstack/react-router'
import { site } from '@/content'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/cv')({
  head: () => {
    const base = seo({ title: 'CV', description: `Download ${site.name}'s CV.`, path: '/cv' })
    // Static hosting has no server redirect, so the prerendered page forwards to the PDF.
    return { meta: [...base.meta, { httpEquiv: 'refresh', content: `0; url=${site.cvPath}` }] }
  },
  component: Cv,
})

function Cv() {
  return (
    <main id="content" className="mx-auto max-w-3xl gutter py-24">
      <h1 className="font-display text-h2">Fetching the CV…</h1>
      <a href={site.cvPath} className="mt-6 inline-block py-3 underline" download>
        Download cv.pdf
      </a>
    </main>
  )
}
