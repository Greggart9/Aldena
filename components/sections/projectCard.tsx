"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

import { projectsList } from "@/data/projectsData";

const emptySubscribe = () => () => {};

export interface ProjectCardProps {
  backgroundImage: string;
  image: string;
  href: string;
  title: string;
  scrollingText: string;
  description: string;
  year: string | number;
}

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
  const isTouchDevice = useSyncExternalStore(
    emptySubscribe,
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    () => false
  );

  const cursorX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: 0.5 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !text || !wrapper) return;

    const context = gsap.context(() => {
      gsap.fromTo(text, { xPercent: 50 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: true } });

      if (window.innerWidth >= 768) {
        gsap.fromTo(wrapper, { rotateX: 25, scale: 0.9, y: 50 }, { rotateX: 0, scale: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: container, start: "top 50%", end: "top 30%", scrub: true } });
      }
    }, container);

    return () => { context.revert(); };
  }, []);

  useEffect(() => {
    const resetHover = () => setIsHovered(false);
    window.addEventListener("scroll", resetHover, { passive: true });
    return () => window.removeEventListener("scroll", resetHover);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    setIsHovered(true);
    const rect = wrapperRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center perspective-[1000px]">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <Image src={backgroundImage} alt={`${title} background`} fill sizes="100vw" className="object-cover contrast-100" priority={false} />
        <div className="absolute grain inset-0 pointer-events-none" />
      </div>

      {/* Scrolling Text Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none -z-5">
        <div ref={textRef} className="flex w-max shrink-0 whitespace-nowrap font-baskervville text-[14vw] font-bold tracking-[-0.02em] text-white/10">
          <span className="pr-[14vw]">{scrollingText}</span>
          <span className="pr-[14vw]">{scrollingText}</span>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="sticky w-full max-w-5xl px-4 flex flex-col items-center">
        <Link href={href} className="relative block w-full">
          <motion.div
            ref={wrapperRef}
            onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
            onMouseMove={handleMouseMove}
            animate={isTouchDevice ? {} : { width: isHovered ? 1000 : 470 }}
            className={`relative mx-auto flex-none overflow-hidden ${isTouchDevice ? "w-full max-w-[600px] h-[340px] sm:h-[420px]" : `h-[490px] ${isHovered ? "cursor-none" : "cursor-auto"}`}`}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image src={image} alt={title} fill sizes="(max-width: 1024px) calc(100vw - 2rem), 1000px" className="object-cover object-center transition-transform duration-700" />
            <motion.div animate={{ opacity: isHovered ? 0.4 : 0.6 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {!isTouchDevice && (
              <motion.div style={{ x: cursorX, y: cursorY }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ opacity: { duration: 0.3 } }} className="pointer-events-none absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                <span className="px-5 py-2.5 bg-transparent outline-2 outline-white text-white font-mono uppercase tracking-widest text-xs font-bold shadow-2xl whitespace-nowrap block">
                  View More
                </span>
              </motion.div>
            )}
          </motion.div>
        </Link>

        {/* Card Details Footer */}
        <motion.div animate={isTouchDevice ? {} : { width: isHovered ? 1000 : 490 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className={`mt-4 flex items-end justify-between px-2 text-white ${isTouchDevice ? "w-full max-w-[600px]" : ""}`}>
          <div className="max-w-[60%]">
            <h3 className="font-sans text-2xl font-bold tracking-tight text-white">{title}</h3>
            <p className="font-sans text-sm text-white/80 mt-1 tracking-wide">{description}</p>
          </div>
          <div className="self-start font-sans text-sm tracking-wide text-white">{year}</div>
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectSection({ limit }: { limit?: number }) {
  return (
    <section>
      {projectsList.slice(0, limit).map((project) => (
        <EditorialProjectCard key={project.href} {...project} />
      ))}
    </section>
  );
}