'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from 'lucide-react';

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
            <div className="bg-ivory p-8 border border-forest/10 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-forest block">
                  Aurevia Estates
                </span>
                <p className="text-xs text-charcoal/80 font-light flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  No. 42, Avinashi Road, Coimbatore, Tamil Nadu 641018
                </p>
              </div>

              <div className="space-y-2 border-t border-forest/10 pt-4 text-xs text-charcoal/80 font-light">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-terracotta" />
                  <span>Phone: <strong className="text-forest font-mono">+91 422 401 2800</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-terracotta" />
                  <span>Email: <strong className="text-forest">hello@aureviaestates.example</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-terracotta" />
                  <span>Office Hours: <strong>Monday – Saturday (9:30 AM – 6:30 PM)</strong></span>
                </p>
              </div>

              <div className="pt-2 border-t border-forest/10">
                <span className="text-[10px] uppercase tracking-[0.18em] text-charcoal/60 block">
                  * Fictional demo contact information for presentation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Enquiry Form */}
          <div className="lg:col-span-7 bg-ivory p-8 sm:p-10 border border-forest/10 shadow-sm">
            <h3 className="font-serif text-2xl text-forest font-normal mb-6">
              Tell Us What You're Looking For
            </h3>

            {submitted ? (
              <div className="bg-warmwhite border border-terracotta/40 p-8 text-center space-y-4 animate-fade-in-up">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 text-terracotta mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-forest font-medium">
                  Thank you. Your enquiry has been received.
                </h4>
                <p className="text-xs text-charcoal/80 font-light max-w-md mx-auto">
                  An Aurevia property advisor will contact you shortly to review your preferences and arrange next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-forest text-ivory text-xs uppercase tracking-[0.15em] font-medium hover:bg-terracotta transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Sundaram"
                      className={`w-full bg-warmwhite text-forest border px-4 py-3 text-sm focus:border-terracotta focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-forest/15'
                      }`}
                    />
                    {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName}</span>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full bg-warmwhite text-forest border px-4 py-3 text-sm focus:border-terracotta focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-forest/15'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    className={`w-full bg-warmwhite text-forest border px-4 py-3 text-sm focus:border-terracotta focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-forest/15'
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Preferred Location */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                      Preferred Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-warmwhite text-forest border border-forest/15 px-3 py-3 text-sm focus:border-terracotta focus:outline-none"
                    >
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Ooty">Ooty</option>
                      <option value="Tiruppur">Tiruppur</option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full bg-warmwhite text-forest border border-forest/15 px-3 py-3 text-sm focus:border-terracotta focus:outline-none"
                    >
                      <option value="Apartments">Apartments</option>
                      <option value="Luxury Villas">Luxury Villas</option>
                      <option value="Boutique Residences">Boutique Residences</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-warmwhite text-forest border border-forest/15 px-3 py-3 text-sm focus:border-terracotta focus:outline-none"
                    >
                      <option value="₹50L – ₹1Cr">₹50L – ₹1Cr</option>
                      <option value="₹1Cr – ₹2Cr">₹1Cr – ₹2Cr</option>
                      <option value="₹2Cr+">₹2Cr+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-forest/70 font-medium">
                    Message or Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your timeframe, BHK preference, or specific amenities required..."
                    className="w-full bg-warmwhite text-forest border border-forest/15 px-4 py-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-forest text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-terracotta transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  Request a Consultation
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

