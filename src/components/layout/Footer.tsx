'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest text-ivory relative overflow-hidden pt-20 pb-12 border-t border-white/10">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#F5F2EA_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Background Subtle Architectural Lines */}
      <svg
        className="absolute right-0 top-0 w-[800px] h-[800px] opacity-[0.03] pointer-events-none"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="300" stroke="#F5F2EA" strokeWidth="1" />
        <circle cx="400" cy="400" r="200" stroke="#F5F2EA" strokeWidth="1" />
        <line x1="100" y1="400" x2="700" y2="400" stroke="#F5F2EA" strokeWidth="1" />
        <line x1="400" y1="100" x2="400" y2="700" stroke="#F5F2EA" strokeWidth="1" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Area: Massive Typographic Invitation */}
        <div className="pb-16 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-medium mb-4 block">
                BEGIN YOUR INQUIRY
              </span>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] text-ivory tracking-tight">
                Let's Find <br />
                <span className="italic font-light text-sand">Your Place.</span>
              </h2>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:pl-8">
              <div className="space-y-2">
                <a
                  href="mailto:hello@aureviaestates.example"
                  className="block font-sans text-lg sm:text-xl text-ivory/90 hover:text-terracotta transition-colors duration-300"
                >
                  hello@aureviaestates.example
                </a>
                <a
                  href="tel:+914224012800"
                  className="block font-mono text-base text-sand/80 hover:text-ivory transition-colors duration-300"
                >
                  +91 422 401 2800
                </a>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-terracotta text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-bronze transition-colors duration-300 group shadow-lg"
              >
                <span>SCHEDULE A VISIT</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Main Columns */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10">
          
          {/* LEFT COLUMN: Logo & Description */}
          <div className="lg:col-span-5 space-y-6">
            <Logo size="lg" />
            <p className="text-sm font-light text-sand/70 leading-relaxed max-w-md">
              Thoughtfully designed residences and commercial spaces in exceptional locations across South India, created around the way modern families live.
            </p>
          </div>

          {/* CENTER COLUMN: Explore Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-terracotta font-medium">
              EXPLORE
            </h3>
            <ul className="space-y-3 font-serif text-lg text-ivory/90">
              {[
                { name: 'Properties', href: '/properties' },
                { name: 'Projects', href: '/projects' },
                { name: 'About', href: '/about' },
                { name: 'Insights', href: '/insights' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-terracotta transition-colors duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Visit Us & Social */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.25em] text-terracotta font-medium">
                VISIT US
              </h3>
              <p className="text-sm font-light text-sand/80 leading-relaxed">
                No. 42, Avinashi Road<br />
                Coimbatore, Tamil Nadu 641018
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.25em] text-terracotta font-medium">
                SOCIAL
              </h3>
              <div className="flex items-center gap-6 text-sm font-light text-sand/80">
                <a
                  href="https://instagram.example"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory transition-colors duration-300"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.example"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="https://youtube.example"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ivory transition-colors duration-300"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-sand/60">
          <div>
            © 2026 Aurevia Estates. All rights reserved.
          </div>

          <div className="uppercase tracking-[0.2em] text-[10px] text-bronze font-medium">
            FICTIONAL DEMO EXPERIENCE
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ivory transition-colors duration-300">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-ivory transition-colors duration-300">
              Terms
            </Link>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={scrollToTop}
              className="ml-4 p-2 border border-white/10 text-ivory hover:border-terracotta hover:text-terracotta transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};

