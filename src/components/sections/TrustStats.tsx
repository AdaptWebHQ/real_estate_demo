'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  delay: number;
}

const STATS_DATA: StatItem[] = [
  {
    value: 15,
    suffix: '+',
    label: 'YEARS',
    description: 'Established 2011',
    delay: 600,
  },
  {
    value: 28,
    suffix: '',
    label: 'PROJECTS',
    description: 'Completed On-Time',
    delay: 700,
  },
  {
    value: 2400,
    suffix: '+',
    label: 'FAMILIES',
    description: 'Across South India',
    delay: 800,
  },
  {
    value: 7,
    suffix: '',
    label: 'LOCATIONS',
    description: 'Coimbatore Corridors',
    delay: 900,
  },
];

interface StatCounterProps {
  value: number;
  suffix: string;
  delay: number;
  shouldStart: boolean;
  reducedMotion: boolean;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix,
  delay,
  shouldStart,
  reducedMotion,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // If reduced motion or SSR, directly display final value
    if (reducedMotion) {
      setDisplayValue(value);
      setIsCompleted(true);
      return;
    }

    if (!shouldStart || isCompleted) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s duration

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Luxury cubic ease-out curve [0.16, 1, 0.3, 1] approximation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.floor(easeProgress * value);

        setDisplayValue(currentNum);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
          setIsCompleted(true);
        }
      };

      animRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [shouldStart, value, delay, reducedMotion, isCompleted]);

  // Format number using Indian locale (e.g. 2400 -> 2,400)
  const formattedNumber = new Intl.NumberFormat('en-IN').format(
    isCompleted || reducedMotion ? value : displayValue
  );

  return (
    <span>
      {formattedNumber}
      {suffix}
    </span>
  );
};

export const TrustStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setHasAnimated(true);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setHasAnimated(true);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Micro-parallax scroll handler
    const handleScroll = () => {
      if (!mediaQuery.matches) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Single-trigger IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '-30px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Subtle Parallax calculation
  const sectionTop = sectionRef.current ? sectionRef.current.offsetTop : 0;
  const relScroll = Math.max(0, scrollY - sectionTop + 300);
  const headingParallax = Math.min(8, relScroll * 0.015);
  const statsParallax = Math.min(4, relScroll * 0.008);
  const quoteParallax = Math.min(2, relScroll * 0.004);

  return (
    <section
      ref={sectionRef}
      id="trust-stats"
      className="py-24 sm:py-32 bg-[#E8E1D5] text-[#18221F] relative overflow-hidden"
    >
      <div
        className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Editorial Heading */}
        <div
          className="space-y-4 max-w-2xl transition-transform duration-300 ease-out"
          style={{ transform: reducedMotion ? 'none' : `translateY(-${headingParallax}px)` }}
        >
          <span
            className={`text-xs uppercase font-semibold text-[#B86F52] block transition-all duration-500 ease-out ${
              hasAnimated ? 'opacity-100 translate-y-0 tracking-[0.25em]' : 'opacity-0 translate-y-3 tracking-[0.2em]'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            PROVEN TRACK RECORD
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#18221F] tracking-tight leading-tight">
            <span
              className={`block transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Experience That Shapes Every
            </span>
            <span
              className={`block transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '320ms' }}
            >
              Address.
            </span>
          </h2>
        </div>

        {/* Animated Horizontal Divider Line */}
        <div className="relative">
          <div
            className={`h-[1px] bg-[#18221F]/15 origin-left transition-all duration-900 ease-out ${
              hasAnimated ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{ transitionDelay: '450ms' }}
          />
        </div>

        {/* 4 Large Statistics Grid with Vertical Dividers */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 relative border-b border-[#18221F]/15 py-8 transition-transform duration-300 ease-out"
          style={{ transform: reducedMotion ? 'none' : `translateY(-${statsParallax}px)` }}
        >
          {STATS_DATA.map((stat, idx) => (
            <div
              key={idx}
              className={`relative p-4 sm:p-8 space-y-2 group transition-all duration-700 ease-out ${
                hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              {/* Vertical Divider (Except first item) */}
              {idx > 0 && (
                <div
                  className={`hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-[#18221F]/15 origin-top transition-all duration-700 ease-out ${
                    hasAnimated ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                />
              )}

              {/* Number Count-Up Display */}
              <div className="font-serif text-4xl sm:text-6xl font-normal text-[#18221F] group-hover:text-[#B86F52] leading-none tracking-tight transition-all duration-300 transform group-hover:-translate-y-1">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={stat.delay}
                  shouldStart={hasAnimated}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Label & Description */}
              <div
                className={`space-y-0.5 transition-all duration-500 ease-out ${
                  hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{ transitionDelay: `${stat.delay + 400}ms` }}
              >
                <span className="text-sm uppercase tracking-[0.2em] text-[#B86F52] font-semibold block">
                  {stat.label}
                </span>
                <span className="text-xs text-[#303633]/70 font-light block group-hover:text-[#303633] transition-colors">
                  {stat.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Quote Block */}
        <div
          className="relative pl-6 transition-transform duration-300 ease-out"
          style={{ transform: reducedMotion ? 'none' : `translateY(-${quoteParallax}px)` }}
        >
          {/* Vertical Accent Line */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#A9825B] origin-top transition-all duration-700 ease-out ${
              hasAnimated ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
            }`}
            style={{ transitionDelay: '1200ms' }}
          />

          {/* Quote */}
          <p
            className={`text-xs sm:text-sm text-[#303633]/80 font-light max-w-3xl leading-relaxed italic transition-all duration-800 ease-out ${
              hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '1300ms' }}
          >
            "From our first community to today's signature residences, every project is shaped by the same attention to place, quality and experience."
          </p>
        </div>

      </div>
    </section>
  );
};


