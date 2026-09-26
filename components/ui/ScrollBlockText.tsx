'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollBlockTextProps {
  text: string;
  className?: string;
}

export default function ScrollBlockText({ text, className = "" }: ScrollBlockTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordElements = container.querySelectorAll('.word');

    // Animate each word as it hits the viewport midpoint
    gsap.fromTo(
      wordElements,
      { opacity: 0.3 },
      {
        opacity: 1,
        stagger: 0.05, // Slight delay between words for a fluid feel
        scrollTrigger: {
          trigger: container,
          start: 'top 80%', // Starts when the text block enters lower viewport
          end: 'top 40%',   // Reaches full opacity as it hits the upper-middle area
          scrub: true,      // Smoothly binds animation to scrolling up and down
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text]);

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word opacity-30 transition-colors">
          {word}
        </span>
      ))}
    </p>
  );
}