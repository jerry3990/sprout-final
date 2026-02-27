import { useState } from 'react'
import Navbar from '../components/navbar'
import SiteFooter from '../components/SiteFooter'
import './ContactPage.css'

const EXPERIENCE_TYPES = [
  'Campus Events',
  'HR & Team Building',
  'Corporate Activations',
  'Adventure Experiences',
  'Community Engagement',
  'Trade Shows',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    experienceType: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - could integrate with backend later
    console.log('Contact form submitted:', formData)
  }

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">
              GET IN TOUCH WITH <span className="contact-hero-title-accent">US</span>
            </h1>
            <p className="contact-hero-subtitle">
              Experiences built with intention where connection feels natural and lasting.
            </p>
          </div>
          <div className="contact-hero-ornament" aria-hidden />
        </section>

        <section className="contact-main">
          <div className="contact-main-bg" aria-hidden />
          <div className="contact-main-container">
            <div className="contact-info">
              <h2 className="contact-info-heading">GET IN TOUCH WITH US</h2>
              <p className="contact-info-p">
                Occasional stories, ideas, and moments that show how meaningful experiences come to life.
              </p>
              <h3 className="contact-info-subheading">FOR GENERAL QUERIES</h3>
              <p className="contact-info-p">
                Occasional stories, ideas, and moments that show how meaningful experiences come to life.
              </p>
            </div>

            <div className="contact-mandala" aria-hidden>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9a227" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="4" fill="url(#mandalaGrad)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <circle cx="100" cy="60" r="2" fill="url(#mandalaGrad)" opacity="0.8" />
                    <circle cx="100" cy="80" r="1.5" fill="url(#mandalaGrad)" opacity="0.6" />
                    <path d="M100 55 Q105 70 100 85 Q95 70 100 55" fill="none" stroke="url(#mandalaGrad)" strokeWidth="0.5" opacity="0.5" />
                  </g>
                ))}
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
                  <g key={deg} transform={`rotate(${deg} 100 100)`}>
                    <circle cx="100" cy="70" r="1" fill="url(#mandalaGrad)" opacity="0.4" />
                  </g>
                ))}
              </svg>
            </div>

            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-field">
                  <label htmlFor="experienceType">Select the Type of experience</label>
                  <select
                    id="experienceType"
                    name="experienceType"
                    value={formData.experienceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose an experience type</option>
                    {EXPERIENCE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="contact-form-field">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder=""
                  />
                </div>
                <button type="submit" className="contact-form-submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  )
}
