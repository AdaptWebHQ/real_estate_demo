'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If space below is less than 220px and there's enough space above, open upwards
      if (spaceBelow < 220 && rect.top > 200) {
        setOpenUp(true);
      } else {
        setOpenUp(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Custom Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full bg-[#FCFBF8] text-[#18221F] border border-[#E8E1D5] hover:border-[#B86F52] focus:border-[#B86F52] px-4 py-3 text-sm font-sans flex items-center justify-between transition-all duration-300 rounded-xl shadow-sm text-left group cursor-pointer focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate font-medium text-[#18221F]">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#A9825B] transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180 text-[#B86F52]' : 'group-hover:text-[#B86F52]'
          }`}
        />
      </button>

      {/* Luxury Dropdown Menu with Smart Direction Placement */}
      {isOpen && (
        <ul
          role="listbox"
          className={`absolute left-0 right-0 ${
            openUp ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'
          } z-[100] bg-[#18221F] text-[#F5F2EA] border border-[#A9825B]/40 rounded-xl shadow-2xl max-h-56 overflow-y-auto py-1.5 animate-fade-in-up divide-y divide-white/5`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 text-xs sm:text-sm font-sans flex items-center justify-between cursor-pointer transition-colors duration-200 ${
                  isSelected
                    ? 'bg-[#B86F52] text-[#FCFBF8] font-semibold'
                    : 'hover:bg-[#FCFBF8]/15 hover:text-[#B86F52]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#FCFBF8] shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

