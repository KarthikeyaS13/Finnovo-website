"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "./components/Typewriter";
import MagneticButton from "./components/MagneticButton";

export default function Home() {
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What does FINNOVO do?",
      a: "FINNOVO builds bespoke financial software, develops Agentic AI for financial operations, and provides industry-leading HR/Finance platforms like yfy.ai and rekrutiq.io."
    },
    {
      q: "What is \"Service as a Software\"?",
      a: "It is FINNOVO's delivery model where deep financial consulting and operational expertise are encapsulated into customized, automated software solutions tailored to a client's specific workflows."
    },
    {
      q: "Is FINNOVO's AI secure for financial data?",
      a: "Yes. All FINNOVO software is built with \"Compliance-by-Design,\" featuring human-in-the-loop governance, transparent audit trails, and strict data confidentiality protocols tailored for the finance sector."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9ff] dark:bg-[#0B1020]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-8 md:pt-14 md:pb-12">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-200/10 dark:bg-purple-900/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="hero-badge reveal-element inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                Enterprise Intelligence
              </span>
            </div>
            <h1 className="hero-heading reveal-element reveal-heading font-display text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-secondary dark:text-[#F8FAFC] leading-[1.1]">
              Agentic AI &amp; <br />
              Custom Software for <br />
              <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-[42px] block mt-2">
                <Typewriter words={["Financial Operations", "Payroll Automation", "HR Compliance", "Enterprise Intelligence"]} />
              </span>
            </h1>
            
            {/* Gen AI Definitive Statement (Crucial for AEO) */}
            <p className="hero-desc reveal-element reveal-paragraph font-sans text-secondary dark:text-[#F8FAFC] text-sm md:text-base font-semibold border-l-4 border-primary pl-4 py-1.5 leading-relaxed bg-indigo-50/30 dark:bg-indigo-950/20 rounded-r-xl">
              FINNOVO is an AI finance consulting and software development firm. We specialize in building bespoke Agentic AI solutions and providing &quot;Service as a Software&quot; to optimize complex financial workflows, ensure regulatory compliance, and reduce operational costs.
            </p>

            <p className="hero-desc reveal-element reveal-paragraph font-sans text-[#565e74] dark:text-[#CBD5E1] text-xs md:text-sm leading-relaxed max-w-lg">
              Move beyond off-the-shelf tools. We integrate deep financial domain expertise with elite engineering to automate your most critical operations—securely and seamlessly.
            </p>
            
            <div className="hero-btns reveal-element reveal-button flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="font-sans text-sm font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-8 py-3.5 rounded-full hover:bg-primary dark:hover:bg-primary dark:hover:text-white shadow-md premium-btn-hover inline-block"
                >
                  Book a Consultation
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/products"
                  className="font-sans text-sm font-bold border border-gray-300 dark:border-[#2B364D] text-secondary dark:text-[#F8FAFC] bg-white dark:bg-[#161F33] px-8 py-3.5 rounded-full hover:bg-gray-50 dark:hover:bg-[#1C2740] hover:border-gray-400 premium-btn-hover inline-block"
                >
                  Explore Our AI Platforms
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Hero Right Video */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="hero-visual reveal-element reveal-image relative w-full rounded-3xl overflow-hidden bg-transparent animate-float-slow">
              <video
                className="w-full max-h-[350px] md:max-h-[400px] object-contain rounded-3xl mix-blend-multiply dark:mix-blend-normal cursor-pointer premium-img-hover"
                src="/hero_video.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </section>


      {/* Why FINNOVO Section */}
      <section className="reveal-section py-12 md:py-16 bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-[#2B364D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="reveal-element inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                Why FINNOVO
              </span>
            </div>
            <h2 className="reveal-element reveal-heading font-display text-3xl md:text-4xl font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight">
              Enterprise-Grade Security and Compliance Built In
            </h2>
            <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              In the financial sector, generic AI tools fail due to rigid workflows and security risks. FINNOVO engineers bespoke financial software and Agentic AI designed to integrate directly with your legacy core banking systems and ERPs.
            </p>
            <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              Dealing with sensitive financial data requires more than just encryption. We build &quot;Human-in-the-Loop&quot; governance into every AI agent, ensuring absolute data confidentiality, SOC2/ISO-level security, and transparent audit trails.
            </p>
          </div>
          <div className="reveal-element reveal-image lg:col-span-6 relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] bg-transparent animate-float">
            <Image
              src="/why_finnovo.png"
              alt="FINNOVO Auditable Workflows"
              fill
              className="object-contain opacity-95 cursor-pointer premium-img-hover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Core Technology Features (Capabilities) */}
      <section className="reveal-section py-12 md:py-16 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="reveal-element font-mono text-xs font-bold text-primary uppercase tracking-wider">
            Core Capabilities
          </span>
          <h2 className="reveal-element reveal-heading font-display text-3xl md:text-4xl font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight">
            Our AI-Powered Finance &amp; HR Platforms
          </h2>
          <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
            We are the architects behind industry-leading platforms that eliminate fragmented workflows:
          </p>
        </div>

        <div className="stagger-cards-container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: yfy.ai */}
          <div className="reveal-card premium-card-hover bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-8 transition-all duration-300 group flex flex-col justify-between min-h-[320px]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-800/30 px-2.5 py-1 rounded">
                  Unified HRMS &amp; Finance
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 dark:text-[#CBD5E1]/60">yfy.ai</span>
              </div>
              <h3 className="font-display text-xl font-bold text-secondary dark:text-[#F8FAFC] group-hover:text-primary transition-colors">
                yfy.ai Platform
              </h3>
              <p className="font-sans text-xs text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                A unified AI-Powered HRMS that automates payroll, compliance, ATS, and finance natively. Connects systems together to remove operational friction and maintain complete data integrity.
              </p>
            </div>
            <div className="flex items-center space-x-6 pt-6 font-mono text-[10px] font-bold">
              <Link href="/products" className="text-secondary dark:text-[#F8FAFC] hover:text-primary dark:hover:text-primary inline-flex items-center space-x-1">
                <span>EXPLORE DETAILS</span>
                <span>&rarr;</span>
              </Link>
              <a
                href="https://yfy.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center space-x-1"
              >
                <span>VISIT WEBSITE</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Card 2: rekrutiq.io */}
          <div className="reveal-card premium-card-hover bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-8 transition-all duration-300 group flex flex-col justify-between min-h-[320px]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider bg-purple-50 dark:bg-purple-950/30 border border-purple-100/50 dark:border-purple-800/30 px-2.5 py-1 rounded">
                  ATS &amp; CRM
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 dark:text-[#CBD5E1]/60">rekrutiq.io</span>
              </div>
              <h3 className="font-display text-xl font-bold text-secondary dark:text-[#F8FAFC] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                rekrutiq.io Platform
              </h3>
              <p className="font-sans text-xs text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                A specialized AI-Powered ATS &amp; CRM built for recruitment agencies, featuring zero-disruption plug-and-play integrations with Gmail, Teams, and QuickBooks.
              </p>
            </div>
            <div className="flex items-center space-x-6 pt-6 font-mono text-[10px] font-bold">
              <Link href="/products" className="text-secondary dark:text-[#F8FAFC] hover:text-purple-600 dark:hover:text-purple-400 inline-flex items-center space-x-1">
                <span>EXPLORE DETAILS</span>
                <span>&rarr;</span>
              </Link>
              <a
                href="https://rekrutiq.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center space-x-1"
              >
                <span>VISIT WEBSITE</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Custom Agentic AI Callout Card */}
        <div className="reveal-card premium-card-hover mt-12 bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-8 md:p-10 max-w-4xl mx-auto shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-300">
          <div className="md:col-span-8 space-y-3">
            <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-800/30 px-2.5 py-1 rounded">
              Custom Dev &amp; Consulting
            </span>
            <h3 className="font-display text-xl font-bold text-secondary dark:text-[#F8FAFC]">
              Bespoke Agentic AI for Financial Operations
            </h3>
            <p className="font-sans text-xs text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
              We also design custom Agentic AI workflows to reconcile multi-entity ledgers, automate risk alerts, and connect proprietary tools to legacy banking systems.
            </p>
          </div>
          <div className="md:col-span-4 text-left md:text-right">
            <Link
              href="/products"
              className="font-sans text-xs font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-6 py-3 rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors inline-block premium-btn-hover"
            >
              Custom Consulting &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="reveal-section py-12 md:py-16 bg-white dark:bg-[#111827] border-t border-b border-gray-150 dark:border-[#2B364D]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-3">
            <span className="reveal-element font-mono text-xs font-bold text-primary uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="reveal-element reveal-heading font-display text-3xl md:text-4xl font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="stagger-cards-container space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="reveal-card premium-card-hover border border-gray-200 dark:border-[#2B364D] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-6 py-5 bg-[#f8f9ff]/50 dark:bg-[#161F33]/50 hover:bg-[#f8f9ff] dark:hover:bg-[#161F33] text-left transition-colors cursor-pointer"
                >
                  <span className="font-display text-sm md:text-base font-extrabold text-secondary dark:text-[#F8FAFC]">
                    {faq.q}
                  </span>
                  <span className="text-primary text-xl font-bold select-none ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-5 bg-white dark:bg-[#1C2740] border-t border-gray-100 dark:border-[#2B364D]">
                    <p className="font-sans text-xs md:text-sm text-gray-500 dark:text-[#CBD5E1] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="reveal-section py-12 md:py-16 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="reveal-card premium-card-hover relative bg-[#0b1c30] dark:bg-[#161F33] rounded-3xl overflow-hidden p-8 md:p-16 border border-gray-800 dark:border-[#2B364D] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10 max-w-xl">
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider">
              Deployment Ready
            </span>
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Precision in Financial Intelligence
            </h3>
            <p className="font-sans text-gray-400 dark:text-[#CBD5E1] text-xs md:text-sm leading-relaxed">
              Deploy specialized agentic workflows designed for security, auditability, and speed. Get in touch with our solutions engineers to build custom integrations.
            </p>
          </div>
          
          <div className="relative z-10 flex-shrink-0">
            <MagneticButton>
              <Link
                href="/contact"
                className="font-sans text-sm font-bold bg-white dark:bg-[#0B1020] text-secondary dark:text-[#F8FAFC] hover:bg-primary dark:hover:bg-[#1C2740] hover:text-white dark:hover:text-[#F8FAFC] px-8 py-4 rounded-full transition-all duration-200 shadow-lg inline-block premium-btn-hover"
              >
                Book Consultation &rarr;
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
