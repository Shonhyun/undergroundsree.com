import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import iconImg from '../assets/icon.png';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/updates', label: 'Updates' },
  { path: '/enroll', label: 'Enroll' },
  { path: '/support', label: 'Support' },
  { path: '/privacy-policy', label: 'Privacy' },
  { path: '/terms', label: 'Terms' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
          <motion.div 
            className="nav-logo-placeholder"
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src={iconImg} alt="App Icon" />
          </motion.div>
          Undergrounds REE
        </Link>
        
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
