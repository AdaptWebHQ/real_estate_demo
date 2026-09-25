'use me';
'use client';

import React from 'react';

export const WhyAurevia: React.FC = () => {
  const points = [
    {
      number: '01',
      title: 'Proven Experience',
      description: 'Over a decade of experience creating thoughtfully planned spaces across South India.',
    },
    {
      number: '02',
      title: 'Architectural Quality',
      description: 'Every residence is shaped around light, proportion, functionality and enduring design.',
    },
    {
      number: '03',
      title: 'Transparent Process',
      description: 'Clear communication from first enquiry through possession.',
    },
    {
      number: '04',
      title: 'Prime Locations',
      description: 'We choose locations based on connectivity, liveability and long-term potential.',
    },
  ];

  return (
    <section id="why-aurevia" className="py-24 bg-charcoal text-white border-t border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gold inline-block"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
              THE AUREVIA STANDARD
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Built on Trust. <br />
            <span className="italic text-stone font-light">Designed for Tomorrow.</span>
          </h2>
        </div>

        {/* 4 Editorial Points with Numbered Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="space-y-4 border-t border-gold/20 pt-8 hover:border-gold transition-colors duration-500 group"
            >
              <span className="font-serif text-4xl lg:text-5xl text-gold/60 font-light block group-hover:text-gold transition-colors">
                {pt.number}
              </span>
              <h3 className="font-serif text-2xl font-normal text-white group-hover:text-gold transition-colors">
                {pt.title}
              </h3>
              <p className="text-xs text-stone-light/75 font-light leading-relaxed">
                "{pt.description}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
