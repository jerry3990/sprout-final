import { useState, useEffect, useRef } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [logoError, setLogoError] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      if (scrollY <= 50) {
        setIsVisible(true);
      } else if (scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', side: 'left' },
    { id: 'experience', label: 'Experience', side: 'left' },
    { id: 'story', label: 'About', side: 'right' },
    { id: 'contact', label: 'Contact Us', side: 'right' },
  ];

  const leftItems = navItems.filter((item) => item.side === 'left');
  const rightItems = navItems.filter((item) => item.side === 'right');

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden' : ''}`}>
        {/* Blur background element */}
        <div className="navbar-blur"></div>

        {/* Pill-shaped container */}
        <div className="navbar-container">
          {/* Left Navigation */}
          <div className="nav-section nav-left">
            {leftItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                onClick={() => setActiveLink(item.id)}
              >
                {item.label}
                <span className="underline"></span>
              </a>
            ))}
          </div>

          {/* Center Logo - properly centered in pill */}
          <div className="nav-logo-section">
            <a href="#home" className="logo-wrapper" onClick={() => setActiveLink('home')}>
              <div className="logo-image-container">
                <div className="logo-image">
                  {!logoError ? (
                    <img
                      src="/logoblank.png"
                      alt="Sprout"
                      className="logo-img"
                      width={62}
                      height={62}
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <svg width="62" height="62" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-fallback-svg">
                      <circle cx="25" cy="25" r="24" stroke="#f5f5f5" strokeWidth="1.5" />
                      <path d="M25 8L35 18L30 25L35 32L25 42L15 32L20 25L15 18L25 8Z" fill="#f5f5f5" />
                    </svg>
                  )}
                </div>
              </div>
            </a>
          </div>

          {/* Right Navigation */}
          <div className="nav-section nav-right">
            {rightItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                onClick={() => setActiveLink(item.id)}
              >
                {item.label}
                <span className="underline"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-logo">
              <div className="mobile-logo-icon">
                {!logoError ? (
                  <img
                    src="/logoblank.png"
                    alt="Sprout"
                    className="mobile-logo-img"
                    width={52}
                    height={52}
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <svg width="52" height="52" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="24" stroke="#f5f5f5" strokeWidth="1.5" />
                    <path d="M25 8L35 18L30 25L35 32L25 42L15 32L20 25L15 18L25 8Z" fill="#f5f5f5" />
                  </svg>
                )}
              </div>
            </div>

            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <li key={item.id} style={{ '--stagger-delay': `${index * 0.05}s` } as React.CSSProperties}>
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${activeLink === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveLink(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
