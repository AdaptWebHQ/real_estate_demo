'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/testimonials';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-offwhite text-charcoal border-t border-b border-stone-light/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-4 mb-16 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold inline-block"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              HOMEOWNER VOICES
            </span>
            <span className="h-[1px] w-8 bg-gold inline-block"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal">
            Reflections on Living
          </h2>
          <span className="text-[11px] uppercase tracking-[0.18em] text-stone font-light block">
            Fictional Demo Homeowner Reviews
          </span>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 border border-stone-light/80 shadow-card hover:shadow-editorial transition-all duration-300 flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-gold/30 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-sm font-light text-stone-hover italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-light/60 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-lg text-charcoal font-semibold">
                    {t.name}
                  </h4>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-gold font-medium block">
                    {t.purchasedProperty}
                  </span>
                  <span className="text-[10px] text-stone font-light">
                    {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
