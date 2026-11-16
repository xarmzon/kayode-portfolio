import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { formatDuration } from './call-timer'

describe('formatDuration', () => {
  it.each([
    [0, '00:00'],
    [5.9, '00:05'],
    [134, '02:14'],
    [3725, '1:02:05'],
    [-3, '00:00'],
  ])('%s seconds → %s', (input, expected) => {
    expect(formatDuration(input)).toBe(expected)
  })
})

describe('visited chapters', () => {
  afterEach(() => {
    window.localStorage.clear()
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it('records visits, keeps the latest last and persists them', async () => {
    const { markVisited, useVisited } = await import('./visited')
    const { result } = renderHook(() => useVisited())
    act(() => {
      markVisited('start')
      markVisited('yalo')
      markVisited('start')
    })
    expect(result.current).toEqual(['yalo', 'start'])
    expect(JSON.parse(window.localStorage.getItem('kayode:visited') ?? '[]')).toEqual([
      'yalo',
      'start',
    ])
  })

  it('ignores unknown slugs in storage', async () => {
    window.localStorage.setItem('kayode:visited', JSON.stringify(['penaid', 'nope', 3]))
    const { useVisited } = await import('./visited')
    const { result } = renderHook(() => useVisited())
    expect(result.current).toEqual(['penaid'])
  })

  it('keeps working when storage throws', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const { markVisited, useVisited } = await import('./visited')
    const { result } = renderHook(() => useVisited())
    act(() => markVisited('river'))
    expect(result.current).toEqual(['river'])
  })
})
