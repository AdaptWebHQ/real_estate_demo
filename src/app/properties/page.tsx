'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { LeadEnquiryForm } from '@/components/sections/LeadEnquiryForm';
import { ScheduleVisitModal } from '@/components/modals/ScheduleVisitModal';
import { PropertyDetailModal } from '@/components/modals/PropertyDetailModal';
import { Property } from '@/types';

export default function PropertiesPage() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<string | undefined>(undefined);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<Property | null>(null);

  const handleOpenScheduleModal = (propertyName?: string) => {
    setSelectedPropertyForVisit(propertyName);
    setScheduleModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar onOpenScheduleModal={() => handleOpenScheduleModal()} />

      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            AUREVIA RESIDENCES DIRECTORY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
            Selected Residences
          </h1>
          <p className="text-stone-light/80 text-sm font-light max-w-xl leading-relaxed">
            Browse our complete portfolio of ready-to-move apartments, luxury villa reserves, and boutique urban homes.
          </p>
        </div>
      </section>

      <FeaturedProperties
        onSelectProperty={(property) => setSelectedPropertyDetail(property)}
        onOpenScheduleModal={() => handleOpenScheduleModal()}
      />

      <LeadEnquiryForm />
      <Footer />

      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        selectedPropertyName={selectedPropertyForVisit}
      />

      <PropertyDetailModal
        property={selectedPropertyDetail}
        onClose={() => setSelectedPropertyDetail(null)}
        onOpenScheduleModal={(propName) => handleOpenScheduleModal(propName)}
      />
    </main>
  );
}
