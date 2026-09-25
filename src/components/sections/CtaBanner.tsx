'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CtaBannerProps {
  onOpenScheduleModal?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenScheduleModal }) => {
  return (
    <section className="relative py-28 bg-charcoal text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Aurevia Estates Sanctuary"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/80" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block">
            BEGIN YOUR ADVISORY CONSULTATION
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
            Your Next Chapter <br />
            <span className="italic text-gold font-light">Starts Here.</span>
          </h2>
          <p className="text-stone-light/80 text-base font-light max-w-xl mx-auto leading-relaxed">
            Tell us what you're looking for. Our property advisors will help you explore the right residence for your needs.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#properties"
            className="px-8 py-4 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300 flex items-center gap-3 group"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <button
            onClick={() => onOpenScheduleModal?.()}
            className="px-8 py-4 border border-white/40 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-gold hover:text-gold transition-all duration-300 flex items-center gap-3"
          >
            <MessageSquare className="w-4 h-4 text-gold" />
            <span>Talk to an Advisor</span>
          </button>
        </div>
      </div>
    </section>
  );
};
