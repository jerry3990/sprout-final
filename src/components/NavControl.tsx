import { useRef, useState, useEffect } from 'react'
import './NavControl.css'

const PILL_PATH =
  'M 29 0 L 101 0 A 29 29 0 0 1 130 29 L 130 29 A 29 29 0 0 1 101 58 L 29 58 A 29 29 0 0 1 0 29 L 0 29 A 29 29 0 0 1 29 0'

export interface NavControlProps {
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  /** 0–1 progress for "time until next" (border fills automatically); when set, overrides slide-based progress */
  timerProgress?: number
}

export default function NavControl({
  currentIndex,
  total,
  onPrev,
  onNext,
  timerProgress,
}: NavControlProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)
  const [isPrevPressed, setIsPrevPressed] = useState(false)
  const [isNextPressed, setIsNextPressed] = useState(false)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  const isFirst = currentIndex <= 0
  const isLast = currentIndex >= total - 1
  const progress =
    timerProgress !== undefined
      ? timerProgress
      : total > 0
        ? (currentIndex + 1) / total
        : 0
  const strokeDashoffset = pathLength * (1 - progress)

  return (
    <div className="nav-control">
      <button
        type="button"
        className={`nav-btn prev ${isFirst ? 'disabled' : 'active'}${isPrevPressed ? ' pressed' : ''}`}
        onClick={onPrev}
        onMouseDown={() => setIsPrevPressed(true)}
        onMouseUp={() => setIsPrevPressed(false)}
        onMouseLeave={() => setIsPrevPressed(false)}
        disabled={isFirst}
        aria-label="Previous"
      >
        <svg
          className="nav-btn-pill-svg"
          viewBox="0 0 130 58"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            ref={pathRef}
            className="nav-btn-pill-path nav-btn-pill-path-prev"
            d={PILL_PATH}
            fill="none"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="nav-btn-inner">
          <img
            src="/right-arrow.png"
            alt=""
            className="arrow-icon left"
            width={22}
            height={22}
            aria-hidden
          />
        </span>
      </button>

      <div className="nav-progress">
        <span className="current">{currentIndex + 1}</span>/
        <span className="total">{total}</span>
      </div>

      <button
        type="button"
        className={`nav-btn next ${isLast ? 'disabled' : 'active'}${isNextPressed ? ' pressed' : ''}`}
        onClick={onNext}
        onMouseDown={() => setIsNextPressed(true)}
        onMouseUp={() => setIsNextPressed(false)}
        onMouseLeave={() => setIsNextPressed(false)}
        disabled={isLast}
        aria-label="Next"
      >
        <svg
          className="nav-btn-pill-svg"
          viewBox="0 0 130 58"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            className="nav-btn-pill-path nav-btn-pill-path-next"
            d={PILL_PATH}
            fill="none"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset,
            }}
          />
        </svg>
        <span className="nav-btn-inner">
          <img
            src="/right-arrow.png"
            alt=""
            className="arrow-icon right"
            width={22}
            height={22}
            aria-hidden
          />
        </span>
      </button>
    </div>
  )
}
