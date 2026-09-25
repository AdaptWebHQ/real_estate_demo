'use client';

import React, { useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';

// 1. HERO ANIMATION STATE MACHINE TYPES
export type HeroState =
  | 'initial'
  | 'mediaReveal'
  | 'contentReveal'
  | 'active'
  | 'exiting'
  | 'resting';

export type HeroAction =
  | { type: 'START' }
  | { type: 'REVEAL_MEDIA' }
  | { type: 'REVEAL_CONTENT' }
  | { type: 'SET_ACTIVE' }
  | { type: 'INTERRUPT' }
  | { type: 'REDUCED_MOTION' };

// 2. STATE MACHINE REDUCER WITH TRANSITION GUARDS
function heroReducer(state: HeroState, action: HeroAction): HeroState {
  if (state === 'resting' && action.type !== 'REDUCED_MOTION') return 'resting';

  switch (action.type) {
    case 'START':
      return state === 'initial' ? 'mediaReveal' : state;
    case 'REVEAL_MEDIA':
      return state === 'mediaReveal' ? 'contentReveal' : state;
    case 'REVEAL_CONTENT':
      return state === 'contentReveal' ? 'active' : state;
    case 'SET_ACTIVE':
      return 'active';
    case 'INTERRUPT':
      return 'active';
    case 'REDUCED_MOTION':
      return 'resting';
    default:
      return state;
  }
}

// 3. CURATED ARCHITECTURAL IMAGES FOR THE 3-LAYER COMPOSITION
const HERO_IMAGES = {
  // Dominant Luxury Villa Exterior
  primary: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  // Signature Morph View (~70% scroll detail crop)
  primaryMorph: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
  // Secondary Floating Interior Photograph
  secondary: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  // Architectural Detail Fragment (Staircase / Window)
  detail: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1600&auto=format&fit=crop',
};

interface HeroProps {
  onOpenScheduleModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenScheduleModal }) => {
  const [heroState, dispatch] = useReducer(heroReducer, 'initial');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  // Preload images on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Object.values(HERO_IMAGES).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, []);

  // State Machine Lifecycle & Accessibility Handling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      dispatch({ type: 'REDUCED_MOTION' });
      return;
    }

    const motionHandler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setPrefersReducedMotion(true);
        dispatch({ type: 'REDUCED_MOTION' });
      }
    };
    mediaQuery.addEventListener('change', motionHandler);

    // Calculate Scroll Progress strictly relative to Hero viewport
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (containerRef.current) {
        const height = containerRef.current.offsetHeight || window.innerHeight;
        const progress = Math.min(Math.max(currentY / height, 0), 1);
        setScrollProgress(progress);
      }

      if (currentY > 30 && heroState !== 'active' && heroState !== 'resting') {
        dispatch({ type: 'INTERRUPT' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Entrance timeline progression
    if (!hasStartedRef.current && heroState === 'initial') {
      hasStartedRef.current = true;
      dispatch({ type: 'START' });
    }

    return () => {
      mediaQuery.removeEventListener('change', motionHandler);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroState]);

  // Entrance Sequence Timers
  useEffect(() => {
    if (prefersReducedMotion || heroState === 'resting' || heroState === 'active') return;

    let timer: NodeJS.Timeout;
    if (heroState === 'mediaReveal') {
      timer = setTimeout(() => {
        dispatch({ type: 'REVEAL_MEDIA' });
      }, 400);
    } else if (heroState === 'contentReveal') {
      timer = setTimeout(() => {
        dispatch({ type: 'SET_ACTIVE' });
      }, 700);
    }

    return () => clearTimeout(timer);
  }, [heroState, prefersReducedMotion]);

  // Desktop Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current || window.innerWidth < 1280) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) / (rect.width / 2);
    const moveY = (e.clientY - centerY) / (rect.height / 2);
    setMouseOffset({
      x: Math.min(Math.max(moveX, -1), 1),
      y: Math.min(Math.max(moveY, -1), 1),
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // State flags
  const isEntered = heroState === 'active' || heroState === 'resting' || heroState === 'contentReveal';
  const isMediaRevealed = heroState !== 'initial';

  // Parallax transform calculations
  const primaryTranslateY = prefersReducedMotion ? 0 : scrollProgress * -35;
  const primaryScale = prefersReducedMotion ? 1 : Math.max(1.04 - scrollProgress * 0.04, 1.0);
  
  const secondaryTranslateY = prefersReducedMotion ? 0 : scrollProgress * -65;
  const secondaryScale = prefersReducedMotion ? 1 : Math.max(1.04 - scrollProgress * 0.04, 1.0);

  const detailTranslateY = prefersReducedMotion ? 0 : scrollProgress * -90;
  const detailScale = prefersReducedMotion ? 1 : Math.max(1.06 - scrollProgress * 0.06, 1.0);

  const headlineTranslateY = prefersReducedMotion ? 0 : Math.max(scrollProgress * -35, -35);
  const headlineOpacity = prefersReducedMotion ? 1 : Math.max(1 - scrollProgress * 0.75, 0.25);

  const bgTypographyTranslateX = prefersReducedMotion ? 0 : scrollProgress * -140;
  const bgTypographyOpacity = prefersReducedMotion ? 0.04 : Math.min(0.04 + scrollProgress * 0.08, 0.12);

  // Signature Morph transition at ~70% scroll progress (0.55 to 0.80)
  const morphOpacity = prefersReducedMotion
    ? 0
    : Math.min(Math.max((scrollProgress - 0.55) / 0.25, 0), 0.85);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Aurevia Estates Architectural Hero Section"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F5F2EA] text-[#18221F] overflow-hidden select-none"
    >
      {/* Background Architectural Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#18221F_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Screen Reader Notification */}
      <div className="sr-only" aria-live="polite">
        Aurevia Estates: Spaces Designed for the Way You Live.
      </div>

      {/* HUGE BACKGROUND BRAND TYPOGRAPHY (AUREVIA) */}
      <div
        className="absolute bottom-10 left-0 right-0 pointer-events-none z-0 overflow-hidden flex justify-center text-center"
        aria-hidden="true"
      >
        <h2
          className="font-serif text-[clamp(5rem,22vw,24rem)] font-normal uppercase tracking-[0.08em] leading-none text-[#18221F] whitespace-nowrap transition-all duration-700 ease-out"
          style={{
            transform: `translate3d(${bgTypographyTranslateX}px, 0px, 0px)`,
            opacity: bgTypographyOpacity,
          }}
        >
          AUREVIA
        </h2>
      </div>

      {/* MAIN HERO ASYMMETRIC GRID CONTAINER */}
      <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-center relative z-10 my-auto">
        
        {/* DESKTOP & LAPTOP COMPOSITION (1024px+) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-14 items-center min-h-[620px]">
          
          {/* LEFT COLUMN (~45% Width) Editorial Typography & Content */}
          <div
            className="col-span-6 xl:col-span-5 space-y-6 xl:space-y-8 z-20"
            style={{
              transform: prefersReducedMotion
                ? 'none'
                : `translate3d(${mouseOffset.x * 3}px, ${headlineTranslateY + mouseOffset.y * 3}px, 0px)`,
              opacity: headlineOpacity,
            }}
          >
            {/* HERO EYEBROW */}
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold">
              <span
                className={`h-[1px] bg-[#B86F52] inline-block transition-all duration-1000 ease-out ${
                  isMediaRevealed ? 'w-10' : 'w-0'
                }`}
              />
              <span
                className={`transition-opacity duration-700 delay-200 ${
                  isMediaRevealed ? 'opacity-100' : 'opacity-0'
                }`}
              >
                — AUREVIA ESTATES · COIMBATORE
              </span>
            </div>

            {/* MAIN EDITORIAL HEADLINE */}
            <h1 className="font-serif text-[clamp(3.5rem,5.5vw,7.5rem)] font-normal leading-[1.02] tracking-tight text-[#18221F]">
              <span className="block overflow-hidden">
                <span
                  className={`block transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isEntered ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'
                  }`}
                >
                  Spaces That
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`block transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isEntered ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'
                  }`}
                  style={{ transitionDelay: '120ms' }}
                >
                  Shape How
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`italic font-light text-[#B86F52] block transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isEntered ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'
                  }`}
                  style={{ transitionDelay: '240ms' }}
                >
                  You Live.
                </span>
              </span>
            </h1>

            {/* SUPPORTING TEXT */}
            <p
              className={`text-base text-[#303633]/80 font-light max-w-md leading-relaxed transition-all duration-800 delay-300 ${
                isEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              Thoughtfully designed residences in exceptional locations, created around the way modern families live.
            </p>

            {/* ACTION BUTTONS / CTAS */}
            <div
              className={`flex items-center gap-6 pt-2 transition-all duration-800 delay-500 ${
                isEntered ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-6 opacity-0 pointer-events-none'
              }`}
            >
              {/* PRIMARY CTA */}
              <a
                href="#properties"
                className="group relative px-7 py-3.5 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] transition-all duration-300 flex items-center gap-3 shadow-lg rounded-xl overflow-hidden cursor-pointer"
              >
                <span>EXPLORE PROPERTIES</span>
                <ArrowRight className="w-4 h-4 text-[#B86F52] group-hover:text-[#FCFBF8] transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>

              {/* SECONDARY CTA */}
              <a
                href="#projects"
                className="group relative inline-flex items-center py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#18221F] hover:text-[#B86F52] transition-colors cursor-pointer"
              >
                <span>VIEW OUR PROJECTS</span>
                <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#B86F52] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN (~55% Width) 3-LAYER ARCHITECTURAL IMAGE COMPOSITION */}
          <div className="col-span-6 xl:col-span-7 relative flex items-center justify-end h-full min-h-[580px] xl:min-h-[640px]">
            
            {/* IMAGE C — DETAIL FRAGMENT (BACKGROUND / TOP-LEFT COMPOSITION) */}
            <div
              className={`hidden xl:block absolute left-0 top-2 z-10 w-[210px] aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-[#E8E1D5]/80 bg-[#E8E1D5] -rotate-2 transition-all duration-1000 ease-out ${
                isMediaRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                transform: prefersReducedMotion
                  ? 'rotate(-2deg)'
                  : `translate3d(${mouseOffset.x * 8}px, ${detailTranslateY + mouseOffset.y * 8}px, 0px) rotate(-2deg) scale(${detailScale})`,
              }}
            >
              <Image
                src={HERO_IMAGES.detail}
                alt="Architectural Staircase Detail"
                fill
                sizes="210px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#18221F]/10 pointer-events-none" />
            </div>

            {/* IMAGE A — DOMINANT PRIMARY LUXURY ARCHITECTURE IMAGE */}
            <div
              className={`relative w-full xl:w-[90%] aspect-[16/11] xl:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#E8E1D5] z-20 transition-all duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMediaRevealed
                  ? '[clip-path:inset(0_0_0_0)] opacity-100'
                  : '[clip-path:inset(8%_8%_100%_8%)] opacity-0'
              }`}
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `translate3d(${mouseOffset.x * -4}px, ${primaryTranslateY + mouseOffset.y * -4}px, 0px) scale(${primaryScale})`,
              }}
            >
              {/* Main Exterior Photograph */}
              <Image
                src={HERO_IMAGES.primary}
                alt="Aurevia Luxury Architecture Villa"
                fill
                priority
                sizes="(max-width: 1280px) 55vw, 820px"
                className="object-cover object-center transition-transform duration-1000 ease-out"
              />

              {/* Signature Scroll Morph Overlay View (~70% Scroll) */}
              <div
                className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
                style={{ opacity: morphOpacity }}
              >
                <Image
                  src={HERO_IMAGES.primaryMorph}
                  alt="Aurevia Architectural Perspective Detail"
                  fill
                  sizes="(max-width: 1280px) 55vw, 820px"
                  className="object-cover object-center"
                />
              </div>

              {/* Subtle Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#18221F]/45 via-transparent to-transparent pointer-events-none" />

              {/* FLOATING HERO PROPERTY CARD (Section 19 & 20) */}
              <div
                className={`absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-[#FCFBF8]/95 backdrop-blur-md p-5 rounded-2xl border border-[#E8E1D5] shadow-2xl z-30 max-w-xs transition-all duration-800 delay-300 hover:-translate-y-1 ${
                  isEntered ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none'
                }`}
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate3d(0px, ${scrollProgress * -12}px, 0px)`,
                }}
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#B86F52] font-semibold block">
                    FEATURED RESIDENCE
                  </span>
                  <h3 className="font-serif text-lg text-[#18221F] font-normal leading-snug">
                    THE ARANYA RESERVE
                  </h3>
                  <p className="text-[11px] text-[#303633]/75 font-light">
                    Kovaipudur Foothills · Coimbatore
                  </p>
                </div>

                <Link
                  href="/properties/aranya-villas"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#18221F] font-semibold hover:text-[#B86F52] transition-colors group cursor-pointer"
                >
                  <span>EXPLORE VILLA</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A9825B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

            </div>

            {/* IMAGE B — SECONDARY FLOATING INTERIOR PHOTOGRAPH (OVERLAPPING LOWER RIGHT) */}
            <div
              className={`absolute right-4 -bottom-6 xl:-bottom-8 z-30 w-[240px] xl:w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FCFBF8] bg-[#E8E1D5] transition-all duration-1000 ease-out ${
                isMediaRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `translate3d(${mouseOffset.x * -6}px, ${secondaryTranslateY + mouseOffset.y * -6}px, 0px) scale(${secondaryScale})`,
              }}
            >
              <Image
                src={HERO_IMAGES.secondary}
                alt="Aurevia Luxury Residence Living Interior"
                fill
                sizes="(max-width: 1280px) 240px, 280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#18221F]/10 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* TABLET RESPONSIVE DESIGN (768px – 1023px) */}
        <div className="hidden sm:grid lg:hidden grid-cols-1 gap-10 items-center py-6">
          <div className="space-y-6 text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold">
              <span className="h-[1px] w-8 bg-[#B86F52]" />
              <span>— AUREVIA ESTATES · COIMBATORE</span>
              <span className="h-[1px] w-8 bg-[#B86F52]" />
            </div>

            <h1 className="font-serif text-5xl font-normal text-[#18221F] leading-[1.08] tracking-tight">
              Spaces That <br />
              Shape How <br />
              <span className="italic font-light text-[#B86F52]">You Live.</span>
            </h1>

            <p className="text-sm text-[#303633]/80 font-light leading-relaxed">
              Thoughtfully designed residences in exceptional locations, created around the way modern families live.
            </p>

            <div className="flex items-center justify-center gap-5 pt-2">
              <a
                href="#properties"
                className="px-7 py-3.5 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] transition-colors flex items-center gap-2 rounded-xl cursor-pointer"
              >
                <span>EXPLORE PROPERTIES</span>
                <ArrowRight className="w-4 h-4 text-[#B86F52]" />
              </a>

              <button
                type="button"
                onClick={onOpenScheduleModal}
                className="px-6 py-3.5 border border-[#18221F]/30 text-[#18221F] text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:border-[#B86F52] hover:text-[#B86F52] transition-colors cursor-pointer"
              >
                SCHEDULE A VISIT
              </button>
            </div>
          </div>

          {/* Tablet 2-Layer Image Composition */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-[#E8E1D5] max-w-2xl mx-auto w-full">
            <Image
              src={HERO_IMAGES.primary}
              alt="Aurevia Estates Architecture"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 672px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18221F]/50 via-transparent to-transparent pointer-events-none" />

            {/* Tablet Floating Secondary Image */}
            <div className="absolute right-4 bottom-4 w-44 aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#FCFBF8] shadow-xl">
              <Image
                src={HERO_IMAGES.secondary}
                alt="Living Interior Detail"
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* DEDICATED INTENTIONAL MOBILE DESIGN (<768px Section 34-39) */}
        <div className="sm:hidden flex flex-col space-y-6 pt-2 pb-4">
          
          {/* Mobile Eyebrow Header */}
          <div className="space-y-1">
            <span className="font-serif text-lg tracking-[0.2em] text-[#18221F] block uppercase font-normal">
              AUREVIA
            </span>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#A9825B] font-semibold">
              <span className="h-[1px] w-6 bg-[#B86F52]" />
              <span>COIMBATORE</span>
            </div>
          </div>

          {/* Mobile Staggered Heading */}
          <h1 className="font-serif text-[clamp(2.6rem,11vw,3.8rem)] font-normal text-[#18221F] leading-[1.05] tracking-tight">
            Spaces That <br />
            Shape How <br />
            <span className="italic font-light text-[#B86F52]">You Live.</span>
          </h1>

          {/* Mobile Description */}
          <p className="text-xs text-[#303633]/85 font-light leading-relaxed">
            Thoughtfully designed residences in exceptional locations, created around the way modern families live.
          </p>

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-3 pt-1">
            <a
              href="#properties"
              className="w-full py-3.5 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold text-center flex items-center justify-center gap-2 rounded-xl cursor-pointer"
            >
              <span>EXPLORE PROPERTIES</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86F52]" />
            </a>

            <button
              type="button"
              onClick={onOpenScheduleModal}
              className="w-full py-3.5 border border-[#18221F]/30 text-[#18221F] text-xs uppercase tracking-[0.2em] font-semibold text-center flex items-center justify-center gap-2 rounded-xl cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#A9825B]" />
              <span>SCHEDULE A VISIT</span>
            </button>
          </div>

          {/* Mobile Primary Image (Portrait 4:5 Crop Section 35) */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl bg-[#E8E1D5] mt-2">
            <Image
              src={HERO_IMAGES.primary}
              alt="Aurevia Estates Architecture"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18221F]/60 via-transparent to-transparent pointer-events-none" />

            {/* Mobile Secondary Floating Interior Image Overlapping (Section 37) */}
            <div className="absolute right-3 top-3 w-28 aspect-[4/3] rounded-lg overflow-hidden border-2 border-[#FCFBF8] shadow-lg z-20">
              <Image
                src={HERO_IMAGES.secondary}
                alt="Interior Detail"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            {/* Mobile Property Card (Section 38: calc(100% - 32px), max 390px) */}
            <div className="absolute bottom-3 left-4 right-4 bg-[#FCFBF8]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8E1D5] shadow-lg z-30">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#B86F52] font-semibold block">
                    FEATURED RESIDENCE
                  </span>
                  <h4 className="font-serif text-xs text-[#18221F]">THE ARANYA RESERVE</h4>
                  <p className="text-[10px] text-[#303633]/70">Kovaipudur · From ₹1.85 Cr</p>
                </div>
                <Link
                  href="/properties/aranya-villas"
                  className="px-3 py-1.5 bg-[#18221F] text-[#FCFBF8] text-[9px] uppercase tracking-[0.18em] font-medium rounded-lg cursor-pointer"
                >
                  EXPLORE
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* HERO EXIT ATMOSPHERIC GRADIENT TRANSITION TO NEXT SECTION */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#F5F2EA] via-[#F5F2EA]/80 to-transparent pointer-events-none z-10" />

      {/* Hero Minimal Scroll Indicator (Section 25 & 39) */}
      <div className="flex flex-col items-center gap-2 pt-2 relative z-20 text-center pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#303633]/50">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-7 bg-[#E8E1D5] relative overflow-hidden">
          <div className="w-full h-full bg-[#B86F52] animate-[scrollLine_2s_infinite]" />
        </div>
      </div>
    </section>
  );
};
