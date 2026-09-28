import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import promoVideo from '../assets/app-promotion.mp4';
import './AppPromoVideo.css';

const IconReplay = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
);

const IconPlay = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20" /></svg>
);

const AppPromoVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [blocked, setBlocked] = useState(false); // autoplay refused, or reduced motion
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Don't start motion on load; let the viewer choose.
      setBlocked(true);
      return;
    }

    // Autoplay only works muted. If the browser still refuses, fall back to a
    // play button rather than leaving a dead frame on screen.
    const attempt = video.play();
    if (attempt) attempt.catch(() => setBlocked(true));
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    setEnded(false);
    setBlocked(false);
    video.play().catch(() => setBlocked(true));
  };

  if (failed) return null;

  const showOverlay = ended || blocked;

  return (
    <section id="app-preview" className="promo-section home-first-section">
      <div className="container promo-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="promo-eyebrow">See it in action</span>
          <h2>Here's What's Inside the App</h2>
          <p>
            A quick look at the features you'll be using every day — built to make your
            review faster, sharper, and a lot less stressful.
          </p>
        </motion.div>

        {/* Phone mockup: the source video is vertical, so it is framed as a
            handset rather than letterboxed into a wide box. */}
        <motion.div
          className="promo-phone"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="promo-phone-screen">
            <video
              ref={videoRef}
              className="promo-video"
              src={promoVideo}
              muted
              playsInline
              preload="metadata"
              onEnded={() => setEnded(true)}
              onError={() => setFailed(true)}
            />

            {showOverlay && (
              <button
                type="button"
                className="promo-replay"
                onClick={play}
                aria-label={ended ? 'Watch again' : 'Play video'}
              >
                <span className="promo-replay-btn">
                  {ended ? IconReplay : IconPlay}
                  {ended ? 'Watch again' : 'Play'}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppPromoVideo;
