"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from 'next/image'
import ScrollBlockText from '@/components/ui/ScrollBlockText'
import TeamSection from '@/components/sections/team'
import BeforeFooter from '@/components/sections/beforeFooter'
import AboutMarquee from '@/components/ui/aboutMarquee'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DropTextOnScroll from "@/components/ui/DropTextOnScroll";


gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroRef = useRef<HTMLElement>(null);
   
    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // HERO TEXT PARALLAX — disabled on small screens for performance
      if (heroRef.current && window.innerWidth >= 768) {
        const heroText = heroRef.current.querySelector(".hero-text");

        if (heroText) {
          gsap.to(heroText, {
            y: -180,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main>

         {/* HERO SECTION */}
         <section
          ref={heroRef}
          className="relative h-[40vh] md:h-[60vh] xl:h-[82vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                src="/assets/asset45.webp"
                alt="Hero Image"
                fill
                sizes="100vw"
                className="object-cover brightness-100 contrast-75"
                priority
                />
            </div>
            <div className="grain"></div>
            <div className="absolute inset-0 bg-black/45"></div>
            
            <div className="hero-text absolute bottom-0 -mb-10 left-4 sm:left-7 z-10 text-white px-4">
              <div>
                <DropTextOnScroll as="h1" className='font-baskervville text-[clamp(3rem,10vw,100px)] font-bold -mb-6 sm:-mb-10'>
                 About Aldena
                </DropTextOnScroll>
                <p className='max-w-sm pt-8 sm:pt-10 text-sm sm:text-base'>Every mark, message, and moment should carry weight — considered, deliberate, unmistakably yours.</p>
              </div>
            </div>

            {/* Trusted by widget — bottom right */}
            <div className="hidden sm:flex absolute bottom-15 right-4 md:right-7 z-10 items-center gap-2 px-5 py-3">
              {/* Overlapping Avatars */}
              <div className="flex items-center">
                {[
                  "/assets/asset32.webp",
                  "/assets/asset31.webp",
                  "/assets/asset34.webp",
                  "/assets/asset44.webp",
                  "/assets/asset43.webp",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-white"
                    style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: i }}
                  >
                    <Image
                      src={src}
                      alt={`client ${i + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="40px"
                    />
                  </div>
                ))}
              </div>

              {/* Stars + Text */}
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-white" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-white">
                  Trusted by 50+ Clients
                </span>
              </div>
            </div>
        </section>

        {/* SECOND SECTION */}
        <section className='py-20 sm:py-24 md:py-32 h-fit bg-black text-white px-5 sm:px-8 md:px-10'>
            {/* TOP CHAT */}
            <div className='flex flex-col lg:flex-row md:justify-between gap-8 md:gap-4'>
                {/* LEFT */}
                <div className='md:flex-1 md:shrink-0'>
                    <p className='uppercase text-zinc-400 font-semibold'>The studio</p>
                </div>
                {/* RIGHT */}
                <div className='md:flex-3'>
                    <span className='text-[clamp(1.4rem,3.5vw,50px)] font-semibold leading-tight '>
                    <ScrollBlockText text="Aldena is a New York studio for brands with something to say. We partner with teams who'd rather stand out than blend in, turning sharp ideas into identities that are clear and made to last." className='md:pr-33 tracking-tight'/>
                     </span>

                    <RevealOnScroll>
                    <div className='flex flex-col md:flex-row pt-10 md:pt-15 w-full md:justify-between gap-6 md:gap-20 text-zinc-400 leading-5 md:pr-17'>
                        <p>Since 2016, we&apos;ve partnered with founders and teams who care as much about the details as we do. At Aldena, branding, design, and content aren&apos;t separate services; they&apos;re one conversation.</p>
                        <span>We craft identities, design systems, and content that connect — pairing sharp strategy with timeless taste. We shape identities with intention, so how you look feel unmistakably yours, year after year.</span>
                    </div>
                  </RevealOnScroll>
                </div>
            </div>

            {/* IMAGE */}
            <div className="relative h-[250px] md:h-[400px] lg:h-[751px] w-full mt-16 md:mt-25">
                <Image
                    src="/assets/asset41.webp" 
                    alt="Typography focus image"
                    fill
                    className="object-cover object-center brightness-110 contrast-85"
                    sizes="100vw"
                />
                <div className="grain"></div>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* OUR VALUES */}
            <div className="relative mt-20">
              <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
                <div className="pt-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-400">
                    Our Values
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <RevealOnScroll>
                  <div className="relative border border-white/20 p-8">
                    <div className="absolute right-6 top-6 flex gap-2">
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <h3 className="max-w-[13ch] font-serif text-4xl">
                        Built to Last
                      </h3>

                      <p className="max-w-[25rem] text-base text-white/75 ">
                        We design for longevity, not trends. Every identity we create is made to feel just as right five years from now.
                      </p>
                    </div>
                  </div>
                  </RevealOnScroll>

                   <RevealOnScroll>
                  <div className="relative border border-white/20 p-8">
                    <div className="absolute right-6 top-6 flex gap-2">
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <h3 className="max-w-[13ch] font-serif text-4xl">
                        One Voice
                      </h3>

                      <p className="max-w-[25rem] text-base text-white/75 ">
                        Design and content are a single conversation. We keep how a brand looks and behaves in sync.
                      </p>
                    </div>
                  </div>
                  </RevealOnScroll>
                  
                  <RevealOnScroll>
                  <div className="relative border border-white/20 bg-[#050505] p-8">
                    <div className="absolute right-6 top-6 flex gap-[5px]">
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white/70" />
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <h3 className="max-w-[13ch] font-serif text-4xl">
                        Clarity First
                      </h3>

                      <p className="max-w-[25rem] text-base text-white/75 ">
                        Good design earns attention; it doesn’t demand it. We cut the excess so the idea does the talking.
                      </p>
                    </div>
                  </div>
                  </RevealOnScroll>
                  
                  <RevealOnScroll>
                  <div className="relative overflow-visible border border-white/20 p-8">
                    <div className="absolute right-6 top-6 flex gap-[5px]">
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white" />
                      <span className="h-1 w-1 rounded-full bg-white" />
                    </div>

                    <div className="flex h-full flex-col justify-between gap-10">
                      <h3 className="max-w-[13ch] font-serif text-4xl">
                        True Partners
                      </h3>

                      <p className="max-w-[25rem] text-base text-white/75 ">
                        We work with you, not just for you. The best work comes from real collaboration in the details.
                      </p>
                    </div>
                  </div>
                  </RevealOnScroll>
                </div>
              </div>

            </div>
          </section>

        {/* THIRD SECTION  */}
        <div>
          <TeamSection />
        </div>

        {/* FOURTH SECTION */}
        <div className='pb-25'>
          <AboutMarquee />
        </div>

        {/* BEFOREFOOTER */}
        <BeforeFooter />

      </main>
    </>
  )
}

export default AboutPage
