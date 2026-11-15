import { createFileRoute } from '@tanstack/react-router'
import { getChapter, hero } from '@/content'
import { ChapterPage } from '@/components/chapter-page'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => seo({ title: 'Dial in', description: hero.heading, path: '/' }),
  component: () => <ChapterPage chapter={getChapter('start')} />,
})
