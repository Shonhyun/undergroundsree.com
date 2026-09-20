import React, { useEffect, useRef, useState } from 'react';
import iconImg from '../assets/icon.png';
import './SplashScreen.css';

type Phase = 'initial' | 'icon-in' | 'expanded' | 'exiting' | 'done';

const WORDMARK = 'UNDERGROUNDS';

// Full-motion timeline (ms from start)
//   0–250     overlay        250–750  icon pop        750–1050  hold
//   1050–1850 icon slides    1150–1950 wordmark reveals (overlaps slide)
//   1950–2350 lockup holds   2350–2900 exit
const TIMELINE = {
  iconIn: 250,
  expand: 1050,
  exit: 2350,
  remove: 2950,
};

// Reduced motion: show the finished lockup briefly, then leave
const REDUCED_TIMELINE = {
  iconIn: 0,
  expand: 0,
  exit: 900,
  remove: 1300,
};

// Letter reveal: starts 100ms after the icon begins moving and finishes
// as the icon settles. Delays follow the slide's ease-in-out curve so the
// letters stay locked to the growing edge instead of drifting ahead.
const LETTER_REVEAL_START = 100;
const LETTER_REVEAL_SPAN = 640;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

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

  const lastIndex = WORDMARK.length - 1;

  return (
    <div ref={overlayRef} className={classes.join(' ')} role="presentation" aria-hidden="true">
      <div className="splash-lockup">
        <div className="splash-icon">
          <img src={iconImg} alt="" draggable={false} />
        </div>
        <div className="splash-word-track">
          <div className="splash-word-clip">
            <span className="splash-word">
              {WORDMARK.split('').map((letter, i) => (
                <span
                  key={i}
                  className="splash-letter"
                  style={{
                    transitionDelay: `${Math.round(
                      LETTER_REVEAL_START + easeInOut(i / lastIndex) * LETTER_REVEAL_SPAN
                    )}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
