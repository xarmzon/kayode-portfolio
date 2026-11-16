import { useEffect, useState } from 'react'

const KEY = 'kayode:call-started'

/** When this visit's call started; kept per tab so full page loads don't reset it. */
function startedAt() {
  const now = Date.now()
  try {
    const stored = Number(window.sessionStorage.getItem(KEY))
    if (stored > 0 && stored <= now) return stored
    window.sessionStorage.setItem(KEY, String(now))
  } catch {
    // No storage: the timer simply starts from this page load.
  }
  return now
}

export function formatDuration(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(s / 3600)
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

/** Seconds on the line. Renders 0 on the server, then ticks once a second. */
export function useCallSeconds() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const start = startedAt()
    const tick = () => setSeconds((Date.now() - start) / 1000)
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return seconds
}
