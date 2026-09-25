'use client';

import React from 'react';
import Image from 'next/image';

export const AboutSection: React.FC = () => {
  const milestones = [
    { year: '2011', title: 'Founded', desc: 'Established in Coimbatore with a vision for architectural integrity.' },
    { year: '2015', title: 'First Community', desc: 'Completed inaugural residential project on Avinashi Road.' },
    { year: '2019', title: 'Luxury Villas', desc: 'Launched sanctuary villa living in Kovaipudur.' },
    { year: '2026', title: 'Signature Collection', desc: 'Expanding footprint across South India premier corridors.' },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F5F2EA] text-[#18221F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Main Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT — Large Architectural Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/4.5] rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-editorial bg-[#18221F]">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
                alt="Aurevia Estates Architectural Philosophy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT — Philosophy & Vertical Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold block">
                OUR PHILOSOPHY
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#18221F] leading-tight tracking-tight">
                More Than Buildings. <br />
                <span className="italic font-light text-[#B86F52]">
                  We Create Places to Belong.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#303633]/80 font-light leading-relaxed">
                Aurevia Estates was founded with a simple belief: a home should be more than a structure. It should be a place that supports how people live, grow and connect.
              </p>
              <p className="text-sm text-[#303633]/70 font-light leading-relaxed">
                From site selection to architecture, landscape and customer experience, every Aurevia project is shaped around thoughtful details and lasting value.
              </p>
            </div>

            {/* Vertical Timeline */}
            <div className="border-t border-[#E8E1D5] pt-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9825B] font-semibold block">
                EVOLUTION TIMELINE
              </span>

              <div className="space-y-4">
                {milestones.map((ms, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-[#FCFBF8] border border-[#E8E1D5]">
                    <span className="font-serif text-xl font-normal text-[#18221F] w-16 shrink-0 text-[#B86F52]">
                      {ms.year}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#18221F]">
                        {ms.title}
                      </h4>
                      <p className="text-xs text-[#303633]/70 font-light">
                        {ms.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
