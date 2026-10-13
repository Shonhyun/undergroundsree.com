import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import iconImg from '../assets/icon.png';

/** Shown across the bar. */
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/updates', label: 'Updates' },
  { path: '/enroll', label: 'Enroll' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/support', label: 'Support' },
  { path: '/join', label: 'Community' },
];

/**
 * Tucked behind "More" to keep the bar short. Privacy Policy and Account
 * Deletion live here rather than only in the footer because Google Play
 * asks for links to both.
 */
const moreLinks = [
  { path: '/inquiry', label: 'Inquiry' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms', label: 'Terms & Conditions' },
  { path: '/account-deletion', label: 'Account Deletion' },
];

const IconChevron = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close both menus when the route changes, so the panel is never left
  // hanging over the page the visitor just navigated to.
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  // Dismiss the dropdown on an outside click or Escape.
  useEffect(() => {
    if (!isMoreOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMoreOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMoreOpen]);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const moreIsActive = moreLinks.some(l => l.path === location.pathname);

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <motion.div
            className="nav-logo-placeholder"
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src={iconImg} alt="App Icon" />
          </motion.div>
          <span className="brand-text">Undergrounds REE</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.path}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Link
                  to={link.path}
                  className={isActive ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}

          {/* More dropdown */}
          <div className="nav-more" ref={moreRef}>
            <button
              type="button"
              className={`nav-more-btn ${moreIsActive ? 'active' : ''} ${isMoreOpen ? 'is-open' : ''}`}
              onClick={() => setIsMoreOpen(v => !v)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
            >
              More {IconChevron}
            </button>

            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  className="nav-more-panel"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {moreLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={location.pathname === link.path ? 'active' : ''}
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Drawer */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={isActive ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Same secondary links, listed out rather than nested in a
                dropdown — there is room in the drawer. */}
            <span className="mobile-menu-divider" aria-hidden="true" />
            {moreLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu-secondary ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
