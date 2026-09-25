'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/hero/Hero';
import { TrustStats } from '@/components/sections/TrustStats';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { SignatureCollection } from '@/components/sections/SignatureCollection';
import { ProjectCategories } from '@/components/sections/ProjectCategories';
import { WhyAurevia } from '@/components/sections/WhyAurevia';
import { AboutSection } from '@/components/sections/AboutSection';
import { AranyaReserve } from '@/components/sections/AranyaReserve';
import { MasonryGallery } from '@/components/sections/MasonryGallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { TeamSection } from '@/components/sections/TeamSection';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { LeadEnquiryForm } from '@/components/sections/LeadEnquiryForm';
import { Footer } from '@/components/layout/Footer';

// Modals
import { ScheduleVisitModal } from '@/components/modals/ScheduleVisitModal';
import { PropertyDetailModal } from '@/components/modals/PropertyDetailModal';
import { GalleryLightboxModal } from '@/components/modals/GalleryLightboxModal';

import { Property, GalleryItem } from '@/types';

export default function Home() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<string | undefined>(undefined);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<Property | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [searchFilters, setSearchFilters] = useState<{
    location: string;
    type: string;
    budget: string;
    bedrooms: string;
  } | null>(null);

  const handleOpenScheduleModal = (propertyName?: string) => {
    setSelectedPropertyForVisit(propertyName);
    setScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setScheduleModalOpen(false);
    setSelectedPropertyForVisit(undefined);
  };

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col relative selection:bg-gold selection:text-charcoal">
      {/* Fixed Sticky Header Navigation */}
      <Navbar onOpenScheduleModal={() => handleOpenScheduleModal()} />

      {/* Hero with Floating Search Filter */}
      <Hero
        onOpenScheduleModal={() => handleOpenScheduleModal()}
        onSearchProperties={(filters) => setSearchFilters(filters)}
      />

      {/* Trust Statistics */}
      <TrustStats />

      {/* Selected Featured Properties Grid */}
      <FeaturedProperties
        searchFilters={searchFilters}
        onSelectProperty={(property) => setSelectedPropertyDetail(property)}
        onOpenScheduleModal={() => handleOpenScheduleModal()}
      />

      {/* Signature Collection Highlight: The Grand Residences */}
      <SignatureCollection
        onOpenScheduleModal={() => handleOpenScheduleModal('The Grand Residences (Race Course)')}
      />

      {/* 4 Image-Led Portfolio Categories */}
      <ProjectCategories />

      {/* Why Aurevia — Numbered Editorial Points */}
      <WhyAurevia />

      {/* About Philosophy & Fictional Timeline */}
      <AboutSection />

      {/* Full-width Signature Villa Reserve — Aranya Reserve */}
      <AranyaReserve
        onOpenScheduleModal={() => handleOpenScheduleModal('Aranya Reserve (Kovaipudur)')}
      />

      {/* Masonry Architectural Gallery & Lightbox */}
      <MasonryGallery
        onSelectImage={(item) => setSelectedGalleryItem(item)}
      />

      {/* Fictional Homeowner Testimonials */}
      <Testimonials />

      {/* Leadership & Team Section */}
      <TeamSection />

      {/* Editorial Insights & Journal */}
      <InsightsSection />

      {/* High-Impact CTA Banner */}
      <CtaBanner
        onOpenScheduleModal={() => handleOpenScheduleModal()}
      />

      {/* Contact & Advisory Lead Enquiry Form */}
      <LeadEnquiryForm />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={handleCloseScheduleModal}
        selectedPropertyName={selectedPropertyForVisit}
      />

      <PropertyDetailModal
        property={selectedPropertyDetail}
        onClose={() => setSelectedPropertyDetail(null)}
        onOpenScheduleModal={(propName) => handleOpenScheduleModal(propName)}
      />

      <GalleryLightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />
    </main>
  );
}
