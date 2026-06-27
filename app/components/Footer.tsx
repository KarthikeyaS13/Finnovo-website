"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

interface ComplianceImageProps {
  src: string;
  alt: string;
  fallbackText: string;
}

function ComplianceImage({ src, alt, fallbackText }: ComplianceImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50/50 dark:bg-indigo-950/20 text-primary rounded-lg border border-indigo-100/30 dark:border-indigo-900/20">
        <svg
          className="w-4 h-4 text-primary mb-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="font-mono text-[7px] font-bold text-primary uppercase">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-contain dark:brightness-90 rounded-md"
    />
  );
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#111827] border-t border-gray-150 dark:border-[#2B364D] py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Section: Certified & Compliant Badges */}
        <div className="border-b border-gray-100 dark:border-[#2B364D] pb-4 mb-6">
          <span className="font-mono text-[10px] font-bold text-[#64748b] dark:text-[#94A3B8] tracking-wider uppercase block mb-2">
            Certified & Compliant
          </span>
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3">
            {/* ISO 27001:2022 */}
            <div className="flex flex-col items-center text-center bg-gray-50/50 dark:bg-[#161F33] border border-gray-100 dark:border-[#2B364D] rounded-xl p-2 w-28 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <div className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#0B1020] rounded-lg border border-gray-100 dark:border-[#2B364D] p-1 mb-1.5 overflow-hidden">
                <ComplianceImage
                  src="/2.png"
                  fallbackText="ISO 27001"
                  alt="ISO 27001:2022 Certificate"
                />
              </div>
              <h5 className="font-mono text-[10px] font-bold text-secondary dark:text-[#F8FAFC] tracking-tight">
                ISO 27001:2022
              </h5>
              <p className="font-sans text-[9px] text-[#565e74] dark:text-[#CBD5E1] mt-0.5 leading-tight">
                Information Security
              </p>
            </div>

            {/* ISO 27701:2019 */}
            <div className="flex flex-col items-center text-center bg-gray-50/50 dark:bg-[#161F33] border border-gray-100 dark:border-[#2B364D] rounded-xl p-2 w-28 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <div className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#0B1020] rounded-lg border border-gray-100 dark:border-[#2B364D] p-1 mb-1.5 overflow-hidden">
                <ComplianceImage
                  src="/1.png"
                  fallbackText="ISO 27701"
                  alt="ISO 27701:2019 Certificate"
                />
              </div>
              <h5 className="font-mono text-[10px] font-bold text-secondary dark:text-[#F8FAFC] tracking-tight">
                ISO 27701:2019
              </h5>
              <p className="font-sans text-[9px] text-[#565e74] dark:text-[#CBD5E1] mt-0.5 leading-tight">
                Privacy Management
              </p>
            </div>

            {/* ISO 9001:2015 */}
            <div className="flex flex-col items-center text-center bg-gray-50/50 dark:bg-[#161F33] border border-gray-100 dark:border-[#2B364D] rounded-xl p-2 w-28 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 overflow-hidden">
              <div className="w-14 h-14 flex items-center justify-center bg-white dark:bg-[#0B1020] rounded-lg border border-gray-100 dark:border-[#2B364D] p-1 mb-1.5 overflow-hidden">
                <ComplianceImage
                  src="/3.png"
                  fallbackText="ISO 9001"
                  alt="ISO 9001:2015 Certificate"
                />
              </div>
              <h5 className="font-mono text-[10px] font-bold text-secondary dark:text-[#F8FAFC] tracking-tight">
                ISO 90001:2015
              </h5>
              <p className="font-sans text-[9px] text-[#565e74] dark:text-[#CBD5E1] mt-0.5 leading-tight">
                Quality Management
              </p>
            </div>
          </div>
        </div>

        {/* Grid Section: Logo + Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6">
          {/* Logo & Description */}
          <div className="col-span-2 space-y-2">
            <Link href="/" className="inline-block">
              <Logo className="h-12 md:h-14 scale-[2.2] md:scale-[2.8] origin-left -ml-2" />
            </Link>
            <p className="text-[#565e74] dark:text-[#CBD5E1] text-[13px] max-w-sm font-sans leading-relaxed">
              Precision in Financial Intelligence. Building the next generation of autonomous enterprise software for financial operations.
            </p>
          </div>

          {/* Column 1: PLATFORM */}
          <div className="space-y-2">
            <h4 className="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
              Platform
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/products"
                  className="font-sans text-sm text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-sm text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: CORPORATE */}
          <div className="space-y-2">
            <h4 className="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
              Corporate
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/about"
                  className="font-sans text-sm text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/finnovo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[#565e74] dark:text-[#CBD5E1] hover:text-[#0b1c30] dark:hover:text-[#F8FAFC] transition-colors inline-flex items-center"
                >
                  LinkedIn
                  <svg
                    className="w-3.5 h-3.5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider & Copyright */}
        <div className="pt-4 border-t border-gray-100 dark:border-[#2B364D] flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <p className="font-sans text-[11px] text-[#64748b] dark:text-[#94A3B8]">
            &copy; 2024 FINNOVO&reg;. Precision in Financial Intelligence. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="font-sans text-xs text-[#64748b] dark:text-[#94A3B8] hover:text-[#0b1c30] dark:hover:text-[#F8FAFC] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-[#64748b] dark:text-[#94A3B8] hover:text-[#0b1c30] dark:hover:text-[#F8FAFC] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
