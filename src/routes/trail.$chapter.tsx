import { createFileRoute, notFound } from '@tanstack/react-router'
import { getChapter, isChapterSlug } from '@/content'
import { ChapterPage } from '@/components/chapter-page'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/trail/$chapter')({
  loader: ({ params }) => {
    if (!isChapterSlug(params.chapter)) throw notFound()
    return getChapter(params.chapter)
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({
          title: `${loaderData.number} ${loaderData.title}`,
          description: loaderData.summary,
          path: `/trail/${loaderData.slug}`,
        })
      : {},
  component: TrailChapter,
})

function TrailChapter() {
  const chapter = Route.useLoaderData()
  return <ChapterPage chapter={chapter} />
}
