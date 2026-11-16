import { z } from 'zod'

import { chapterSlugs } from './slugs'

/*
 * Zod schemas for every content file. Content modules import only the types,
 * so Zod never ships to the browser; content.test.ts validates the data.
 */

export const chapterSlugSchema = z.enum(chapterSlugs)

const year = z.number().int().min(2000).max(2100)
const url = z.url()

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})
export type Link = z.infer<typeof linkSchema>

export const siteSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  handle: z.string(),
  role: z.string(),
  location: z.string(),
  /** Shown on /quick. Placeholder until Kayode confirms. */
  availability: z.string(),
  email: z.email(),
  cvPath: z.string().startsWith('/'),
  social: z.object({ github: url, linkedin: url }),
  description: z.string(),
})

export const chapterSchema = z.object({
  slug: chapterSlugSchema,
  number: z.string().regex(/^\d{2}$/),
  title: z.string(),
  /** The world drawn behind the chapter. */
  world: z.string(),
  /** The one thing the visitor does. */
  action: z.string(),
  /** One-line summary used for meta descriptions. */
  summary: z.string(),
  /** Place name on the trail map. */
  place: z.string(),
  /** Short note under the place name on the trail map. */
  mapNote: z.string(),
})
export type Chapter = z.infer<typeof chapterSchema>

export const heroSchema = z.object({
  kicker: z.string(),
  heading: z.string(),
  sub: z.string(),
  actions: z.object({ primary: z.string(), secondary: z.string() }),
})

export const lineSchema = z.object({
  id: z.enum(['yalo', 'penaid', 'cousant']),
  chapter: chapterSlugSchema,
  line: z.string(),
  company: z.string(),
  role: z.string(),
  since: year,
  site: url.optional(),
  kicker: z.string().optional(),
  heading: z.string(),
  /** Body copy. `{fundron}` marks where the Fundron link goes. */
  body: z.string(),
  tags: z.array(z.string()),
  action: linkSchema.optional(),
})
export type Line = z.infer<typeof lineSchema>

export const languageSchema = z.object({
  name: z.string(),
  usedAt: z.array(z.string()).min(1),
  uses: z.array(z.string()).min(1),
  /** One-line "ring the line" snippet in the language's own syntax. */
  snippet: z.string(),
})

export const toolSchema = z.object({ name: z.string(), use: z.string() })

export const chipRowSchema = z.object({
  label: z.string(),
  chips: z.array(z.string()).min(1),
})

export const callLogEntrySchema = z.object({
  year,
  where: z.string(),
  role: z.string(),
  line: z.string(),
})

export const classroomSchema = z.object({
  heading: z.string(),
  items: z.array(z.object({ title: z.string(), body: z.string() })),
  foundation: z.string(),
})

export const ringSchema = z.object({
  heading: z.string(),
  actions: z.object({
    ring: z.string(),
    cv: z.string(),
    replay: z.string(),
  }),
})

export type Site = z.infer<typeof siteSchema>
export type Hero = z.infer<typeof heroSchema>
export type Language = z.infer<typeof languageSchema>
export type Tool = z.infer<typeof toolSchema>
export type ChipRow = z.infer<typeof chipRowSchema>
export type CallLogEntry = z.infer<typeof callLogEntrySchema>
export type Classroom = z.infer<typeof classroomSchema>
export type Ring = z.infer<typeof ringSchema>

export const statusBarSchema = z.object({
  live: z.string(),
  chapterLabel: z.string(),
  offTrail: z.string(),
  map: z.string(),
  skip: z.string(),
  skipShort: z.string(),
})
export type StatusBar = z.infer<typeof statusBarSchema>

export const trailMapSchema = z.object({
  kicker: z.string(),
  heading: z.string(),
  highlight: z.string(),
  sub: z.string(),
  youAreHere: z.string(),
  startHere: z.string(),
  resume: z.string(),
  legend: z.object({ visited: z.string(), here: z.string(), ahead: z.string() }),
})
export type TrailMap = z.infer<typeof trailMapSchema>
