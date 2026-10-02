"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DropTextOnScroll from "../ui/DropTextOnScroll";
import RevealOnScroll from "../ui/RevealOnScroll";

gsap.registerPlugin(ScrollTrigger);

const studioArticles = [
  { category: "DESIGN", date: "JUN 2, 2026", title: "The art of white space in designing user interfaces", image: "/assets/asset20.webp" },
  { category: "BRANDING", date: "JUN 9, 2026", title: "Building a brand voice that lasts for our clients", image: "/assets/asset21.webp" },
  { category: "DEVELOPMENT", date: "JUN 16, 2026", title: "Designing for performance from day one", image: "/assets/asset22.webp" },
];

export default function StudioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: titleRef.current, start: "top 75%", toggleActions: "play none none none" } });

      if (boxesRef.current) {
        gsap.fromTo(boxesRef.current.children, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: boxesRef.current, start: "top 75%", toggleActions: "play none none none" } });
      }

      const images = gsap.utils.toArray<HTMLElement>(".card-image-inner");
      if (images.length) {
        gsap.fromTo(images, { scale: 1.3 }, { scale: 1, duration: 1.4, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: boxesRef.current, start: "top 75%", toggleActions: "play none none none" } });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 px-5 sm:py-20 sm:px-8 md:px-10 lg:px-6 mx-auto font-sans bg-white text-black">
      {/* Section Header */}
      <div ref={titleRef} className="text-center mb-10 md:mb-16 opacity-0">
        <DropTextOnScroll as="h2" className="text-[clamp(2.5rem,6vw,72px)] font-semibold tracking-tight mb-4">
          From the studio.
        </DropTextOnScroll>
        <RevealOnScroll>
          <p className="text-gray-500 max-w-xs mx-auto text-base">
            Essays, notes, and perspectives on brand, design, and the craft of telling better stories.
          </p>
        </RevealOnScroll>
      </div>

      {/* Articles Grid */}
      <div ref={boxesRef} className="flex flex-col lg:flex-row justify-between gap-8">
        {studioArticles.map((article) => (
          <article key={article.title} className="studio-card flex-1 flex flex-col gap-4 opacity-0">
            <div className="group relative w-full h-[300px] sm:h-[380px] md:h-[469px] overflow-hidden bg-gray-100 cursor-pointer">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image src={article.image} alt={article.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="card-image-inner object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>

              <div className="absolute top-5 left-5 z-20 flex gap-2 text-white text-xs font-semibold tracking-wider drop-shadow-md">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <div className="absolute inset-0 z-10 bg-black/0 transition-all duration-500 ease-out group-hover:bg-black/55" />
              <div className="absolute inset-0 z-10 grain" />

              <div className="absolute bottom-0 left-0 z-20 w-full p-6 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="max-w-[60%] text-white text-base font-medium leading-tight">{article.title}</p>
              </div>
            </div>

            <h3 className="text-lg font-bold leading-snug">{article.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}