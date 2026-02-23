import { useState } from 'react'
import './StayInspiredSection.css'

export default function StayInspiredSection() {
  const [email, setEmail] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <section className="stay-inspired-section" aria-labelledby="stay-inspired-heading">
      <div className="stay-inspired-container">
        {/* Ornamental background – right-aligned, subtle; uses card image.webp */}
        <div
          className="stay-inspired-ornament"
          role="presentation"
          aria-hidden
          style={{
            backgroundImage: `url('/card%20image.webp')`,
          }}
        />

        <div className="stay-inspired-content">
          <h2 id="stay-inspired-heading" className="stay-inspired-title">
            STAY INSPIRED
          </h2>
          <p className="stay-inspired-subtitle">
            Occasional stories and ideas—curated for those who value intention over inbox noise.
          </p>

          <form
            className="stay-inspired-form"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div className={`stay-inspired-field-wrap ${focused ? 'stay-inspired-field-focused' : ''}`}>
              <input
                type="email"
                id="stay-inspired-email"
                className="stay-inspired-input"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-label="Email address for newsletter"
                autoComplete="email"
              />
            </div>
            <button type="submit" className="stay-inspired-cta">
              STAY IN THE LOOP →
            </button>
          </form>

          <p className="stay-inspired-disclaimer">
            We only share what&apos;s worth your time. No noise. No pressure.
          </p>
        </div>
      </div>
    </section>
  )
}
