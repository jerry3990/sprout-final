import { useRef, useState, useEffect } from 'react'
import { HERO_VIDEOS } from './HeroSection'
import './VideoOverlaySection.css'

type VideoOverlaySectionProps = {
  /** Video source (default: first hero video) */
  videoSrc?: string
  /** Which side the white box sits on */
  side?: 'left' | 'right'
  /** Content to render inside the white box */
  children?: React.ReactNode
}

export default function VideoOverlaySection({
  videoSrc = HERO_VIDEOS[0],
  side = 'right',
  children,
}: VideoOverlaySectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) video.play().catch(() => {})
    else video.pause()
  }, [isPlaying])

  const sectionClass =
    'video-overlay-section' + (side === 'left' ? ' video-overlay-section--left' : ' video-overlay-section--right')

  const cardClass =
    'video-overlay-card' + (side === 'left' ? ' video-overlay-card--left' : ' video-overlay-card--right')

  return (
    <section className={sectionClass}>
      <div className="video-overlay-video-wrap">
        <video
          ref={videoRef}
          className="video-overlay-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        <div className="video-overlay-gradient" aria-hidden />
        <button
          type="button"
          className="video-overlay-play-btn"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className={cardClass}>
        {children}
      </div>
    </section>
  )
}
