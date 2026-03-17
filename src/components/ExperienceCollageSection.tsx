import { useRef, useState, useEffect } from 'react'
import { EXPERIENCE_COLLAGE_IMAGES } from '../data/experienceCollageImages'
import './ExperienceCollageSection.css'

const STAGGER_DELAY_MS = 80
const PARALLAX_FACTORS = [0.03, -0.02, 0.04, -0.03, 0.02, -0.04, 0.025, -0.025, 0.035, -0.015, 0.02, -0.03]
const PARALLAX_CLAMP_PX = 18

type CollageSlot = {
  slotId: string
  imgIndex: number
  className: string
}

const COLLAGE_SLOTS: CollageSlot[] = [
  // Left bleed (partially visible)
  { slotId: 'bleed-left-top', imgIndex: 0, className: 'experience-collage-tile experience-collage-tile--bleed-left experience-collage-tile--bleed-left-top' },
  { slotId: 'bleed-left-mid', imgIndex: 1, className: 'experience-collage-tile experience-collage-tile--bleed-left experience-collage-tile--bleed-left-mid' },
  { slotId: 'bleed-left-bot', imgIndex: 2, className: 'experience-collage-tile experience-collage-tile--bleed-left experience-collage-tile--bleed-left-bot' },
  { slotId: 'bleed-left-peek', imgIndex: 11, className: 'experience-collage-tile experience-collage-tile--bleed-left experience-collage-tile--bleed-left-peek' },

  // Main collage (6 tiles)
  { slotId: 'main-a', imgIndex: 3, className: 'experience-collage-tile experience-collage-tile--main experience-collage-tile--main-a' }, // top-left large
  { slotId: 'main-b', imgIndex: 4, className: 'experience-collage-tile experience-collage-tile--main experience-collage-tile--main-b' }, // middle top (small wide)
  { slotId: 'main-c', imgIndex: 5, className: 'experience-collage-tile experience-collage-tile--main experience-collage-tile--main-c' }, // top-right wide
  { slotId: 'main-d', imgIndex: 6, className: 'experience-collage-tile experience-collage-tile--main experience-collage-tile--main-d' }, // bottom-left tall
  { slotId: 'main-e', imgIndex: 7, className: 'experience-collage-tile experience-collage-tile--main experience-collage-tile--main-e' }, // middle bottom wide
  { slotId: 'main-f', imgIndex: 8, className: 'experience-collage-tile experience-collage-tile--main experience-collage-tile--main-f' }, // bottom-right wide

  // Right bleed (partially visible)
  { slotId: 'bleed-right-top', imgIndex: 9, className: 'experience-collage-tile experience-collage-tile--bleed-right experience-collage-tile--bleed-right-top' },
  { slotId: 'bleed-right-mid', imgIndex: 10, className: 'experience-collage-tile experience-collage-tile--bleed-right experience-collage-tile--bleed-right-mid' },
  { slotId: 'bleed-right-bot', imgIndex: 1, className: 'experience-collage-tile experience-collage-tile--bleed-right experience-collage-tile--bleed-right-bot' },
]

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
        const offsets = COLLAGE_SLOTS.map((_, i) => {
          const factor = PARALLAX_FACTORS[i % PARALLAX_FACTORS.length]
          const raw = scrollDelta * factor
          return Math.max(-PARALLAX_CLAMP_PX, Math.min(PARALLAX_CLAMP_PX, raw))
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
      <div className="experience-collage-stage">
        <div className="experience-collage-layout">
          <div className="experience-collage-bleed experience-collage-bleed--left" aria-hidden="true">
            {COLLAGE_SLOTS.slice(0, 4).map((slot, index) => {
              const img = EXPERIENCE_COLLAGE_IMAGES[slot.imgIndex % EXPERIENCE_COLLAGE_IMAGES.length]
              return (
                <div
                  key={slot.slotId}
                  className={slot.className}
                  style={{
                    animationDelay: `${index * STAGGER_DELAY_MS}ms`,
                    transform: typeof parallaxOffsets[index] === 'number' ? `translateY(${parallaxOffsets[index]}px)` : undefined,
                  }}
                >
                  <div className="experience-collage-tile-inner">
                    <img src={img.src} alt={img.alt} className="experience-collage-img" loading="lazy" />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="experience-collage-main" aria-hidden="true">
            <div className="experience-collage-col experience-collage-col--left">
              {[COLLAGE_SLOTS[3], COLLAGE_SLOTS[6]].map((slot, i) => {
                const slotIndex = 3 + (i === 0 ? 0 : 3) // indices: 3 then 6
                const img = EXPERIENCE_COLLAGE_IMAGES[slot.imgIndex % EXPERIENCE_COLLAGE_IMAGES.length]
                return (
                  <div
                    key={slot.slotId}
                    className={slot.className}
                    style={{
                      animationDelay: `${slotIndex * STAGGER_DELAY_MS}ms`,
                      transform: typeof parallaxOffsets[slotIndex] === 'number' ? `translateY(${parallaxOffsets[slotIndex]}px)` : undefined,
                    }}
                  >
                    <div className="experience-collage-tile-inner">
                      <img src={img.src} alt={img.alt} className="experience-collage-img" loading="lazy" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="experience-collage-col experience-collage-col--mid">
              {[COLLAGE_SLOTS[4], COLLAGE_SLOTS[7]].map((slot, i) => {
                const slotIndex = 4 + i * 3 // indices: 4 then 7
                const img = EXPERIENCE_COLLAGE_IMAGES[slot.imgIndex % EXPERIENCE_COLLAGE_IMAGES.length]
                return (
                  <div
                    key={slot.slotId}
                    className={slot.className}
                    style={{
                      animationDelay: `${slotIndex * STAGGER_DELAY_MS}ms`,
                      transform: typeof parallaxOffsets[slotIndex] === 'number' ? `translateY(${parallaxOffsets[slotIndex]}px)` : undefined,
                    }}
                  >
                    <div className="experience-collage-tile-inner">
                      <img src={img.src} alt={img.alt} className="experience-collage-img" loading="lazy" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="experience-collage-col experience-collage-col--right">
              {[COLLAGE_SLOTS[5], COLLAGE_SLOTS[8]].map((slot, i) => {
                const slotIndex = 5 + i * 3 // indices: 5 then 8
                const img = EXPERIENCE_COLLAGE_IMAGES[slot.imgIndex % EXPERIENCE_COLLAGE_IMAGES.length]
                return (
                  <div
                    key={slot.slotId}
                    className={slot.className}
                    style={{
                      animationDelay: `${slotIndex * STAGGER_DELAY_MS}ms`,
                      transform: typeof parallaxOffsets[slotIndex] === 'number' ? `translateY(${parallaxOffsets[slotIndex]}px)` : undefined,
                    }}
                  >
                    <div className="experience-collage-tile-inner">
                      <img src={img.src} alt={img.alt} className="experience-collage-img" loading="lazy" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="experience-collage-bleed experience-collage-bleed--right" aria-hidden="true">
            {COLLAGE_SLOTS.slice(10).map((slot, i) => {
              const slotIndex = 10 + i
              const img = EXPERIENCE_COLLAGE_IMAGES[slot.imgIndex % EXPERIENCE_COLLAGE_IMAGES.length]
              return (
                <div
                  key={slot.slotId}
                  className={slot.className}
                  style={{
                    animationDelay: `${slotIndex * STAGGER_DELAY_MS}ms`,
                    transform: typeof parallaxOffsets[slotIndex] === 'number' ? `translateY(${parallaxOffsets[slotIndex]}px)` : undefined,
                  }}
                >
                  <div className="experience-collage-tile-inner">
                    <img src={img.src} alt={img.alt} className="experience-collage-img" loading="lazy" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
