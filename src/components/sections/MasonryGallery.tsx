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
  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#FCFBF8] text-[#18221F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold block">
            ARCHITECTURAL ESSAY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#18221F] tracking-tight">
            Curated Spaces & Detail
          </h2>
        </div>

        {/* Asymmetric Magazine Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.slice(0, 8).map((item, idx) => {
            let aspectClass = 'aspect-[4/3]';
            if (item.aspectRatio === 'portrait') aspectClass = 'aspect-[3/4]';
            if (item.aspectRatio === 'wide') aspectClass = 'aspect-[16/9] sm:col-span-2';

            return (
              <div
                key={item.id}
                onClick={() => onSelectImage?.(item)}
                className={`group relative overflow-hidden rounded-xl bg-[#18221F] cursor-pointer border border-[#E8E1D5] ${aspectClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18221F] via-transparent to-transparent opacity-40 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Number & Category Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <div className="flex justify-between items-center text-xs font-serif text-[#FCFBF8]">
                    <span>0{idx + 1} / 08</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-[#A9825B] text-[#18221F] px-2.5 py-1 font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-lg text-[#FCFBF8] font-normal">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#E8E1D5]/80 font-light">
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
