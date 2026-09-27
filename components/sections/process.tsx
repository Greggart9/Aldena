'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteLogoTicker from '../ui/marquee';
import TestimonialStack from '../ui/reviewCard';
import DropTextOnScroll from '../ui/DropTextOnScroll';

gsap.registerPlugin(ScrollTrigger);

interface ProcessItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
}

const processData: ProcessItem[] = [
  {
    id: '1',
    number: '001',
    title: 'Discovery',
    duration: '1 - 2 WEEKS',
    description: "We start by getting under the skin of your business — interviewing stakeholders, auditing your current brand, and mapping the competitive landscape. The goal is a clear, shared understanding of where you are and where you want to go."
  },
  {
    id: '2',
    number: '002',
    title: 'Strategy',
    duration: '1 WEEK',
    description: "With the research in hand, we define the strategic foundation — your positioning, messaging, and the core narrative that sets you apart. This becomes the blueprint that guides every creative and design decision that follows."
  },
  {
    id: '3',
    number: '003',
    title: 'Design',
    duration: '2 - 3 WEEKS',
    description: "This is where the vision takes shape. We explore directions, refine the details, and craft a distinctive visual identity — from typography and colour to the finer moments that make the work feel unmistakably yours."
  },
  {
    id: '4',
    number: '004',
    title: 'Development',
    duration: '2 - 4 WEEKS',
    description: "We bring the designs to life with clean, performant build work. Every interaction is considered and every breakpoint tested, so the final product feels as good as it looks across every device and screen."
  },
  {
    id: '5',
    number: '005',
    title: 'Launch',
    duration: '1 WEEK',
    description: "With everything polished and approved, we prepare for a smooth launch. We handle the final checks, hand over the assets and guidelines, and make sure you are set up to carry the work forward with confidence."
  }
];


export default function Process() {

    const [openId, setOpenId] = useState<string>('4'); // Default open index 4 like screenshot
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const borders = section.querySelectorAll('.process-border');

    // Animate bottom borders from left to right once when entering view (no reverse)
    borders.forEach((border) => {
      gsap.fromTo(
        border,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: border,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);



  return (
    <section className="relative  h-fit pt-24 pb-10 bg-black overflow-hidden py-24 px-5 sm:px-8 md:px-10">

        <div className="w-full flex flex-col gap-10">

            {/* TOP */}
            <div className="ml-0 md:ml-30 lg:ml-55 ">
                <DropTextOnScroll as='h1' className="font-sans text-[clamp(2rem,5vw,62px)] font-semibold tracking-tight text-white leading-tight max-w-full lg:w-150">
                        <span className="block">A refined process</span> built on clarity.
                </DropTextOnScroll>
            </div>  

            {/* MIDDLE */}
            <div className="w-full">
                <div ref={sectionRef} className="w-full text-white py-10">
                    <div className="flex flex-col">
                        {processData.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div 
                            key={item.id}
                            onMouseEnter={() => setOpenId(item.id)}
                            className="relative group cursor-pointer py-4 transition-colors duration-300"
                            >
                            {/* Bottom Border line that draws once from left to right */}
                            <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white/5 overflow-hidden">
                                <div className="process-border absolute inset-0 bg-white/30" />
                            </div>

                            <div className="grid grid-cols-12 items-start gap-2 md:gap-4">
                                
                                {/* Number */}
                                <div className={`col-span-2 md:col-span-1 font-bold font-mono text-[14px] transition-colors duration-300 ${
                                isOpen ? 'text-white' : 'text-white/30'
                                }`}>
                                {item.number}
                                </div>

                                {/* Title & Smoothly Expanding Description */}
                                <div className="col-span-8 md:col-span-9 md:pl-15 lg:pl-25">
                                <h3 className={`font-mono text-xl sm:text-2xl md:text-[30px] font-bold leading-tight md:leading-9.75 tracking-tight transition-colors duration-300 ${
                                    isOpen ? 'text-white' : 'text-white/30 group-hover:text-white'
                                }`}>
                                    {item.title}
                                </h3>

                                {/* Smooth Collapse / Expand Container */}
                                <div className={`grid transition-all duration-500 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                                }`}>
                                    <div className="overflow-hidden">
                                    <p className="font-sans text-xs md:text-[15px] font-medium text-zinc-400 max-w-md leading-[19.5px]">
                                        {item.description}
                                    </p>
                                    </div>
                                </div>
                                </div>

                                {/* Duration */}
                                <div className={`col-span-2 text-right font-bold font-mono text-[11px] sm:text-[14px] transition-colors duration-300 ${
                                isOpen ? 'text-white' : 'text-white/30'
                                }`}>
                                {item.duration}
                                </div>

                            </div>
                            </div>
                        );
                        })}
                    </div>
                    </div>

            </div>  

            {/* BOTTOM */}
            <div>
                <InfiniteLogoTicker />
            </div>

            <div className="hidden lg:block">
                <TestimonialStack />
            </div>
        </div>
    </section>
    )};    
