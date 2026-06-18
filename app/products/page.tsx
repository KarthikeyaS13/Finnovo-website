"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [activeCandidate, setActiveCandidate] = useState(0);

  return (
    <div className="bg-[#f8f9ff] dark:bg-[#0B1020] min-h-screen">
      {/* Hero Section */}
      <section className="reveal-section max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 text-center space-y-6">
        <div className="reveal-element inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
            Product Suite
          </span>
        </div>
        <h1 className="reveal-element reveal-heading font-display text-4xl md:text-5xl lg:text-[52px] font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight max-w-4xl mx-auto leading-tight">
          Purpose-Built Platforms for <br />
          <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            HR and Recruitment
          </span>
        </h1>
        <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover our ready-made SaaS platforms designed to eliminate fragmented workflows across human resources and recruitment agencies.
        </p>
        <div className="reveal-element reveal-button pt-2">
          <Link
            href="/contact"
            className="font-sans text-sm font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-8 py-3.5 rounded-full hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors inline-block premium-btn-hover"
          >
            Book Consultation
          </Link>
        </div>
      </section>

      {/* YFY AI Section */}
      <section className="reveal-section py-20 bg-white dark:bg-[#111827] border-y border-gray-150 dark:border-[#2B364D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Description */}
          <div className="space-y-6 lg:col-span-5">
            <span className="reveal-element font-mono text-[10px] font-bold text-primary dark:text-primary bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded">
              YFY.AI • UNIFIED HRMS
            </span>
            <h2 className="reveal-element reveal-heading font-display text-3xl font-bold text-secondary dark:text-[#F8FAFC] tracking-tight">
              A Unified AI-Powered HRMS Designed to Centralize Payroll
            </h2>
            <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              yfy.ai acts as the single source of truth for your workforce, ensuring payroll accuracy and automated tax filing across multiple jurisdictions. It synchronizes employee rosters, dynamic timesheet entries, and tax registers with multi-entity financial ledgers.
            </p>
            <ul className="reveal-element space-y-3.5 text-xs text-secondary dark:text-[#F8FAFC] font-semibold">
              {[
                "Centralizes payroll, compliance, and talent acquisition natively",
                "Real-time cross-database employee record reconciliation",
                "Autonomous compliance index monitoring & tax validations"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 bg-indigo-50 dark:bg-indigo-950/30 text-primary dark:text-primary border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-center rounded-full text-[10px]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="reveal-element reveal-button pt-4">
              <a
                href="https://yfy.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-6 py-3 rounded-full hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors inline-block premium-btn-hover"
              >
                Visit yfy.ai website &rarr;
              </a>
            </div>
          </div>

          {/* Right: Score Visual Mockup */}
          <div className="reveal-element reveal-image flex justify-center animate-float-slow w-full lg:col-span-7">
            <div className="w-full max-w-[640px]">
              <img
                src="/payroll.png"
                alt="YFY Payroll Mockup"
                className="w-full h-auto object-contain rounded-3xl premium-img-hover cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rekrutiq Section */}
      <section className="reveal-section py-20 bg-[#f8f9ff] dark:bg-[#0B1020]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Candidate pipeline visual */}
          <div className="reveal-element reveal-image order-2 lg:order-1 flex justify-center animate-float">
            <div className="bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-lg premium-card-hover transition-all duration-300">
              <div className="border-b border-gray-100 dark:border-[#2B364D] pb-4 mb-5">
                <h4 className="font-sans text-xs font-bold text-secondary dark:text-[#F8FAFC]">Candidate Scoring Pipeline</h4>
                <p className="font-sans text-[10px] text-gray-400 dark:text-[#94A3B8]">Rekrutiq-ATS Automated Matching</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Sneha Reddy", role: "Sr. Accountant", score: 96, status: "Screened" },
                  { name: "Karthik Rao", role: "GST & Tax Specialist", score: 91, status: "Qualified" },
                  { name: "Arjun Mehta", role: "Payroll Administrator", score: 87, status: "Reviewing" }
                ].map((cand, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCandidate(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      activeCandidate === idx
                        ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-primary dark:border-primary shadow-sm"
                        : "bg-white dark:bg-[#161F33] border-gray-150 dark:border-[#2B364D] hover:bg-gray-50/50 dark:hover:bg-[#1C2740]/50"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-secondary dark:text-[#F8FAFC] block">{cand.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-[#94A3B8]">{cand.role}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        cand.score >= 90 ? "bg-indigo-50 dark:bg-indigo-950/40 text-primary dark:text-[#F8FAFC]" : "bg-gray-100 dark:bg-[#2B364D] text-gray-500 dark:text-[#CBD5E1]"
                      }`}>
                        {cand.score}%
                      </span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 bg-[#f8fafc] dark:bg-[#1C2740] border border-gray-150 dark:border-[#2B364D] rounded-2xl p-4 text-[10px]">
                <span className="text-gray-400 dark:text-[#94A3B8] block mb-2">Automated Assessment Metrics (Karthik Rao)</span>
                <div className="space-y-2">
                  <div className="flex justify-between text-secondary dark:text-[#F8FAFC]">
                    <span>Tax Code Expertise</span>
                    <span className="font-bold">95/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#2B364D] h-1 rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: "95%" }} />
                  </div>
                  <div className="flex justify-between text-secondary dark:text-[#F8FAFC]">
                    <span>Ledger Reconciliation</span>
                    <span className="font-bold">88/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#2B364D] h-1 rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Description */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="reveal-element font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2.5 py-1 rounded">
              REKRUTIQ.IO • AGENCY ATS &amp; CRM
            </span>
            <h2 className="reveal-element reveal-heading font-display text-3xl font-bold text-secondary dark:text-[#F8FAFC] tracking-tight">
              An AI-Powered ATS &amp; CRM Built Specifically for Agencies
            </h2>
            <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              rekrutiq.io features Gmail, Teams, and QuickBooks integrations, allowing recruiting teams to scale candidate sourcing, parse resumes, and manage client billing on a single screen.
            </p>
            <ul className="reveal-element space-y-3.5 text-xs text-secondary dark:text-[#F8FAFC] font-semibold">
              {[
                "Gmail, Microsoft Teams, and QuickBooks plug-and-play integrations",
                "Advanced ATS & CRM integrations with deep filtering",
                "Automated compensation grid alignment checks"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/30 flex items-center justify-center rounded-full text-[10px]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="reveal-element reveal-button pt-4">
              <a
                href="https://rekrutiq.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-6 py-3 rounded-full hover:bg-purple-600 dark:hover:bg-purple-500 transition-colors inline-block premium-btn-hover"
              >
                Visit rekrutiq.io website &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Agentic AI Dark Section */}
      <section className="reveal-section bg-secondary dark:bg-[#111827] py-24 text-white border-t dark:border-t-0 border-[#2B364D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="reveal-element font-mono text-xs font-bold text-primary uppercase tracking-wider">
              Bespoke Development
            </span>
            <h2 className="reveal-element reveal-heading font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white dark:text-[#F8FAFC]">
              Bespoke Agentic AI for Financial Operations
            </h2>
            <p className="reveal-element reveal-paragraph font-sans text-gray-400 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              We design and deploy custom autonomous AI agents tailored for your specific financial workflows. Built with compliance-by-design principles, our agents operate within secure environments to automate complex accounting tasks:
            </p>
          </div>

          <div className="stagger-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Autonomous Reconciliation",
                metric: "99.9% Accuracy",
                desc: "Matches receipts, invoices, and bank clearances across multi-entity ledgers with extreme precision and audit trails."
              },
              {
                title: "Intelligent Risk Management",
                metric: "Real-time Auditing",
                desc: "Flags general ledger anomalies, duplicate invoices, and compliance drifts in real-time before they impact ledgers."
              },
              {
                title: "Predictive Financial Modeling",
                metric: "Continuous Runway",
                desc: "Generates continuous cash flow forecasts and liquidity models by analyzing runway, active contracts, and market trends."
              },
              {
                title: "Legacy System Integration",
                metric: "Zero Disruption",
                desc: "Bridges the gap between modern AI models and legacy core banking software or ERPs with zero disruption to daily operations."
              }
            ].map((card, idx) => (
              <div key={idx} className="reveal-card premium-card-hover bg-[#161F33] dark:bg-[#1C2740] border border-[#2B364D] rounded-3xl p-8 transition-all duration-300">
                <span className="font-mono text-[10px] font-bold text-primary block uppercase tracking-wider mb-2">
                  {card.metric}
                </span>
                <h3 className="font-display text-lg font-bold mb-3 text-white dark:text-[#F8FAFC]">{card.title}</h3>
                <p className="font-sans text-xs text-gray-400 dark:text-[#CBD5E1] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
