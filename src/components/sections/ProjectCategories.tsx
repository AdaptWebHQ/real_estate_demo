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
    <section className="py-24 sm:py-32 bg-[#FCFBF8] text-[#18221F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold block">
            PORTFOLIO SPECTRUM
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#18221F] tracking-tight">
            Crafted for Purpose & Quality
          </h2>
        </div>

        {/* 2x2 Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.link}
              className="group relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#18221F] shadow-card hover:shadow-editorial transition-all duration-500 flex flex-col justify-end p-8 sm:p-10 border border-[#E8E1D5]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18221F] via-[#18221F]/30 to-transparent group-hover:from-[#18221F]/90 transition-colors duration-500" />

              <div className="relative z-10 space-y-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FCFBF8] font-normal group-hover:text-[#A9825B] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-[#FCFBF8] group-hover:bg-[#A9825B] group-hover:text-[#18221F] group-hover:border-[#A9825B] transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#E8E1D5]/80 font-light leading-relaxed">
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
