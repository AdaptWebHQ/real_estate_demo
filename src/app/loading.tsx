import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-charcoal text-white flex flex-col items-center justify-center p-6 z-50">
      <div className="w-12 h-12 border border-gold/40 flex items-center justify-center animate-pulse mb-4">
        <svg viewBox="0 0 40 40" className="w-7 h-7 text-gold" fill="none">
          <path d="M20 6L32 30H27.5L20 15L12.5 30H8L20 6Z" fill="currentColor" />
          <path d="M15 25H25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="font-serif tracking-[0.25em] text-sm text-gold font-semibold uppercase animate-pulse">
        AUREVIA ESTATES
      </span>
      <span className="text-[10px] uppercase tracking-[0.3em] text-stone-light/50 font-sans mt-2">
        Loading Architectural Portfolio...
      </span>
    </div>
  );
}
