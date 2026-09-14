import React from 'react';
import { motion } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.99 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
