import { useEffect, useState } from 'react'

type ScrollProgress = {
  progress: number
  scrollY: number
}

export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
  })

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

      setState({
        scrollY,
        progress: Math.min(scrollY / maxScroll, 1),
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [])

  return state
}
