import { useState } from 'react'

export default function SiteFooter() {
  const [footerLogoError, setFooterLogoError] = useState(false)

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-brand">
          <div className="site-footer-logo">
            <div className="site-footer-logo-icon">
              {!footerLogoError ? (
                <img
                  src="/logoblank.png"
                  alt=""
                  className="site-footer-logo-img"
                  width={80}
                  height={80}
                  onError={() => setFooterLogoError(true)}
                />
              ) : (
                <svg width="80" height="80" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="25" cy="25" r="24" stroke="#E0E0E0" strokeWidth="1.5" />
                  <path d="M25 8L35 18L30 25L35 32L25 42L15 32L20 25L15 18L25 8Z" fill="#E0E0E0" />
                </svg>
              )}
            </div>
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
              (555) 123-4567
            </a>
            <span className="site-footer-link site-footer-address">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Your City, State
            </span>
          </div>
        </div>
        <div className="site-footer-col">
          <h3 className="site-footer-heading">Services</h3>
          <ul className="site-footer-links">
            <li><a href="/#experience">Campus Events</a></li>
            <li><a href="/#experience">HR & Team Building</a></li>
            <li><a href="/#experience">Corporate Activations</a></li>
            <li><a href="/#experience">Adventure Experiences</a></li>
            <li><a href="/#experience">Community Engagement</a></li>
            <li><a href="/#experience">Trade Shows</a></li>
          </ul>
        </div>
        <div className="site-footer-col">
          <h3 className="site-footer-heading">Company</h3>
          <ul className="site-footer-links">
            <li><a href="/#process">Our Process</a></li>
            <li><a href="/#mission">Meet Hope</a></li>
            <li><a href="/#story">About Us</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span className="site-footer-copyright">© 2025 The Sprout. All rights reserved.</span>
        <div className="site-footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
