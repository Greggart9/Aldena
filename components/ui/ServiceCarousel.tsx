
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Brand Identity",
    description: "We believe a brand identity is a body of work, not just a logo."
  },
  {
    title: "Content & Voice",
    description: "Words and stories that make your brand sound like itself."
  },
  {
    title: "Brand Refresh",
    description: "Repositioned interfaces and motion that bring the brand to life."
  },
  {
    title: "Visual Design",
    description: "Crafting beautiful, functional aesthetics that command attention."
  }
];

export default function ServiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % services.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);

  // Auto-play functionality
  useEffect(() => {
    // Automatically switch to the next slide every 4 seconds
    const timer = setInterval(() => {
      next();
    }, 4000);

    // Clear the interval if the user clicks an arrow or if the component unmounts
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentNumber = String(currentIndex + 1).padStart(2, '0');
  const totalNumber = String(services.length).padStart(2, '0');

  return (
    <div className="w-full sm:w-90 bg-[#111111]/90 backdrop-blur-xl p-4 flex flex-col gap-6">
      
      <div className="space-y-2">
        {/* Progress Bar Track */}
        <div className="h-0.5 w-full bg-white/20 relative overflow-hidden">
          {/* Animated Progress Fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            initial={false}
            animate={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>

        {/* Arrows & Slide Counter */}
        <div className="flex items-center justify-between text-white/70">
          <div className="flex gap-2">
            <button 
              onClick={prev} 
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ArrowLeft size={12} strokeWidth={2.5} />
            </button>
            <button 
              onClick={next} 
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>
          <span className="font-mono text-[13px] font-medium tracking-widest text-white">
            {currentNumber}/{totalNumber}
          </span>
        </div>
      </div>

      {/* BOTTOM CONTENT: Animated Text */}
      <div className="h-20 relative"> 
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex flex-col gap-1"
          >
            <h3 className="text-2xl font-bold text-white tracking-tight font-sans">
              {services[currentIndex].title}
            </h3>
            <p className="text-white/80 leading-snug text-[16px] font-medium">
              {services[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}