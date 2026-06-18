"use client";

import { useState } from "react";
import axios from "axios";

const countries = [
  { code: "+91", label: "🇮🇳 +91", name: "India", length: 10, placeholder: "98765 43210" },
  { code: "+1", label: "🇺🇸 +1", name: "US / Canada", length: 10, placeholder: "555-019-2834" },
  { code: "+44", label: "🇬🇧 +44", name: "UK", length: 10, placeholder: "7911 123456" },
  { code: "+61", label: "🇦🇺 +61", name: "Australia", length: 9, placeholder: "412 345 678" },
  { code: "+65", label: "🇸🇬 +65", name: "Singapore", length: 8, placeholder: "8123 4567" },
  { code: "+49", label: "🇩🇪 +49", name: "Germany", minLength: 10, maxLength: 11, placeholder: "170 1234567" },
  { code: "+971", label: "🇦🇪 +971", name: "UAE", length: 9, placeholder: "50 123 4567" }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phoneNumber: "",
    primaryInterest: "",
    messageDetails: ""
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumOnly, setPhoneNumOnly] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeCountry = countries.find(c => c.code === countryCode) || countries[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side country-specific phone number validation
    const digits = phoneNumOnly.replace(/\D/g, "");

    if (!digits) {
      setSubmitError("Phone number is required.");
      return;
    }

    if (activeCountry.length !== undefined) {
      if (digits.length !== activeCountry.length) {
        setSubmitError(`For ${activeCountry.name}, the phone number must be exactly ${activeCountry.length} digits.`);
        return;
      }
    } else if (activeCountry.minLength !== undefined && activeCountry.maxLength !== undefined) {
      if (digits.length < activeCountry.minLength || digits.length > activeCountry.maxLength) {
        setSubmitError(`For ${activeCountry.name}, the phone number must be between ${activeCountry.minLength} and ${activeCountry.maxLength} digits.`);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const combinedPhoneNumber = `${countryCode} ${digits}`;
    const submissionData = {
      ...formData,
      phoneNumber: combinedPhoneNumber
    };

    try {
      await axios.post("/api/submissions", submissionData);

      setSubmitted(true);
      setFormData({
        fullName: "",
        companyName: "",
        workEmail: "",
        phoneNumber: "",
        primaryInterest: "",
        messageDetails: ""
      });
      setPhoneNumOnly("");

      // Clear the success screen after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      const errMsg = err.response?.data?.error || err.message || "An unexpected error occurred.";
      setSubmitError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] dark:bg-[#0B1020] min-h-screen">
      {/* Hero Section */}
      <section className="reveal-section max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 text-center space-y-6">
        <div className="reveal-element inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
            Start Your Automation Journey
          </span>
        </div>
        <h1 className="reveal-element reveal-heading font-display text-4xl md:text-5xl lg:text-[52px] font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight max-w-4xl mx-auto leading-tight">
          Partner with <br />
          <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            AI Finance Experts
          </span>
        </h1>
        <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you need to deploy yfy.ai/rekrutiq.io or require bespoke Agentic AI consulting for your finance division, contact our blended team of finance and tech experts today.
        </p>
      </section>

      {/* Main Grid: Form + Info Sidebar */}
      <section className="reveal-section max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Container */}
          <div className="reveal-card premium-card-hover lg:col-span-8 bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-6 md:p-10 shadow-lg transition-all duration-300">
            {submitted ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-full text-2xl font-bold animate-bounce">
                  ✓
                </div>
                <h3 className="font-display text-xl font-bold text-secondary dark:text-[#F8FAFC]">Request Submitted Successfully</h3>
                <p className="font-sans text-xs text-gray-400 dark:text-[#94A3B8] max-w-sm">
                  Our systems have queued your request. A solutions specialist will reach out to you at the provided email address within our 2-hour SLA window.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="font-sans text-sm font-bold text-[#565e74] dark:text-[#CBD5E1]" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl px-4 py-3.5 text-sm text-secondary dark:text-[#F8FAFC] focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="font-sans text-sm font-bold text-[#565e74] dark:text-[#CBD5E1]" htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="e.g. Finnovo Tech"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl px-4 py-3.5 text-sm text-secondary dark:text-[#F8FAFC] focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="font-sans text-sm font-bold text-[#565e74] dark:text-[#CBD5E1]" htmlFor="workEmail">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="workEmail"
                      placeholder="info@finnovo.io"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl px-4 py-3.5 text-sm text-secondary dark:text-[#F8FAFC] focus:outline-none focus:border-primary transition-colors font-sans"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="font-sans text-sm font-bold text-[#565e74] dark:text-[#CBD5E1]" htmlFor="phoneInput">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="countryCode"
                        value={countryCode}
                        onChange={(e) => {
                          setCountryCode(e.target.value);
                          setPhoneNumOnly("");
                          setSubmitError(null);
                        }}
                        className="w-24 bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl pl-3 pr-6 py-3.5 text-sm text-secondary dark:text-[#F8FAFC] focus:outline-none focus:border-primary transition-colors font-sans cursor-pointer"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code} className="dark:bg-[#1C2740]">
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phoneInput"
                        placeholder={activeCountry.placeholder || "Enter phone number"}
                        required
                        value={phoneNumOnly}
                        maxLength={activeCountry.length !== undefined ? activeCountry.length : activeCountry.maxLength}
                        onChange={(e) => {
                          setPhoneNumOnly(e.target.value.replace(/\D/g, ""));
                          setSubmitError(null);
                        }}
                        className="flex-1 bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl px-4 py-3.5 text-sm text-secondary dark:text-[#F8FAFC] focus:outline-none focus:border-primary transition-colors font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Interest Dropdown matching official guidelines */}
                <div className="space-y-2">
                  <label className="font-sans text-sm font-bold text-[#565e74] dark:text-[#CBD5E1]" htmlFor="primaryInterest">
                    Primary Interest
                  </label>
                  <select
                    id="primaryInterest"
                    required
                    value={formData.primaryInterest}
                    onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                    className="w-full bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl px-4 py-3.5 text-sm text-[#565e74] dark:text-[#CBD5E1] focus:outline-none focus:border-primary transition-colors font-sans appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="dark:bg-[#1C2740]">Select an area of focus</option>
                    <option value="yfy.ai" className="dark:bg-[#1C2740]">yfy.ai</option>
                    <option value="rekrutiq.io" className="dark:bg-[#1C2740]">rekrutiq.io</option>
                    <option value="Custom AI Consulting" className="dark:bg-[#1C2740]">Custom AI Consulting</option>
                  </select>
                </div>

                {/* Message Details */}
                <div className="space-y-2">
                  <label className="font-sans text-sm font-bold text-[#565e74] dark:text-[#CBD5E1]" htmlFor="messageDetails">
                    Message Details
                  </label>
                  <textarea
                    id="messageDetails"
                    rows={4}
                    placeholder="Briefly describe your current infrastructure and operational goals..."
                    required
                    value={formData.messageDetails}
                    onChange={(e) => setFormData({ ...formData, messageDetails: e.target.value })}
                    className="w-full bg-[#f8f9ff] dark:bg-[#1C2740] border border-gray-200 dark:border-[#2B364D] rounded-xl px-4 py-3.5 text-sm text-secondary dark:text-[#F8FAFC] focus:outline-none focus:border-primary transition-colors font-sans resize-none"
                  />
                </div>

                {/* Submit button & disclaimer */}
                <div className="space-y-4 pt-2">
                  {submitError && (
                    <p className="font-sans text-xs text-red-500 font-bold bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 px-4 py-2.5 rounded-xl">
                      ⚠️ {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-sans text-sm md:text-base font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-8 py-3.5 rounded-full hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors inline-flex items-center space-x-2 shadow-md cursor-pointer premium-btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                    <span>&rarr;</span>
                  </button>
                  <p className="font-sans text-xs text-gray-400 dark:text-[#94A3B8] leading-normal">
                    By submitting this form, you agree to our privacy protocols.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar Info Cards */}
          <div className="stagger-cards-container lg:col-span-4 space-y-5">             {/* Contact & Operations Card */}
            <div className="reveal-card premium-card-hover bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-5 shadow-md space-y-4 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] font-bold text-primary dark:text-primary tracking-wider uppercase">
                  Direct Contact
                </span>
                <span className="bg-indigo-50 dark:bg-indigo-950/30 text-primary dark:text-primary border border-indigo-100 dark:border-indigo-800/30 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  SLA &lt; 2hrs
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-display text-[11px] font-bold text-gray-400 dark:text-[#94A3B8] uppercase tracking-wider mb-0.5">
                    Email Address
                  </h4>
                  <a
                    href="mailto:info@finnovo.io"
                    className="text-secondary dark:text-[#F8FAFC] font-sans text-sm font-semibold hover:text-primary transition-colors"
                  >
                    info@finnovo.io
                  </a>
                </div>
                <div>
                  <h4 className="font-display text-[11px] font-bold text-gray-400 dark:text-[#94A3B8] uppercase tracking-wider mb-0.5">
                    Working Hours
                  </h4>
                  <p className="font-sans text-xs text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                    Monday - Friday &bull; 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
            {/* Combined Offices Card */}
            <div className="reveal-card premium-card-hover bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-5 shadow-md space-y-4 transition-all duration-300">
              <span className="font-mono text-[11px] font-bold text-primary dark:text-primary tracking-wider uppercase block">
                Office Locations
              </span>

              {/* Location 1 */}
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-secondary dark:text-[#F8FAFC]">
                  T-Hub (Primary Office)
                </h4>
                <p className="font-sans text-xs text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                  T-hub 6th floor, Inorbit Mall Road, Madhapur,<br />
                  Hyderabad, Telangana 500081
                </p>
                <a
                  href="https://maps.app.goo.gl/9VVKQsHhxvhiohUWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] font-bold text-secondary dark:text-[#F8FAFC] hover:text-primary inline-flex items-center space-x-1"
                >
                  <span>VIEW ON MAPS</span>
                  <span>&rarr;</span>
                </a>
              </div>

              <hr className="border-gray-100 dark:border-[#2B364D]" />

              {/* Location 2 */}
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-secondary dark:text-[#F8FAFC]">
                  Bhanu Elite (Dev Center)
                </h4>
                <p className="font-sans text-xs text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                  Flat 102, Bhanu Elite, Image Hospital Rd,<br />
                  Madhapur, Hyderabad, Telangana 500081
                </p>
                <a
                  href="https://maps.app.goo.gl/r4aBeLS168rXMubH6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] font-bold text-secondary dark:text-[#F8FAFC] hover:text-primary inline-flex items-center space-x-1"
                >
                  <span>VIEW ON MAPS</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="reveal-section max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="reveal-element reveal-image bg-white dark:bg-[#161F33] rounded-3xl overflow-hidden border dark:border-[#2B364D] shadow-md h-[380px] relative w-full premium-card-hover transition-all duration-300">
          <iframe
            title="Finnovo Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.275069274291!2d78.38090547600276!3d17.446556883451556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bb7b1185295888!2sT-Hub!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-180 hover:grayscale-0 dark:hover:invert-0 dark:hover:hue-rotate-0 transition-all duration-300"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
