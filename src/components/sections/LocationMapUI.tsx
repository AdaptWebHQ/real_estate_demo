'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Clock,
  Building2,
  ShoppingBag,
  Plane,
  Stethoscope,
  Car,
  Compass,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { PROXIMITY_LOCATIONS } from '@/data/locations';
import { LocationPoint } from '@/types';

export const LocationMapUI: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<LocationPoint>(PROXIMITY_LOCATIONS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Business', 'Shopping', 'Healthcare', 'Transit'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Shopping':
        return ShoppingBag;
      case 'Transit':
        return Plane;
      case 'Healthcare':
        return Stethoscope;
      case 'Business':
        return Building2;
      default:
        return MapPin;
    }
  };

  const filteredLocations = PROXIMITY_LOCATIONS.filter((point) => {
    if (activeCategory === 'All') return true;
    return point.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Central origin coordinates on 100x100 grid
  const origin = { xPercent: 50, yPercent: 50, name: 'Aurevia Residences (Coimbatore)' };

  return (
    <section id="location" className="py-24 bg-charcoal text-white relative overflow-hidden border-t border-b border-gold/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0 border-b border-gold/20 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="h-[1px] w-8 bg-gold inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                STRATEGIC CONNECTIVITY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Live Where Everything Connects.
            </h2>
          </div>

          <div className="flex flex-col md:items-end space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold animate-spin-slow" />
              Coimbatore Masterplan & Transit Layer
            </span>
            <span className="text-[11px] text-stone-light/60 font-light">
              Primary Development Corridor · Tamil Nadu
            </span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-gold text-charcoal border-gold shadow-lg font-semibold'
                  : 'bg-charcoal-800 text-stone-light/70 border-gold/20 hover:border-gold/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Masterplan Map Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Interactive Vector Map Canvas */}
          <div className="lg:col-span-8 bg-charcoal-800/90 border border-gold/30 relative min-h-[480px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md">
            
            {/* Map Grid Vector Lines Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C8A96B_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-charcoal/90 to-charcoal/70" />

            {/* SVG Connecting Route Lines between Central Origin and Points */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C8A96B" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {PROXIMITY_LOCATIONS.map((loc) => {
                const isSelected = selectedPoint.id === loc.id;
                return (
                  <g key={loc.id}>
                    <line
                      x1={`${origin.xPercent}%`}
                      y1={`${origin.yPercent}%`}
                      x2={`${loc.xPercent}%`}
                      y2={`${loc.yPercent}%`}
                      stroke={isSelected ? "#C8A96B" : "rgba(200, 169, 107, 0.2)"}
                      strokeWidth={isSelected ? "2.5" : "1"}
                      strokeDasharray={isSelected ? "none" : "4 4"}
                      className="transition-all duration-500"
                    />
                    {isSelected && (
                      <circle
                        cx={`${loc.xPercent}%`}
                        cy={`${loc.yPercent}%`}
                        r="18"
                        fill="rgba(200, 169, 107, 0.15)"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Top Bar Indicator */}
            <div className="relative z-20 p-6 flex items-center justify-between border-b border-gold/20">
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] font-medium">
                <Navigation className="w-4 h-4" />
                <span>Interactive Proximity Map</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] bg-gold/15 text-gold px-3 py-1 border border-gold/30 font-medium">
                Click map pins or list items
              </span>
            </div>

            {/* Map Canvas with Interactive Pin Points */}
            <div className="relative z-20 flex-1 my-auto min-h-[340px] w-full">

              {/* Central Origin Beacon (Aurevia Development Origin) */}
              <div
                style={{ left: `${origin.xPercent}%`, top: `${origin.yPercent}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-3 bg-gold/30 rounded-full animate-ping pointer-events-none" />
                  <div className="w-10 h-10 rounded-full bg-gold text-charcoal border-2 border-white shadow-2xl flex items-center justify-center font-serif font-bold text-base">
                    A
                  </div>
                  <div className="absolute top-12 whitespace-nowrap bg-charcoal/95 border border-gold text-gold text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-semibold shadow-xl">
                    AUREVIA RESIDENCES (ORIGIN)
                  </div>
                </div>
              </div>

              {/* Landmark Pins */}
              {PROXIMITY_LOCATIONS.map((point) => {
                const isSelected = selectedPoint.id === point.id;
                const IconComponent = getCategoryIcon(point.category);
                const isFilteredOut = activeCategory !== 'All' && point.category.toLowerCase() !== activeCategory.toLowerCase();

                if (isFilteredOut) return null;

                return (
                  <motion.div
                    key={point.id}
                    onClick={() => setSelectedPoint(point)}
                    style={{ left: `${point.xPercent}%`, top: `${point.yPercent}%` }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group transition-all duration-300"
                  >
                    <div
                      className={`flex items-center gap-2.5 px-3.5 py-2 border transition-all duration-300 shadow-xl ${
                        isSelected
                          ? 'bg-gold text-charcoal border-white font-semibold scale-110 shadow-[0_0_20px_rgba(200,169,107,0.5)]'
                          : 'bg-charcoal/95 text-white border-gold/40 hover:border-gold hover:bg-charcoal-800'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-charcoal' : 'text-gold'}`} />
                      <span className="text-xs whitespace-nowrap font-medium tracking-wide">{point.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-mono ${
                          isSelected ? 'bg-charcoal text-gold' : 'bg-gold/20 text-gold'
                        }`}
                      >
                        {point.travelTime}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Live Selected Destination Bar */}
            <div className="relative z-20 p-6 bg-charcoal/95 border-t border-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold" />
                  Selected Route Focus
                </span>
                <h4 className="font-serif text-xl text-white font-normal">
                  {selectedPoint.name} <span className="text-stone-light/60 text-sm font-sans">({selectedPoint.area})</span>
                </h4>
              </div>

              <div className="flex items-center gap-6 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-gold/20 w-full sm:w-auto justify-between">
                <div className="flex items-center gap-2 text-stone-light">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>Driving Time: <strong className="text-gold font-serif text-sm">{selectedPoint.travelTime}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-light">
                  <Car className="w-4 h-4 text-gold shrink-0" />
                  <span>Distance: <strong className="text-white font-serif text-sm">{selectedPoint.distanceKm}</strong></span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Glassmorphic Destination List */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                <h3 className="font-serif text-xl text-white font-normal">
                  Key Neighborhood Timelines
                </h3>
                <span className="text-[10px] uppercase tracking-[0.18em] text-gold">
                  {filteredLocations.length} Destinations
                </span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {filteredLocations.map((loc) => {
                  const isSelected = selectedPoint.id === loc.id;
                  const IconComp = getCategoryIcon(loc.category);

                  return (
                    <motion.div
                      key={loc.id}
                      onClick={() => setSelectedPoint(loc)}
                      whileHover={{ x: 4 }}
                      className={`p-4 cursor-pointer border transition-all duration-300 flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-gold/20 via-charcoal-800 to-charcoal-800 text-white border-gold shadow-lg'
                          : 'bg-charcoal-800/80 text-stone-light/80 border-gold/20 hover:border-gold/50 hover:bg-charcoal-800'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 border transition-colors ${isSelected ? 'border-gold bg-gold text-charcoal' : 'border-gold/30 text-gold'}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`text-xs font-semibold block transition-colors ${isSelected ? 'text-gold' : 'text-white'}`}>
                            {loc.name}
                          </h4>
                          <span className="text-[11px] text-stone-light/60 font-light block">
                            {loc.area} · {loc.distanceKm}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-base font-serif font-semibold block ${isSelected ? 'text-gold' : 'text-white'}`}>
                          {loc.travelTime}
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-stone-light/50 block">
                          Drive
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Illustrative Demo Data Disclaimer */}
            <div className="p-4 bg-charcoal-800/60 border border-gold/20 text-[11px] text-stone-light/60 font-light italic flex items-center justify-between">
              <span>* Note: Travel times shown are illustrative demo data.</span>
              <Layers className="w-3.5 h-3.5 text-gold shrink-0" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
