'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export interface ProjectCardProps {
  backgroundImage: string;
  image: string;
  href: string;
  title: string;
  scrollingText: string;
  description: string;
  year: string | number;
}

const projects: ProjectCardProps[] = [
  {
    backgroundImage: '/assets/asset03.png',
    image: '/assets/asset01.png',
    href: '/projects/aster-bloom',
    title: 'Aster Bloom',
    scrollingText: 'Aster Bloom',
    description: 'A botanical identity for a skincare brand rooted in slow, seasonal rituals.',
    year: 2024,
  },
  {
    backgroundImage: '/assets/asset04.png',
    image: '/assets/asset06.png',
    href: '/projects/nova-grid',
    title: 'Nova Grid',
    scrollingText: 'Nova Grid',
    description: 'A crisp visual system for a data platform that wanted to feel human.',
    year: 2024,
  },
  {
    backgroundImage: '/assets/asset05.png',
    image: '/assets/asset07.png',
    href: '/projects/marrow-coffee',
    title: 'Marrow Coffee',
    scrollingText: 'Marrow Coffee',
    description: 'A bold, honest identity for a roaster obsessed with origin and craft.',
    year: 2025,
  },
    {
    backgroundImage: '/assets/asset48.png',
    image: '/assets/asset46.png',
    href: '/projects/fern-field',
    title: 'Fern Field',
    scrollingText: 'Fern Field',
    description: 'A content system that lets an architecture studio speak in its own quiet voice.',
    year: 2024,
  },
  {
    backgroundImage: '/assets/asset50.png',
    image: '/assets/asset47.png',
    href: '/projects/halden-press',
    title: 'Halden Press',
    scrollingText: 'Halden Press',
    description: 'An editorial voice and content strategy for an independent literary press.',
    year: 2025,
  },
  {
    backgroundImage: '/assets/asset49.png',
    image: '/assets/asset51.png',
    href: '/projects/ostara-wine',
    title: 'Ostara Wine',
    scrollingText: 'Ostara Wine',
    description: 'An expressive label system for a natural wine label that refuses to sit still.',
    year: 2023,
  },
];

export default function EditorialProjectCard({
  backgroundImage,
  image,
  href,
  title,
  scrollingText,
  description,
  year,
}: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useSpring(useMotionValue(0), {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });
  const cursorY = useSpring(useMotionValue(0), {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  });

  useEffect(() => {
    // Detect touch device — disable hover expand & custom cursor on touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !text || !wrapper) return;

    // Background horizontal scrolling text
    const context = gsap.context(() => {
      gsap.fromTo(
        text,
        { xPercent: 50 },
        {
          xPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Only apply 3D scroll animation on larger screens
      if (window.innerWidth >= 768) {
        gsap.fromTo(
          wrapper,
          { rotateX: 25, scale: 0.9, y: 50 },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 50%',
              end: 'top 30%',
              scrub: true,
            },
          }
        );
      }
    }, container);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const resetHover = () => {
      setIsHovered(false);
    };

    window.addEventListener('scroll', resetHover, { passive: true });
    return () => window.removeEventListener('scroll', resetHover);
  }, []);

  // Custom mouse follower tracking logic for the 'View More' button
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    setIsHovered(true);
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorX.set(x);
    cursorY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center perspective-[1000px]"
    >
      {/* Background Layer with Grain Component Style */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 z-10" />
        <Image 
          src={backgroundImage} 
          alt={`${title} background`} 
          fill
          sizes="100vw"
          className="object-cover contrast-100"
        />
        <div className="absolute grain inset-0 pointer-events-none" />
      </div>

      {/* Central Scrolling Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none -z-5">
        <div
          ref={textRef}
          className="flex w-max shrink-0 whitespace-nowrap font-baskervville text-[14vw] font-bold tracking-[-0.02em] text-white/10"
        >
          <span className="pr-[14vw]">{scrollingText}</span>
          <span className="pr-[14vw]">{scrollingText}</span>
        </div>
      </div>

        {/* Main Wrapper Div */}
      <div className="sticky  w-full max-w-5xl px-4 flex flex-col items-center">
        <Link 
          href={href}
          className="relative block w-full"
        >
          {/* Expanding Container (Starts Square, Extends to Rectangle on Hover) */}
          <motion.div
            ref={wrapperRef}
            onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
            onMouseMove={handleMouseMove}
            animate={isTouchDevice ? {} : { width: isHovered ? 1000 : 470 }}
            className={`relative mx-auto flex-none overflow-hidden ${
              isTouchDevice
                ? 'w-full max-w-[600px] h-[340px] sm:h-[420px]'
                : `h-[490px] ${isHovered ? 'cursor-none' : 'cursor-auto'}`
            }`}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image Inside the Expanding Div */}
            <Image 
              src={image} 
              alt={title}
              fill
              sizes="(max-width: 1024px) calc(100vw - 2rem), 1000px"
              className="object-cover object-center transition-transform duration-700 "
            />

            <motion.div
              animate={{ opacity: isHovered ? 0.4 : 0.6 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
            />

            {/* Floating Cursor 'View More' Button — desktop only */}
            {!isTouchDevice && (
              <motion.div
                style={{ x: cursorX, y: cursorY }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ opacity: { duration: 0.3 } }}
                className="pointer-events-none absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="px-5 py-2.5 bg-transparent outline-2 outline-white text-white font-mono uppercase tracking-widest text-xs font-bold  shadow-2xl whitespace-nowrap block">
                  View More
                </span>
              </motion.div>
            )}
          </motion.div>
        </Link>

        {/* Bottom Details Bar (Matches Width Extension & Justified Between) */}
        <motion.div
          animate={isTouchDevice ? {} : { width: isHovered ? 1000 : 490 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`mt-4 flex items-end justify-between px-2 text-white ${
            isTouchDevice ? 'w-full max-w-[600px]' : ''
          }`}
        >
          {/* Bottom Left: Title & Body */}
          <div className="max-w-[60%]">
            <h3 className="font-san-serif text-2xl font-bold tracking-tight text-white">
              {title}
            </h3>
            <p className="font-san-serif text-sm text-white/80 mt-1 tracking-wide">
              {description}
            </p>
          </div>

          {/* Bottom Right: Year */}
          <div className="self-start font-sans-serif text-sm tracking-wide text-white">
            {year}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export function ProjectSection({ limit }: { limit?: number }) {
  return (
    <section>
      {projects.slice(0, limit).map((project) => (
        <EditorialProjectCard key={project.href} {...project} />
      ))}
    </section>
  );
}