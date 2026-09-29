"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { servicesData, Service } from "@/data/servicesData";
import RevealOnScroll from "../ui/RevealOnScroll";

/* ─── TYPES ─────────────────────────────────────────────────────── */
interface CardProps { service: Service; position: number; isTransitioning: boolean; }

/* ─── 3D DESKTOP CARD ───────────────────────────────────────────── */
function DesktopCard({ service, position, isTransitioning }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const transforms: Record<number, string> = {
    0:  "translateX(0) rotateY(0deg) scale(1)",
    "-1": "translateX(calc(-55vw - 5%)) rotateY(18deg) scale(0.88)",
    1:  "translateX(calc(55vw + 5%)) rotateY(-18deg) scale(0.88)",
  };
  const transform =
    transforms[position] ??
    (position < -1
      ? "translateX(calc(-120vw)) scale(0.75)"
      : "translateX(calc(120vw)) scale(0.75)");
  const zIndex = position === 0 ? 30 : Math.abs(position) === 1 ? 20 : 5;
  const isActive = position === 0;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex w-[min(90vw,900px)] overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-500 hover:shadow-2xl cursor-pointer"
        style={{
          transform,
          zIndex,
          minHeight: "420px",
          transition: isTransitioning ? "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s" : "none",
          pointerEvents: isActive ? "auto" : "none",
          opacity: Math.abs(position) > 1 ? 0 : Math.abs(position) === 1 ? 0.6 : 1,
        }}
      >
        {/* Left: Text content */}
        <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
          <div>
            <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              {service.serviceNumber}
            </span>
            <h3 className="mb-5 font-mono text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              {service.title}
            </h3>
            <p className="max-w-sm font-sans text-sm font-medium leading-relaxed text-zinc-500">
              {service.description}
            </p>
          </div>
          <div className="mt-8 border-t border-zinc-100 pt-6">
            <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Starting at</span>
            <span className="font-mono text-3xl font-bold text-zinc-900">{service.price}</span>
          </div>
        </div>

        {/* Right: Image panel */}
        <div className="relative hidden w-[42%] flex-none overflow-hidden md:block">
          <Image
            src={service.bgImage}
            alt={service.title}
            fill
            sizes="380px"
            className={`object-cover transition-all duration-700 ease-in-out ${hovered ? "scale-105 brightness-75" : "scale-100 brightness-90"}`}
          />
          <div className="absolute inset-0 grain bg-black/10" />
          {/* Hover overlay image */}
          <div className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-700 ${hovered ? "opacity-100" : "opacity-0"}`}>
            <div className="relative h-[55%] w-[55%] overflow-hidden rounded-lg shadow-xl">
              <Image src={service.hoverImage} alt="Detail" fill sizes="200px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE SWIPE CARD ─────────────────────────────────────────── */
function MobileCard({ service }: { service: Service }) {
  return (
    <RevealOnScroll>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="relative h-52 sm:h-64 w-full overflow-hidden">
          <Image src={service.bgImage} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover brightness-90 contrast-75" />
          <div className="absolute inset-0 grain bg-black/10" />
          <span className="absolute right-4 top-4 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
            {service.serviceNumber}
          </span>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">{service.category}</span>
          <h3 className="font-mono text-2xl font-bold tracking-tight text-zinc-900">{service.title}</h3>
          <p className="font-sans text-sm font-medium leading-relaxed text-zinc-500">{service.description}</p>
          <div className="mt-2 border-zinc-100 pt-3">
            <span className="mb-0.5 block font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">Starting at</span>
            <span className="font-mono text-2xl font-bold text-zinc-900">{service.price}</span>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */
export default function ServiceHoverCard() {
  const total = servicesData.length;
  const tripled = [...servicesData, ...servicesData, ...servicesData];

  const [active, setActive] = useState(total);   // Start in the middle set
  const [animating, setAnimating] = useState(true);
  const [locked, setLocked] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const lockTimer = useRef<NodeJS.Timeout | null>(null);
  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStart = useRef<number | null>(null);

  /* Carousel navigation */
  const go = useCallback((dir: 1 | -1) => {
    if (locked) return;
    setLocked(true);
    setAnimating(true);
    setActive((c) => c + dir);
    lockTimer.current = setTimeout(() => setLocked(false), 1500);
  }, [locked]);

  /* Infinite loop seam jump */
  useEffect(() => {
    if (active >= total * 2) {
      const t = setTimeout(() => {
        setAnimating(false);
        setActive(total);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
      }, 1450);
      return () => clearTimeout(t);
    }
    if (active < total) {
      const t = setTimeout(() => {
        setAnimating(false);
        setActive(total * 2 - 1);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
      }, 1450);
      return () => clearTimeout(t);
    }
  }, [active, total]);

  /* Autoplay */
  useEffect(() => {
    if (!autoplay) return;
    autoTimer.current = setInterval(() => go(1), 5000);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [autoplay, go]);

  /* Cleanup */
  useEffect(() => () => {
    if (lockTimer.current) clearTimeout(lockTimer.current);
    if (autoTimer.current) clearInterval(autoTimer.current);
  }, []);

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) go(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  const currentReal = ((active % total) + total) % total;

  return (
    <section
      className="relative w-full bg-[#f4f4f4] py-16 sm:py-20 lg:py-28"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Section header */}
      <RevealOnScroll>
        <div className="mb-10 px-5 sm:px-8 lg:px-12">
          <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">What we offer</p>
          <p className="max-w-md font-sans text-sm font-medium text-zinc-500">
            A focused set of brand, web, and digital design services shaped to elevate your presence.
          </p>
        </div>
      </RevealOnScroll>

      {/* ── MOBILE: swipeable stack (up to lg) ── */}
      <div
        className="lg:hidden px-5 sm:px-8 flex flex-col gap-5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {servicesData.map((s) => <MobileCard key={s.serviceNumber} service={s} />)}
      </div>

      {/* ── DESKTOP: 3D carousel (lg+) ── */}
      <div className="hidden lg:block">
        <div className="relative mx-auto h-[520px] w-full overflow-hidden">
          {tripled.map((service, index) => {
            const position = index - active;
            if (Math.abs(position) > 2) return null;
            return (
              <DesktopCard
                key={`${service.serviceNumber}-${index}`}
                service={service}
                position={position}
                isTransitioning={animating}
              />
            );
          })}

          {/* Prev button */}
          <button
            type="button"
            aria-label="Previous service"
            onClick={() => go(-1)}
            disabled={locked}
            className="absolute left-6 xl:left-10 top-1/2 z-50 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-zinc-800 disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Next button */}
          <button
            type="button"
            aria-label="Next service"
            onClick={() => go(1)}
            disabled={locked}
            className="absolute right-6 xl:right-10 top-1/2 z-50 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-110 hover:bg-zinc-800 disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {servicesData.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to service ${i + 1}`}
              onClick={() => { setAnimating(true); setActive(total + i); }}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === currentReal
                  ? "w-6 bg-zinc-900"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}