'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';
import { CustomSelect } from '@/components/ui/CustomSelect';

export const LeadEnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'Coimbatore',
    propertyType: 'Apartments',
    budget: '₹50L – ₹1Cr',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone Number is required';
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
    <section id="contact" className="py-24 bg-sand text-forest">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-terracotta inline-block"></span>
                <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-medium">
                  DIRECT ADVISORY
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-forest">
                Let's Find Your Place.
              </h2>
              <p className="text-charcoal/80 text-sm font-light leading-relaxed">
                Connect directly with our dedicated property advisors in Coimbatore for tailored site visits and layout consultation.
              </p>
            </div>

            {/* Contact Specs */}
            <div className="bg-[#FCFBF8] p-8 sm:p-9 border border-[#E8E1D5] rounded-xl space-y-6 shadow-md hover:border-[#B86F52]/40 transition-all duration-300">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#18221F] block">
                  Aurevia Estates
                </span>
                <p className="text-xs text-[#303633]/80 font-light flex items-start gap-3">
                  <span className="p-2 rounded-xl bg-[#B86F52]/10 text-[#B86F52] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="pt-1.5 leading-relaxed">
                    No. 42, Avinashi Road, Coimbatore, Tamil Nadu 641018
                  </span>
                </p>
              </div>

              <div className="space-y-3 border-t border-[#E8E1D5] pt-5 text-xs text-[#303633]/80 font-light">
                <p className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#B86F52]/10 text-[#B86F52] shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span>Phone: <strong className="text-[#18221F] font-mono tracking-wide">+91 422 401 2800</strong></span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#B86F52]/10 text-[#B86F52] shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>Email: <strong className="text-[#18221F]">hello@aureviaestates.example</strong></span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-[#B86F52]/10 text-[#B86F52] shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span>Office Hours: <strong className="text-[#18221F]">Monday – Saturday (9:30 AM – 6:30 PM)</strong></span>
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E1D5]">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#303633]/60 block">
                  * Fictional demo contact information for presentation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Enquiry Form */}
          <div className="lg:col-span-7 bg-[#FCFBF8] p-8 sm:p-10 border border-[#E8E1D5] rounded-xl shadow-md">
            <h3 className="font-serif text-2xl text-[#18221F] font-normal mb-6">
              Tell Us What You're Looking For
            </h3>

            {submitted ? (
              <div className="bg-[#FCFBF8] border border-[#B86F52]/40 p-8 rounded-xl text-center space-y-4 animate-fade-in-up shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#B86F52]/20 text-[#B86F52] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-[#18221F] font-medium">
                  Thank you. Your enquiry has been received.
                </h4>
                <p className="text-xs text-[#303633]/80 font-light max-w-md mx-auto">
                  An Aurevia property advisor will contact you shortly to review your preferences and arrange next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#B86F52] transition-colors rounded-xl shadow-sm"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sundaram"
                      className={`w-full bg-[#FCFBF8] text-[#18221F] border px-4 py-3 text-sm rounded-xl shadow-sm focus:border-[#B86F52] hover:border-[#B86F52] focus:outline-none transition-all duration-300 ${
                        errors.fullName ? 'border-red-500' : 'border-[#E8E1D5]'
                      }`}
                    />
                    {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName}</span>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
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
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    className={`w-full bg-[#FCFBF8] text-[#18221F] border px-4 py-3 text-sm rounded-xl shadow-sm focus:border-[#B86F52] hover:border-[#B86F52] focus:outline-none transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-[#E8E1D5]'
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Preferred Location */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                      Preferred Location
                    </label>
                    <CustomSelect
                      value={formData.location}
                      onChange={(val) => setFormData({ ...formData, location: val })}
                      options={[
                        { label: 'Coimbatore', value: 'Coimbatore' },
                        { label: 'Chennai', value: 'Chennai' },
                        { label: 'Bengaluru', value: 'Bengaluru' },
                        { label: 'Ooty', value: 'Ooty' },
                        { label: 'Tiruppur', value: 'Tiruppur' },
                      ]}
                    />
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                      Property Type
                    </label>
                    <CustomSelect
                      value={formData.propertyType}
                      onChange={(val) => setFormData({ ...formData, propertyType: val })}
                      options={[
                        { label: 'Apartments', value: 'Apartments' },
                        { label: 'Luxury Villas', value: 'Luxury Villas' },
                        { label: 'Boutique Residences', value: 'Boutique Residences' },
                        { label: 'Penthouse', value: 'Penthouse' },
                      ]}
                    />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                      Budget Range
                    </label>
                    <CustomSelect
                      value={formData.budget}
                      onChange={(val) => setFormData({ ...formData, budget: val })}
                      options={[
                        { label: '₹50L – ₹1Cr', value: '₹50L – ₹1Cr' },
                        { label: '₹1Cr – ₹2Cr', value: '₹1Cr – ₹2Cr' },
                        { label: '₹2Cr+', value: '₹2Cr+' },
                      ]}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#18221F]/70 font-medium">
                    Message or Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your timeframe, BHK preference, or specific amenities required..."
                    className="w-full bg-[#FCFBF8] text-[#18221F] border border-[#E8E1D5] px-4 py-3 text-sm rounded-xl shadow-sm focus:border-[#B86F52] hover:border-[#B86F52] focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#18221F] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B86F52] transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-md cursor-pointer group"
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>REQUEST A CONSULTATION</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

