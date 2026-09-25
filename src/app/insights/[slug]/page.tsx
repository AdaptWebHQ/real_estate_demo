import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '@/data/insights';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface InsightArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: InsightArticlePageProps): Promise<Metadata> {
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return {
      title: 'Article Not Found | Aurevia Estates Journal',
    };
  }
  return {
    title: `${article.title} | Aurevia Estates Journal`,
    description: article.summary,
  };
}

export async function generateStaticParams() {
  return INSIGHTS_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export default function InsightArticlePage({ params }: InsightArticlePageProps) {
  const article = INSIGHTS_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar />

      {/* Article Header */}
      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-gold text-charcoal font-semibold inline-block">
            {article.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-stone-light/70 pt-2 border-t border-gold/15">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              {article.readTime}
            </span>
            <span>By <strong>{article.author}</strong></span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="relative aspect-[16/9] bg-charcoal overflow-hidden border border-stone-light/80 shadow-2xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg text-stone-hover font-light leading-relaxed space-y-6">
          <p className="text-lg text-charcoal font-serif italic border-l-2 border-gold pl-4 py-1">
            "{article.summary}"
          </p>

          <p>
            When evaluating residential real estate investments in South India’s rapidly growing urban hubs, location and architectural integrity remain the twin pillars of long-term capital preservation.
          </p>

          <h2 className="font-serif text-2xl text-charcoal font-semibold pt-4">Key Evaluation Criteria</h2>
          <p>
            Every property considered should undergo rigorous micro-market analysis, title clearance verification, and ventilation efficiency reviews to ensure seamless living comfort.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
