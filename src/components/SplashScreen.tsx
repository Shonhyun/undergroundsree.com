import React, { useEffect, useRef, useState } from 'react';
import iconImg from '../assets/icon.png';
import './SplashScreen.css';

type Phase = 'initial' | 'icon-in' | 'expanded' | 'exiting' | 'done';

// Full-motion timeline (ms from mount)
const TIMELINE = {
  iconIn: 300,
  expand: 1500,
  exit: 3000,
  remove: 3700,
};

// Reduced motion: show the finished lockup briefly, then leave
const REDUCED_TIMELINE = {
  iconIn: 0,
  expand: 0,
  exit: 1100,
  remove: 1500,
};

const SplashScreen: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('initial');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = reduceMotion ? REDUCED_TIMELINE : TIMELINE;

    let timers: number[] = [];
    let started = false;
    let cancelled = false;

    const start = () => {
      if (started || cancelled) return;
      started = true;
      timers = [
        window.setTimeout(() => setPhase('icon-in'), t.iconIn),
        window.setTimeout(() => setPhase('expanded'), t.expand),
        window.setTimeout(() => setPhase('exiting'), t.exit),
        window.setTimeout(() => setPhase('done'), t.remove),
      ];
    };

    // Give the icon a moment to decode so the pop-in never shows a blank
    // tile, but start regardless after a short cap so a slow or failed
    // asset can never leave the splash stuck on screen.
    const img = new Image();
    img.src = iconImg;
    img.decode().then(start, start);
    const cap = window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      clearTimeout(cap);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Block scroll gestures while the splash is covering the page so the site
  // underneath is revealed at the top, exactly as it loaded.
  useEffect(() => {
    const el = overlayRef.current;
    if (!el || phase === 'exiting' || phase === 'done') return;

    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener('wheel', block, { passive: false });
    el.addEventListener('touchmove', block, { passive: false });
    return () => {
      el.removeEventListener('wheel', block);
      el.removeEventListener('touchmove', block);
    };
  }, [phase]);

  if (phase === 'done') return null;

  const classes = ['splash'];
  if (phase !== 'initial') classes.push('is-icon-in');
  if (phase === 'expanded' || phase === 'exiting') classes.push('is-expanded');
  if (phase === 'exiting') classes.push('is-exiting');

  return (
    <div ref={overlayRef} className={classes.join(' ')} role="presentation" aria-hidden="true">
      <div className="splash-lockup">
        <div className="splash-icon">
          <img src={iconImg} alt="" draggable={false} />
        </div>
        <div className="splash-word-track">
          <div className="splash-word-clip">
            <span className="splash-word">Undergrounds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
