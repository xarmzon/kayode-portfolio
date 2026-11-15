import type { ReactNode } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { site } from '@/content'
import { SiteNav } from '@/components/site-nav'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0E1712' },
      { title: `${site.shortName} · ${site.role}` },
      { name: 'description', content: site.description },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <main id="content" className="mx-auto max-w-3xl gutter py-24">
      <p className="label text-lime">Line not found</p>
      <h1 className="mt-3 font-display text-h2">That line is dead.</h1>
      <a className="mt-6 inline-block underline" href="/">
        Back to the start
      </a>
    </main>
  ),
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-pill focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
