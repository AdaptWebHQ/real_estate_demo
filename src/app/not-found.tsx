import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6 bg-charcoal-800 p-10 border border-gold/30 shadow-2xl">
        <span className="font-serif text-6xl text-gold font-light block">
          404
        </span>
        <h2 className="font-serif text-3xl font-normal text-white">
          Address Not Found
        </h2>
        <p className="text-xs text-stone-light/70 font-light leading-relaxed">
          The requested page or residence detail does not exist or has been relocated.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3.5 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors"
          >
            Explore Available Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
