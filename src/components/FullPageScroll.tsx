import {
  useRef,
  useState,
  useCallback,
  useEffect,
  Children,
  type ReactNode,
  type TouchEvent,
  type KeyboardEvent,
} from 'react'
import { useFullPageScroll } from './FullPageScrollContext'

const TRANSITION_MS = 650
const WHEEL_THRESHOLD = 20
const TOUCH_THRESHOLD = 50

type FullPageScrollProps = {
  children: ReactNode
  /** Optional: initial slide index (e.g. from hash) */
  initialIndex?: number
}

export default function FullPageScroll({ children, initialIndex = 0 }: FullPageScrollProps) {
  const slides = Children.toArray(children)
  const count = slides.length
  const { setState } = useFullPageScroll()
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.max(0, Math.min(initialIndex, count - 1))
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lockUntilRef = useRef(0)
  const touchStartYRef = useRef(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const navigateRef = useRef({ goNext: () => {}, goPrev: () => {} })
  const indexRef = useRef(currentIndex)
  const prevIndexRef = useRef(currentIndex)

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= count) return
      if (lockUntilRef.current > Date.now()) return
      lockUntilRef.current = Date.now() + TRANSITION_MS
      setIsTransitioning(true)
      setCurrentIndex((prev) => {
        const direction: 'up' | 'down' | null =
          nextIndex > prev ? 'down' : nextIndex < prev ? 'up' : null
        prevIndexRef.current = prev
        setState({ index: nextIndex, direction })
        indexRef.current = nextIndex
        return nextIndex
      })
      const t = setTimeout(() => {
        setIsTransitioning(false)
      }, TRANSITION_MS)
      return () => clearTimeout(t)
    },
    [count]
  )

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  navigateRef.current = { goNext, goPrev }

  const goToRef = useRef(goTo)
  goToRef.current = goTo

  const HASH_TO_INDEX: Record<string, number> = {
    home: 0,
    experience: 1,
    process: 2, // combined feedback + process slide
    mission: 3,
    story: 4,
    contact: 5,
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const hash = target.getAttribute('href')?.slice(1) || ''
      const index = HASH_TO_INDEX[hash]
      if (index != null) {
        e.preventDefault()
        goToRef.current(index)
      }
    }
    viewport.addEventListener('click', handleClick)
    return () => viewport.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handler = (e: WheelEvent) => {
      const idx = indexRef.current
      const isLast = idx >= count - 1
      if (lockUntilRef.current > Date.now()) {
        e.preventDefault()
        return
      }
      // On last slide and scrolling further down, allow native page scroll (no preventDefault)
      if (isLast && e.deltaY > WHEEL_THRESHOLD) {
        return
      }
      e.preventDefault()
      if (e.deltaY > WHEEL_THRESHOLD) navigateRef.current.goNext()
      else if (e.deltaY < -WHEEL_THRESHOLD) navigateRef.current.goPrev()
    }
    viewport.addEventListener('wheel', handler, { passive: false })
    return () => viewport.removeEventListener('wheel', handler)
  }, [count])

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (lockUntilRef.current > Date.now()) return
      const endY = e.changedTouches[0].clientY
      const delta = touchStartYRef.current - endY
      const idx = indexRef.current
      const isLast = idx >= count - 1
      // On last slide, allow swipe-up (downward scroll) to fall through to native page scroll
      if (isLast && delta > TOUCH_THRESHOLD) {
        return
      }
      if (delta > TOUCH_THRESHOLD) navigateRef.current.goNext()
      else if (delta < -TOUCH_THRESHOLD) navigateRef.current.goPrev()
    },
    [count]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (lockUntilRef.current > Date.now()) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        navigateRef.current.goNext()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        navigateRef.current.goPrev()
      }
    },
    []
  )

  if (count === 0) return null

  return (
    <div
      ref={viewportRef}
      className="fullpage-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Full page sections"
      style={{ touchAction: indexRef.current >= count - 1 ? 'auto' : 'none' }}
    >
      <div
        className="fullpage-track"
        style={{
          transform: `translate3d(0, -${currentIndex * 100}vh, 0)`,
          transition: isTransitioning
            ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="fullpage-slide">
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
