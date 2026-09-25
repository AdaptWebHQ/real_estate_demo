'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Zap, Trees, Home, Compass } from 'lucide-react';

interface AranyaReserveProps {
  onOpenScheduleModal?: () => void;
}

export const AranyaReserve: React.FC<AranyaReserveProps> = ({ onOpenScheduleModal }) => {
  const features = [
    { label: '38 Private Villas', icon: Home },
    { label: '3 & 4 BHK Layouts', icon: Compass },
    { label: 'Landscaped Central Garden', icon: Trees },
    { label: 'Exclusive Clubhouse & Spa', icon: ShieldCheck },
    { label: 'Private Terraces', icon: MapPin },
    { label: 'EV-Ready Parking', icon: Zap },
    { label: 'Security-Controlled Entry', icon: ShieldCheck },
  ];

  return (
    <section id="aranya-reserve" className="relative py-28 bg-charcoal text-white overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Aranya Reserve Kovaipudur"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                SIGNATURE VILLA RESERVE · KOVAIPUDUR
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              ARANYA RESERVE
            </h2>

            <p className="font-serif text-2xl italic text-gold font-light">
              "A quieter way to live."
            </p>

            <p className="text-stone-light/80 text-sm font-light leading-relaxed">
              Set against the foothills of the Western Ghats, Aranya Reserve is an exclusive sanctuary of 38 independent villas crafted around open sky courtyards and private gardens.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gold/20">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-light/90 font-light">
                  <IconComp className="w-4 h-4 text-gold shrink-0" />
                  <span>{feat.label}</span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="pt-6">
            <button
              onClick={() => onOpenScheduleModal?.()}
              className="px-8 py-4 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Discover Aranya Reserve</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
