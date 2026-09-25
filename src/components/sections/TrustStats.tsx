'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface SmoothCounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
  formatComma?: boolean;
}

const SmoothCounter: React.FC<SmoothCounterProps> = ({ end, suffix = '', decimals = 0, formatComma = false }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const node = nodeRef.current;
    // Buttery-smooth frame-by-frame animation without React state jitter
    const controls = animate(0, end, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1], // High-end luxury ease curve
      onUpdate(value) {
        let formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString();
        if (formatComma) {
          const parts = formatted.split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          formatted = parts.join('.');
        }
        node.textContent = formatted + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, end, suffix, decimals, formatComma]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

export const TrustStats: React.FC = () => {
  const stats = [
    { targetNum: 15, suffix: '+', label: 'Years of Experience', detail: 'Established in 2011' },
    { targetNum: 28, suffix: '', label: 'Projects Delivered', detail: 'On-time completion record' },
    { targetNum: 2400, suffix: '+', formatComma: true, label: 'Happy Families', detail: 'Across South India' },
    { targetNum: 7, suffix: '', label: 'Prime Locations', detail: 'Coimbatore & Regional' },
    { targetNum: 4.8, suffix: '/5', decimals: 1, label: 'Customer Experience', detail: 'Verified home buyer score' },
  ];

  return (
    <section id="trust-stats" className="py-24 bg-charcoal text-white border-b border-gold/20 relative overflow-hidden">
      {/* Subtle Background Architectural Grid Texture */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8A96B_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Ambient Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 35, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="relative flex flex-col space-y-2.5 pl-6 group cursor-default"
            >
              {/* Smooth Vertical Line Draw with Glow Beam Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-charcoal-700 overflow-hidden">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full bg-gradient-to-b from-gold via-gold/60 to-gold/20 origin-top"
                />
                {/* Traveling Light Beam on Hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
              </div>

              {/* Ultra-Smooth Counter Number */}
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white group-hover:text-gold transition-colors duration-400 leading-none tracking-tight">
                <SmoothCounter
                  end={stat.targetNum}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  formatComma={stat.formatComma}
                />
              </div>

              {/* Label */}
              <span className="text-xs uppercase tracking-[0.18em] text-stone-light/90 font-medium group-hover:text-white transition-colors duration-300 pt-1">
                {stat.label}
              </span>

              {/* Detail */}
              <span className="text-[11px] text-stone-light/50 font-light group-hover:text-gold/90 transition-colors duration-300">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
