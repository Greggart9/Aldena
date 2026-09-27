'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "From day one they understood exactly who we wanted to become. The identity they crafted feels bold, timeless, and unmistakably ours-it has completely changed how people recognise and remember us.",
    name: "Marcus Bennett",
    role: "Founder of Northlight Studio",
    image: "/assets/asset16.webp"
  },
  {
    quote: "Every screen they touched came back sharper, cleaner, and more considered. The visual system they built gives our product a sense of polish and clarity we simply could not achieve on our own.",
    name: "Elena Ruiz",
    role: "Head of Product at Cadence Labs",
    image: "/assets/asset17.webp"
  },
  {
    quote: "They found the words we had been struggling to say for years. Our messaging finally sounds human, confident, and consistent everything we publish now feels like it speaks with one clear voice.",
    name: "Priya Nair",
    role: "Brand Lead at Veritas Group",
    image: "/assets/asset18.webp"
  }
];

export default function TestimonialStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!container || !card1 || !card2) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%', // Scroll distance for both cards to exit
        pin: true,
        scrub: true,
      }
    });

    // 1. First card exits by rotating to the right and sliding up/out
    gsap.set([card1, card2], {
      y: 0,
      x: 0,
      rotation: 0,
      opacity: 1,
    });

    tl.to(card1, {
      yPercent: -120,
      rotation: 10,
      opacity: 1,
      ease: 'power1.inOut',
      duration: 0.5,
    })
      // 2. Second card exits by rotating to the left and sliding up/out, while third card stays anchored
      .to(card2, {
        yPercent: -110, rotation: -8,
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.5,
      }, '+=0.2');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-125 xl:h-screen w-full items-end justify-center overflow-hidden bg-black pb-8 sm:pb-12 md:pb-16">

      <div className="pointer-events-none absolute left-4 top-1/2 z-40 hidden xl:block -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] font-bold tracking-[0.28em] text-white/75 md:left-8">
        HEAR FROM OUR CLIENTS
      </div>

      <div className="pointer-events-none absolute right-4 top-1/2 z-40 hidden xl:block -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[10px] font-bold tracking-[0.28em] text-white/75 md:right-8">
        A BRAND IS A PROMISE
      </div>

      <div className="relative flex h-[min(70vh,620px)] md:h-[min(80vh,620px)] w-full max-w-5xl items-end justify-center px-4 sm:px-8">

        {/* Third Card (Stays straight and seated in position until final unpin) */}
        <div className="absolute bottom-0 z-10 flex h-[min(50vh,570px)] md:h-[min(70vh,570px)] w-full max-w-222.5 flex-col justify-between bg-white p-4 sm:p-6 text-black shadow-2xl">
          <div className="text-lg sm:text-2xl md:text-3xl font-bold max-w-2xl leading-snug  pt-4 sm:pt-7">
            &ldquo;{testimonials[2].quote}&rdquo;
          </div>
          <div className="flex justify-between items-end mt-4 sm:mt-8">
            <div>
              <h4 className="font-bodoni font-bold text-base sm:text-xl">{testimonials[2].name}</h4>
              <p className="font-sans text-xs text-zinc-500 mt-0.5">{testimonials[2].role}</p>
            </div>
            <div className="relative h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden border border-zinc-200 shrink-0">
              <Image src={testimonials[2].image} alt={testimonials[2].name} fill sizes="(min-width: 768px) 112px, (min-width: 640px) 96px, 64px" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Second Card (Slants left as it lifts away) */}
        <div
          ref={card2Ref}
          className="absolute bottom-3 sm:bottom-5 left-1/2 z-20 flex h-[min(50vh,570px)] md:h-[min(70vh,570px)] w-full max-w-227.5 origin-bottom-left flex-col justify-between bg-[#e0e0e0] p-4 sm:p-6 text-black shadow-2xl"
          style={{ translate: '-50% 0' }}
        >
          <div className="font-bold text-lg sm:text-2xl md:text-3xl max-w-2xl leading-snug pt-4 sm:pt-7">
            &ldquo;{testimonials[1].quote}&rdquo;
          </div>
          <div className="flex justify-between items-end mt-4 sm:mt-8">
            <div>
              <h4 className="font-bodoni font-bold text-base sm:text-xl">{testimonials[1].name}</h4>
              <p className="font-sans text-xs text-zinc-500 mt-0.5">{testimonials[1].role}</p>
            </div>
            <div className="relative h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden border border-zinc-200 shrink-0">
              <Image src={testimonials[1].image} alt={testimonials[1].name} fill sizes="(min-width: 768px) 112px, (min-width: 640px) 96px, 64px" className="object-cover" />
            </div>
          </div>
        </div>

        {/* First Card (Rotates slightly right as it goes off screen first) */}
        <div
          ref={card1Ref}
          className="absolute bottom-6 sm:bottom-9 left-1/2 z-30 flex h-[min(50vh,570px)] md:h-[min(70vh,570px)] w-full max-w-237.5 origin-bottom-right flex-col justify-between bg-white p-4 sm:p-6 text-black shadow-2xl"
          style={{ translate: '-50% 0' }}
        >
          <div className="font-bold text-lg sm:text-2xl md:text-3xl leading-snug max-w-2xl pt-4 sm:pt-7">
            &ldquo;{testimonials[0].quote}&rdquo;
          </div>
          <div className="flex justify-between items-end mt-4 sm:mt-8">
            <div>
              <h4 className="font-bodoni font-bold text-base sm:text-xl">{testimonials[0].name}</h4>
              <p className="font-sans text-xs text-zinc-500 mt-0.5">{testimonials[0].role}</p>
            </div>
            <div className="relative h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden border border-zinc-200 shrink-0">
              <Image src={testimonials[0].image} alt={testimonials[0].name} fill sizes="(min-width: 768px) 112px, (min-width: 640px) 96px, 64px" className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}