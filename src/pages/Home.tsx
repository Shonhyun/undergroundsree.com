import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import '../App.css';

// Import local assets
import clibournImg from '../assets/clibourn.jpg';
import appStoreImg from '../assets/app-store.png';
import playStoreImg from '../assets/play-store.png';
import qrCodeImg from '../assets/qr-code-group.jpeg';
import PageTransition from '../components/PageTransition';
import { useAppContext } from '../context/AppContext';
import { appVersions } from './Updates';
import { ShuffleTypewriterFeatureRow } from '../components/UpdateFeatureRow';

// Segment-based Typing Animation Component
type Segment = { text: string; highlight?: boolean; type?: 'cursor' };
const TypewriterText = ({ segments, startTyping, speed = 15, delay = 0, showCursor = false }: { segments: Segment[], startTyping: boolean, speed?: number, delay?: number, showCursor?: boolean }) => {
  const fullText = segments.map(s => s.text).join('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!startTyping) return;
    
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentIndex(c => {
          if (c >= fullText.length - 1) {
            clearInterval(timer);
            setIsDone(true);
            return fullText.length;
          }
          return c + 1;
        });
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [startTyping, fullText, speed, delay]);

  let remaining = currentIndex;
  
  return (
    <>
      {segments.map((seg, i) => {
        if (remaining <= 0) return null;
        const take = Math.min(seg.text.length, remaining);
        remaining -= take;
        const content = seg.text.slice(0, take);
        
        if (seg.highlight) {
          return <span key={i} className="highlight">{content}</span>;
        }
        return <span key={i}>{content}</span>;
      })}
      {showCursor && !isDone && <span className="cursor blink">|</span>}
    </>
  );
};

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [startAboutTyping, setStartAboutTyping] = useState(false);
  const { openModal } = useAppContext();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'about-text-container') {
              setStartAboutTyping(true);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  const APP_STORE_LINK = "https://apps.apple.com/us/app/undergrounds-ree-review/id6745921735";
  const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.undergrounds.reviewcenterapp&pcampaignid=web_share";
  const GROUP_CHAT_LINK = "https://m.me/ch/AbbLJzyPOXZRq0oy/?send_source=cm%3Acopy_invite_link&join_source=cm%3Axma";

  return (
    <PageTransition>
      {/* Latest Update Section — first on the page, so it clears the fixed navbar */}
      <section className="latest-update updates-page latest-update-first">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '0' }}
          >
            <span className="highlight" style={{ marginBottom: '16px', display: 'inline-block', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Latest Release</span>
            <h2 style={{ fontSize: '42px', marginBottom: '20px', letterSpacing: '-1px' }}>{appVersions[0].version} Features</h2>
            <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto' }}>We've just released a massive update! Scroll down to see everything new you can enjoy today.</p>
          </motion.div>

          <div className="version-block" style={{ marginTop: '80px', marginBottom: '0' }}>
            <div className="features-list">
              {appVersions[0].features.map((feature, fIndex) => (
                <ShuffleTypewriterFeatureRow
                  key={fIndex}
                  feature={feature}
                  isReverse={fIndex % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="community">
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="highlight" style={{ marginBottom: '16px', display: 'inline-block', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Community</span>
            <h2 style={{ fontSize: '42px', marginBottom: '20px', letterSpacing: '-1px' }}>Join the Undergrounds Group Chat</h2>
            <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
              Connect with fellow students, get updates, and join the discussion. Scan the QR code below or click the button to join directly.
            </p>

            <motion.div
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(139,92,246,0.08) 100%)',
                border: '1px solid rgba(37,99,235,0.2)',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
              }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', marginBottom: '30px' }}>
                <img
                  src={qrCodeImg}
                  alt="QR Code to Join Group Chat"
                  style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>

              <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>Can't scan? Click below to join directly:</p>

              <a
                href={GROUP_CHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '18px', fontWeight: 'bold' }}
              >
                Join Group Chat
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="offers">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2>What We Offer</h2>
            <p>Comprehensive review programs designed to fit your unique learning style and schedule.</p>
          </motion.div>

          <motion.div
            className="offer-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="offer-card"
              variants={scaleUpVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Online Teaching</h3>
              <p>100% pure online review with live teaching sessions, recorded replays, and digital handouts accessible anywhere.</p>
            </motion.div>

            <motion.div
              className="offer-card"
              variants={scaleUpVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Mobile App</h3>
              <p>Experience an intuitive app designed for easy access for every student. It helps you learn more with smart features to supercharge your review.</p>
            </motion.div>

            <motion.div
              className="offer-card"
              variants={scaleUpVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Materials</h3>
              <p>Solution sets and objective-type questions that strictly follow the latest trends in the board exams, ensuring your review is always up-to-date.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section — mid-page now, so the navbar clearance padding is trimmed */}
      <section id="home" className="hero hero-mid">
        <motion.div
          className="container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1 variants={fadeInUpVariant}>
            Pass the Board Exam, the Undergrounds Way.
          </motion.h1>
          <motion.p variants={fadeInUpVariant}>
            Your ultimate companion for the <span className="highlight">Registered Electrical Engineering</span> Board Exam. 
            Access expertly crafted lectures, dynamic quizzes, and real-time mock exams based on the latest syllabus. 
            Everything you need to succeed is right in your pocket.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeInUpVariant}>
            <motion.a 
              href={APP_STORE_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-btn white-btn"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={appStoreImg} alt="App Store" className="store-icon" />
              <div className="store-btn-text">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </motion.a>
            <motion.a 
              href={PLAY_STORE_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="store-btn white-btn"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={playStoreImg} alt="Google Play" className="store-icon" />
              <div className="store-btn-text">
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits">
        <div className="container">
          <motion.div 
            className="benefits-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <h2>The Ultimate Review Companion</h2>
            <p>
              Undergrounds REE Review is your all-in-one mobile learning platform, built to help engineering students conquer the board exam. Interactive, community-driven, and always in your pocket.
            </p>
            <p>
              Reviewing is hard enough — it shouldn't be boring or outdated. Undergrounds adapts to your learning pace and rewards your progress every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Tools for Topnotchers</h2>
            <p>Discover the cutting-edge features that make Undergrounds REE the #1 choice for electrical engineering reviewers nationwide.</p>
          </motion.div>
          
          <motion.div 
            className="feature-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              {
                iconClass: 'icon-red',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"></line><path d="M8.5 8.5a10.5 10.5 0 0 0-4.5 2.5"></path><path d="M16 12.5a5 5 0 0 0-4-1.5"></path><path d="M12 16a2 2 0 0 0-2 2"></path><path d="M20.5 8.5a10.5 10.5 0 0 0-7-3.5"></path><path d="M17.5 11.5a7 7 0 0 0-5-2"></path></svg>,
                title: 'Offline Mode',
                description: 'Study anywhere with our smart caching system that saves your progress. Plus, our anti-screenshot protection ensures premium materials are highly secured against unauthorized recording.'
              },
              {
                iconClass: 'icon-blue',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                title: 'Structured Learning Paths',
                description: 'Master critical subjects without the overwhelm. The app organizes your review seamlessly into core categories: Engineering Mathematics (MATH), Engineering Sciences and Allied Subjects (ESAS), Electrical Engineering (EE), and Comprehensive Refresher modules.'
              },
              {
                iconStyle: { background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' },
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
                title: 'Smart Analytics & Suggestions',
                description: 'Stop thinking about what to study next. Our smart analytics tracks your progress, identifies the exact modules where you\'re struggling, and automatically suggests the stepping stones you need to master.'
              },
              {
                iconClass: 'icon-purple',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
                title: 'Student Teacher Inquiry',
                description: 'Connect directly with our expert instructors. Got a tough question? Send a message and get personalized guidance and explanations to ensure you fully understand the concepts.'
              },

              {
                iconClass: 'icon-indigo',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>,
                title: 'Scientific Calculator',
                description: 'Say goodbye to switching apps. Undergrounds features a fully functional, built-in scientific calculator that is instantly accessible anytime during your exams and practice sessions.'
              },
              {
                iconClass: 'icon-pink',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
                title: 'Creator Marketplace',
                description: 'An ecosystem for learning. Access premium modules from top educators and directly message content creators to address concerns about their uploaded materials. Experts can also become verified creators to build their reputation!'
              },
              {
                iconClass: 'icon-yellow',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
                title: 'Gamification & Rankings',
                description: 'Turn review into a journey. Earn XP for correct answers, track your win rates, and climb the Global Leaderboard to prove your prowess nationwide.'
              },
              {
                iconStyle: { background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' },
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
                title: 'Daily Challenges',
                description: 'Every day is a challenge. Automatically receive fresh, random challenges every time you open the app to keep your mind sharp and ensure you\'re always learning something new.'
              }
            ].map((feat, index) => (
              <motion.div 
                key={index} 
                className="feature-card" 
                variants={fadeInUpVariant}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <div className={`feature-icon ${feat.iconClass || ''}`} style={feat.iconStyle}>
                  {feat.icon}
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container about-content">
          <motion.div 
            id="about-text-container" 
            className="about-text" 
            ref={aboutRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <h2>
              <TypewriterText 
                segments={[{ text: "Meet Engr. Clibourn E. Quiapo" }]} 
                startTyping={startAboutTyping} 
                speed={30} 
                delay={0}
                showCursor={true}
              />
            </h2>
            <p>
              <TypewriterText 
                segments={[{ text: "Engr. Clibourn is the founder of Undergrounds REE Review Center, and a practicing electrical contractor. He started the Undergrounds project in June 2025 with a dedicated mission to help students review efficiently and achieve their dreams of becoming licensed engineers." }]} 
                startTyping={startAboutTyping} 
                speed={15} 
                delay={1500} 
              />
            </p>
            <p>
              <TypewriterText 
                segments={[
                  { text: "Today, over " },
                  { text: "5,000 users", highlight: true },
                  { text: " have downloaded the app on iOS and Android, trusting the Undergrounds REE Review Center to prepare for their upcoming licensure exams. By offering structured, high-quality, and accessible review materials, the platform ensures that every student, whether enrolled locally or reviewing independently, is equipped for success." }
                ]} 
                startTyping={startAboutTyping} 
                speed={15} 
                delay={4500} 
              />
            </p>
          </motion.div>

          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <img src={clibournImg} alt="Engr. Clibourn E. Quiapo" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <motion.div 
          className="container contact-wrapper"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="contact-info">
            <h2>Need Assistance?</h2>
            <p>
              Whether you need technical support, have questions about our review programs, or just want to connect, our team is always ready to help you succeed.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                support@undergroundsree.com
              </div>
              <div className="contact-detail-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +63 912 345 6789
              </div>
            </div>
          </div>
          
          <div className="contact-options">
            <motion.button 
              onClick={openModal} 
              className="contact-card"
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>Submit a Request</span>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default Home;
