'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Building, Send } from 'lucide-react';
import { PROPERTIES_DATA } from '@/data/properties';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { CustomDatePicker } from '@/components/ui/CustomDatePicker';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPropertyName?: string;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  selectedPropertyName,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property: selectedPropertyName || 'Azure Heights (Avinashi Road)',
    date: '2026-10-05',
    time: '11:00 AM',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Lock background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/85 backdrop-blur-md animate-fade-in-up overflow-y-auto py-6">
      <div className="bg-white w-full max-w-lg border border-stone-light/80 shadow-2xl relative my-auto rounded-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-charcoal text-white p-6 border-b border-gold/30 flex items-center justify-between rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-xl font-normal text-white">
              Schedule a Private Visit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-light hover:text-gold transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
          {submitted ? (
            <div className="text-center space-y-4 py-6">
              <div className="w-14 h-14 rounded-full bg-gold/20 text-gold mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-charcoal font-semibold">
                Visit Request Received
              </h4>
              <p className="text-xs text-stone font-light max-w-sm mx-auto leading-relaxed">
                Your preferred appointment on <strong className="text-charcoal">{formData.date} at {formData.time}</strong> for <strong className="text-charcoal">{formData.property}</strong> has been submitted for confirmation.
              </p>
              <p className="text-[11px] text-gold italic">
                * Illustrative demo request state.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-8 py-3 bg-charcoal text-gold text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-charcoal transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone font-light mb-4">
                Select your preferred residence and date for an exclusive guided walkthrough with an Aurevia architectural advisor.
              </p>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya"
                  className={`w-full bg-[#FCFBF8] text-[#18221F] border px-4 py-3 text-sm rounded-xl shadow-sm focus:border-[#B86F52] hover:border-[#B86F52] focus:outline-none transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-[#E8E1D5]'
                  }`}
                />
                {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-[#FCFBF8] text-[#18221F] border px-4 py-3 text-sm rounded-xl shadow-sm focus:border-[#B86F52] hover:border-[#B86F52] focus:outline-none transition-all duration-300 ${
                      errors.phone ? 'border-red-500' : 'border-[#E8E1D5]'
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full bg-[#FCFBF8] text-[#18221F] border px-4 py-3 text-sm rounded-xl shadow-sm focus:border-[#B86F52] hover:border-[#B86F52] focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-[#E8E1D5]'
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>
              </div>

              {/* Property Selection */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                  Select Residence
                </label>
                <CustomSelect
                  value={formData.property}
                  onChange={(val) => setFormData({ ...formData, property: val })}
                  options={[
                    ...PROPERTIES_DATA.map((p) => ({
                      label: `${p.name} — ${p.location}`,
                      value: `${p.name} (${p.location})`,
                    })),
                    {
                      label: 'The Grand Residences (Race Course)',
                      value: 'The Grand Residences (Race Course)',
                    },
                    {
                      label: 'Aranya Reserve (Kovaipudur)',
                      value: 'Aranya Reserve (Kovaipudur)',
                    },
                  ]}
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                    Preferred Date
                  </label>
                  <CustomDatePicker
                    value={formData.date}
                    onChange={(val) => setFormData({ ...formData, date: val })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                    Preferred Time
                  </label>
                  <CustomSelect
                    value={formData.time}
                    onChange={(val) => setFormData({ ...formData, time: val })}
                    options={[
                      { label: '10:00 AM', value: '10:00 AM' },
                      { label: '11:30 AM', value: '11:30 AM' },
                      { label: '02:30 PM', value: '02:30 PM' },
                      { label: '04:30 PM', value: '04:30 PM' },
                    ]}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-charcoal text-gold text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-charcoal transition-all duration-300 flex items-center justify-center gap-2 group mt-6"
              >
                <Send className="w-4 h-4" />
                Request Visit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
