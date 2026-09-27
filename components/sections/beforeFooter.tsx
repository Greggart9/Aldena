"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidCarveButton from "../ui/LiquidCarveButton";

gsap.registerPlugin(ScrollTrigger);

const BeforeFooter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only run the expensive pin + scrub on tablet+ screens
      // if (window.innerWidth < 768) return;

      // Pin the section during scroll to control the text split via scrub
      gsap.to(leftTextRef.current, {
        xPercent: -45, // Moves "Great Work" to the left
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // Pin duration mapped to scroll distance
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.to(rightTextRef.current, {
        xPercent: 45, // Moves "Starts Here" to the right
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-black text-white w-full h-screen relative overflow-hidden flex flex-col justify-between p-8 md:p-12 font-sans select-none"
    >
      {/* Top Header Information */}
      <div className="flex justify-between items-center w-full font-bold text-xs uppercase tracking-widest text-zinc-300">
        <span>SINCE 2016</span>
        <span>BRANDING & CONTENT</span>
      </div>

      {/* Center Wrapper: Image & Splitting Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Center Image with Grain Container */}
        <div className="relative z-20 flex flex-col items-center pointer-events-auto">
          <div className="relative overflow-hidden">
            <video
              src="/assets/v_asset1.mp4"
              autoPlay
              muted
              loop
              playsInline
              width={400}
              height={400}
              poster="/assets/asset5.webp"
              suppressHydrationWarning
              className="h-[390px] w-[390px] object-cover object-center md:h-[400px] md:w-[400px]"
            />
            <div className="grain"></div>
          </div>
                              <span className="mt-12">
                              <LiquidCarveButton 
                              variant="black"
                              label="START A PROJECT"
                              link="/contact" 
                              newTab={false} 
                              />
                              </span>
        </div>

        {/* Splitting Large Typography Overlay */}
        <div className="absolute -mt-30 z-30 flex items-center justify-center w-full px-4 overflow-hidden pointer-events-none">
          <div className="flex flex-col md:flex-row items-center leading-none md:leading-none justify-center gap-2 md:gap-4 text-[clamp(2.5rem,10vw,145px)] font-baskervville font-bold tracking-tight whitespace-nowrap">
            <h2 ref={leftTextRef} className="will-change-transform">
              Great Work
            </h2>
            <h2 ref={rightTextRef} className="will-change-transform">
              Starts Here
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="flex justify-between items-end w-full z-40 font-bold text-xs uppercase tracking-widest text-zinc-300">
        <span>50+ BRANDS SHAPED</span>
        <span>BASED IN NEW YORK</span>
      </div>
    </section>
  );
};

export default BeforeFooter;