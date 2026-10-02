"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfiniteLogoTicker from "../ui/marquee";
import TestimonialStack from "../ui/reviewCard";
import DropTextOnScroll from "../ui/DropTextOnScroll";
import { processData } from "@/data/processData";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const [openId, setOpenId] = useState<string>("4");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const borders = section.querySelectorAll(".process-border");
      borders.forEach((border) => {
        gsap.fromTo(
          border,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: border, start: "top 85%", toggleActions: "play none none none" } }
        );
      });
    }, section);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section className="relative h-fit pt-24 pb-10 bg-black overflow-hidden py-24 px-5 sm:px-8 md:px-10">
      <div className="w-full flex flex-col gap-10">
        {/* Section Heading */}
        <div className="ml-0 md:ml-30 lg:ml-55">
          <DropTextOnScroll as="h1" className="font-sans text-[clamp(2rem,5vw,62px)] font-semibold tracking-tight text-white leading-tight max-w-full lg:w-150">
            <span className="block">A refined process</span> built on clarity.
          </DropTextOnScroll>
        </div>

        {/* Process Steps Accordion */}
        <div className="w-full">
          <div ref={sectionRef} className="w-full text-white py-10">
            <div className="flex flex-col">
              {processData.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} onMouseEnter={() => setOpenId(item.id)} className="relative group cursor-pointer py-4 transition-colors duration-300">
                    <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white/5 overflow-hidden">
                      <div className="process-border absolute inset-0 bg-white/30" />
                    </div>

                    <div className="grid grid-cols-12 items-start gap-2 md:gap-4">
                      <div className={`col-span-2 md:col-span-1 font-bold font-mono text-[14px] transition-colors duration-300 ${isOpen ? "text-white" : "text-white/30"}`}>
                        {item.number}
                      </div>

                      <div className="col-span-8 md:col-span-9 md:pl-15 lg:pl-25">
                        <h3 className={`font-mono text-xl sm:text-2xl md:text-[30px] font-bold leading-tight md:leading-9.75 tracking-tight transition-colors duration-300 ${isOpen ? "text-white" : "text-white/30 group-hover:text-white"}`}>
                          {item.title}
                        </h3>

                        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                          <div className="overflow-hidden">
                            <p className="font-sans text-xs md:text-[15px] font-medium text-zinc-400 max-w-md leading-[19.5px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={`col-span-2 text-right font-bold font-mono text-[11px] sm:text-[14px] transition-colors duration-300 ${isOpen ? "text-white" : "text-white/30"}`}>
                        {item.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Brand Ticker & Testimonial Stack */}
        <InfiniteLogoTicker />
        <div className="hidden lg:block">
          <TestimonialStack />
        </div>
      </div>
    </section>
  );
}
