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

  const category = CATEGORIES[activeCategoryIndex]
  const totalCards = category.cards.length

  const goToCard = useCallback(
    (index: number) => {
      setActiveCardIndex((index + totalCards) % totalCards)
      setProgress(0)
      progressStartRef.current = Date.now()
    },
    [totalCards]
  )

  const goToPrevCard = useCallback(() => goToCard(activeCardIndex - 1), [activeCardIndex, goToCard])
  const goToNextCard = useCallback(() => goToCard(activeCardIndex + 1), [activeCardIndex, goToCard])

  // Auto-advance cards (pauses when isCarouselPaused)
  useEffect(() => {
    if (isCarouselPaused) return
    intervalRef.current = setInterval(() => {
      setActiveCardIndex((i) => (i + 1) % totalCards)
      setProgress(0)
      progressStartRef.current = Date.now()
    }, CARD_INTERVAL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isCarouselPaused, totalCards, activeCategoryIndex])

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

  return (
    <section id="experience" className="experience-categories">
      <div className="experience-inner">
        {/* Two-column: left = tabs + text + nav, right = cards (exact as photo) */}
        <div className="experience-content-wrap">
          {/* Left column – category tabs, main title, description, nav at bottom */}
          <div className="experience-left">
            <div className="experience-tabs">
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
