import { useRef, useState, useEffect } from 'react'
import Navbar from './components/navbar'
import ExperienceCategories from './components/ExperienceCategories'
import './App.css'

/* Mission items – image, text, and optional audio per mission (Vantara-style) */
const MISSION_ITEMS: Array<{
  id: string
  title: string
  description: string
  image: string
  icon: 'person-gear' | 'book' | 'lightning' | 'heart'
  audio?: string
}> = [
  {
    id: 'human-centered',
    title: 'Human-Centered Design',
    description: 'We begin with people. Every experience is built to feel intuitive, inclusive, and easy to step into.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85',
    icon: 'person-gear',
    audio: '', // add e.g. /audio/mission-1.mp3 for this mission's song
  },
  {
    id: 'story-led',
    title: 'Story-Led Creativity',
    description: 'Every event tells a story that resonates and inspires. Your people, your vibe, your story – brought to life.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=85',
    icon: 'book',
    audio: '',
  },
  {
    id: 'white-glove',
    title: 'White-Glove Execution',
    description: 'Every detail handled with intention, care, and heart. We run everything. You enjoy the moment.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85',
    icon: 'lightning',
    audio: '',
  },
  {
    id: 'commitment',
    title: 'Our Commitment',
    description: 'We create moments people feel, not just attend. Your audience experience guides every decision we make.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85',
    icon: 'heart',
    audio: '',
  },
]

/* Hero video sources – all loop on the homepage; primary used for hero background */
const HERO_VIDEOS = [
  '/video/12423791_3840_2160_25fps.mp4',
  '/video/15162500_3840_2160_30fps.mp4',
  '/video/6582341-uhd_3840_2160_30fps.mp4',
] as const

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const missionAudioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [activeMission, setActiveMission] = useState(0)
  const [missionMuted, setMissionMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) video.play().catch(() => {})
    else video.pause()
  }, [isPlaying])

  useEffect(() => {
    const audio = missionAudioRef.current
    if (!audio) return
    const url = MISSION_ITEMS[activeMission]?.audio
    if (url) {
      audio.src = url
      audio.muted = missionMuted
      audio.loop = true
      audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.removeAttribute('src')
    }
  }, [activeMission])

  useEffect(() => {
    const audio = missionAudioRef.current
    if (!audio) return
    audio.muted = missionMuted
  }, [missionMuted])

  const togglePlayPause = () => setIsPlaying((p) => !p)
  const toggleMute = () => setIsMuted((m) => !m)
  const toggleMissionMute = () => setMissionMuted((m) => !m)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero section – full-viewport video with left text, right controls */}
        <section id="home" className="hero">
          <div className="hero-video-wrap">
            <video
              ref={videoRef}
              className="hero-video"
              src={HERO_VIDEOS[0]}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              aria-hidden
            />
          </div>
          <div className="hero-overlay" aria-hidden />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-line1">CRAFT MOMENTS</span>
              <span className="hero-title-line2">THAT LASTS</span>
            </h1>
            <a href="#experience" className="hero-cta">
              start adventure
            </a>
          </div>
          <div className="hero-controls">
            <button
              type="button"
              className="hero-control-btn"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="hero-control-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </section>

        <ExperienceCategories />

        {/* Mission – full-viewport big screen, photo + text + per-mission audio */}
        <section id="mission" className="mission-section">
          <audio ref={missionAudioRef} loop playsInline aria-hidden />
          <div className="mission-container">
            <div className="mission-visual">
              <div className="mission-visual-inner">
                {MISSION_ITEMS.map((item, index) => (
                  <div
                    key={item.id}
                    className={`mission-image-wrap ${index === activeMission ? 'mission-image-active' : ''}`}
                    aria-hidden={index !== activeMission}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="mission-image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mission-content">
              <h2 className="mission-heading">Mission</h2>
              <ul className="mission-list" role="tablist" aria-label="Mission points">
                {MISSION_ITEMS.map((item, index) => (
                  <li key={item.id} className={`mission-item ${index === activeMission ? 'mission-item-active' : ''}`}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={index === activeMission}
                      aria-controls={`mission-panel-${item.id}`}
                      id={`mission-tab-${item.id}`}
                      className={`mission-trigger ${index === activeMission ? 'mission-trigger-active' : ''}`}
                      onClick={() => setActiveMission(index)}
                    >
                      <span className="mission-trigger-icon">
                        {item.icon === 'person-gear' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="4" /><path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" /><path d="M12 12v2" /><path d="M12 16h.01" /></svg>
                        )}
                        {item.icon === 'book' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                        )}
                        {item.icon === 'lightning' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        )}
                        {item.icon === 'heart' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        )}
                      </span>
                      <span className="mission-trigger-title">{item.title}</span>
                    </button>
                    <div
                      id={`mission-panel-${item.id}`}
                      role="tabpanel"
                      aria-labelledby={`mission-tab-${item.id}`}
                      hidden={index !== activeMission}
                      className={`mission-panel ${index === activeMission ? 'mission-panel-active' : ''}`}
                    >
                      <p className="mission-panel-description">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mission-controls">
            <button
              type="button"
              className="mission-control-btn"
              onClick={toggleMissionMute}
              aria-label={missionMuted ? 'Unmute mission sound' : 'Mute mission sound'}
            >
              {missionMuted ? (
                <svg className="mission-control-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="mission-control-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </section>

        {/* OUR STORY – white background, left text, right media card */}
        <section id="story" className="our-story-section">
          <div className="our-story-container">
            <div className="our-story-content">
              <h2 className="our-story-heading">OUR STORY</h2>
              <p className="our-story-p">
                Born from two minds, one curious and one thoughtful, united by a simple idea: People deserve meaningful moments.
              </p>
              <p className="our-story-p">
                From a campus conversation grew <strong className="our-story-brand">The Sprout</strong>, a company built to bring people together through intentional, story-driven experiences.
              </p>
              <p className="our-story-p">
                Our uniqueness comes from designing moments that feel personal, human, and unforgettable.
              </p>
              <blockquote className="our-story-quote">
                We create experiences that make people feel connected, valued, and alive.
              </blockquote>
              <a href="#contact" className="our-story-link">
                Learn More About Us →
              </a>
            </div>
            <div className="our-story-media">
              <div className="our-story-media-inner">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85"
                  alt=""
                  className="our-story-media-img"
                />
                <div className="our-story-play" aria-hidden>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GET IN TOUCH – dark green background, video area + overlay CTA */}
        <section id="contact" className="get-in-touch-section">
          <h2 className="get-in-touch-heading">GET IN TOUCH</h2>
          <div className="get-in-touch-media">
            <div className="get-in-touch-media-inner">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=85"
                alt=""
                className="get-in-touch-media-img"
              />
              <div className="get-in-touch-play" aria-hidden>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="get-in-touch-overlay">
              <p className="get-in-touch-text">
                Have an idea, a question, or a moment you want to bring to life? Get in touch and start a conversation—sometimes that's all it takes for something meaningful to grow.
              </p>
              <a href="#contact" className="get-in-touch-btn">
                START THE CONVERSATION →
              </a>
            </div>
          </div>
        </section>

        {/* Footer – dark background, logo, contact, Services, Company */}
        <footer className="site-footer">
          <div className="site-footer-container">
            <div className="site-footer-brand">
              <div className="site-footer-logo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 22V12" />
                  <path d="M9 9c0-1.5 1.34-3 3-3s3 1.5 3 3c0 2-1.5 3-3 4.5-1.5-1.5-3-2.5-3-4.5z" />
                </svg>
                <span className="site-footer-name">The Sprout</span>
              </div>
              <p className="site-footer-desc">
                Creating meaningful, human-centered experiences that make people feel connected, valued, and alive.
              </p>
              <div className="site-footer-contact">
                <a href="mailto:hello@thesprout.com" className="site-footer-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  hello@thesprout.com
                </a>
                <a href="tel:+5551234567" className="site-footer-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  (55) 123-4567
                </a>
              </div>
            </div>
            <div className="site-footer-col">
              <h3 className="site-footer-heading">Services</h3>
              <ul className="site-footer-links">
                <li><a href="#experience">Campus Events</a></li>
                <li><a href="#experience">HR & Team Building</a></li>
                <li><a href="#experience">Corporate Activations</a></li>
                <li><a href="#experience">Adventure Experiences</a></li>
              </ul>
            </div>
            <div className="site-footer-col">
              <h3 className="site-footer-heading">Company</h3>
              <ul className="site-footer-links">
                <li><a href="#mission">Our Mission</a></li>
                <li><a href="#mission">Meet Hope</a></li>
                <li><a href="#story">About Us</a></li>
              </ul>
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}

export default App
