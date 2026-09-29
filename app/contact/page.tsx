"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import RollTextLink from "@/components/ui/textRollEffect";
import DropTextOnScroll from "@/components/ui/DropTextOnScroll";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLAnchorElement>(null);
  const officeRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current && window.innerWidth >= 768) {
        const heroText = heroRef.current.querySelector(".hero-text");
        if (heroText) {
          gsap.to(heroText, {
            y: -180,
            ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      }

      if (window.innerWidth >= 768) {
        [teamRef.current, officeRef.current].forEach((card) => {
          if (!card) return;
          const text = card.querySelector(".parallax-text");
          if (text) {
            gsap.to(text, {
              y: -80,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[65vh] sm:h-[68vh] md:h-[72vh] xl:h-[85vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/assets/asset52.webp" alt="Hero Image" fill sizes="100vw" className="object-cover brightness-100 contrast-75" priority />
        </div>
        <div className="grain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        <div className="hero-text relative z-10 w-full px-5 sm:px-8 md:px-11 pb-10 sm:pb-14 md:pb-16 text-white">
          <DropTextOnScroll as="h1" className="font-baskervville text-[clamp(2.8rem,9vw,100px)] font-bold leading-none tracking-tight mb-4 sm:mb-6">
            Get in Touch
          </DropTextOnScroll>
          <p className="max-w-xs sm:max-w-sm text-sm sm:text-base text-white/85 leading-relaxed">
            Have a project in mind? Tell us about it and we will be in touch within 24 hours.
          </p>
        </div>
      </section>

      {/* Inquiry & Form Section */}
      <section className="bg-white px-4 md:px-7 pt-24 pb-22 text-black">
        <div className="mx-auto grid max-w-[1500px] gap-20 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,2fr)] lg:gap-24">
          <div className="flex flex-col justify-between gap-20">
            <div className="w-full max-w-[305px]">
              <a href="mailto:hello@aldena.studio" target="_blank" className="flex items-center justify-between border-t border-zinc-200 py-4 text-[18px] font-semibold transition-colors">
                <RollTextLink label="hello@aldena.studio" />
                <span aria-hidden="true" className="text-sm font-normal"><ArrowUpRight size={20} strokeWidth={2} /></span>
              </a>

              <a href="tel:+12125550198" target="_blank" className="flex items-center justify-between border-t border-zinc-200 py-4 text-[16px] font-semibold transition-colors">
                <RollTextLink label="+1 (212) 555-0198" />
                <span aria-hidden="true" className="text-sm font-normal"><ArrowUpRight size={20} strokeWidth={2} /></span>
              </a>

              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex items-center justify-between border-y border-zinc-200 py-4 text-[16px] font-semibold transition-colors">
                <RollTextLink label="Find us on LinkedIn" />
                <span aria-hidden="true" className="text-sm font-normal"><ArrowUpRight size={20} strokeWidth={2} /></span>
              </a>
            </div>
          </div>

          <form className="grid gap-8" action="mailto:hello@aldena.studio" method="post" encType="text/plain">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-[10px] font-semibold uppercase text-zinc-500">Name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" required className="h-12 w-full bg-[#f3f3f3] px-4 text-sm outline-none placeholder:text-zinc-400 focus:ring-1 focus:ring-black" />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-[10px] font-semibold uppercase text-zinc-500">Email</label>
                <input id="email" name="email" type="email" placeholder="jane@company.com" required className="h-12 w-full bg-[#f3f3f3] px-4 text-sm outline-none placeholder:text-zinc-400 focus:ring-1 focus:ring-black" />
              </div>

              <div className="grid gap-2">
                <label htmlFor="phone" className="text-[10px] font-semibold uppercase text-zinc-500">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-12 w-full bg-[#f3f3f3] px-4 text-sm outline-none placeholder:text-zinc-400 focus:ring-1 focus:ring-black" />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="project-type" className="text-[10px] font-semibold uppercase text-zinc-500">Project type</label>
              <select id="project-type" name="project-type" defaultValue="Brand Identity" className="h-12 w-full appearance-none bg-[#f3f3f3] px-4 text-sm outline-none focus:ring-1 focus:ring-black">
                <option>Brand Identity</option>
                <option>Web Design</option>
                <option>Creative Direction</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-[10px] font-semibold uppercase text-zinc-500">Message</label>
              <textarea id="message" name="message" placeholder="Tell us about your project..." required className="min-h-32 resize-y bg-[#f3f3f3] px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:ring-1 focus:ring-black" />
            </div>

            <button type="submit" className="h-12 bg-black text-[14px] font-bold cursor-pointer uppercase text-white transition-opacity hover:opacity-80">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Visual Showcase (Team & Office) */}
      <section className="grid grid-cols-1 gap-6 bg-white px-4 md:px-7 pb-30 md:grid-cols-2">
        <a ref={teamRef} href="#team" className="group relative block min-h-[420px] overflow-hidden md:min-h-[520px]">
          <Image src="/assets/asset54.webp" alt="The Aldena studio team working together" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-center" />
          <div className="grain" />
          <span className="parallax-text absolute inset-0 z-10 flex items-center justify-center font-serif text-2xl text-white md:text-3xl">The Team.</span>
        </a>

        <a ref={officeRef} href="#office" className="group relative block min-h-[420px] overflow-hidden md:min-h-[520px]">
          <Image src="/assets/asset53.webp" alt="The Aldena studio office" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-center" />
          <div className="grain" />
          <span className="parallax-text absolute inset-0 z-10 flex items-center justify-center font-serif text-2xl text-white md:text-3xl">The Office.</span>
        </a>
      </section>
    </main>
  );
};

export default ContactPage;