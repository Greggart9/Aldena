'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // useMotionValue tracks the cursor without triggering React renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // useSpring adds a slight, high-end smoothness to the tracking
  const springConfig = { damping: 25, stiffness: 600, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Offset by 6px to perfectly center the 12px (w-3) dot on the actual mouse pointer
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        // This is the magic property that creates the inversion effect
        mixBlendMode: 'difference'
      }}
    />
  );
}