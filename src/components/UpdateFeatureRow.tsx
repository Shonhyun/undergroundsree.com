import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { UpdateFeature } from '../pages/Updates';

// Dynamic Typewriter Text Component
export const DynamicTypewriterText: React.FC<{ text: string; start: boolean }> = ({ text, start }) => {
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
export const ShuffleTypewriterFeatureRow: React.FC<{ feature: UpdateFeature; isReverse: boolean }> = ({ feature, isReverse }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Vertical Parallax drift as user scrolls through
  const parallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -50]);

  // Alternating side fly-in shuffle trajectories:
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
      
      {/* 3D iPhone Mockup Side */}
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
            y: [-6, 6, -6], 
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
