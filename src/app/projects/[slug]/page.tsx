import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { FEATURED_PROJECT, ARANYA_RESERVE_PROJECT } from '@/data/projects';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeadEnquiryForm } from '@/components/sections/LeadEnquiryForm';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

const ALL_PROJECTS = [FEATURED_PROJECT, ARANYA_RESERVE_PROJECT];

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = ALL_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Project Not Found | Aurevia Estates',
    };
  }
  return {
    title: `${project.name} | ${project.location} | Aurevia Estates`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = ALL_PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar />

      {/* Project Banner */}
      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                {project.tag}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
                {project.name}
              </h1>
              <p className="text-stone-light/80 text-sm font-light flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                {project.location}
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-light/60 block">Residences</span>
              <span className="font-serif text-3xl font-semibold text-gold">{project.totalResidences} Private Units</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Main Showcase */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="relative aspect-[16/9] bg-charcoal overflow-hidden border border-stone-light/80 shadow-2xl">
          <Image
            src={project.mainImage}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-3xl font-normal text-charcoal">{project.headline}</h2>
            <p className="text-sm text-stone-hover font-light leading-relaxed">{project.description}</p>

            <div className="space-y-4 pt-6 border-t border-stone-light/60">
              <h3 className="font-serif text-2xl font-normal text-charcoal">Architectural Highlights</h3>
              <div className="space-y-3">
                {project.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-stone font-light">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-8 border border-stone-light/80 shadow-editorial space-y-4">
            <h3 className="font-serif text-2xl font-normal text-charcoal">Project Overview</h3>
            <div className="space-y-3 text-xs divide-y divide-stone-light/40">
              <div className="pt-2 flex justify-between">
                <span className="text-stone">Starting Price</span>
                <strong className="text-charcoal">{project.startingPrice}</strong>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-stone">Residences</span>
                <strong className="text-charcoal">{project.totalResidences} Units</strong>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-stone">Configuration</span>
                <strong className="text-charcoal">{project.configuration}</strong>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-stone">Possession Date</span>
                <strong className="text-gold">{project.possessionDate}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadEnquiryForm />
      <Footer />
    </main>
  );
}
