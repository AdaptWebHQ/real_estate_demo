'use client';

import React from 'react';
import Image from 'next/image';
import { TEAM_MEMBERS } from '@/data/team';

export const TeamSection: React.FC = () => {
  const team = [
    {
      name: 'Arvind Rao',
      role: 'Founder & Managing Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Nisha Raman',
      role: 'Director — Design & Development',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Vikram Iyer',
      role: 'Head of Projects',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Ananya Krish',
      role: 'Customer Experience Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#18221F] text-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold block">
            EXECUTIVE LEADERSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FCFBF8] tracking-tight">
            People Behind the Places
          </h2>
        </div>

        {/* Tall Vertical Portrait Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-[#222B28] border border-white/10 shadow-editorial transition-all duration-500"
            >
              <div className="relative aspect-[3/4.2] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18221F] via-[#18221F]/20 to-transparent" />
              </div>

              <div className="p-6 space-y-1 relative z-10 bg-[#18221F]">
                <h3 className="font-serif text-xl text-[#FCFBF8] font-normal group-hover:text-[#A9825B] transition-colors">
                  {m.name}
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-[#B86F52] font-semibold block">
                  {m.role}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
