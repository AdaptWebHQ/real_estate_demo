'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutSection } from '@/components/sections/AboutSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { WhyAurevia } from '@/components/sections/WhyAurevia';
import { ScheduleVisitModal } from '@/components/modals/ScheduleVisitModal';

export default function AboutPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar onOpenScheduleModal={() => setScheduleModalOpen(true)} />

      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            OUR HERITAGE & PHILOSOPHY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
            About Aurevia Estates
          </h1>
          <p className="text-stone-light/80 text-sm font-light max-w-xl leading-relaxed">
            Spaces Designed for Better Living. Contemporary property developer shaping thoughtfully planned residences across Coimbatore and South India.
          </p>
        </div>
      </section>

      <AboutSection />
      <WhyAurevia />
      <TeamSection />
      <Footer />

      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </main>
  );
}
