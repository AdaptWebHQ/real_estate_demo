'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6 bg-charcoal-800 p-10 border border-gold/30 shadow-2xl">
        <div className="w-12 h-12 border border-gold/60 mx-auto flex items-center justify-center text-gold">
          !
        </div>
        <h2 className="font-serif text-3xl font-normal text-white">
          Architectural Notice
        </h2>
        <p className="text-xs text-stone-light/70 font-light leading-relaxed">
          An unexpected interruption occurred while loading this view. Please try refreshing or return home.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-white/40 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-gold hover:text-gold transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
