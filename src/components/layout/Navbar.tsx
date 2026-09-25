'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface NavbarProps {
  onOpenScheduleModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScheduleModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-charcoal/95 backdrop-blur-md border-b border-gold/20 py-4 shadow-editorial'
            : 'bg-gradient-to-b from-charcoal/80 via-charcoal/30 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo Component */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-gold transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenScheduleModal?.()}
              className="px-6 py-2.5 text-xs uppercase tracking-[0.18em] border border-gold/80 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 flex items-center gap-2 group font-medium shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span>Schedule a Visit</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white hover:text-gold transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal flex flex-col justify-between p-8 animate-fade-in-up">
          <div className="flex items-center justify-between border-b border-gold/20 pb-6">
            <Logo size="md" showTagline={false} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-gold"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col space-y-6 my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-white/90 hover:text-gold transition-colors duration-300 flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-6 h-6 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="border-t border-gold/20 pt-6 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduleModal?.();
              }}
              className="w-full py-4 text-xs uppercase tracking-[0.2em] bg-gold text-charcoal font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Private Visit
            </button>
            <p className="text-[11px] text-center text-stone font-light tracking-wide">
              Primary Location: Coimbatore, Tamil Nadu
            </p>
          </div>
        </div>
      )}
    </>
  );
};
