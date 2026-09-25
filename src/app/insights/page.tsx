'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { ScheduleVisitModal } from '@/components/modals/ScheduleVisitModal';

export default function InsightsPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar onOpenScheduleModal={() => setScheduleModalOpen(true)} />

      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            JOURNAL & PERSPECTIVE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
            Property Insights
          </h1>
          <p className="text-stone-light/80 text-sm font-light max-w-xl leading-relaxed">
            Thoughtful articles on home buying frameworks, architectural daylighting, and regional market trends.
          </p>
        </div>
      </section>

      <InsightsSection />
      <Footer />

      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </main>
  );
}
