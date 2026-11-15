import { site } from '@/content'

type SeoInput = {
  title: string
  description?: string
  path: string
}

/** Per-route title, description and Open Graph tags for TanStack Router `head()`. */
export function seo({ title, description = site.description, path }: SeoInput) {
  const fullTitle = `${title} · ${site.shortName}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: path },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }
}
