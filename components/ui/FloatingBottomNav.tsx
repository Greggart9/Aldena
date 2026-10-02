'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';

export default function FloatingBottomNav() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Show the floating button only after scrolling down 150px
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setIsOpen(false); // Automatically close the menu if scrolled back to the top
    }
  });

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-5 left-1/2 z-[9900] flex -translate-x-1/2 flex-col items-center"
        >
          {/* Expanded Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                // Dark, translucent backdrop matching the reference
                className="mb-4 flex w-[220px] flex-col items-center bg-black/75 py-6 backdrop-blur-md"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    scroll={false} // Prevents snapping, preserving your page transition
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-[22px] font-sans font-medium text-white transition-colors hover:text-zinc-400"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            // Dark rectangular button matching the reference
            className="flex h-11 w-14 flex-col items-center justify-center gap-1.5  bg-black/80 transition-colors hover:bg-[#1a1a1a]"
            aria-label="Toggle Navigation"
          >
            {/* Top Line */}
            <div 
              className={`h-[1px] w-6 bg-white transition-transform duration-300 ${isOpen ? 'translate-y-[3px] rotate-45' : ''}`} 
            />
            {/* Bottom Line */}
            <div 
              className={`h-[1px] w-6 bg-white transition-transform duration-300 ${isOpen ? '-translate-y-[4px] -rotate-45' : ''}`} 
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}