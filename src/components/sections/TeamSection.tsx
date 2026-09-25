'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { TEAM_MEMBERS } from '@/data/team';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-4 mb-16 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-gold inline-block"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              LEADERSHIP & DIRECTION
            </span>
            <span className="h-[1px] w-8 bg-gold inline-block"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            People Behind the Places
          </h2>
          <span className="text-[11px] uppercase tracking-[0.18em] text-stone-light/60 font-light block">
            Fictional Executive Leadership Profiles
          </span>
        </div>

        {/* 4 Team Member Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.id}
              className="group bg-charcoal-800 border border-gold/20 overflow-hidden hover:border-gold transition-colors duration-500 flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white font-normal group-hover:text-gold transition-colors">
                    {m.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-gold font-medium block">
                    {m.role}
                  </span>
                </div>

                <p className="text-xs text-stone-light/70 font-light leading-relaxed pt-3 border-t border-gold/15">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
