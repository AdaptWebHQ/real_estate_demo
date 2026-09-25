'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  ArrowRight,
  Send,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t border-gold/30 relative overflow-hidden">
      {/* Background Architectural Watermark Emblem */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 select-none transform translate-x-1/4 translate-y-1/4">
        <svg viewBox="0 0 400 400" className="w-[650px] h-[650px] text-gold" fill="currentColor">
          <path d="M200 60L320 300H275L200 150L125 300H80L200 60Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Top Newsletter & Brand Statement Banner */}
        <div className="pb-16 border-b border-gold/20 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal-800/90 p-8 sm:p-12 border border-gold/30 relative overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRIVATE RESIDENCE GAZETTE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white leading-tight">
                Spaces Designed for <br />
                <span className="italic text-gold font-light">Better Living.</span>
              </h3>
              <p className="text-xs text-stone-light/70 font-light max-w-lg leading-relaxed">
                Receive curated previews of upcoming signature developments across Coimbatore, Chennai, and Bengaluru.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-charcoal/90 border border-gold/50 p-4 flex items-center gap-3 text-gold text-xs">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Thank you. You have been added to our private portfolio gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-charcoal text-white border border-stone/40 px-4 py-3.5 text-xs focus:border-gold focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 group shrink-0 shadow-lg"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gold/15">

          {/* Column 1: Brand & Identity with New Logo */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="lg" />

            <p className="text-xs text-stone-light/70 font-light leading-relaxed max-w-sm">
              Contemporary property developer shaped around architectural proportion, carefully selected locations, and transparent long-term value across South India.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.example"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.example"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.example"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-none border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg text-gold font-normal border-b border-gold/20 pb-2 flex items-center justify-between">
              <span>Navigation</span>
              <span className="h-[1px] w-6 bg-gold/40"></span>
            </h4>
            <ul className="space-y-3 text-xs font-light text-stone-light/80 uppercase tracking-[0.18em]">
              {[
                { name: 'Properties', href: '/properties' },
                { name: 'Projects', href: '/projects' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Insights', href: '/insights' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Regional Presence & Hubs */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg text-gold font-normal border-b border-gold/20 pb-2 flex items-center justify-between">
              <span>Locations</span>
              <span className="h-[1px] w-6 bg-gold/40"></span>
            </h4>
            <ul className="space-y-3 text-xs font-light text-stone-light/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                <strong className="text-white font-medium">Coimbatore (HQ)</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone/40 rounded-full"></span>
                <span>Chennai</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone/40 rounded-full"></span>
                <span>Bengaluru</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone/40 rounded-full"></span>
                <span>Ooty</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone/40 rounded-full"></span>
                <span>Tiruppur</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate Desk Glassmorphic Card */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg text-gold font-normal border-b border-gold/20 pb-2 flex items-center justify-between">
              <span>Corporate Desk</span>
              <Building2 className="w-4 h-4 text-gold/60" />
            </h4>
            <div className="bg-charcoal-800/90 border border-gold/30 p-5 space-y-4 shadow-card">
              <div className="flex items-start gap-3 text-xs text-stone-light/90 font-light">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>No. 42, Avinashi Road, Coimbatore, Tamil Nadu 641018</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-light/90 font-light">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+914224012800" className="hover:text-gold transition-colors font-mono">
                  +91 422 401 2800
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-light/90 font-light">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:hello@aureviaestates.example" className="hover:text-gold transition-colors">
                  hello@aureviaestates.example
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-light/60 font-light">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Aurevia Estates — Demo Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] bg-gold/15 text-gold px-3 py-1 border border-gold/30 font-medium shadow-sm">
              Demo Website · Fictional Brand
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 uppercase tracking-[0.2em] text-[10px] font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
