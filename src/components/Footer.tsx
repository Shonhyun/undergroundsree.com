import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import iconImg from '../assets/icon.png';

const footerLinks = [
  { path: '/', label: 'Home' },
  { path: '/updates', label: 'Updates' },
  { path: '/enroll', label: 'Enroll Now' },
  { path: '/support', label: 'Support' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms', label: 'Terms & Conditions' },
  { path: '/account-deletion', label: 'Account Deletion' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <motion.div 
        className="container footer-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="footer-logo" variants={itemVariants}>
          <motion.img 
            src={iconImg} 
            alt="App Icon" 
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          Undergrounds REE
        </motion.div>

        <motion.div className="footer-links" variants={itemVariants}>
          {footerLinks.map((link) => (
            <motion.div 
              key={link.path}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={link.path}>{link.label}</Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="footer-bottom" variants={itemVariants}>
          &copy; {new Date().getFullYear()} Undergrounds REE Review Center. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
