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
import StudioSection from "@/components/sections/studio";
import BeforeFooter from "@/components/sections/beforeFooter";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ServiceCarousel from "@/components/ui/ServiceCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (!backgroundRef.current || !heroRef.current) return;
      if (window.innerWidth < 1024) return;

      gsap.to(backgroundRef.current, {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[100svh] h-[100svh] w-full flex-col justify-between overflow-hidden px-5 pb-6 sm:px-7 sm:pb-7 md:px-10 md:pb-8 lg:px-10 lg:pb-8 xl:px-12 2xl:px-16"
      >
        {/* Background */}
        <div ref={backgroundRef} className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[calc(100%+180px)] w-full overflow-hidden">
          <Image
            src="/assets/asset2.webp"
            alt="Aldena Studio"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-[50%_20%] brightness-100 contrast-75 lg:object-center"
          />
          <div className="grain" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex w-full flex-col pt-20 sm:pt-24 md:pt-28 lg:pt-30 xl:pt-32">
          <span className="block w-full text-center font-baskervville text-[clamp(2.5rem,13vw,16rem)] cursor-none font-bold leading-[0.85] tracking-[-0.04em] text-white sm:text-[clamp(3.5rem,12vw,12rem)] lg:text-[clamp(5rem,10.5vw,15rem)] 2xl:text-[clamp(6rem,10vw,16rem)]">
            Aldena Studio
          </span>

          {/* Mobile Agency Subtitle */}
          <div className="mt-10 block w-full sm:hidden">
            <div>
              <div className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/80">
                <span className="block cursor-none">Designed to endure.</span>
                <span className="block cursor-none">Written to resonate.</span>
                <span className="block cursor-none">Considered in every detail.</span>
              </div>
              <span className="mt-1 block font-baskervville text-[clamp(2rem,9vw,4.5rem)] leading-none tracking-tight text-white">
                Creative Agency
              </span>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <RevealOnScroll>
          <div className="relative z-10 flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Left */}
            <div className="order-1 hidden sm:block max-w-[600px] lg:max-w-[650px] xl:max-w-[720px]">
              <div>
                <span className="block font-baskervville text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight text-white">
                  Creative Agency
                </span>
                <div className="mt-2 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/80 sm:text-xs sm:leading-5 lg:mt-4 lg:text-sm lg:leading-6">
                  <span className="block">Designed to endure.</span>
                  <span className="block">Written to resonate.</span>
                  <span className="block">Considered in every detail.</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="order-2 flex w-full justify-start sm:w-auto sm:justify-end">
              <ServiceCarousel />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* About Overview Section */}
      <section className="relative z-20 w-full overflow-hidden bg-black px-5 py-16 text-white sm:px-7 sm:py-20 md:px-10 md:py-24 lg:px-10 lg:py-28 xl:px-12 xl:py-32 2xl:px-16">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16 2xl:gap-24">
          {/* Left Media Column */}
          <div className="flex w-full flex-col items-start gap-8 lg:w-[38%] lg:max-w-[560px] lg:gap-10">
            <div className="w-full overflow-hidden">
              <TiltCard className="h-64 w-64 [perspective:1000px] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[clamp(280px,28vw,420px)] lg:w-[clamp(280px,28vw,420px)]">
                <div className="relative h-full w-full overflow-hidden">
                  <video
                    className="h-full w-full object-cover object-center brightness-100 contrast-95"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/assets/asset5.webp"
                  >
                    <source src="/assets/v_asset1.mp4" type="video/mp4" />
                  </video>
                  <div className="grain" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center font-serif text-4xl italic text-white sm:text-5xl">
                    Aldena
                  </span>
                </div>
              </TiltCard>
            </div>

            <LiquidCarveButton
              variant="black"
              label="MORE ABOUT US"
              link="/about"
              newTab={false}
            />
          </div>

          {/* Right Copy Column */}
          <div className="w-full lg:w-[62%] lg:max-w-[1050px]">
            <RevealOnScroll>
              <div className="flex flex-col text-[clamp(1.7rem,4.2vw,3.125rem)] font-semibold leading-[1.18] tracking-[-0.025em]">
                <ScrollBlockText text="We're a brand and editorial studio for companies that would rather be understood than noticed. We build identities, publications, and content systems with the patience of print." />
                <ScrollBlockText
                  text="Fewer projects, closer attention, work that reads the same on a billboard as it does on a business card."
                  className="pt-10 lg:pt-15"
                />

                <RevealOnScroll>
                  <span className="flex items-center gap-4 pt-10 lg:pt-15">
                    <Image
                      src="/assets/asset02.webp"
                      alt="Aldena Rhodes"
                      width={96}
                      height={96}
                      className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
                    />
                    <div>
                      <p className="text-xs font-bold text-white sm:text-sm">Aldena Rhodes</p>
                      <p className="text-xs font-bold text-white/70 sm:text-sm">Founder & Creative Director</p>
                    </div>
                  </span>
                </RevealOnScroll>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative w-full overflow-hidden">
        <ProjectSection limit={3} />
      </section>

      {/* Services Carousel */}
      <section className="relative w-full overflow-hidden">
        <ServiceHoverCard />
      </section>

      {/* Process Section */}
      <section className="relative w-full overflow-hidden">
        <Process />
      </section>

      {/* FAQ Section */}
      <section className="relative w-full overflow-hidden">
        <FAQSection
          imageSrc="/assets/asset19.webp"
          imageAlt="Workspace"
          contactHref="/contact"
        />
      </section>

      {/* Studio Overview */}
      <section className="relative w-full overflow-hidden">
        <StudioSection />
      </section>

      {/* Before Footer CTA */}
      <section className="relative w-full overflow-hidden">
        <BeforeFooter />
      </section>
    </main>
  );
}