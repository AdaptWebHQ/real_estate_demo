'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types';

interface MasonryGalleryProps {
  onSelectImage?: (item: GalleryItem) => void;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ onSelectImage }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = [
    'All',
    'Exterior architecture',
    'Living room',
    'Kitchen',
    'Master bedroom',
    'Landscape',
    'Pool',
    'Balcony',
    'Entrance lobby',
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section id="gallery" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                VISUAL ESSAY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Architecture in Detail
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2 max-w-2xl border-b border-gold/20 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeTab === cat
                    ? 'bg-gold text-charcoal font-semibold'
                    : 'text-stone-light/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            // Determine aspect ratio class
            let aspectClass = 'aspect-[4/3]';
            if (item.aspectRatio === 'portrait') aspectClass = 'aspect-[3/4]';
            if (item.aspectRatio === 'square') aspectClass = 'aspect-square';
            if (item.aspectRatio === 'wide') aspectClass = 'aspect-[16/9] sm:col-span-2';

            return (
              <div
                key={item.id}
                onClick={() => onSelectImage?.(item)}
                className={`group relative overflow-hidden bg-charcoal cursor-pointer border border-gold/20 ${aspectClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-40 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-gold/90 text-charcoal flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg text-white font-normal">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-stone-light/70 font-light">
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
