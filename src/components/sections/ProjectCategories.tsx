'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const ProjectCategories: React.FC = () => {
  const categories = [
    {
      title: 'Residential',
      description: 'Thoughtful homes for modern families.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      link: '#properties'
    },
    {
      title: 'Luxury Villas',
      description: 'Privacy, space and architectural character.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      link: '#aranya-reserve'
    },
    {
      title: 'Commercial',
      description: 'Strategic spaces for ambitious businesses.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      link: '#contact'
    },
    {
      title: 'Upcoming',
      description: "Discover what we're designing next.",
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      link: '#contact'
    }
  ];

  return (
    <section className="py-24 bg-offwhite text-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-4 mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block">
            PORTFOLIO SPECTRUM
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal">
            Crafted for Purpose & Quality
          </h2>
        </div>

        {/* 4 Image-Led Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.link}
              className="group relative aspect-[3/4] overflow-hidden bg-charcoal shadow-card hover:shadow-editorial transition-all duration-500 flex flex-col justify-end p-6 border border-stone-light/40"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-75 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent group-hover:from-charcoal/90 transition-colors duration-500" />

              <div className="relative z-10 space-y-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-gold transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-charcoal transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-stone-light/80 font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
