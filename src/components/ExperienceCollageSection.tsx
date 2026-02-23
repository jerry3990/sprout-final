import { useRef, useState, useEffect } from 'react'
import { EXPERIENCE_COLLAGE_IMAGES } from '../data/experienceCollageImages'
import './ExperienceCollageSection.css'

const STAGGER_DELAY_MS = 80
const PARALLAX_FACTORS = [0.03, -0.02, 0.04, -0.03, 0.02, -0.04, 0.025, -0.025, 0.035, -0.015, 0.02, -0.03]

export default function ExperienceCollageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        if (!section) return
        const rect = section.getBoundingClientRect()
        const centerY = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        const scrollDelta = viewportCenter - centerY
        const offsets = EXPERIENCE_COLLAGE_IMAGES.map((_, i) => {
          const factor = PARALLAX_FACTORS[i % PARALLAX_FACTORS.length]
          return scrollDelta * factor
        })
        setParallaxOffsets(offsets)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="experience-collage"
      aria-label="Experience gallery"
    >
      <div className="experience-collage-inner">
        <div className="experience-collage-masonry">
          {EXPERIENCE_COLLAGE_IMAGES.map((img, index) => (
            <div
              key={img.id}
              className={`experience-collage-item experience-collage-item--${img.size}`}
              style={{
                animationDelay: `${index * STAGGER_DELAY_MS}ms`,
                transform: typeof parallaxOffsets[index] === 'number'
                  ? `translateY(${parallaxOffsets[index]}px)`
                  : undefined,
              }}
            >
              <div className="experience-collage-item-inner">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="experience-collage-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
