
"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";  
import ScrollBlockText from "@/components/ui/ScrollBlockText";
import TiltCard from "@/components/ui/TiltCard";
import { ProjectSection } from "@/components/sections/projectCard";
import ServiceHoverCard from "@/components/sections/services";
import Process from "@/components/sections/process";
import LiquidCarveButton from "@/components/ui/LiquidCarveButton";
import FAQSection from "@/components/sections/faq";
import StudioSection from "./sections/studio";
import BeforeFooter from "./sections/beforeFooter";
import RevealOnScroll from "./ui/RevealOnScroll";
import ServiceCarousel from "./ui/ServiceCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function LandingPage() {
    const heroRef = useRef<HTMLElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            if (!backgroundRef.current) return;
            // Disable parallax on small screens for performance
            if (window.innerWidth < 768) return;

            gsap.to(backgroundRef.current, {
                y: -180,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, heroRef);

        return () => context.revert();
    }, []);

    return (
        <main className="relative h-fit overflow-hidden"> 
            
            <div ref={backgroundRef} className="absolute left-0 top-0 z-0 h-screen md:h-[calc(100vh+180px)] w-screen image-wrap">
                <Image src="/assets/asset2.webp"
                alt="asset2" 
                width={1920}
                height={1080}
                className="h-full w-full object-cover object-[50%_20%] lg:object-center brightness-100 contrast-75"   
                sizes="100vw"
                priority
                />
                <div className="grain"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>
              
              {/* FIRST SECTION */}
            <section ref={heroRef} className="relative z-10 h-screen min-h-screen justify-between flex flex-col pb-6 px-5">  

                 {/* TOP - Title always at top */}
                <div className="flex flex-col justify-center  pt-20 md:pt-25 lg:pt-30">
                <span className="text-[clamp(2rem,14vw,16rem)] font-bold text-center text-white font-baskervville leading-none">Aldena Studio</span>
                <div className="block sm:hidden order-1 sm:order-1 mt-10">
                        <div className="">
                            <div className="mt-2 lg:mt-4 uppercase text-xs/4 md:text-sm/6 font-bold text-white/80">
                                <span className=" block">Designed to endure.</span>
                                <span className=" block">Written to resonate.</span>
                                <span className=" block">Considered in every detail.</span>
                            </div>
                            <span className="text-[clamp(2rem,6vw,4.5rem)] text-white tracking-tighter font-baskervville">Creative Agency</span>
                        </div>
                        
                    </div>
                </div>

                 {/* BOTTOM - Creative Agency always at bottom */}
                 <RevealOnScroll>
                <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-end w-full">
                    {/* LEFT */}
                    <div className="hidden sm:block order-1 sm:order-1">
                        <div className="">
                            <span className="text-[clamp(2rem,6vw,4.5rem)] text-white tracking-tighter font-baskervville">Creative Agency</span>
                            <div className="mt-2 lg:mt-4 uppercase text-xs/4 md:text-sm/6 font-bold text-white/80">
                                <span className=" block">Designed to endure.</span>
                                <span className=" block">Written to resonate.</span>
                                <span className=" block">Considered in every detail.</span>
                            </div>
                        </div>
                        
                    </div>

                    {/* RIGHT */}
                    <div className="order-2 sm:order-2 flex justify-start sm:justify-end">
                        <ServiceCarousel />
                    </div>

                </div>
                </RevealOnScroll>
               
            </section>

            {/* SECOND SECTION */}
            <section className="overflow-hidden flex flex-col lg:flex-row lg:justify-between bg-black text-white px-5 py-16 sm:px-10 sm:py-24 lg:px-[40px] lg:py-32 gap-12 lg:gap-0">

                {/* LEFT */}
                <div className="lg:w-[40%] flex flex-col justify-start gap-8">
                <div className="overflow-hidden">
                <TiltCard className="h-64 w-64 sm:h-70 sm:w-70 [perspective:1000px]">
                <div className="relative h-full w-full overflow-hidden">
                    <video
                        className="h-full w-full object-cover object-center brightness-100 contrast-95"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/assets/asset5.webp"
                    >
                        <source src="/assets/v_asset1.mp4" type="video/mp4" />
                    </video>

                        <div className="grain"></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <span className="z-11 absolute inset-0 flex items-center justify-center text-white font-serif italic text-4xl">Aldena</span>
                </div>
                </TiltCard>
                </div>

                    <LiquidCarveButton 
                    variant="black"
                    label="MORE ABOUT US"
                    link="/projects" 
                    newTab={false} 
                    />
                    
                </div>

                {/* RIGHT */}
                
                <div className="lg:w-[60%]">
                    <RevealOnScroll>

                    <div className="flex flex-col text-[clamp(1.9rem,5vw,3.125rem)] leading-[1.2] font-semibold">
                        <ScrollBlockText text="We're a brand and editorial studio for companies that would rather be understood than noticed. We build identities, publications,and content systems with the patience of print." />

                        <ScrollBlockText text="Fewer projects, closer attention, work that readsthe same on a billboard as it does on a business card." className="pt-10 lg:pt-15" />
                        <RevealOnScroll>
                        <span className="flex pt-10 lg:pt-15 items-center gap-4">
                            <Image
                            src="/assets/asset02.webp"
                            alt="arrow"
                            width={96}
                            height={96}
                            className=" h-12 w-12 rounded-full"
                            />
                            <div>
                                <p className="text-sm font-bold text-white">Aldena Rhodes</p>
                                <p className="text-sm font-bold text-white/70">Founder & Creative Director</p>
                            </div>
                        </span>
                         </RevealOnScroll>
                    </div>
                    </RevealOnScroll>
                </div>


            </section>

            {/* THIRD SECTION */}
            <div >
                <ProjectSection limit={3} />
            </div>

            {/* FOURTH SECTION */}
            <div className="">
                <ServiceHoverCard />
            </div>

            {/* FIFTH SECTION */}
            <div className="">
                <Process />
            </div>

            {/* SIXTH SECTION */}
            <div className="">
                <FAQSection imageSrc="/assets/asset19.webp" imageAlt="Workspace" contactHref="#contact" />
            </div>
             
             <div>
            <StudioSection /> 
            </div>

            <div>
              <BeforeFooter /> 
            </div>
         
        </main>
    ) 
}