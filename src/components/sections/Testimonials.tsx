'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/testimonials';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The architecture attracted us. The attention to detail convinced us.",
      author: "Priya & Arjun Menon",
      property: "Azure Heights · Coimbatore",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      quote: "Living in Aranya Reserve feels like waking up in a private resort every morning.",
      author: "Karthik Subramanian",
      property: "Aranya Reserve · Kovaipudur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      quote: "From initial enquiry to handover, Aurevia’s transparency made buying our dream home effortless.",
      author: "Meera & Rajesh Varma",
      property: "Vistara One · Race Course",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const activeTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#E8E1D5] text-[#18221F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B86F52] font-semibold block">
              HOMEOWNER VOICES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#18221F] tracking-tight">
              Reflections on Living
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-serif text-[#18221F]">
            <span>0{currentIndex + 1} — 0{testimonials.length}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-[#18221F]/30 flex items-center justify-center hover:bg-[#18221F] hover:text-[#FCFBF8] transition-all"
                aria-label="Previous quote"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-[#18221F]/30 flex items-center justify-center hover:bg-[#18221F] hover:text-[#FCFBF8] transition-all"
                aria-label="Next quote"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Editorial Card Grid */}
        <div className="bg-[#FCFBF8] border border-[#D8D0C3] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Large Quote */}
          <div className="lg:col-span-8 space-y-4">
            <p className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#18221F] leading-snug tracking-tight">
              "{activeTestimonial.quote}"
            </p>
          </div>

          {/* Right: Customer Info */}
          <div className="lg:col-span-4 flex items-center lg:flex-col lg:items-start gap-4 border-t lg:border-t-0 lg:border-l border-[#E8E1D5] pt-6 lg:pt-0 lg:pl-8">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#A9825B] bg-[#18221F]">
              <Image
                src={activeTestimonial.avatar}
                alt={activeTestimonial.author}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-xl font-normal text-[#18221F]">
                {activeTestimonial.author}
              </h4>
              <span className="text-xs uppercase tracking-[0.18em] text-[#B86F52] font-semibold block">
                {activeTestimonial.property}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
