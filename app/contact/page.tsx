"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function parseTimeToMinutes(timeStr: string): number {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

function parseDurationToMinutes(durationStr: string): number {
  const numeric = parseInt(durationStr, 10);
  return isNaN(numeric) ? 30 : numeric;
}

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

  // Scheduler States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [meetingDuration, setMeetingDuration] = useState("30 Minutes");
  const [meetingMode, setMeetingMode] = useState("Google Meet");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [existingBookings, setExistingBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/submissions");
      if (res.data && res.data.submissions) {
        setExistingBookings(res.data.submissions);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM"
  ];

  const activeCountry = countries.find(c => c.code === countryCode) || countries[0];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay, totalDays };
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return dateToCheck < today;
  };

  const isWeekend = (day: number) => {
    const dayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate !== null &&
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) {
      return;
    }
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(next);
  };

  const isSlotUnavailable = (slot: string) => {
    if (!selectedDate) return false;

    const slotStart = parseTimeToMinutes(slot);

    // Disable past time slots if the selected date is today (based on IST)
    const today = new Date();
    const isToday = selectedDate.getDate() === today.getDate() &&
                    selectedDate.getMonth() === today.getMonth() &&
                    selectedDate.getFullYear() === today.getFullYear();
    
    if (isToday) {
      const nowIstStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const nowIst = new Date(nowIstStr);
      const currentMinutes = nowIst.getHours() * 60 + nowIst.getMinutes();
      
      if (slotStart <= currentMinutes) {
        return true;
      }
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const targetDateStr = `${year}-${month}-${day}`;

    const dayBookings = existingBookings.filter(b => b.scheduledDate === targetDateStr && b.scheduledTime);
    const slotDuration = parseDurationToMinutes(meetingDuration);
    const slotEnd = slotStart + slotDuration;

    for (const booking of dayBookings) {
      const bookedStart = parseTimeToMinutes(booking.scheduledTime);
      const bookedDuration = parseDurationToMinutes(booking.duration || "30 Minutes");
      const bookedEnd = bookedStart + bookedDuration;

      if (slotStart < bookedEnd && bookedStart < slotEnd) {
        return true;
      }
    }

    return false;
  };

  const isContactDetailsFilled =
    formData.fullName.trim() !== "" &&
    formData.companyName.trim() !== "" &&
    formData.workEmail.trim() !== "" &&
    phoneNumOnly.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (isContactDetailsFilled) {
      if (!selectedDate || !selectedTime) {
        setSubmitError("Please select a date and time slot for your consultation.");
        return;
      }
      if (formData.primaryInterest === "" || formData.messageDetails.trim() === "") {
        setSubmitError("Please select a primary interest and fill in the message details.");
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const combinedPhoneNumber = `${countryCode} ${digits}`;
    const submissionData = {
      ...formData,
      phoneNumber: combinedPhoneNumber,
      scheduledDate: selectedDate ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` : null,
      scheduledTime: selectedTime,
      duration: meetingDuration,
      meetingMode: meetingMode
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
      setSelectedDate(null);
      setSelectedTime(null);
      setMeetingDuration("30 Minutes");
      setMeetingMode("Google Meet");

      fetchBookings();

      setTimeout(() => {
        setSubmitted(false);
      }, 7000);
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
                <h3 className="font-display text-xl font-bold text-secondary dark:text-[#F8FAFC]">Consultation Scheduled Successfully</h3>
                <p className="font-sans text-xs text-gray-500 dark:text-[#94A3B8] max-w-sm">
                  Our systems have queued your request. A calendar invitation has been sent to your work email address with the meeting details.
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

                {/* Primary Interest Dropdown */}
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

                {/* Scheduler Container */}
                <div
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${isContactDetailsFilled ? "max-h-[1500px] opacity-100 mt-8" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="w-full bg-[#f8f9ff] dark:bg-[#11192B] border border-gray-100 dark:border-[#2B364D] rounded-[24px] p-5 md:p-6 shadow-sm">
                    {/* Header */}
                    <div className="flex items-center space-x-2 border-b border-gray-200/50 dark:border-[#2B364D] pb-3 mb-4">
                      <span className="w-2.5 h-2.5 bg-[#E9B615] rounded-full animate-pulse-subtle" />
                      <h3 className="font-display text-sm font-bold text-secondary dark:text-[#F8FAFC]">
                        Schedule a Consultation
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Left Side: Calendar */}
                      <div className="md:col-span-5 border-r-0 md:border-r border-gray-200/50 dark:border-[#2B364D] md:pr-5">
                        {/* Month navigation */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-sans text-xs font-bold text-secondary dark:text-[#F8FAFC]">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </span>
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="p-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-[#1C2740] text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
                            >
                              &larr;
                            </button>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="p-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-[#1C2740] text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
                            >
                              &rarr;
                            </button>
                          </div>
                        </div>

                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <span key={day} className="font-sans text-[10px] font-bold text-gray-400 dark:text-[#94A3B8]">
                              {day}
                            </span>
                          ))}
                        </div>

                        {/* Days grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: getDaysInMonth(currentMonth).firstDay }).map((_, i) => (
                            <div key={`offset-${i}`} />
                          ))}
                          {Array.from({ length: getDaysInMonth(currentMonth).totalDays }, (_, i) => i + 1).map((day) => {
                            const past = isPastDate(day);
                            const weekend = isWeekend(day);
                            const today = isToday(day);
                            const selected = isSelected(day);

                            return (
                              <button
                                key={day}
                                type="button"
                                disabled={past}
                                onClick={() => {
                                  setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                                  setSelectedTime(null);
                                }}
                                className={`
                                  h-7 text-xs font-mono rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer
                                  ${past
                                    ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                                    : selected
                                      ? 'bg-[#E9B615] text-[#08142D] font-bold shadow-sm'
                                      : today
                                        ? 'border border-[#E9B615]/70 text-[#E9B615] hover:bg-[#E9B615]/10 font-bold'
                                        : weekend
                                          ? 'text-gray-400/80 dark:text-gray-500/80 hover:bg-gray-200/50 dark:hover:bg-[#1C2740]'
                                          : 'text-secondary dark:text-[#CBD5E1] hover:bg-gray-200/50 dark:hover:bg-[#1C2740]'
                                  }
                                `}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Side: Slots & Details */}
                      <div className="md:col-span-7">
                        {!selectedDate ? (
                          <div className="h-full flex flex-col items-center justify-center text-center py-6 text-gray-400 dark:text-[#94A3B8] space-y-2">
                            <span className="text-xl">📅</span>
                            <p className="font-sans text-xs font-semibold">Select a date to view available time slots</p>
                          </div>
                        ) : (
                          <div className="space-y-4 animate-fadeIn">
                            {/* Time Slots */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-sans text-xs font-bold text-secondary dark:text-[#F8FAFC]">
                                  Available Time (IST)
                                </span>

                              </div>
                              <div className="grid grid-cols-3 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                                {timeSlots.map((slot, index) => {
                                  const isSelected = selectedTime === slot;
                                  const isUnavailable = isSlotUnavailable(slot);

                                  return (
                                    <button
                                      key={slot}
                                      type="button"
                                      disabled={isUnavailable}
                                      onClick={() => setSelectedTime(slot)}
                                      style={{ animationDelay: `${index * 30}ms` }}
                                      className={`
                                        py-1.5 px-2 text-[11px] font-mono font-medium rounded-full border transition-all duration-200 animate-slideUp cursor-pointer
                                        ${isUnavailable
                                          ? 'bg-gray-100/50 dark:bg-[#161F33] border-gray-100 dark:border-gray-800/80 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-40'
                                          : isSelected
                                            ? 'bg-[#E9B615] text-[#08142D] border-[#E9B615] shadow-sm scale-[1.03] font-bold'
                                            : 'bg-white dark:bg-[#1C2740] border-gray-200 dark:border-[#2B364D] text-secondary dark:text-[#CBD5E1] hover:border-[#E9B615]/50 hover:bg-[#E9B615]/5 hover:-translate-y-[1px]'
                                        }
                                      `}
                                    >
                                      {slot}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer / Submit */}
                    <div className="border-t border-gray-200/50 dark:border-[#2B364D] pt-4 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div className="text-left w-full sm:w-auto">
                        {selectedDate && selectedTime ? (
                          <p className="font-sans text-[11px] text-[#565e74] dark:text-[#CBD5E1]">
                            Selected Slot: <strong className="text-secondary dark:text-[#F8FAFC]">{selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</strong> at <strong className="text-secondary dark:text-[#F8FAFC]">{selectedTime}</strong>
                          </p>
                        ) : (
                          <p className="font-sans text-[11px] text-gray-400 dark:text-[#94A3B8]">
                            Please select a date and time to finish scheduling.
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto font-sans text-xs font-bold bg-[#08142D] dark:bg-[#F8FAFC] hover:bg-[#E9B615] dark:hover:bg-[#E9B615] text-[#F8FAFC] dark:text-[#08142D] hover:text-[#08142D] dark:hover:text-[#08142D] px-6 py-2.5 rounded-full transition-all duration-300 inline-flex justify-center items-center space-x-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>{isSubmitting ? "Scheduling..." : "Schedule Now"}</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Normal Submit Button (hidden when details are filled so scheduler submit button takes over) */}
                {!isContactDetailsFilled && (
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
                )}

                {/* Show error in scheduler mode at the bottom if scheduler is active */}
                {isContactDetailsFilled && submitError && (
                  <p className="font-sans text-xs text-red-500 font-bold bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 px-4 py-2.5 rounded-xl mt-4">
                    ⚠️ {submitError}
                  </p>
                )}
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
