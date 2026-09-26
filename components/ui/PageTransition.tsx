'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import DropTextOnScroll from './DropTextOnScroll';

// Helper function to turn paths like "/projects/nova-grid" into "Nova Grid"
const getPageTitle = (path: string) => {
  if (path === '/') return 'Aldena';
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  
  if (!lastSegment) return 'Aldena';
  
  return lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  // Instantly reset scroll to the top every time the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="overflow-hidden">
        {/* The Page Content */}
        {children}

        {/* 1. EXIT CURTAIN (Slides IN from the left with a slant) */}
        <motion.div
          className="fixed top-0 left-0 w-[140vw] h-screen bg-black z-[9998] origin-center"
          // Creates the slanted edge seen in the video
          style={{ skewX: '-15deg' }}
          // Starts completely off-screen to the left
          initial={{ x: '-200vw' }}
          animate={{ x: '-200vw' }}
          // Sweeps right to cover the screen. -25vw centers the oversized 150vw block perfectly
          exit={{ x: '-25vw' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* 2. ENTER CURTAIN (Starts covering the screen, then slides OUT to the right) */}
        <motion.div
          className="fixed top-0 left-0 w-[150vw] h-screen bg-black z-[9998] origin-center"
          style={{ skewX: '-15deg' }}
          // Picks up exactly where the exit curtain left off
          initial={{ x: '-25vw' }}
          // Sweeps completely off-screen to the right
          animate={{ x: '150vw' }}
          exit={{ x: '150vw' }}
          // Delays to let the user read the text, matching the video's pacing
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
        />

        {/* 3. THE PAGE TITLE (Sits straight on top of the slanted curtain) */}
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          // Synchronizes the exact distance traveled (175vw) so the text stays pinned to the red block
          initial={{ x: '0vw' }}
          animate={{ x: '175vw' }}
          exit={{ x: '175vw' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
        >
          <motion.div
            // Text fades in smoothly as the handoff occurs
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <DropTextOnScroll as="h1" className="text-white text-[100px] lg:text-[150px] font-bold font-baskervville">
                {pageTitle}
            </DropTextOnScroll>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}