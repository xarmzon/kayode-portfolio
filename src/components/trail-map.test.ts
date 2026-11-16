import { describe, expect, it } from 'vitest'
import { trailPath } from './trail-map'

describe('trailPath', () => {
  it('starts at the trailhead and draws one curve per leg', () => {
    const d = trailPath()
    expect(d.startsWith('M70 600')).toBe(true)
    expect(d.match(/ Q /g)).toHaveLength(10)
    expect(d.endsWith('T 1210 640')).toBe(true)
  })

  it('matches the design canvas for the first leg', () => {
    expect(trailPath(2)).toBe('M70 600 Q 70 535 160 535 T 250 470')
  })

  it('draws only the stops reached so far', () => {
    expect(trailPath(1)).toBe('M70 600')
    expect(trailPath(5).endsWith('T 560 330')).toBe(true)
  })
})
