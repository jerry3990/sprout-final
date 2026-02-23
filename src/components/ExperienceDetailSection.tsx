import { useState, useCallback, useRef, useEffect } from 'react'
import {
  EXPERIENCE_DETAIL_TABS,
  EXPERIENCE_DETAIL_SLIDES,
  SLIDES_PER_TAB,
} from '../data/experienceDetailSlides'
import NavControl from './NavControl'
import './ExperienceDetailSection.css'

const TRANSITION_DURATION_MS = 600

export default function ExperienceDetailSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [activePointIndex, setActivePointIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [exitingIndex, setExitingIndex] = useState<number | null>(null)
  const [isEntering, setIsEntering] = useState(false)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const contentIndex = activeTabIndex * SLIDES_PER_TAB + activePointIndex
  const totalSlides = EXPERIENCE_DETAIL_SLIDES.length

  const goToIndex = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= totalSlides) return
    if (nextIndex === contentIndex) return

    // Clear any pending transition cleanup
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = null
    }

    setExitingIndex(contentIndex)
    setIsEntering(true)

    // Start enter animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisplayIndex(nextIndex)
        setActiveTabIndex(Math.floor(nextIndex / SLIDES_PER_TAB))
        setActivePointIndex(nextIndex % SLIDES_PER_TAB)
      })
    })

    transitionTimeoutRef.current = setTimeout(() => {
      setExitingIndex(null)
      setIsEntering(false)
      transitionTimeoutRef.current = null
    }, TRANSITION_DURATION_MS)
  }, [contentIndex, totalSlides])

  const goToPrev = useCallback(() => {
    if (activePointIndex > 0) {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + activePointIndex - 1)
    } else {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + SLIDES_PER_TAB - 1)
    }
  }, [activeTabIndex, activePointIndex, goToIndex])

  const goToNext = useCallback(() => {
    if (activePointIndex < SLIDES_PER_TAB - 1) {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + activePointIndex + 1)
    } else {
      goToIndex(activeTabIndex * SLIDES_PER_TAB + 0)
    }
  }, [activeTabIndex, activePointIndex, goToIndex])

  const handleTabClick = (tabI: number) => {
    if (tabI === activeTabIndex) return
    const nextIndex = tabI * SLIDES_PER_TAB + 0
    goToIndex(nextIndex)
  }

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  const displaySlide = EXPERIENCE_DETAIL_SLIDES[displayIndex]
  const exitingSlide = exitingIndex !== null ? EXPERIENCE_DETAIL_SLIDES[exitingIndex] : null

  return (
    <section className="experience-detail experience-detail-fullscreen" aria-label="Experience detail">
      <div className="experience-detail-floating-nav">
        <div className="experience-detail-tabs">
          {EXPERIENCE_DETAIL_TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              className={`experience-detail-tab ${i === activeTabIndex ? 'active' : ''}`}
              onClick={() => handleTabClick(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="experience-detail-inner">
        <div className="experience-detail-content">
          <div className="experience-detail-left">
            <div className="experience-detail-text-wrapper">
              {exitingSlide && (
                <div
                  className="experience-detail-text-block experience-detail-text-exit"
                  aria-hidden
                >
                  <h2 className="experience-detail-title">{exitingSlide.title}</h2>
                  <p className="experience-detail-p1">{exitingSlide.paragraph1}</p>
                  <p className="experience-detail-p2">{exitingSlide.paragraph2}</p>
                  <div className="experience-detail-boxes">
                    <div className="experience-detail-box">
                      <span className="experience-detail-box-label">INTENSITY</span>
                      <span className="experience-detail-box-value">{exitingSlide.intensity}</span>
                    </div>
                    <div className="experience-detail-box">
                      <span className="experience-detail-box-label">GROUP SIZE</span>
                      <span className="experience-detail-box-value">{exitingSlide.groupSize}</span>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`experience-detail-text-block experience-detail-text-current ${isEntering ? 'experience-detail-text-enter' : ''}`}
              >
                <h2 className="experience-detail-title">{displaySlide.title}</h2>
                <p className="experience-detail-p1">{displaySlide.paragraph1}</p>
                <p className="experience-detail-p2">{displaySlide.paragraph2}</p>
                <div className="experience-detail-boxes">
                  <div className="experience-detail-box">
                    <span className="experience-detail-box-label">INTENSITY</span>
                    <span className="experience-detail-box-value">{displaySlide.intensity}</span>
                  </div>
                  <div className="experience-detail-box">
                    <span className="experience-detail-box-label">GROUP SIZE</span>
                    <span className="experience-detail-box-value">{displaySlide.groupSize}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-detail-right">
            <div className="experience-detail-media-card">
              <div className="experience-detail-media-wrap">
                <img
                  src={displaySlide.mediaImage}
                  alt=""
                  className="experience-detail-media-img"
                  loading="lazy"
                />
                <div className="experience-detail-play-overlay" aria-hidden>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="experience-detail-cta-overlay">
                <p className="experience-detail-cta-text">{displaySlide.ctaOverlayText}</p>
                <a href="/#contact" className="experience-detail-cta-btn">
                  {displaySlide.ctaButtonText}
                </a>
              </div>
            </div>
            <div className="experience-detail-nav-wrap">
              <NavControl
                currentIndex={activePointIndex}
                total={SLIDES_PER_TAB}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
