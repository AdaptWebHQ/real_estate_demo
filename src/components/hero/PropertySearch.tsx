'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Home, IndianRupee, Bed, SlidersHorizontal, Sparkles } from 'lucide-react';

interface PropertySearchProps {
  onSearch: (filters: { location: string; type: string; budget: string; bedrooms: string }) => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'villas' | 'apartments'>('all');
  const [location, setLocation] = useState('Coimbatore');
  const [propertyType, setPropertyType] = useState('Apartments');
  const [budget, setBudget] = useState('₹50L – ₹2Cr');
  const [bedrooms, setBedrooms] = useState('2+ Bedrooms');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      type: activeTab === 'villas' ? 'Luxury Villas' : activeTab === 'apartments' ? 'Apartments' : propertyType,
      budget,
      bedrooms,
    });

    const propertiesElement = document.getElementById('properties');
    if (propertiesElement) {
      propertiesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Search Category Quick Tabs */}
      <div className="flex items-center space-x-2 mb-0.5 ml-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('all');
            setPropertyType('Apartments');
          }}
          className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-t-none border-t border-x ${
            activeTab === 'all'
              ? 'bg-charcoal/90 text-gold border-gold/40 backdrop-blur-md shadow-lg'
              : 'bg-charcoal/50 text-stone-light/60 border-transparent hover:text-white hover:bg-charcoal/70'
          }`}
        >
          All Residences
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('villas');
            setPropertyType('Luxury Villas');
          }}
          className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-t-none border-t border-x ${
            activeTab === 'villas'
              ? 'bg-charcoal/90 text-gold border-gold/40 backdrop-blur-md shadow-lg'
              : 'bg-charcoal/50 text-stone-light/60 border-transparent hover:text-white hover:bg-charcoal/70'
          }`}
        >
          Luxury Villas
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('apartments');
            setPropertyType('Apartments');
          }}
          className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-t-none border-t border-x ${
            activeTab === 'apartments'
              ? 'bg-charcoal/90 text-gold border-gold/40 backdrop-blur-md shadow-lg'
              : 'bg-charcoal/50 text-stone-light/60 border-transparent hover:text-white hover:bg-charcoal/70'
          }`}
        >
          Urban Apartments
        </button>
      </div>

      {/* Main Glassmorphic Search Panel */}
      <div className="relative group">
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 via-gold/10 to-gold/30 blur-md opacity-40 group-hover:opacity-75 transition duration-500 rounded-none pointer-events-none" />

        <div className="relative bg-charcoal/90 backdrop-blur-xl border border-gold/30 p-6 sm:p-8 text-white shadow-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <h3 className="font-serif text-lg sm:text-xl tracking-wide text-white font-normal">
                Find Your Next Address
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-stone-light/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Coimbatore · Chennai · Bengaluru</span>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Location Select */}
              <div className="flex flex-col space-y-2 bg-charcoal-800/80 p-3.5 border border-stone/30 hover:border-gold/60 transition-colors">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent text-white font-serif text-base focus:outline-none cursor-pointer"
                >
                  <option value="Coimbatore" className="bg-charcoal text-white">Coimbatore</option>
                  <option value="Chennai" className="bg-charcoal text-white">Chennai</option>
                  <option value="Bengaluru" className="bg-charcoal text-white">Bengaluru</option>
                  <option value="Ooty" className="bg-charcoal text-white">Ooty</option>
                  <option value="Tiruppur" className="bg-charcoal text-white">Tiruppur</option>
                </select>
              </div>

              {/* Property Type Select */}
              <div className="flex flex-col space-y-2 bg-charcoal-800/80 p-3.5 border border-stone/30 hover:border-gold/60 transition-colors">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-gold shrink-0" />
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-white font-serif text-base focus:outline-none cursor-pointer"
                >
                  <option value="Apartments" className="bg-charcoal text-white">Apartments</option>
                  <option value="Luxury Villas" className="bg-charcoal text-white">Luxury Villas</option>
                  <option value="Boutique Residences" className="bg-charcoal text-white">Boutique Residences</option>
                  <option value="Penthouse" className="bg-charcoal text-white">Penthouse</option>
                </select>
              </div>

              {/* Budget Select */}
              <div className="flex flex-col space-y-2 bg-charcoal-800/80 p-3.5 border border-stone/30 hover:border-gold/60 transition-colors">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-gold shrink-0" />
                  Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-white font-serif text-base focus:outline-none cursor-pointer"
                >
                  <option value="₹50L – ₹2Cr" className="bg-charcoal text-white">₹50L – ₹2Cr</option>
                  <option value="₹50L – ₹1Cr" className="bg-charcoal text-white">₹50L – ₹1Cr</option>
                  <option value="₹1Cr – ₹2Cr" className="bg-charcoal text-white">₹1Cr – ₹2Cr</option>
                  <option value="₹2Cr+" className="bg-charcoal text-white">₹2Cr+</option>
                </select>
              </div>

              {/* Bedrooms Select */}
              <div className="flex flex-col space-y-2 bg-charcoal-800/80 p-3.5 border border-stone/30 hover:border-gold/60 transition-colors">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-gold shrink-0" />
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-transparent text-white font-serif text-base focus:outline-none cursor-pointer"
                >
                  <option value="2+ Bedrooms" className="bg-charcoal text-white">2+ Bedrooms</option>
                  <option value="3+ Bedrooms" className="bg-charcoal text-white">3+ Bedrooms</option>
                  <option value="4+ Bedrooms" className="bg-charcoal text-white">4+ Bedrooms</option>
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal text-xs uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
              >
                <Search className="w-4 h-4 text-charcoal stroke-[2.5]" />
                <span>Search Properties</span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
