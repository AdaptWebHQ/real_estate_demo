'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface CtaBannerProps {
  onOpenScheduleModal?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenScheduleModal }) => {
  return (
    <section className="relative py-32 sm:py-40 bg-[#18221F] text-[#FCFBF8] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Aurevia Estates Sanctuary"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#18221F] via-[#18221F]/90 to-[#18221F]/80" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A9825B] font-semibold block">
            BEGIN YOUR ADVISORY CONSULTATION
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#FCFBF8] leading-tight">
            Your Next Chapter <br />
            <span className="italic text-[#B86F52] font-light">Starts Here.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#E8E1D5]/80 font-light max-w-xl mx-auto leading-relaxed">
            Tell us what you're looking for. Our property advisors will help you explore the right residence for your needs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#properties"
            className="w-full sm:w-auto px-8 py-4 bg-[#A9825B] text-[#18221F] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] hover:text-[#FCFBF8] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
          >
            <span>EXPLORE PROPERTIES</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => onOpenScheduleModal?.()}
            className="w-full sm:w-auto px-8 py-4 border border-white/30 text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#FCFBF8] hover:text-[#18221F] transition-all duration-300 flex items-center justify-center gap-3"
          >
            <MessageSquare className="w-4 h-4 text-[#A9825B]" />
            <span>TALK TO AN ADVISOR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
