'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import RevealOnScroll from '../ui/RevealOnScroll';

interface ServiceHoverCardProps {
  category?: string;
  title?: string;
  description?: string;
  price?: string;
  serviceNumber?: string;
  bgImage?: string;
  hoverImage?: string;
}

type Service = Required<ServiceHoverCardProps>;

const services: Service[] = [
  {
    category: 'WHAT WE OFFER',
    title: 'Brand Identity',
    description:
      'A complete visual identity built from strategy up — logo suite, type and color systems, and a flexible design language. We deliver a brand that stays recognizable everywhere while giving each touchpoint room to breathe. Includes a full guidelines document so your team can apply it with confidence.',
    price: '$6,000',
    serviceNumber: 'SERVICE 01',
    bgImage: '/assets/asset08.png',
    hoverImage: '/assets/asset10.png',
  },
  {
    category: 'WHAT WE OFFER',
    title: 'Visual Design',
    description:
      'Design work that turns your brand into real, usable assets — packaging, web layouts, social templates, and marketing collateral. We keep every piece coherent so your brand feels considered at every scale. Ideal for studios who have an identity and need it brought to life.',
    price: '$3,500',
    serviceNumber: 'SERVICE 02',
    bgImage: '/assets/asset09.png',
    hoverImage: '/assets/asset11.png',
  },
  {
    category: 'WHAT WE OFFER',
    title: 'Content & Voice',
    description:
      'An editorial voice and content strategy that make your brand sound as intentional as it looks. We define tone guidelines, shape your key messaging, and set up a publishing rhythm your team can sustain. Great for brands with strong visuals but no words to match.',
    price: '$2,500',
    serviceNumber: 'SERVICE 03',
    bgImage: '/assets/asset12.png',
    hoverImage: '/assets/asset14.png',
  },
  {
    category: 'WHAT WE OFFER',
    title: 'Brand Refresh',
    description:
      "A focused evolution for brands that are close but not quite there — sharpening your identity, tightening the system, and modernizing without losing what people already recognize. We audit what's working, then refine the rest. A lower-commitment path to a brand that feels current.",
    price: '$4,000',
    serviceNumber: 'SERVICE 04',
    bgImage: '/assets/asset13.png',
    hoverImage: '/assets/asset15.png',
  },
];

/* ─── DESKTOP CARD (3D carousel) ──────────────────────────────── */
interface ServiceCardProps {
  service: Service;
  position: number;
  isTransitioning: boolean;
}

function ServiceCard({ service, position, isTransitioning }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  let transform = '';
  let zIndex = 10;
  if (position === 0) {
    transform = 'translateX(0) rotateX(10deg) rotateY(0deg) scale(1)';
    zIndex = 30;
  }
  if (position === -1) {
    transform = 'translateX(calc(-50vw - 32%)) rotateX(5deg) rotateY(30deg) scale(0.92)';
    zIndex = 20;
  }
  if (position === 1) {
    transform = 'translateX(calc(50vw + 32%)) rotateX(-5deg) rotateY(-30deg) scale(0.92)';
    zIndex = 20;
  }
  if (position < -1) {
    transform = 'translateX(calc(-100vw - 100%)) rotatex(0deg) scale(0.85)';
    zIndex = 5;
  }
  if (position > 1) {
    transform = 'translateX(calc(100vw + 100%)) rotatex(0deg) scale(0.85)';
    zIndex = 5;
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center bg-[#f4f4f4]">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative mx-auto grid h-auto min-h-[504px] w-[calc(100%-2rem)] max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,582px)] gap-4 overflow-hidden bg-white p-6 shadow-sm transition-all duration-500 cursor-pointer"
        style={{
          transform,
          zIndex,
          transition: isTransitioning
            ? 'transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
          pointerEvents: position === 0 ? 'auto' : 'none',
        }}
      >
        <div className="z-10 flex min-w-0 flex-col justify-between pr-8">
          <div>
            <span className="font-mono text-xs uppercase font-bold tracking-wide text-zinc-400 block mb-3">
              {service.category}
            </span>
            <h3 className="font-mono text-5xl font-bold text-zinc-900 tracking-tight mb-6">
              {service.title}
            </h3>
            <RevealOnScroll>
              <p className="font-sans text-base font-medium text-zinc-600 leading-[1.2rem] max-w-lg">
                {service.description}
              </p>
            </RevealOnScroll>
          </div>
          <RevealOnScroll>
            <div>
              <span className="font-mono text-xs uppercase font-bold tracking-wide text-zinc-400 block mb-1">
                STARTING AT
              </span>
              <div className="font-mono text-4xl font-bold text-zinc-900 tracking-tight">
                {service.price}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="relative h-full min-w-0 overflow-hidden">
          <div className="absolute inset-0 transition-all duration-500">
            <Image
              src={service.bgImage}
              alt={service.title}
              fill
              sizes="582px"
              className={`object-cover transition-all ease-in-out duration-1200 brightness-100 contrast-75 ${
                isHovered ? 'blur-[2px] scale-105' : 'blur-0 scale-100'
              }`}
            />
            <div className="absolute inset-0 grain bg-black/20" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 z-10" />
          </div>
          <div className="absolute top-4 right-4 z-20">
            <span className="font-mono text-xs tracking-widest text-white uppercase font-bold">
              {service.serviceNumber}
            </span>
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-1000 ease-in-out ${
              isHovered ? 'opacity-100 scale-80' : 'opacity-0 scale-100'
            }`}
          >
            <div className="relative w-[60%] h-[60%] overflow-hidden">
              <Image
                src={service.hoverImage}
                alt="Detailed View"
                fill
                sizes="350px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE / TABLET CARD (stacked list) ─────────────────────── */
function MobileServiceCard({ service }: { service: Service }) {
  return (
    <RevealOnScroll>
      <div className="bg-white overflow-hidden shadow-sm">
        {/* Image */}
        <div className="relative h-52 sm:h-80 md:h-96 w-full overflow-hidden">
          <Image
            src={service.bgImage}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover brightness-100 contrast-75"
          />
          <div className="absolute inset-0 grain bg-black/10" />
          <span className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-white uppercase font-bold">
            {service.serviceNumber}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            {service.category}
          </span>
          <h3 className="font-mono text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
            {service.title}
          </h3>
          <p className="font-sans text-sm font-medium text-zinc-500 leading-relaxed">
            {service.description}
          </p>
          <div className="pt-3 border-t border-zinc-100">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mb-1">
              STARTING AT
            </span>
            <span className="font-mono text-2xl font-bold text-zinc-900">
              {service.price}
            </span>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────────────────────── */
export default function ServiceHoverCard() {
  const total = services.length;
  const carouselServices = [...services, ...services, ...services];
  const middleStart = total;

  const [activeIndex, setActiveIndex] = useState(middleStart);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const unlockTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    if (isLocked) return;
    setIsLocked(true);
    setIsTransitioning(true);
    setActiveIndex((c) => c + 1);
    unlockTimer.current = setTimeout(() => setIsLocked(false), 1550);
  };

  const handlePrevious = () => {
    if (isLocked) return;
    setIsLocked(true);
    setIsTransitioning(true);
    setActiveIndex((c) => c - 1);
    unlockTimer.current = setTimeout(() => setIsLocked(false), 1550);
  };

  useEffect(() => {
    if (activeIndex >= total * 2) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(total);
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
      }, 1500);
      return () => clearTimeout(t);
    }
    if (activeIndex < total) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(total * 2 - 1);
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [activeIndex, total]);

  useEffect(() => {
    return () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#f4f4f4] py-12 md:py-20 xl:py-32">

      {/* ── MOBILE / TABLET: stacked cards (hidden on lg+) ──────── */}
      <div className="xl:hidden px-5 sm:px-8 flex flex-col gap-6">
        <RevealOnScroll>
          <div className="mb-2">
            <p className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">
              What we offer
            </p>
            <p className="font-sans text-sm text-zinc-500 font-medium max-w-sm">
              A focused set of brand, web, and digital design services shaped to elevate your presence.
            </p>
          </div>
        </RevealOnScroll>

        {services.map((service) => (
          <MobileServiceCard key={service.serviceNumber} service={service} />
        ))}
      </div>

      {/* ── DESKTOP: 3D carousel (hidden below lg) ──────────────── */}
      <div className="hidden xl:block">
        <div className="relative mx-auto h-[620px] w-full overflow-hidden">
          {carouselServices.map((service, index) => {
            const position = index - activeIndex;
            if (position < -2 || position > 2) return null;
            return (
              <ServiceCard
                key={`${service.serviceNumber}-${index}`}
                service={service}
                position={position}
                isTransitioning={isTransitioning}
              />
            );
          })}

          <button
            type="button"
            aria-label="Previous service"
            onClick={handlePrevious}
            disabled={isLocked}
            className="absolute left-[7%] top-1/2 z-50 -translate-y-1/2"
          >
            <CircleArrowLeft size={34} />
          </button>

          <button
            type="button"
            aria-label="Next service"
            onClick={handleNext}
            disabled={isLocked}
            className="absolute right-[7%] top-1/2 z-50 -translate-y-1/2"
          >
            <CircleArrowRight size={34} />
          </button>
        </div>
      </div>

    </section>
  );
}