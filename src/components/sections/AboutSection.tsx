'use me';
'use client';

import React from 'react';
import Image from 'next/image';

export const AboutSection: React.FC = () => {
  const milestones = [
    { year: '2011', title: 'Aurevia Estates Founded', desc: 'Established in Coimbatore with a vision for modern architectural integrity.' },
    { year: '2015', title: 'First Community Delivered', desc: 'Completed inaugural residential project on Avinashi Road ahead of schedule.' },
    { year: '2019', title: 'Luxury Villa Portfolio Expansion', desc: 'Launched sanctuary villa living in Kovaipudur.' },
    { year: '2023', title: '2,000+ Homeowners Milestone', desc: 'Crossed 2,000 delivered homes with 98% customer satisfaction.' },
    { year: '2026', title: 'New Signature Projects', desc: 'Expanding boutique footprint across Chennai, Bengaluru and Tiruppur.' },
  ];

  return (
    <section id="about" className="py-24 bg-offwhite text-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Editorial Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                OUR PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal leading-tight">
              More Than Buildings. <br />
              <span className="italic text-stone font-light">We Create Places to Belong.</span>
            </h2>

            <div className="space-y-4 text-stone-hover font-light text-sm leading-relaxed">
              <p>
                Aurevia Estates was founded with a simple belief: a home should be more than a structure. It should be a place that supports how people live, grow and connect.
              </p>
              <p>
                From site selection to architecture, landscape and customer experience, every Aurevia project is shaped around thoughtful details and lasting value.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] border border-stone-light/80 shadow-editorial overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
                alt="Aurevia Estates Architectural Design"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-charcoal/10" />
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="border-t border-stone-light/80 pt-16">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-serif text-2xl text-charcoal font-normal">
              Our Journey & Milestones
            </h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-medium">
              Demo Portfolio Timeline (2011–2026)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {milestones.map((ms, idx) => (
              <div
                key={idx}
                className="bg-white p-6 border border-stone-light/70 space-y-3 relative hover:border-gold transition-colors duration-300"
              >
                <div className="w-2 h-2 bg-gold absolute top-4 right-4" />
                <span className="font-serif text-3xl font-semibold text-charcoal block">
                  {ms.year}
                </span>
                <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-charcoal">
                  {ms.title}
                </h4>
                <p className="text-[11px] text-stone font-light leading-relaxed">
                  {ms.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
