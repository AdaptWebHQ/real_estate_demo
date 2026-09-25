'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', size = 'md', showTagline = true }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-lg sm:text-xl tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.3em]',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.3em]',
    md: 'text-[9px] tracking-[0.35em]',
    lg: 'text-[10px] tracking-[0.4em]',
  };

  return (
    <Link href="/" className="group flex items-center gap-3.5 select-none">
      {/* Sleek Architectural Monogram Icon */}
      <div className={`relative ${iconSizes[size]} bg-charcoal/90 border border-gold/70 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(200,169,107,0.3)] shrink-0`}>
        {/* Architectural SVG Emblem: Stylized roofline + arch + golden apex */}
        <svg viewBox="0 0 48 48" className="w-6 h-6 text-gold transition-transform duration-500 group-hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer geometric roofline triangle */}
          <path d="M24 6L40 38H33.5L24 19L14.5 38H8L24 6Z" fill="currentColor" opacity="0.95" />
          {/* Inner architectural arch negative space cut */}
          <path d="M24 24L30 38H18L24 24Z" fill="#111111" />
          {/* Golden floating crossbeam */}
          <rect x="15" y="27" width="18" height="2" fill="currentColor" />
          {/* Floating diamond accent at apex */}
          <polygon points="24,10 26.5,13 24,16 21.5,13" fill="#DFC798" />
        </svg>

        {/* Hover corner accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-gold" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-gold" />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className={`font-serif ${titleSizes[size]} font-semibold text-white leading-tight transition-colors duration-300 group-hover:text-gold`}>
          AUREVIA
        </span>
        {showTagline && (
          <span className={`font-sans ${subSizes[size]} text-stone-light/70 uppercase leading-none font-medium transition-colors duration-300 group-hover:text-stone-light`}>
            ESTATES
          </span>
        )}
      </div>
    </Link>
  );
};
