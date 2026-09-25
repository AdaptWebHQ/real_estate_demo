'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Calendar, ArrowRight, ChevronRight, ChevronLeft, Building2 } from 'lucide-react';
import { PropertySearch } from './PropertySearch';

interface HeroProps {
  onOpenScheduleModal?: () => void;
  onSearchProperties?: (filters: { location: string; type: string; budget: string; bedrooms: string }) => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Azure Heights',
    location: 'Avinashi Road, Coimbatore',
    tag: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'The Aranya Villas',
    location: 'Kovaipudur, Coimbatore',
    tag: 'Luxury Villa Reserve',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'The Grand Residences',
    location: 'Race Course, Coimbatore',
    tag: 'Signature Collection 2027',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenScheduleModal, onSearchProperties }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 lg:px-12 bg-charcoal overflow-hidden">
      {/* Background Architectural Slide Show with Smooth Fade & Scale */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center opacity-50"
          />
          {/* Multi-layered Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Slide Navigation Controls on Right */}
      <div className="hidden lg:flex flex-col items-center space-y-4 absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3 items-center">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 flex items-center gap-2 group ${
                currentSlide === idx ? 'text-gold' : 'text-stone-light/40 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest">0{s.id}</span>
              <span
                className={`h-[2px] transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-gold' : 'w-3 bg-stone/40 group-hover:w-5'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <button
            onClick={handlePrevSlide}
            className="w-8 h-8 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextSlide}
            className="w-8 h-8 rounded-full border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl space-y-6 pt-8 pb-8">
          
          {/* Eyebrow Badge with Motion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-10 bg-gold inline-block"></span>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
              AUREVIA ESTATES · COIMBATORE
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] bg-gold/15 text-gold border border-gold/30">
              {slide.tag}
            </span>
          </motion.div>

          {/* Staggered Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight"
          >
            Where Architecture <br />
            <span className="italic font-light text-stone-light/90 bg-gradient-to-r from-white via-gold/90 to-stone-light bg-clip-text text-transparent">
              Meets the Art of Living.
            </span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-stone-light/80 font-light max-w-xl leading-relaxed"
          >
            Thoughtfully designed homes in exceptional locations, created for the way modern families live.
          </motion.p>

          {/* Action Buttons with Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <a
              href="#properties"
              className="px-8 py-4 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300 flex items-center gap-3 group shadow-lg"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenScheduleModal}
              className="px-8 py-4 border border-white/40 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-gold hover:text-gold transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>Schedule a Visit</span>
            </button>
          </motion.div>

        </div>

        {/* Floating Property Search Panel */}
        <div className="pt-6">
          <PropertySearch onSearch={onSearchProperties || (() => {})} />
        </div>
      </div>

      {/* Hero Bottom Meta Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 text-[11px] uppercase tracking-[0.2em] text-stone-light/60 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold animate-pulse">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span>Featured:</span>
              <strong className="text-white font-medium tracking-widest">{slide.title}</strong>
              <span className="text-stone-light/50">({slide.location})</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.a
          whileHover={{ y: 3 }}
          href="#trust-stats"
          className="flex items-center gap-2 text-stone-light/80 hover:text-gold transition-colors group cursor-pointer"
        >
          <span className="tracking-[0.25em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:scale-125 transition-transform" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};
