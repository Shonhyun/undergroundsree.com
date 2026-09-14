import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Initialize Lenis with optimal settings for a premium feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const animate = (time: number) => {
      lenis.raf(time);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
