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

const IconSoundOn = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
);

const IconSoundOff = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
);

const AppPromoVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [blocked, setBlocked] = useState(false); // autoplay refused, or reduced motion
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Don't start motion on load; let the viewer choose.
      video.muted = false;
      setMuted(false);
      setBlocked(true);
      return;
    }

    // Try with sound first. Browsers block autoplay that isn't muted, so when
    // that is refused we retry muted — the video still plays, and the viewer
    // can turn sound on with one tap.
    video.muted = false;
    setMuted(false);
    video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => setBlocked(true));
    });
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.ended) video.currentTime = 0;
    setEnded(false);
    setBlocked(false);
    // This runs from a click, so sound is allowed here.
    video.muted = false;
    setMuted(false);
    video.play().catch(() => setBlocked(true));
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  if (failed) return null;

  const showOverlay = ended || blocked;

  return (
    <section id="app-preview" className="promo-section home-first-section">
      <div className="container promo-container">
        <div className="promo-layout">

          {/* Left: description */}
          <motion.div
            className="promo-copy"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="promo-eyebrow">See it in action</span>
            <h2>Here's What's Inside the App</h2>
            <p>
              A quick look at the features you'll be using every day — built to make your
              review faster, sharper, and a lot less stressful.
            </p>
          </motion.div>

          {/* Right: iPhone mockup */}
          <motion.div
            className="promo-phone"
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="promo-btn-silent" aria-hidden="true" />
            <span className="promo-btn-volup" aria-hidden="true" />
            <span className="promo-btn-voldown" aria-hidden="true" />
            <span className="promo-btn-power" aria-hidden="true" />

            <div className="promo-phone-screen">
              <video
                ref={videoRef}
                className="promo-video"
                src={promoVideo}
                playsInline
                preload="metadata"
                onEnded={() => setEnded(true)}
                onError={() => setFailed(true)}
              />

              <span className="promo-notch" aria-hidden="true" />

              {!showOverlay && (
                <button
                  type="button"
                  className="promo-sound"
                  onClick={toggleSound}
                  aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
                >
                  {muted ? IconSoundOff : IconSoundOn}
                  {muted && <span className="promo-sound-hint">Tap for sound</span>}
                </button>
              )}

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
      </div>
    </section>
  );
};

export default AppPromoVideo;
