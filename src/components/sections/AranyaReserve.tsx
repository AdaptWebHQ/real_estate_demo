'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AranyaReserveProps {
  onOpenScheduleModal?: () => void;
}

export const AranyaReserve: React.FC<AranyaReserveProps> = () => {
  const specs = [
    '38 Private Villas',
    '3 & 4 BHK Layouts',
    'Landscaped Gardens',
    'Private Terraces',
  ];

  return (
    <section id="aranya-reserve" className="relative py-28 sm:py-36 bg-[#18221F] text-[#FCFBF8] overflow-hidden">
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Aranya Reserve Kovaipudur"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#18221F] via-[#18221F]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18221F] via-transparent to-[#18221F]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold block">
              SIGNATURE VILLA RESERVE · KOVAIPUDUR, COIMBATORE
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#FCFBF8] leading-tight">
              ARANYA RESERVE
            </h2>

            <p className="font-serif text-2xl sm:text-3xl italic text-[#B86F52] font-light">
              "A quieter way to live."
            </p>

            <p className="text-sm sm:text-base text-[#E8E1D5]/80 font-light leading-relaxed">
              Set against the foothills of the Western Ghats, Aranya Reserve is an exclusive sanctuary of 38 independent villas crafted around open sky courtyards and private gardens.
            </p>
          </div>

          {/* Overlay Specs Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#FCFBF8] font-medium tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-[#A9825B] shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/projects/aranya-reserve"
              className="inline-flex px-8 py-4 bg-[#A9825B] text-[#18221F] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] hover:text-[#FCFBF8] transition-all duration-300 items-center justify-center gap-3 shadow-xl"
            >
              <span>DISCOVER ARANYA RESERVE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
