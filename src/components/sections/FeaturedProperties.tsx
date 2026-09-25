'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Maximize2, Bed, Tag } from 'lucide-react';
import { Property } from '@/types';
import { PROPERTIES_DATA } from '@/data/properties';

interface FeaturedPropertiesProps {
  searchFilters?: { location: string; type: string; budget: string; bedrooms: string } | null;
  onSelectProperty?: (property: Property) => void;
  onOpenScheduleModal?: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  searchFilters,
  onSelectProperty,
  onOpenScheduleModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter properties by active category or search query
  const filteredProperties = PROPERTIES_DATA.filter((property) => {
    if (searchFilters) {
      // If user submitted search form
      const matchesLocation = !searchFilters.location || property.city.toLowerCase() === searchFilters.location.toLowerCase();
      const matchesType = !searchFilters.type || property.type.toLowerCase().includes(searchFilters.type.toLowerCase());
      return matchesLocation && matchesType;
    }

    if (activeCategory === 'All') return true;
    return property.type.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const categories = ['All', 'Apartments', 'Luxury Villas', 'Boutique Residences'];

  return (
    <section id="properties" className="py-24 bg-offwhite text-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                SELECTED RESIDENCES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal">
              Exceptional Properties. <br />
              <span className="italic text-stone font-light">Enduring Value.</span>
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-light/60 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-charcoal text-gold font-semibold'
                    : 'text-stone hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="group bg-white border border-stone-light/70 overflow-hidden shadow-card hover:shadow-editorial transition-all duration-500 flex flex-col"
            >
              {/* Image Container with 1.04x Scale on Hover */}
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-600 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] bg-charcoal/90 text-gold backdrop-blur-md border border-gold/30 font-medium">
                    {property.status}
                  </span>
                </div>

                {/* Quick Spec Tags */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs font-light">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 bg-charcoal/70 px-2.5 py-1 backdrop-blur-sm">
                      <Bed className="w-3.5 h-3.5 text-gold" />
                      {property.configuration}
                    </span>
                    <span className="flex items-center gap-1 bg-charcoal/70 px-2.5 py-1 backdrop-blur-sm">
                      <Maximize2 className="w-3.5 h-3.5 text-gold" />
                      {property.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-medium">
                      {property.type}
                    </span>
                    <span className="font-serif text-lg text-charcoal font-semibold">
                      {property.price}
                    </span>
                  </div>

                  {/* Title Shifting Subtly */}
                  <h3 className="font-serif text-2xl font-normal text-charcoal transition-transform duration-500 group-hover:translate-x-1">
                    {property.name}
                  </h3>

                  <p className="text-xs text-stone flex items-center gap-1.5 font-light">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                    {property.location}
                  </p>

                  <p className="text-xs text-stone-hover font-light leading-relaxed line-clamp-2">
                    {property.description}
                  </p>
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-stone-light/60 flex items-center justify-between">
                  <button
                    onClick={() => onSelectProperty?.(property)}
                    className="text-xs uppercase tracking-[0.18em] font-semibold text-charcoal group-hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span>View Property Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2 text-gold" />
                  </button>

                  <button
                    onClick={() => onOpenScheduleModal?.()}
                    className="text-[11px] uppercase tracking-[0.15em] text-stone hover:text-charcoal underline underline-offset-4"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
