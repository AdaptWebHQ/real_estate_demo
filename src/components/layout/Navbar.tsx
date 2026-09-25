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
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Insights', href: '/insights' },
  ];

  const allMobileNavLinks = [
    { name: 'Home', href: '/' },
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
            ? 'bg-[#FCFBF8]/95 backdrop-blur-md border-b border-[#E8E1D5] py-4 shadow-editorial text-[#18221F]'
            : 'bg-transparent py-6 text-[#18221F]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo Left */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl tracking-[0.18em] font-normal text-forest-deep">
              AUREVIA
            </span>
          </Link>

          {/* Navigation Centered */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] font-medium text-forest-deep/80 hover:text-terracotta transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-terracotta hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Right */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenScheduleModal?.()}
              className="px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold border border-forest-deep/30 text-forest-deep hover:bg-forest-deep hover:text-warmwhite transition-all duration-300 flex items-center gap-2 group shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span>Schedule a Visit</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-forest-deep hover:text-terracotta transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#18221F] text-[#F5F2EA] flex flex-col justify-between p-8 sm:p-12 animate-fade-in-up">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-serif text-2xl tracking-[0.18em] text-[#FCFBF8]">
              AUREVIA
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-terracotta"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Menu Links with Large Typography */}
          <nav className="flex flex-col space-y-6 my-auto">
            {allMobileNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl sm:text-5xl text-[#FCFBF8]/90 hover:text-bronze-warm transition-colors duration-300 flex items-center justify-between group"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-7 h-7 text-bronze-warm opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduleModal?.();
              }}
              className="w-full py-4 text-xs uppercase tracking-[0.2em] bg-[#A9825B] text-[#18221F] font-semibold hover:bg-terracotta transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Visit
            </button>
            <p className="text-[11px] text-center text-sand-soft/60 font-light tracking-wide">
              Coimbatore · Tamil Nadu · South India
            </p>
          </div>
        </div>
      )}
    </>
  );
};
