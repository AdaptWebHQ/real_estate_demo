'use me';
'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Building, Send } from 'lucide-react';
import { PROPERTIES_DATA } from '@/data/properties';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/85 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white w-full max-w-lg border border-stone-light/80 shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-charcoal text-white p-6 border-b border-gold/30 flex items-center justify-between">
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
        <div className="p-8">
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
                <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikramaditya"
                  className={`w-full bg-offwhite text-charcoal border px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-stone-light/80'
                  }`}
                />
                {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-offwhite text-charcoal border px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-stone-light/80'
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full bg-offwhite text-charcoal border px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-stone-light/80'
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
                <select
                  value={formData.property}
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                  className="w-full bg-offwhite text-charcoal border border-stone-light/80 px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                >
                  {PROPERTIES_DATA.map((p) => (
                    <option key={p.id} value={`${p.name} (${p.location})`}>
                      {p.name} — {p.location}
                    </option>
                  ))}
                  <option value="The Grand Residences (Race Course)">The Grand Residences (Race Course)</option>
                  <option value="Aranya Reserve (Kovaipudur)">Aranya Reserve (Kovaipudur)</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-offwhite text-charcoal border border-stone-light/80 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-stone-hover font-medium">
                    Preferred Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-offwhite text-charcoal border border-stone-light/80 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
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
