import { useState, useEffect, useRef, useCallback } from 'react'
import { CATEGORIES } from '../data/categories'
import './ExperienceCategories.css'

const CARD_INTERVAL_MS = 5000

export default function ExperienceCategories() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)
  const progressStartRef = useRef(0)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const activeCardIndexRef = useRef(activeCardIndex)
  const [tabsScroll, setTabsScroll] = useState({ left: 0, canScrollLeft: false, canScrollRight: false })

  activeCardIndexRef.current = activeCardIndex

  const category = CATEGORIES[activeCategoryIndex]
  const totalCards = category.cards.length

  const totalCategories = CATEGORIES.length

  const goToCard = useCallback(
    (index: number) => {
      setActiveCardIndex((index + totalCards) % totalCards)
      setProgress(0)
      progressStartRef.current = Date.now()
    },
    [totalCards]
  )

  // Next: complete circular motion through cards; after last card, advance to next category
  const goToNextCard = useCallback(() => {
    if (activeCardIndex >= totalCards - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveCategoryIndex((i) => (i + 1) % totalCategories)
        setActiveCardIndex(0)
        setProgress(0)
        progressStartRef.current = Date.now()
        setIsTransitioning(false)
        setIsEntering(true)
        setTimeout(() => setIsEntering(false), 450)
      }, 300)
    } else {
      goToCard(activeCardIndex + 1)
    }
  }, [activeCardIndex, totalCards, totalCategories, goToCard])

  // Prev: at first card go to previous category's last card
  const goToPrevCard = useCallback(() => {
    if (activeCardIndex <= 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        const prevCat = (activeCategoryIndex - 1 + totalCategories) % totalCategories
        const prevCatCards = CATEGORIES[prevCat].cards.length
        setActiveCategoryIndex(prevCat)
        setActiveCardIndex(prevCatCards - 1)
        setProgress(0)
        progressStartRef.current = Date.now()
        setIsTransitioning(false)
        setIsEntering(true)
        setTimeout(() => setIsEntering(false), 450)
      }, 300)
    } else {
      goToCard(activeCardIndex - 1)
    }
  }, [activeCardIndex, activeCategoryIndex, totalCategories, goToCard])

  // Auto-advance: full circular motion through cards, then transition to next category
  useEffect(() => {
    if (isCarouselPaused) return
    intervalRef.current = setInterval(() => {
      const current = activeCardIndexRef.current
      if (current >= totalCards - 1) {
        setIsTransitioning(true)
        setTimeout(() => {
          setActiveCategoryIndex((ci) => (ci + 1) % totalCategories)
          setActiveCardIndex(0)
          setProgress(0)
          progressStartRef.current = Date.now()
          setIsTransitioning(false)
          setIsEntering(true)
          setTimeout(() => setIsEntering(false), 450)
        }, 300)
      } else {
        setActiveCardIndex(current + 1)
        setProgress(0)
        progressStartRef.current = Date.now()
      }
    }, CARD_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isCarouselPaused, totalCards, totalCategories])

  // Circular progress (fills over CARD_INTERVAL_MS)
  useEffect(() => {
    if (isCarouselPaused) return
    const start = progressStartRef.current
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / CARD_INTERVAL_MS, 1)
      setProgress(p)
      if (p < 1) progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [isCarouselPaused, activeCardIndex, activeCategoryIndex])

  const handleCategoryClick = (index: number) => {
    if (index === activeCategoryIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveCategoryIndex(index)
      setActiveCardIndex(0)
      setProgress(0)
      progressStartRef.current = Date.now()
      setIsTransitioning(false)
      setIsEntering(true)
      setTimeout(() => setIsEntering(false), 450)
    }, 300)
  }

  const updateTabsScrollState = useCallback(() => {
    const el = tabsScrollRef.current
    if (!el) return
    const left = el.scrollLeft
    const canScrollLeft = left > 0
    const canScrollRight = left < el.scrollWidth - el.clientWidth - 1
    setTabsScroll((prev) =>
      prev.left !== left || prev.canScrollLeft !== canScrollLeft || prev.canScrollRight !== canScrollRight
        ? { left, canScrollLeft, canScrollRight }
        : prev
    )
  }, [])

  useEffect(() => {
    const el = tabsScrollRef.current
    if (!el) return
    updateTabsScrollState()
    el.addEventListener('scroll', updateTabsScrollState)
    const ro = new ResizeObserver(updateTabsScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateTabsScrollState)
      ro.disconnect()
    }
  }, [updateTabsScrollState])

  const scrollTabs = (direction: 'left' | 'right') => {
    const el = tabsScrollRef.current
    if (!el) return
    const step = el.clientWidth * 0.6
    el.scrollTo({ left: el.scrollLeft + (direction === 'left' ? -step : step), behavior: 'smooth' })
  }

  // Wheel: advance through cards (full circular motion), then natural transition to next category
  const wheelAccumRef = useRef(0)
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isTransitioning) return
      wheelAccumRef.current += e.deltaY
      const threshold = 80
      if (wheelAccumRef.current >= threshold) {
        wheelAccumRef.current = 0
        e.preventDefault()
        goToNextCard()
      } else if (wheelAccumRef.current <= -threshold) {
        wheelAccumRef.current = 0
        e.preventDefault()
        goToPrevCard()
      }
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
      wheelTimeoutRef.current = setTimeout(() => {
        wheelAccumRef.current = 0
      }, 200)
    },
    [isTransitioning, goToNextCard, goToPrevCard]
  )

  return (
    <section id="experience" className="experience-categories">
      <div className="experience-inner">
        {/* Two-column: left = tabs + text + nav, right = cards (exact as photo) */}
        <div className="experience-content-wrap">
          {/* Left column – category tabs, main title, description, nav at bottom */}
          <div className="experience-left">
            <div className="experience-tabs-wrapper">
              <button
                type="button"
                className="experience-tabs-arrow experience-tabs-arrow-left"
                aria-label="Scroll tabs left"
                onClick={() => scrollTabs('left')}
                disabled={!tabsScroll.canScrollLeft}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div
                className="experience-tabs"
                ref={tabsScrollRef}
                onScroll={updateTabsScrollState}
              >
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`experience-tab ${i === activeCategoryIndex ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(i)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="experience-tabs-arrow experience-tabs-arrow-right"
                aria-label="Scroll tabs right"
                onClick={() => scrollTabs('right')}
                disabled={!tabsScroll.canScrollRight}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
            <div
              className={`experience-text ${isTransitioning ? 'exit' : ''} ${isEntering ? 'enter' : ''}`}
            >
              <h2 className="experience-title">{category.title}</h2>
              <p className="experience-description">{category.description}</p>
            </div>
            <div className="experience-nav">
              <button
                type="button"
                className="experience-nav-btn"
                onClick={goToPrevCard}
                aria-label="Previous card"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="experience-counter">
                {activeCardIndex + 1}/{totalCards}
              </span>
              <button
                type="button"
                className="experience-nav-btn experience-nav-btn-right"
                onClick={goToNextCard}
                aria-label="Next card"
              >
                <svg
                  className="experience-progress-ring"
                  width="56"
                  height="56"
                  viewBox="0 0 48 48"
                  aria-hidden
                >
                  <circle
                    className="experience-progress-bg"
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                  />
                  <circle
                    className="experience-progress-fill"
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={2 * Math.PI * 20 * (1 - progress)}
                    transform="rotate(-90 24 24)"
                  />
                </svg>
                <svg
                  className="experience-nav-arrow"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right column – large card carousel, fade into left edge */}
          <div
            className="experience-cards-wrap"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onWheel={handleWheel}
          >
            <div className="experience-cards-fade" aria-hidden />
            <div
              className={`experience-cards-track ${isTransitioning ? 'exit' : ''} ${isEntering ? 'enter' : ''}`}
              style={{ '--slide-index': activeCardIndex } as React.CSSProperties}
            >
              {category.cards.map((card) => (
                <article key={card.id} className="experience-card">
                  <div className="experience-card-image-wrap">
                    <img
                      src={card.image}
                      alt=""
                      className="experience-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="experience-card-content">
                    <div className="experience-card-text">
                      <h3 className="experience-card-title">{card.title}</h3>
                      <p className="experience-card-description">{card.description}</p>
                    </div>
                    <a href="#resources" className="experience-card-cta">
                      Read More
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
