import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, CheckCircle2, Shield, Calendar, ArrowLeft } from 'lucide-react';
import { PROPERTIES_DATA } from '@/data/properties';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LeadEnquiryForm } from '@/components/sections/LeadEnquiryForm';

interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const property = PROPERTIES_DATA.find((p) => p.slug === params.slug);
  if (!property) {
    return {
      title: 'Property Not Found | Aurevia Estates',
    };
  }
  return {
    title: `${property.name} | ${property.location} | Aurevia Estates`,
    description: property.description,
  };
}

export async function generateStaticParams() {
  return PROPERTIES_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = PROPERTIES_DATA.find((p) => p.slug === params.slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-offwhite text-charcoal flex flex-col pt-24">
      <Navbar />

      {/* Property Hero Banner */}
      <section className="bg-charcoal text-white py-16 px-6 sm:px-8 lg:px-12 border-b border-gold/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Properties
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                {property.type} · {property.status}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white">
                {property.name}
              </h1>
              <p className="text-stone-light/80 text-sm font-light flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                {property.location}
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-light/60 block">Starting From</span>
              <span className="font-serif text-3xl font-semibold text-gold">{property.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[16/10] bg-charcoal overflow-hidden border border-stone-light/80">
            <Image
              src={property.image}
              alt={property.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {property.galleryImages.slice(1, 5).map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] bg-charcoal overflow-hidden border border-stone-light/80">
                <Image
                  src={img}
                  alt={`${property.name} detail ${idx + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Specs */}
      <section className="py-12 bg-white border-t border-b border-stone-light/80 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-x divide-stone-light/60">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-stone">Configuration</span>
              <span className="font-serif text-2xl font-normal text-charcoal block">{property.configuration}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-stone">Super Built-up Area</span>
              <span className="font-serif text-2xl font-normal text-charcoal block">{property.area}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-stone">Status</span>
              <span className="font-serif text-2xl font-normal text-gold block">{property.status}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-stone">City Corridor</span>
              <span className="font-serif text-2xl font-normal text-charcoal block">{property.city}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Features */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-normal text-charcoal">Architectural Concept & Vision</h2>
            <p className="text-sm font-light text-stone-hover leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-stone-light/60">
            <h2 className="font-serif text-3xl font-normal text-charcoal">Residence Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-stone font-light">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RERA Certification */}
          <div className="p-6 bg-charcoal text-white border border-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gold shrink-0" />
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-gold font-medium block">RERA Certification</span>
                <span className="font-mono text-xs">{property.reraNumber}</span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.15em] bg-gold/15 text-gold px-3 py-1 border border-gold/30">
              Verified Demo Registration
            </span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 border border-stone-light/80 shadow-editorial space-y-6">
            <h3 className="font-serif text-2xl text-charcoal font-normal">Interested in {property.name}?</h3>
            <p className="text-xs text-stone font-light">
              Connect directly with an Aurevia property advisor for site visit scheduling and floor plan booklets.
            </p>
            <a
              href="#contact"
              className="w-full py-4 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Request Site Visit
            </a>
          </div>
        </div>
      </section>

      <LeadEnquiryForm />
      <Footer />
    </main>
  );
}
