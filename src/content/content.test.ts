import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { callLog, chapterPath, chapterSlugs, chapters, lines, site } from '@/content'
import * as schema from './schema'
import * as story from './story'

describe('content schema', () => {
  it.each([
    ['site', schema.siteSchema, site],
    ['chapters', z.array(schema.chapterSchema).length(chapterSlugs.length), chapters],
    ['hero', schema.heroSchema, story.hero],
    ['lines', z.array(schema.lineSchema), story.lines],
    ['fundron', schema.linkSchema, story.fundron],
    ['languages', z.array(schema.languageSchema), story.languages],
    ['tools', z.array(schema.toolSchema), story.tools],
    ['chipRows', z.array(schema.chipRowSchema), story.chipRows],
    ['callLog', z.array(schema.callLogEntrySchema), story.callLog],
    ['classroom', schema.classroomSchema, story.classroom],
    ['ring', schema.ringSchema, story.ring],
    ['statusBar', schema.statusBarSchema, story.statusBar],
    ['trailMap', schema.trailMapSchema, story.trailMap],
  ] as const)('%s is valid', (_name, s, data) => {
    expect(() => s.parse(data)).not.toThrow()
  })
})

describe('content rules', () => {
  it('has eleven chapters, 00 to 10, in slug order', () => {
    expect(chapters.map((c) => c.slug)).toEqual([...chapterSlugs])
    expect(chapters.map((c) => c.number)).toEqual(
      Array.from({ length: 11 }, (_, i) => String(i).padStart(2, '0')),
    )
  })

  it('maps the start chapter to / and the rest to /trail/<slug>', () => {
    expect(chapterPath('start')).toBe('/')
    expect(chapterPath('penaid')).toBe('/trail/penaid')
  })

  it('keeps the call log newest first', () => {
    const years = callLog.map((e) => e.year)
    expect(years).toEqual([...years].sort((a, b) => b - a))
  })

  it('uses the exact job titles', () => {
    const roles = Object.fromEntries(lines.map((l) => [l.id, l.role]))
    expect(roles).toEqual({
      yalo: 'Full-Stack Lead Developer',
      penaid: 'Senior Developer',
      cousant: 'Consultant Software Developer',
    })
  })

  it('refers to the cooperative client only generically', () => {
    const copy = JSON.stringify({ ...story, site })
    expect(copy).toContain('a cooperative savings platform')
  })
})
