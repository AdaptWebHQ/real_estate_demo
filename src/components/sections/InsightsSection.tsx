'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '@/data/insights';

export const InsightsSection: React.FC = () => {
  const featuredArticle = INSIGHTS_ARTICLES[0];
  const sideArticles = INSIGHTS_ARTICLES.slice(1, 4);

  return (
    <section id="insights" className="py-24 sm:py-32 bg-[#F5F2EA] text-[#18221F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A9825B] font-semibold block">
              PERSPECTIVE & JOURNAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#18221F] tracking-tight">
              Property Insights
            </h2>
          </div>

          <Link
            href="/insights"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-[#18221F] hover:text-[#B86F52] transition-colors flex items-center gap-2 group"
          >
            <span>VIEW ALL ARTICLES</span>
            <ArrowUpRight className="w-4 h-4 text-[#A9825B]" />
          </Link>
        </div>

        {/* Magazine Editorial Layout: 1 Large Article + 3 Side Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Large Featured Article */}
          <div className="lg:col-span-7">
            <Link
              href={`/insights/${featuredArticle.slug}`}
              className="group bg-[#FCFBF8] border border-[#E8E1D5] rounded-2xl overflow-hidden shadow-editorial flex flex-col space-y-6 p-6 sm:p-8 hover:border-[#A9825B] transition-all duration-300 block"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#18221F]">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] bg-[#18221F] text-[#FCFBF8] font-semibold">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-[#303633]/60">
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#18221F] font-normal group-hover:text-[#B86F52] transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#303633]/80 font-light leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#A9825B]">
                  <span>READ FEATURED STORY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Right: 3 Smaller Articles */}
          <div className="lg:col-span-5 space-y-6 divide-y divide-[#E8E1D5]">
            {sideArticles.map((art) => (
              <Link
                key={art.id}
                href={`/insights/${art.slug}`}
                className="group pt-6 first:pt-0 flex flex-col space-y-2 block"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#B86F52] font-semibold">
                  <span>{art.category}</span>
                  <span className="text-[#303633]/50 font-normal">{art.readTime}</span>
                </div>

                <h4 className="font-serif text-lg text-[#18221F] font-normal group-hover:text-[#B86F52] transition-colors leading-snug">
                  {art.title}
                </h4>

                <p className="text-xs text-[#303633]/70 font-light line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
