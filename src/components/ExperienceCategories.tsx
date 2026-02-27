import { useState, useEffect, useRef, useCallback } from 'react'
import { CATEGORIES } from '../data/categories'
import NavControl from './NavControl'
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
  const activeCardIndexRef = useRef(activeCardIndex)

  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex
  }, [activeCardIndex])

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
    progressStartRef.current = Date.now()
  }, [])

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

  // Timer progress 0→1 over CARD_INTERVAL_MS (stops when paused)
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
        {/* Top: full-width horizontal row with four tabs – fit in box, spacing inside/outside */}
        <div className="experience-tabs-row">
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
        </div>

        {/* Two-column: left = title + description + nav, right = cards */}
        <div className="experience-content-wrap">
          {/* Left column – main title, description, nav at bottom */}
          <div className="experience-left">
            <div
              className={`experience-text ${isTransitioning ? 'exit' : ''} ${isEntering ? 'enter' : ''}`}
            >
              <h2 className="experience-title">{category.title}</h2>
              <p className="experience-description">{category.description}</p>
            </div>
            <div
              className="experience-nav-wrap"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <NavControl
                currentIndex={activeCardIndex}
                total={totalCards}
                onPrev={goToPrevCard}
                onNext={goToNextCard}
                timerProgress={progress}
              />
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
                    <a href="/contact" className="experience-card-cta">
                      Read More
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Section title – full width, big text */}
        <h2 className="experience-section-title">Experience Categories</h2>
      </div>
    </section>
  )
}
