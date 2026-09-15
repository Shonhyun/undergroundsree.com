import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import PageTransition from '../components/PageTransition';

import homeImg from '../assets/version/version-1/home.jpeg';
import analyticsImg from '../assets/version/version-1/analytics.jpeg';
import leaderboardImg from '../assets/version/version-1/leaderboard.jpeg';
import marketplace1Img from '../assets/version/version-1/content-marketplace-1.jpeg';
import marketplace2Img from '../assets/version/version-1/content-marketplace-2.jpeg';
import profileImg from '../assets/version/version-1/profile.jpeg';

import contentMessage1Img from '../assets/version/version-2/content-message1.png';
import contentMessage2Img from '../assets/version/version-2/content-message2.png';
import contentMessage3Img from '../assets/version/version-2/content-message3.png';
import offlineModeImg from '../assets/version/version-2/offline-mode.png';
import flashcardsImg from '../assets/version/version-2/flashcards.png';
import profileBadgesImg from '../assets/version/version-2/profile-badges.png';
import themesImg from '../assets/version/version-2/themes.png';
import communityFeedsImg from '../assets/version/version-2/community-feeds.png';
import solutionsBreakdownImg from '../assets/version/version-2/solutions-breakdown.png';

export type UpdateFeature = {
  title: string;
  description: string;
  imageSrc?: string | string[];
  customUI?: React.ReactNode;
};

export type AppVersion = {
  version: string;
  releaseDate: string;
  features: UpdateFeature[];
};

export const appVersions: AppVersion[] = [
  {
    version: 'Version 2.0',
    releaseDate: 'Available on iOS and Android',
    features: [
      {
        title: 'Offline Mode',
        description: 'Study anywhere without an internet connection. Our smart caching system saves your progress locally, allowing you to review your materials even when you\'re offline or have poor wifi.',
        imageSrc: offlineModeImg
      },
      {
        title: 'Content Creator Messaging',
        description: 'Directly message your favorite content creators! You can now communicate with them, avail of their premium exams, and access their custom-uploaded terms and exam materials.',
        imageSrc: [contentMessage1Img, contentMessage2Img, contentMessage3Img]
      },
      {
        title: 'Dynamic Themes',
        description: 'Personalize your learning environment. Switch between beautifully crafted themes to reduce eye strain and match your style. Supported themes: Default Dark, Light Mode, AMOLED Black, Deep Blue, and Midnight Purple.',
        imageSrc: themesImg
      },
      {
        title: 'Smart Flashcards',
        description: 'Memorize formulas faster with interactive, swipe-based flashcards. The app tracks your mastery and automatically curates your "Mistake Flashcards".',
        imageSrc: flashcardsImg
      },
      {
        title: 'Gamified Rank Profile',
        description: 'Earn points every time you take reviews, exams, daily challenges, and quests. There are so many ways to learn and earn XP! Climb the ranks from Bronze to Master Engineer.',
        imageSrc: profileBadgesImg
      },
      {
        title: 'Solution Breakdown',
        description: 'Stop just memorizing answers! Get full, step-by-step explanations for every question so you understand exactly how and why a solution is correct. Our detailed breakdowns help you grasp the underlying methodology.',
        imageSrc: solutionsBreakdownImg
      },
      {
        title: 'Social Activity Feeds',
        description: 'Stay updated with the community! The app automatically posts students\' achievements to this feed. Users cannot post their own status, but you can interact by reacting (like, heart) and commenting on your peers\' automatically posted milestones.',
        imageSrc: communityFeedsImg
      }
    ]
  },
  {
    version: 'Version 1.0',
    releaseDate: 'Initial Release',
    features: [
      {
        title: 'Home Experience',
        description: 'A completely redesigned and highly intuitive home dashboard that surfaces what matters most to your review progress right when you open the app.',
        imageSrc: homeImg,
      },
      {
        title: 'Analytics',
        description: 'Deep dive into your performance with advanced analytics. Identify your weak subjects and track your study milestones with precision.',
        imageSrc: analyticsImg,
      },
      {
        title: 'Leaderboards',
        description: 'See where you stand nationwide. Our dynamic leaderboards rank top performers based on XP, keeping the competitive spirit alive.',
        imageSrc: leaderboardImg,
      },
      {
        title: 'Creator Marketplace',
        description: 'Access premium, community-driven review materials. Topnotchers and instructors can now share and monetize their exclusive study guides and mock exams.',
        imageSrc: [marketplace1Img, marketplace2Img],
      },
      {
        title: 'Your Identity',
        description: 'Personalize your profile. Stand out with unique avatars, bio descriptions, and display your hard-earned academic badges.',
        imageSrc: profileImg,
      },
      {
        title: 'Content Protection',
        description: 'Your valuable review materials and PDFs are exclusively protected. Our robust anti-screenshot technology prevents unauthorized capture and piracy of your premium content.',
        customUI: (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #2a0808, #000)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛡️</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 800, color: '#ff3b30', marginBottom: '10px' }}>Protected</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#888' }}>Screenshots Disabled</div>
          </div>
        )
      },
      {
        title: 'Strict Exclusivity',
        description: 'Users are strictly prohibited from creating multiple accounts. If you already have an existing account, our system will block the creation of duplicates to maintain platform integrity.',
        customUI: (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #082a15, #000)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>👤</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#34c759', marginBottom: '10px' }}>Verified</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#888' }}>Single User Only</div>
          </div>
        )
      },
      {
        title: 'Access Security',
        description: 'You cannot log into your account on another device as long as it remains logged in on your primary device. This strictly prevents account sharing and ensures your progress is solely yours.',
        customUI: (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #081a2a, #000)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔒</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#007aff', marginBottom: '10px' }}>Secured</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#888' }}>Active Session Bound</div>
          </div>
        )
      }
    ]
  }
];

// Dynamic Typewriter Text Component
const DynamicTypewriterText: React.FC<{ text: string; start: boolean }> = ({ text, start }) => {
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    if (!start) {
      setDisplayedLength(0);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 2; // crisp typing speed
      if (current >= text.length) {
        setDisplayedLength(text.length);
        clearInterval(interval);
      } else {
        setDisplayedLength(current);
      }
    }, 14);

    return () => clearInterval(interval);
  }, [start, text]);

  return (
    <span>
      {text.slice(0, displayedLength)}
      {displayedLength < text.length && <span className="cursor blink">|</span>}
    </span>
  );
};

// Side-Shuffling 3D Presentation Feature Row Component
const ShuffleTypewriterFeatureRow: React.FC<{ feature: UpdateFeature; isReverse: boolean }> = ({ feature, isReverse }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical Parallax drift as user scrolls through
  const parallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -50]);

  // Alternating side fly-in shuffle trajectories:
  // Even rows: Mockup flies from Left (-160px), Text flies from Right (+160px)
  // Odd rows (reverse): Mockup flies from Right (+160px), Text flies from Left (-160px)
  const mockupInitialX = isReverse ? 160 : -160;
  const textInitialX = isReverse ? -160 : 160;

  return (
    <motion.div 
      ref={containerRef}
      className={`update-row ${isReverse ? 'reverse' : ''}`}
      style={{ y: parallaxY }}
    >
      {/* Description Text Side */}
      <motion.div 
        className="update-text"
        initial={{ opacity: 0, x: textInitialX }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: textInitialX }}
        transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.9 }}
      >
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {feature.title}
        </motion.h3>
        <p>
          <DynamicTypewriterText text={feature.description} start={isInView} />
        </p>
      </motion.div>
      
      {/* 3D iPhone Mockup Side (Fly-in & Side Shuffle) */}
      <motion.div 
        className="iphone-frame-wrapper"
        initial={{ opacity: 0, x: mockupInitialX, scale: 0.82 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: mockupInitialX, scale: 0.82 }}
        transition={{ type: "spring", stiffness: 110, damping: 15, mass: 1 }}
        whileHover={{ scale: 1.08, rotate: isReverse ? 3 : -3 }}
      >
        <motion.div 
          className="iphone-frame"
          animate={isInView ? {
            rotateY: isReverse ? 14 : -14,
            rotateX: 6,
            y: [-6, 6, -6], // gentle floating ambient motion
          } : {
            rotateY: isReverse ? 36 : -36,
            rotateX: 20,
            y: 0,
          }}
          transition={{
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            rotateY: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            rotateX: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="iphone-edge"></div>
          <div className="btn-mute"></div>
          <div className="btn-vol-up"></div>
          <div className="btn-vol-down"></div>
          <div className="btn-power"></div>
          <div className="iphone-glass"></div>
          <div className="iphone-notch"></div>
          <div className="screen-images">
            {feature.customUI ? (
              feature.customUI
            ) : feature.imageSrc ? (
              Array.isArray(feature.imageSrc) ? (
                (() => {
                  const imgs = feature.imageSrc as string[];
                  return (
                    <div style={{ 
                      display: 'flex', 
                      width: `${imgs.length * 100}%`, 
                      height: '100%', 
                      animation: `screenCarousel${imgs.length} ${imgs.length * 3}s infinite cubic-bezier(0.8, 0, 0.2, 1)` 
                    }}>
                      {imgs.map((src, i) => (
                        <img key={i} src={src} className="iphone-screen" style={{ width: `${100 / imgs.length}%`, height: '100%', objectFit: 'fill' }} alt="Feature" />
                      ))}
                    </div>
                  );
                })()
              ) : (
                <img src={feature.imageSrc} className="iphone-screen" style={{ width: '100%', height: '100%', objectFit: 'fill' }} alt="Feature" />
              )
            ) : (
              <div className="iphone-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505', padding: '20px', textAlign: 'center', height: '100%' }}>
                <p style={{ color: '#888' }}>UI Update<br/><small>{feature.title}</small></p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Updates: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('All');

  return (
    <PageTransition>
      <div className="updates-page">
        <div className="container">
          <motion.div 
            className="updates-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>App Updates & New Features</h1>
            <p>See what's new in Undergrounds REE Review. We are constantly improving your review experience.</p>
          </motion.div>

          <motion.div 
            className="version-filter-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}
          >
            <div className="dropdown-wrapper" style={{ position: 'relative' }}>
              <select 
                value={selectedVersion} 
                onChange={(e) => setSelectedVersion(e.target.value)}
                style={{
                  appearance: 'none',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '12px 40px 12px 20px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                  outline: 'none',
                }}
              >
                <option value="All">All Versions</option>
                {appVersions.map(v => (
                  <option key={v.version} value={v.version}>{v.version}</option>
                ))}
              </select>
              <svg 
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#fff' }} 
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </motion.div>

          {appVersions
            .filter(ver => selectedVersion === 'All' || selectedVersion === ver.version)
            .map((ver, vIndex) => (
            <div key={vIndex} className="version-block">
              <motion.h2 
                className="version-title"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {ver.version} <span style={{ fontSize: '16px', color: 'var(--color-text-light)', fontWeight: 'normal' }}>({ver.releaseDate})</span>
              </motion.h2>

              <div className="features-list">
                {ver.features.map((feature, fIndex) => (
                  <ShuffleTypewriterFeatureRow 
                    key={fIndex} 
                    feature={feature} 
                    isReverse={fIndex % 2 !== 0} 
                  />
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </PageTransition>
  );
};

export default Updates;
