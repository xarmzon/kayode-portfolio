/** Chapter slugs, in journey order. `/` renders `start`. */
export const chapterSlugs = [
  'start',
  'roots',
  'yalo',
  'penaid',
  'river',
  'seedbed',
  'meadow',
  'vines',
  'rings',
  'clearing',
  'summit',
] as const

export type ChapterSlug = (typeof chapterSlugs)[number]

export function isChapterSlug(value: string): value is ChapterSlug {
  return (chapterSlugs as readonly string[]).includes(value)
}
