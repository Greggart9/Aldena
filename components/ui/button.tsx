'use client';

import Link from 'next/link';

interface ButtonProps {
  text?: string;
  path?: string;
  variant?: 'white' | 'black';
}

export default function Button({ 
  text = "Buy Tickets", 
  path = "#",
  variant = "white" 
}: ButtonProps) {
  const isWhite = variant === 'white';

  return (
    <Link
      href={path}
      className={`group relative inline-block w-fit float-right m-0 box-border cursor-pointer select-none overflow-visible p-[1.25em_2em] text-center no-underline uppercase tracking-[0.05em] transition-all duration-300 ease-in-out outline-none text-[13px] font-bold bg-transparent ${
        isWhite 
          ? 'border-2 border-white text-white hover:bg-white hover:text-black' 
          : 'border-2 border-black text-black hover:bg-black hover:text-white'
      }`}
    >
      <span className={`absolute top-1/2 left-[1.5em] h-[2px] w-[1.5625rem] -translate-y-1/2 transition-all duration-300 linear ${
        isWhite ? 'bg-white group-hover:bg-black group-hover:w-[0.9375rem]' : 'bg-black group-hover:bg-white group-hover:w-[0.9375rem]'
      }`} />

      <span className={`block text-[1.125em] leading-[1.33333em] pl-[2em] text-left uppercase transition-all duration-300 ease-in-out ${
        isWhite ? 'text-white group-hover:text-black group-hover:pl-[1.5em]' : 'text-black group-hover:text-white group-hover:pl-[1.5em]'
      }`}>
        {text}
      </span>

      <span className={`absolute -top-[2px] left-[0.625rem] h-[2px] w-[1.5625rem] bg-[#e8e8e8] transition-all duration-500 ease-out group-hover:left-[-2px] group-hover:w-0`} />
      <span className={`absolute -bottom-[2px] right-[1.875rem] h-[2px] w-[1.5625rem] bg-[#e8e8e8] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0`} />
      <span className={`absolute -bottom-[2px] right-[0.625rem] h-[2px] w-[0.625rem] bg-[#e8e8e8] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0`} />
    </Link>
  );
}