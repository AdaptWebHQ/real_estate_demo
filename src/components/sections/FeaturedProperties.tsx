'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, RefreshCw, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Property } from '@/types';
import { PROPERTIES_DATA } from '@/data/properties';

interface FeaturedPropertiesProps {
  searchFilters?: { location: string; type: string; budget: string; bedrooms: string } | null;
  onSelectProperty?: (property: Property) => void;
  onOpenScheduleModal?: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  onSelectProperty,
}) => {
  const router = useRouter();
  const deckProperties = PROPERTIES_DATA.slice(0, 4);

  // Single Source of Truth: Selected property ID
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(deckProperties[0]?.id || 'prop-01');
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [shuffleCount, setShuffleCount] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Mobile Touch gesture tracking
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const hasDragged = useRef<boolean>(false);

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Derived selected property & index from single source of truth
  const selectedProperty = deckProperties.find((p) => p.id === selectedPropertyId) || deckProperties[0];
  const selectedIndex = deckProperties.findIndex((p) => p.id === selectedPropertyId);

  // Calculate z-index strictly: Active front card = 100, Hovered card = 80, Inactive cards = 50 down to 10
  const getCardZIndex = (idx: number, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) return 100;
    if (isHovered) return 80;
    const distance = Math.abs(idx - selectedIndex);
    return Math.max(10, 50 - distance * 10);
  };

  // 1. SELECTION ONLY — Updates active front card, DOES NOT open modal
  const handleSelectProperty = (propertyId: string) => {
    if (isAnimating) return;
    if (propertyId === selectedPropertyId) return;

    setIsAnimating(true);
    setSelectedPropertyId(propertyId);

    setTimeout(() => {
      setIsAnimating(false);
    }, 350);
  };

  // 2. MODAL POPUP OPENER — Explicitly opens property detail modal popup
  const handleOpenModal = (property: Property) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  // 3. CARD CLICK DISPATCHER — Front card opens modal popup; Back/Next cards select & bring to front
  const handleCardClick = (targetProp: Property, isSelected: boolean) => {
    if (isAnimating) return;

    if (isSelected) {
      // Clicked active front card -> open modal popup
      handleOpenModal(targetProp);
    } else {
      // Clicked inactive back/next card -> select targetProp.id and bring to front
      handleSelectProperty(targetProp.id);
    }
  };

  // Reshuffle Collection Action — Changes selection, DOES NOT open modal
  const handleShuffle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShuffleCount((prev) => prev + 1);

    const nextIndex = (selectedIndex + 1) % deckProperties.length;
    const nextProp = deckProperties[nextIndex];

    setTimeout(() => {
      setSelectedPropertyId(nextProp.id);
    }, 200);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Touch Handlers for Mobile Gesture Isolation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    hasDragged.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const distance = Math.hypot(
      currentX - touchStartPos.current.x,
      currentY - touchStartPos.current.y
    );
    if (distance > 12) {
      hasDragged.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, prop?: Property, isSelected?: boolean) => {
    if (!touchStartPos.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartPos.current.x - touchEndX;

    if (hasDragged.current && Math.abs(diffX) > 25) {
      // Horizontal swipe gesture -> SELECT ONLY, DO NOT NAVIGATE
      if (diffX > 0) {
        const nextIdx = (selectedIndex + 1) % deckProperties.length;
        handleSelectProperty(deckProperties[nextIdx].id);
      } else {
        const prevIdx = (selectedIndex - 1 + deckProperties.length) % deckProperties.length;
        handleSelectProperty(deckProperties[prevIdx].id);
      }
    } else if (!hasDragged.current && prop && isSelected !== undefined) {
      // Clean tap without drag -> trigger card click handler with specific property object
      handleCardClick(prop, isSelected);
    }

    touchStartPos.current = null;
    hasDragged.current = false;
  };

  return (
    <section id="properties" className="py-20 sm:py-28 lg:py-32 bg-[#F5F2EA] text-[#18221F] relative overflow-hidden select-none">
      {/* Background Architectural Watermark Grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#18221F_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E8E1D5]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold">
              <span className="h-[1px] w-8 bg-[#A9825B] inline-block" />
              <span>SELECTED RESIDENCES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#18221F] tracking-tight">
              Find a Place <br />
              <span className="italic font-light text-[#B86F52]">
                Worth Coming Home To.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#303633]/80 font-light leading-relaxed">
              A curated collection of residences shaped around comfort, character and connection.
            </p>
          </div>

          {/* Shuffle & Counter Control Header */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleShuffle}
              disabled={isAnimating}
              className="px-5 py-2.5 bg-[#FCFBF8] border border-[#E8E1D5] hover:border-[#B86F52] text-[#18221F] hover:text-[#B86F52] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 rounded-lg group cursor-pointer disabled:cursor-wait disabled:opacity-75"
              title="Reshuffle Property Deck"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#A9825B] transition-transform duration-500 ${isAnimating ? 'rotate-180' : 'group-hover:rotate-90'}`} />
              <span>SHUFFLE COLLECTION</span>
            </button>

            <span className="font-serif text-2xl text-[#18221F] font-normal tracking-tight hidden sm:block">
              0{selectedIndex + 1} <span className="text-[#A9825B] font-light text-xl">/</span> 0{deckProperties.length}
            </span>
          </div>
        </div>

        {/* DESKTOP & LAPTOP LAYOUT (1024px+) — PHYSICAL RUMMY CARD DECK */}
        <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-14 items-center min-h-[580px] xl:min-h-[620px] pt-2">
          
          {/* LEFT COLUMN (~58%) — INTERACTIVE CARD DECK */}
          <div className="col-span-7 relative h-[520px] xl:h-[580px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[540px] flex items-center justify-center">
              
              {deckProperties.map((prop, idx) => {
                const isSelected = selectedPropertyId === prop.id;
                const isHovered = hoveredPropertyId === prop.id;
                const diff = (idx - selectedIndex + deckProperties.length) % deckProperties.length;
                
                // Stacking order (Front card = 100)
                const zIndex = getCardZIndex(idx, isSelected, isHovered);

                // Responsive fan out transform values
                let rotateDeg = 0;
                let translateX = 0;
                let translateY = 0;
                let opacity = 0.9;
                let scale = 1;

                if (!prefersReducedMotion) {
                  if (isSelected) {
                    rotateDeg = 0;
                    translateX = 0;
                    translateY = isHovered ? -14 : -4;
                    opacity = 1;
                    scale = isHovered ? 1.03 : 1.01;
                  } else {
                    if (diff === 1) {
                      rotateDeg = 4;
                      translateX = 90;
                      translateY = 14;
                      opacity = isHovered ? 0.95 : 0.85;
                      scale = isHovered ? 1.02 : 0.96;
                    } else if (diff === 2) {
                      rotateDeg = 7;
                      translateX = 160;
                      translateY = 28;
                      opacity = isHovered ? 0.9 : 0.7;
                      scale = isHovered ? 1.01 : 0.92;
                    } else {
                      rotateDeg = -5;
                      translateX = -90;
                      translateY = 14;
                      opacity = isHovered ? 0.95 : 0.82;
                      scale = isHovered ? 1.02 : 0.95;
                    }
                  }

                  if (isHovered && !isSelected) {
                    translateY -= 12;
                    rotateDeg = 0;
                  }

                  if (isAnimating && shuffleCount > 0) {
                    translateX += (idx % 2 === 0 ? -25 : 25);
                    rotateDeg += (idx % 2 === 0 ? -6 : 6);
                  }
                } else {
                  opacity = isSelected ? 1 : 0.4;
                  scale = isSelected ? 1 : 0.92;
                  translateX = isSelected ? 0 : (idx - selectedIndex) * 20;
                }

                return (
                  <div
                    key={prop.id} // STABLE REACT KEY CRITICAL FOR REORDERING
                    className="absolute w-[310px] xl:w-[360px] h-[440px] xl:h-[490px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotateDeg}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                  >
                    {/* Entire Visible Card is an accessible button carrying target prop data */}
                    <button
                      type="button"
                      onClick={() => handleCardClick(prop, isSelected)}
                      onMouseEnter={() => setHoveredPropertyId(prop.id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                      disabled={isAnimating}
                      aria-label={isSelected ? `Open details for ${prop.name}` : `Select ${prop.name}`}
                      aria-pressed={isSelected}
                      className={`w-full h-full text-left rounded-2xl overflow-hidden bg-[#FCFBF8] border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86F52] focus-visible:ring-offset-2 active:scale-[0.99] ${
                        isAnimating ? 'cursor-default' : 'cursor-pointer'
                      } ${
                        isSelected
                          ? 'border-[#B86F52] shadow-[0_25px_60px_-15px_rgba(24,34,31,0.25),0_0_0_1px_rgba(184,111,82,0.4)]'
                          : 'border-[#E8E1D5] shadow-[0_15px_35px_-10px_rgba(24,34,31,0.12)] hover:border-[#B86F52]/60'
                      }`}
                    >
                      {/* Visual Content Wrapper with pointer-events-none */}
                      <div className="w-full h-full flex flex-col pointer-events-none select-none">
                        
                        {/* Top Architectural Image */}
                        <div className="relative h-[240px] xl:h-[280px] w-full bg-[#18221F] overflow-hidden pointer-events-none">
                          <Image
                            src={prop.image}
                            alt={prop.name}
                            fill
                            sizes="(max-width: 1280px) 310px, 360px"
                            className={`object-cover transition-transform duration-700 pointer-events-none ${
                              isHovered ? 'scale-105' : 'scale-100'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#18221F]/75 via-transparent to-transparent pointer-events-none" />

                          {/* Card Number Badge */}
                          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                            <span className="text-[10px] font-mono tracking-widest bg-[#18221F]/90 text-[#FCFBF8] px-3 py-1 backdrop-blur-md border border-white/10 rounded">
                              0{idx + 1}
                            </span>
                            {isSelected && (
                              <span className="text-[9px] uppercase tracking-[0.2em] bg-[#B86F52] text-[#FCFBF8] px-2.5 py-1 font-semibold flex items-center gap-1 shadow-sm rounded">
                                <Check className="w-3 h-3" /> SELECTED
                              </span>
                            )}
                          </div>

                          {/* Status Tag */}
                          <div className="absolute top-4 right-4 z-10 pointer-events-none">
                            <span className="text-[9px] uppercase tracking-[0.18em] bg-[#FCFBF8]/90 text-[#18221F] px-2.5 py-1 backdrop-blur-md font-semibold rounded">
                              {prop.status}
                            </span>
                          </div>
                        </div>

                        {/* Card Content & Prominent Property Name */}
                        <div className="p-5 xl:p-6 space-y-3 bg-[#FCFBF8] flex-1 flex flex-col justify-between pointer-events-none">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9825B] font-semibold block">
                              {prop.type} · {prop.city}
                            </span>

                            <div className="relative inline-block">
                              <h3
                                className={`font-serif text-2xl xl:text-3xl font-normal transition-colors tracking-tight ${
                                  isSelected || isHovered ? 'text-[#18221F]' : 'text-[#303633]'
                                }`}
                              >
                                {prop.name}
                              </h3>
                              {/* Animated Underline */}
                              <span
                                className={`block h-[2px] bg-[#B86F52] transition-all duration-300 ${
                                  isHovered || isSelected ? 'w-full' : 'w-0'
                                }`}
                              />
                            </div>

                            <p className="text-xs text-[#303633]/70 font-light flex items-center gap-1 pt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-[#A9825B] shrink-0" />
                              {prop.location}
                            </p>
                          </div>

                          {/* Quick Specs */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#E8E1D5] text-xs">
                            <div>
                              <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">CONFIG</span>
                              <strong className="font-serif text-sm text-[#18221F]">{prop.configuration}</strong>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">PRICING</span>
                              <strong className="font-serif text-sm text-[#B86F52]">
                                {prop.price.split(' ')[0]} {prop.price.split(' ')[1]}
                              </strong>
                            </div>
                          </div>
                        </div>

                      </div>
                    </button>
                  </div>
                );
              })}

            </div>
          </div>

          {/* RIGHT COLUMN (~42%) — SELECTED RESIDENCE DETAILS PANEL */}
          <div className="col-span-5 space-y-6 lg:pl-2 xl:pl-4">
            
            <div
              key={`details-${selectedProperty.id}`}
              className="bg-[#FCFBF8] border border-[#E8E1D5] rounded-2xl p-7 xl:p-10 shadow-editorial space-y-6 transition-all duration-500 animate-fade-in"
            >
              {/* Eyebrow & Status */}
              <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#B86F52] font-semibold">
                  0{selectedIndex + 1} — SELECTED RESIDENCE
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] bg-[#18221F] text-[#FCFBF8] px-3 py-1 font-semibold rounded">
                  {selectedProperty.status}
                </span>
              </div>

              {/* Title & Location */}
              <div className="space-y-2">
                <h3 className="font-serif text-3xl xl:text-5xl text-[#18221F] font-normal tracking-tight">
                  {selectedProperty.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#303633]/70 font-light flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A9825B] shrink-0" />
                  {selectedProperty.location}
                </p>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-[#F5F2EA] p-5 rounded-xl border border-[#E8E1D5] text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#303633]/60 font-medium block">
                    CONFIGURATION
                  </span>
                  <strong className="font-serif text-base text-[#18221F] font-normal block pt-0.5">
                    {selectedProperty.configuration}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#303633]/60 font-medium block">
                    BUILT-UP AREA
                  </span>
                  <strong className="font-serif text-base text-[#18221F] font-normal block pt-0.5">
                    {selectedProperty.area}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#303633]/60 font-medium block">
                    STARTING PRICE
                  </span>
                  <strong className="font-serif text-base text-[#B86F52] font-normal block pt-0.5">
                    {selectedProperty.price}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#303633]/60 font-medium block">
                    CORRIDOR
                  </span>
                  <strong className="text-xs text-[#18221F] font-medium block pt-1">
                    {selectedProperty.city}
                  </strong>
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="text-xs sm:text-sm text-[#303633]/80 font-light leading-relaxed line-clamp-3">
                "{selectedProperty.description}"
              </p>

              {/* Direct Modal trigger for currently selected property */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onSelectProperty?.(selectedProperty)}
                  className="flex-1 py-4 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] transition-all duration-300 flex items-center justify-center gap-3 shadow-md group rounded-lg cursor-pointer"
                >
                  <span>VIEW PROPERTY DETAILS</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 text-[#B86F52] group-hover:text-[#FCFBF8]" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* MOBILE & TABLET STACKED CARD DECK (<1024px) */}
        <div className="lg:hidden flex flex-col space-y-8">
          
          {/* Mobile Card Carousel Stack with gesture separation */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => handleTouchEnd(e)}
            className="relative h-[440px] sm:h-[480px] w-full flex items-center justify-center overflow-hidden touch-pan-y"
          >
            {deckProperties.map((prop, idx) => {
              const isSelected = selectedPropertyId === prop.id;
              const diff = (idx - selectedIndex + deckProperties.length) % deckProperties.length;

              let scale = 1;
              let translateY = 0;
              let rotateDeg = 0;
              let opacity = 1;
              let zIndex = getCardZIndex(idx, isSelected, false);

              if (isSelected) {
                scale = 1;
                translateY = 0;
                rotateDeg = 0;
                opacity = 1;
              } else if (diff === 1) {
                scale = 0.94;
                translateY = 16;
                rotateDeg = 3;
                opacity = 0.75;
              } else {
                scale = 0.88;
                translateY = 28;
                rotateDeg = -3;
                opacity = 0.5;
              }

              return (
                <div
                  key={prop.id} // STABLE REACT KEY
                  className="absolute w-[calc(100vw-32px)] max-w-[390px] h-[410px] sm:h-[440px] transition-all duration-500 ease-out"
                  style={{
                    transform: `translate3d(0px, ${translateY}px, 0px) rotate(${rotateDeg}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  {/* Semantic Button for Mobile Cards */}
                  <button
                    type="button"
                    onClick={(e) => {
                      if (hasDragged.current) return;
                      handleCardClick(prop, isSelected);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      handleTouchEnd(e, prop, isSelected);
                    }}
                    disabled={isAnimating}
                    aria-label={isSelected ? `Open details for ${prop.name}` : `Select ${prop.name}`}
                    aria-pressed={isSelected}
                    className={`w-full h-full text-left rounded-2xl overflow-hidden bg-[#FCFBF8] border shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86F52] active:scale-[0.99] ${
                      isSelected ? 'border-[#B86F52]' : 'border-[#E8E1D5]'
                    }`}
                  >
                    <div className="w-full h-full flex flex-col pointer-events-none select-none">
                      <div className="relative h-[220px] sm:h-[240px] w-full bg-[#18221F] pointer-events-none">
                        <Image
                          src={prop.image}
                          alt={prop.name}
                          fill
                          sizes="390px"
                          className="object-cover pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#18221F]/75 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                          <span className="text-[10px] font-mono tracking-widest bg-[#18221F]/90 text-[#FCFBF8] px-2.5 py-0.5 rounded">
                            0{idx + 1}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] uppercase tracking-[0.18em] bg-[#B86F52] text-[#FCFBF8] px-2 py-0.5 font-semibold rounded">
                              SELECTED
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-5 space-y-3 bg-[#FCFBF8] flex-1 flex flex-col justify-between pointer-events-none">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-[#A9825B] font-semibold block">
                            {prop.type} · {prop.city}
                          </span>
                          <h3 className="font-serif text-2xl font-normal text-[#18221F]">
                            {prop.name}
                          </h3>
                          <p className="text-xs text-[#303633]/70 font-light flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#A9825B]" />
                            {prop.location}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#E8E1D5] text-xs">
                          <div>
                            <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">CONFIG</span>
                            <strong className="font-serif text-xs text-[#18221F]">{prop.configuration}</strong>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">STARTING</span>
                            <strong className="font-serif text-xs text-[#B86F52]">{prop.price}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile Navigation Controls — SELECT ONLY, DO NOT NAVIGATE */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                const prevIdx = (selectedIndex - 1 + deckProperties.length) % deckProperties.length;
                handleSelectProperty(deckProperties[prevIdx].id);
              }}
              disabled={isAnimating}
              className="p-3 bg-[#FCFBF8] border border-[#E8E1D5] text-[#18221F] hover:bg-[#18221F] hover:text-[#FCFBF8] transition-colors rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Previous Property"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="font-serif text-lg text-[#18221F]">
              0{selectedIndex + 1} / 0{deckProperties.length}
            </span>

            <button
              type="button"
              onClick={() => {
                const nextIdx = (selectedIndex + 1) % deckProperties.length;
                handleSelectProperty(deckProperties[nextIdx].id);
              }}
              disabled={isAnimating}
              className="p-3 bg-[#FCFBF8] border border-[#E8E1D5] text-[#18221F] hover:bg-[#18221F] hover:text-[#FCFBF8] transition-colors rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Next Property"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile & Tablet Selected Property Details Panel */}
          <div className="bg-[#FCFBF8] border border-[#E8E1D5] p-6 sm:p-8 rounded-xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B86F52] font-semibold block">
                SELECTED RESIDENCE
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] bg-[#18221F] text-[#FCFBF8] px-2.5 py-0.5 font-semibold rounded">
                {selectedProperty.status}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#18221F]">
                {selectedProperty.name}
              </h3>
              <p className="text-xs text-[#303633]/70 font-light flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#A9825B]" />
                {selectedProperty.location}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#F5F2EA] p-4 rounded-lg border border-[#E8E1D5] text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">CONFIG</span>
                <strong className="font-serif text-sm text-[#18221F]">{selectedProperty.configuration}</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">AREA</span>
                <strong className="font-serif text-sm text-[#18221F]">{selectedProperty.area}</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">PRICE</span>
                <strong className="font-serif text-sm text-[#B86F52]">{selectedProperty.price}</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#303633]/60 block">CORRIDOR</span>
                <strong className="text-xs text-[#18221F] font-medium block pt-0.5">{selectedProperty.city}</strong>
              </div>
            </div>

            <p className="text-xs text-[#303633]/80 font-light leading-relaxed">
              "{selectedProperty.description}"
            </p>

            <button
              type="button"
              onClick={() => onSelectProperty?.(selectedProperty)}
              className="w-full py-3.5 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold text-center flex items-center justify-center gap-2 rounded-lg hover:bg-[#B86F52] transition-colors shadow-sm cursor-pointer"
            >
              <span>VIEW PROPERTY DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86F52]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
