'use me';
'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '@/data/insights';

export const InsightsSection: React.FC = () => {
  return (
    <section id="insights" className="py-24 bg-offwhite text-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                EDITORIAL & PERSPECTIVE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal">
              Insights & Journal
            </h2>
          </div>

          <a
            href="#insights"
            className="text-xs uppercase tracking-[0.2em] font-semibold text-charcoal hover:text-gold transition-colors flex items-center gap-2 group"
          >
            <span>View All Insights</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 4 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {INSIGHTS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-white border border-stone-light/80 overflow-hidden shadow-card hover:shadow-editorial transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-600 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-charcoal/90 text-gold backdrop-blur-md border border-gold/30 font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-stone">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-charcoal group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-hover font-light leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-light/40 flex items-center justify-between text-xs">
                <span className="text-stone font-light">By {article.author}</span>
                <span className="text-gold font-semibold uppercase tracking-wider group-hover:underline">Read Article</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
