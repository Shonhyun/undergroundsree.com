import React from 'react';

import { motion } from 'framer-motion';

const FloatingEnrollButton: React.FC = () => {
  return (
    <motion.div 
      className="floating-enroll-wrapper"
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        delay: 0.8, 
        duration: 0.6,
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
    >
      <motion.div 
        className="floating-arrows"
        animate={{ x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg className="arrow-anim" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSdUGopgYWyTpyTDef17rbCt9CaYm3Yk2kiCqveg-hZbzsgBZg/viewform?usp=send_form" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-enroll-btn"
        >
          <span className="btn-text">Enroll Now!</span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default FloatingEnrollButton;
