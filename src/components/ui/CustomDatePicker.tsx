'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current selected date or fallback to today
  const selectedDate = value ? new Date(value + 'T00:00:00') : new Date();
  
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00');
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${viewYear}-${monthStr}-${dayStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleSetToday = () => {
    const today = new Date();
    const monthStr = String(today.getMonth() + 1).padStart(2, '0');
    const dayStr = String(today.getDate()).padStart(2, '0');
    const dateStr = `${today.getFullYear()}-${monthStr}-${dayStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  // Generate calendar grid
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1);
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Format trigger label (DD-MM-YYYY)
  const formattedDisplayDate = value
    ? `${String(selectedDate.getDate()).padStart(2, '0')}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${selectedDate.getFullYear()}`
    : 'Select date';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#FCFBF8] text-[#18221F] border border-[#E8E1D5] hover:border-[#B86F52] focus:border-[#B86F52] px-4 py-3 text-sm font-sans flex items-center justify-between transition-all duration-300 rounded-xl shadow-sm text-left group cursor-pointer focus:outline-none"
      >
        <span className="font-medium text-[#18221F]">{formattedDisplayDate}</span>
        <CalendarIcon className="w-4 h-4 text-[#A9825B] group-hover:text-[#B86F52] transition-colors shrink-0" />
      </button>

      {/* Luxury Architectural Calendar Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 bottom-[calc(100%+6px)] sm:bottom-auto sm:top-[calc(100%+6px)] z-[100] w-[290px] sm:w-[310px] bg-[#18221F] text-[#F5F2EA] border border-[#A9825B]/40 rounded-2xl shadow-2xl p-4 animate-fade-in-up font-sans">
          
          {/* Month & Year Navigation Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="font-serif text-base text-[#FCFBF8] font-normal tracking-wide">
              {MONTH_NAMES[viewMonth]}, {viewYear}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 text-[#A9825B] hover:text-[#FCFBF8] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 text-[#A9825B] hover:text-[#FCFBF8] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center pt-3 pb-2 text-[11px] font-semibold text-[#A9825B] tracking-wider uppercase">
            {DAYS_OF_WEEK.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Prev Month Days (Disabled look) */}
            {prevMonthDays.map((d) => (
              <span key={`prev-${d}`} className="py-2 text-white/20 select-none">
                {d}
              </span>
            ))}

            {/* Current Month Days */}
            {currentMonthDays.map((d) => {
              const isSelectedDay =
                value &&
                selectedDate.getFullYear() === viewYear &&
                selectedDate.getMonth() === viewMonth &&
                selectedDate.getDate() === d;

              return (
                <button
                  key={`day-${d}`}
                  type="button"
                  onClick={() => handleSelectDay(d)}
                  className={`py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                    isSelectedDay
                      ? 'bg-[#B86F52] text-[#FCFBF8] font-bold shadow-md scale-105'
                      : 'text-[#F5F2EA]/90 hover:bg-[#FCFBF8]/15 hover:text-[#B86F52]'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Footer Bar (Today Action) */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10 text-xs">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="text-white/60 hover:text-[#B86F52] transition-colors text-[11px] font-medium"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleSetToday}
              className="text-[#B86F52] hover:text-[#FCFBF8] transition-colors text-[11px] font-semibold tracking-wide"
            >
              Today
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
