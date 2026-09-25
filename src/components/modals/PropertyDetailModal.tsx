'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, MapPin, CheckCircle2, Bed, Maximize2, Shield, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '@/types';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenScheduleModal: (propertyName: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onOpenScheduleModal,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!property) return null;

  const images = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [property.image];

  const handleNextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/90 backdrop-blur-md animate-fade-in-up overflow-y-auto">
      <div className="bg-white w-full max-w-4xl border border-stone-light/80 shadow-2xl overflow-hidden relative my-auto">

        {/* Modal Top Bar */}
        <div className="bg-charcoal text-white p-6 border-b border-gold/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium block">
              {property.type} · {property.status}
            </span>
            <h3 className="font-serif text-2xl font-normal text-white">
              {property.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-light hover:text-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">

          {/* Main Image Carousel */}
          <div className="relative aspect-[16/9] bg-charcoal overflow-hidden group">
            <Image
              src={images[currentImageIdx]}
              alt={property.name}
              fill
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/70 text-white flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/70 text-white flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-charcoal/80 text-gold text-[11px] px-3 py-1 font-mono">
              {currentImageIdx + 1} / {images.length}
            </div>
          </div>

          {/* Quick Specs Overview Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-offwhite border border-stone-light/80">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone font-medium block">Starting Price</span>
              <span className="font-serif text-xl text-charcoal font-semibold">{property.price}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone font-medium block">Configuration</span>
              <span className="text-sm font-semibold text-charcoal">{property.configuration}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone font-medium block">Super Built-up Area</span>
              <span className="text-sm font-semibold text-charcoal">{property.area}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-stone font-medium block">Location</span>
              <span className="text-sm font-semibold text-charcoal">{property.areaName}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-serif text-lg text-charcoal font-semibold">Architectural Concept</h4>
            <p className="text-xs text-stone-hover font-light leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg text-charcoal font-semibold">Residence Features & Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone font-light">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RERA Information */}
          <div className="p-4 bg-charcoal/5 border-l-2 border-gold flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone font-light">
              <Shield className="w-4 h-4 text-gold" />
              <span>RERA Registration No: <strong className="text-charcoal font-mono">{property.reraNumber}</strong></span>
            </div>
            <span className="text-[10px] text-stone/70">Demo Verified</span>
          </div>

          {/* Modal Action CTA Footer */}
          <div className="pt-4 border-t border-stone-light/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{property.location}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenScheduleModal(`${property.name} (${property.location})`);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Visit For This Property
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
