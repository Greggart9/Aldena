"use client";

import React from "react";
import Link from "next/link";
import TextSwap from "@/components/ui/FlipButton";
import RevealOnScroll from "../ui/RevealOnScroll";

const Footer = () => {
  return (
    <footer className="py-10 bg-[#F4F4F4]">
      <div className="relative text-black w-full flex flex-col justify-between pt-8 px-5 sm:px-8 md:px-12 overflow-hidden font-sans select-none">
        
        {/* Newsletter & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 z-10 w-full mx-auto">
          {/* Newsletter Signup */}
          <div className="flex flex-col max-w-lg">
            <RevealOnScroll>
              <h2 className="text-4xl font-semibold tracking-tight mb-2">Stay in the loop.</h2>
              <p className="text-zinc-600 text-sm font-semibold mb-9">Get the latest news, insights directly to your inbox.</p>
            </RevealOnScroll>

            <RevealOnScroll>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input type="email" placeholder="name@email.com" className="w-full bg-[#EAEAEA] border border-transparent focus:border-black text-black px-4 py-3.5 text-sm outline-none transition-colors" />
                <button type="submit" className="w-full bg-black text-white py-3.5 text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-90 cursor-pointer">
                  SUBSCRIBE
                </button>
              </form>
            </RevealOnScroll>

            <div className="hidden md:block mt-8 text-[12px] uppercase font-bold tracking-wide text-zinc-500">
              DESIGNED BY LUNIS. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Links & Contact */}
          <div className="flex flex-col gap-6 md:gap-12">
            <div className="grid grid-cols-2 gap-12 w-full self-end max-w-md font-semibold text-[17px]">
              <div className="flex flex-col gap-2">
                <Link href="/"><TextSwap text="Home" /></Link>
                <Link href="/about"><TextSwap text="About" /></Link>
                <Link href="/projects"><TextSwap text="Projects" /></Link>
                <Link href="/contact"><TextSwap text="Contact" /></Link>
              </div>

              <div className="flex flex-col gap-2">
                <a href="#" target="_blank"><TextSwap text="Instagram" /></a>
                <a href="https://www.linkedin.com/in/oluwadamilaree/" target="_blank"><TextSwap text="LinkedIn" /></a>
                <a href="https://x.com/Oluwad_amilare" target="_blank"><TextSwap text="X (Twitter)" /></a>
                <a href="https://contra.com/oluwadamilare_ogundare_evytuaxa/work?r=oluwadamilare_ogundare_evytuaxa" target="_blank"><TextSwap text="Contra" /></a>
              </div>
            </div>

            <div className="col-span-2 md:text-right mt-6 md:mt-12 w-full flex flex-col gap-2 max-w-md self-end">
              <span className="text-zinc-500 self-start font-bold text-base md:text-lg">+1 (212) 555-0198</span>
              <a href="mailto:hello@aldena.studio" className="text-xl md:text-4xl font-bold self-start tracking-tight hover:opacity-75 transition-opacity break-all md:break-normal">
                hello@aldena.studio
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Copyright */}
        <div className="block md:hidden mt-2 text-[11px] uppercase tracking-wider text-zinc-500 z-10">
          DESIGNED BY LUNIS. ALL RIGHTS RESERVED.
        </div>

        {/* Watermark Branding */}
        <RevealOnScroll>
          <div className="w-full text-center pointer-events-none select-none mt-10 overflow-hidden leading-none">
            <h1 className="text-[14vw] font-baskervville font-bold text-[#E6E6E6] whitespace-nowrap">
              Aldena Studio
            </h1>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
};

export default Footer;