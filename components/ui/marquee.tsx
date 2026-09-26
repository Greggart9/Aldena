'use client';

import Image from 'next/image';

interface LogoItem {
  name: string;
  src: string;
}

const logos: LogoItem[] = [
  { name: 'Boltshift', src: '/assets/asset29.png' },
  { name: 'Capsule', src: '/assets/asset26.png' },
  { name: 'Codecraft', src: '/assets/asset24.png' },
  { name: 'Euphoria', src: '/assets/asset25.png' },
  { name: 'Frequencii', src: '/assets/asset28.png' },
  { name: 'AlphaWave', src: '/assets/asset27.png' },
];

export default function InfiniteLogoTicker() {
  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Edge Fade Masks (Fades in at left edge, fades out at right edge) */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling Ticker Track */}
      <div className="flex w-max animate-marquee items-center gap-16">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 select-none grayscale"
          >
            <div className="relative w-30 h-30">
              <Image 
                src={logo.src} 
                alt={logo.name} 
                fill 
                sizes="40px"
                className="object-contain"
              />
            </div>
            {/* <span className="font-sans font-medium text-white text-sm tracking-wide">
              {logo.name}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
}