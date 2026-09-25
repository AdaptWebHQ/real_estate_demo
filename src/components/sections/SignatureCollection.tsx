'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

interface SignatureCollectionProps {
  onOpenScheduleModal?: () => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = () => {
  return (
    <section id="signature-collection" className="py-24 sm:py-32 bg-[#18221F] text-[#FCFBF8] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B9A87]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Header Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold">
            <span className="h-[1px] w-8 bg-[#A9825B] inline-block" />
            <span>FEATURED LANDMARK PROJECT</span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8B9A87] font-medium hidden sm:block">
            RACE COURSE · COIMBATORE
          </span>
        </div>

        {/* Large Architectural Image Showcase */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-[#222B28]">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
            alt="The Grand Residences"
            fill
            sizes="100vw"
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18221F] via-[#18221F]/40 to-transparent opacity-80" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A9825B] font-semibold block">
                THE GRAND RESIDENCES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FCFBF8] leading-tight">
                "An elevated approach <br />
                <span className="italic font-light text-[#E8E1D5]">to contemporary living."</span>
              </h2>
            </div>

            <Link
              href="/projects/the-grand-residences"
              className="px-8 py-4 bg-[#A9825B] text-[#18221F] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] hover:text-[#FCFBF8] transition-all duration-300 flex items-center justify-center gap-3 shrink-0 shadow-xl"
            >
              <span>EXPLORE PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Horizontal Project Specifications Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-white/15 py-8 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B9A87] font-semibold block">Residences</span>
            <strong className="font-serif text-2xl text-[#FCFBF8] font-normal block">64 Private Units</strong>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B9A87] font-semibold block">Configuration</span>
            <strong className="font-serif text-2xl text-[#FCFBF8] font-normal block">3 & 4 BHK Penthouses</strong>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B9A87] font-semibold block">Starting Price</span>
            <strong className="font-serif text-2xl text-[#A9825B] font-normal block">From ₹1.65 Cr</strong>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B9A87] font-semibold block">Possession Date</span>
            <strong className="font-serif text-2xl text-[#E8E1D5] font-normal block">Dec 2027</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
