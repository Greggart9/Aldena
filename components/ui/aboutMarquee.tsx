'use client';

import Image from 'next/image';

interface LogoItem {
  name: string;
  src: string;
}

const logos: LogoItem[] = [
  { name: 'Logo1', src: '/assets/asset33.png' },
  { name: 'Logo2', src: '/assets/asset35.png' },
  { name: 'Logo3', src: '/assets/asset36.png' },
  { name: 'Logo4', src: '/assets/asset37.png' },
  { name: 'Logo5', src: '/assets/asset38.png' },
  { name: 'Logo6', src: '/assets/asset39.png' },
  { name: 'Logo7', src: '/assets/asset40.png' },
];

export default function AboutMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      


      {/* Scrolling Ticker Track */}
      <div className="flex w-max animate-marquee items-center gap-12 lg:gap-16">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 transition-opacity duration-300 select-none "
          >
            <div className="bg-black/2 p-10 lg:p-14 ">
            <div className="relative w-15 h-15 ">
              <Image 
                src={logo.src} 
                alt={logo.name} 
                fill 
                sizes="40px"
                className="object-contain"
              />
            </div>
            </div>
            {/* <span className="font-sans font-medium text-white text-sm tracking-wide">
              {logo.name}
            </span> */}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-2 md:flex md:justify-between gap-8 md:gap-5 items-start md:items-center mt-20 px-4 md:px-10'>

        {/* ONE */}
        <div>
            <p className='text-[clamp(2.5rem,6vw,4.5rem)] font-bold'>120+</p>
            <span className='block mt-2'>
              <p className='uppercase font-semibold text-sm text-black/80'>Projects Completed</p>
              <p className='text-semibold text-zinc-400 text-sm'>From full rebrands to focused identity work.</p>
            </span> 
        </div>

        {/* TWO */}
         <div>
            <p className='text-[clamp(2.5rem,6vw,4.5rem)] font-bold'>40+</p>
            <span className='block mt-2'>
              <p className='uppercase font-semibold text-sm text-black/80'>Brands launched</p>
              <p className='text-semibold text-zinc-400 text-sm'>From first sketch to client&apos;s public debut.</p>
            </span> 
         </div>

         {/* THREE */}
          <div>
            <p className='text-[clamp(2.5rem,6vw,4.5rem)] font-bold'>12</p>
            <span className='block mt-2'>
              <p className='uppercase font-semibold text-sm text-black/80'>Industry Awards</p>
              <p className='text-semibold text-zinc-400 text-sm'>Design and craft, recognized internationally.</p>
            </span> 
          </div>

           {/* FOUR */}
           <div>
              <p className='text-[clamp(2.5rem,6vw,4.5rem)] font-bold'>98%</p>
              <span className='block mt-2'>
                <p className='uppercase font-semibold text-sm text-black/80'>Client retention</p>
                <p className='text-semibold text-zinc-400 text-sm'>Most of our clients return for the next chapter.</p>
              </span> 
           </div>
           
      </div> 

    </div>
  );
}