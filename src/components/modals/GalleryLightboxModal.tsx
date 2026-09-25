'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Tag } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-xl animate-fade-in-up">
      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col justify-between">

        {/* Top bar */}
        <div className="flex items-center justify-between text-white z-10 pb-4 border-b border-gold/20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-gold text-charcoal font-semibold">
              {item.category}
            </span>
            <h4 className="font-serif text-xl font-normal text-white">{item.title}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-gold transition-colors"
            aria-label="Close photo"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 my-4 overflow-hidden border border-gold/30">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between text-xs text-stone-light/80 pt-3 border-t border-gold/20">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            <span>{item.location}</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-mono">
            Aurevia Architectural Photography
          </span>
        </div>

      </div>
    </div>
  );
};
