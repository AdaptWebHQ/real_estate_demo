'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Home, IndianRupee, Bed, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CustomSelect } from '@/components/ui/CustomSelect';

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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Container Box */}
      <div className="bg-[#141414]/90 backdrop-blur-2xl border border-gold/30 p-4 sm:p-6 lg:p-7 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background highlight */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Top Filter Category Tabs */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 sm:mb-6 gap-2">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar max-w-full">
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setPropertyType('Apartments');
              }}
              className={`px-3.5 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'text-stone-light/70 hover:text-white bg-white/5 border border-white/10'
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
              className={`px-3.5 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 ${
                activeTab === 'villas'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'text-stone-light/70 hover:text-white bg-white/5 border border-white/10'
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
              className={`px-3.5 sm:px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 ${
                activeTab === 'apartments'
                  ? 'bg-gold text-charcoal shadow-md'
                  : 'text-stone-light/70 hover:text-white bg-white/5 border border-white/10'
              }`}
            >
              Urban Apartments
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Curated Portfolio</span>
          </div>
        </div>

        {/* Search Inputs Form */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            
            {/* Location Select */}
            <div className="flex flex-col space-y-1.5 bg-[#1C1C1C] p-3 border border-white/10 hover:border-[#A9825B]/50 transition-colors rounded-xl">
              <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#A9825B] font-medium flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#A9825B] shrink-0" />
                Location
              </label>
              <CustomSelect
                value={location}
                onChange={setLocation}
                options={[
                  { label: 'Coimbatore', value: 'Coimbatore' },
                  { label: 'Chennai', value: 'Chennai' },
                  { label: 'Bengaluru', value: 'Bengaluru' },
                  { label: 'Ooty', value: 'Ooty' },
                  { label: 'Tiruppur', value: 'Tiruppur' },
                ]}
              />
            </div>

            {/* Property Type Select */}
            <div className="flex flex-col space-y-1.5 bg-[#1C1C1C] p-3 border border-white/10 hover:border-[#A9825B]/50 transition-colors rounded-xl">
              <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#A9825B] font-medium flex items-center gap-1.5">
                <Home className="w-3 h-3 text-[#A9825B] shrink-0" />
                Property Type
              </label>
              <CustomSelect
                value={propertyType}
                onChange={setPropertyType}
                options={[
                  { label: 'Apartments', value: 'Apartments' },
                  { label: 'Luxury Villas', value: 'Luxury Villas' },
                  { label: 'Boutique Residences', value: 'Boutique Residences' },
                  { label: 'Penthouse', value: 'Penthouse' },
                ]}
              />
            </div>

            {/* Budget Select */}
            <div className="flex flex-col space-y-1.5 bg-[#1C1C1C] p-3 border border-white/10 hover:border-[#A9825B]/50 transition-colors rounded-xl">
              <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#A9825B] font-medium flex items-center gap-1.5">
                <IndianRupee className="w-3 h-3 text-[#A9825B] shrink-0" />
                Budget Range
              </label>
              <CustomSelect
                value={budget}
                onChange={setBudget}
                options={[
                  { label: '₹50L – ₹2Cr', value: '₹50L – ₹2Cr' },
                  { label: '₹50L – ₹1Cr', value: '₹50L – ₹1Cr' },
                  { label: '₹1Cr – ₹2Cr', value: '₹1Cr – ₹2Cr' },
                  { label: '₹2Cr+', value: '₹2Cr+' },
                ]}
              />
            </div>

            {/* Bedrooms Select */}
            <div className="flex flex-col space-y-1.5 bg-[#1C1C1C] p-3 border border-white/10 hover:border-[#A9825B]/50 transition-colors rounded-xl">
              <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#A9825B] font-medium flex items-center gap-1.5">
                <Bed className="w-3 h-3 text-[#A9825B] shrink-0" />
                Bedrooms
              </label>
              <CustomSelect
                value={bedrooms}
                onChange={setBedrooms}
                options={[
                  { label: '2+ Bedrooms', value: '2+ Bedrooms' },
                  { label: '3+ Bedrooms', value: '3+ Bedrooms' },
                  { label: '4+ Bedrooms', value: '4+ Bedrooms' },
                ]}
              />
            </div>

          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-gold via-[#D4AF37] to-gold text-charcoal text-xs uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
          >
            <Search className="w-4 h-4 text-charcoal stroke-[2.5]" />
            <span>Search Properties</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};
