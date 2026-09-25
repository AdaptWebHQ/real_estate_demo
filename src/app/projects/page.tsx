'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FEATURED_PROJECT, ARANYA_RESERVE_PROJECT } from '@/data/projects';
import { ScheduleVisitModal } from '@/components/modals/ScheduleVisitModal';

export default function ProjectsPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const projects = [FEATURED_PROJECT, ARANYA_RESERVE_PROJECT];

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar onOpenScheduleModal={() => setScheduleModalOpen(true)} />

      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            PORTFOLIO HIGHLIGHTS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
            Signature Projects
          </h1>
          <p className="text-stone-light/80 text-sm font-light max-w-xl leading-relaxed">
            Exploration of low-density luxury villa enclaves and high-rise architectural towers.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-16">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-stone-light/80 shadow-editorial overflow-hidden items-center"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] bg-charcoal overflow-hidden">
              <Image
                src={proj.mainImage}
                alt={proj.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-2 text-xs uppercase tracking-[0.2em] bg-gold text-charcoal font-semibold">
                  {proj.tag}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.25em]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.location}</span>
                </div>
                <h2 className="font-serif text-3xl font-normal text-charcoal">{proj.name}</h2>
                <p className="text-xs text-stone-hover font-light leading-relaxed">{proj.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-stone-light/60 py-4 text-xs">
                <div>
                  <span className="text-stone font-light block">Starting Price</span>
                  <span className="font-serif text-lg font-semibold text-charcoal">{proj.startingPrice}</span>
                </div>
                <div>
                  <span className="text-stone font-light block">Possession</span>
                  <span className="font-semibold text-gold">{proj.possessionDate}</span>
                </div>
              </div>

              <Link
                href={`/projects/${proj.slug}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors"
              >
                <span>View Full Project Blueprint</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Footer />

      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </main>
  );
}
