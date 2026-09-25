'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Building, Calendar, CheckCircle2 } from 'lucide-react';
import { FEATURED_PROJECT } from '@/data/projects';

interface SignatureCollectionProps {
  onOpenScheduleModal?: () => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({ onOpenScheduleModal }) => {
  return (
    <section id="signature-collection" className="py-24 bg-charcoal text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Asymmetric Image with Vertical Typography */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-gold/30 shadow-2xl group">
              <Image
                src={FEATURED_PROJECT.mainImage}
                alt={FEATURED_PROJECT.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />

              {/* Tag Overlay */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-2 text-xs uppercase tracking-[0.25em] bg-gold text-charcoal font-semibold shadow-lg">
                  {FEATURED_PROJECT.tag}
                </span>
              </div>
            </div>

            {/* Subtle Vertical Typography */}
            <div className="hidden sm:block absolute -left-8 top-12 bottom-12 z-20 pointer-events-none">
              <span className="vertical-text text-xs uppercase tracking-[0.4em] text-stone-light/30 font-serif">
                COIMBATORE · 2027
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.25em]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{FEATURED_PROJECT.location}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
                {FEATURED_PROJECT.headline}
              </h2>

              <p className="text-stone-light/80 text-sm font-light leading-relaxed">
                "{FEATURED_PROJECT.description}"
              </p>
            </div>

            {/* Project Specifications Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gold/20 border-b pb-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-light/60 block">
                  Starting From
                </span>
                <span className="font-serif text-2xl text-white font-semibold">
                  {FEATURED_PROJECT.startingPrice}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-light/60 block">
                  Residences
                </span>
                <span className="font-serif text-2xl text-gold font-normal">
                  {FEATURED_PROJECT.totalResidences} Private Units
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-light/60 block">
                  Configuration
                </span>
                <span className="text-sm text-white font-medium">
                  {FEATURED_PROJECT.configuration}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-light/60 block">
                  Possession
                </span>
                <span className="text-sm text-gold font-medium">
                  {FEATURED_PROJECT.possessionDate}
                </span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2.5">
              {FEATURED_PROJECT.highlights.slice(0, 3).map((hl, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-stone-light/90 font-light">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => onOpenScheduleModal?.()}
                className="w-full sm:w-auto px-8 py-4 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Explore The Grand Residences</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
