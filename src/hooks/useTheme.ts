import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
function initialTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === 'light' || set === 'dark') return set
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const change = (event: MediaQueryListEvent) => {
      try { if (localStorage.getItem('hoh-theme')) return } catch { /* Follow system. */ }
      setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    try { localStorage.setItem('hoh-theme', next) } catch { /* Theme works for this session. */ }
  }
  return { theme, toggle }
}
