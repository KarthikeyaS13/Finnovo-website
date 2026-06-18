"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Sync state with DOM on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setTheme(newTheme);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f8f9ff]/90 dark:bg-[#0B1020]/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-[#2B364D]/50 py-3 shadow-sm"
          : "bg-transparent py-5 shadow-none border-b-transparent backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Logo className="h-16 md:h-20" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-sans text-sm font-semibold tracking-wide transition-colors ${
              isActive("/")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] pb-1"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-sans text-sm font-semibold tracking-wide transition-colors ${
              isActive("/about")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] pb-1"
            }`}
          >
            About
          </Link>
          <Link
            href="/products"
            className={`font-sans text-sm font-semibold tracking-wide transition-colors ${
              isActive("/products")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] pb-1"
            }`}
          >
            Products
          </Link>
          <Link
            href="/contact"
            className={`font-sans text-sm font-semibold tracking-wide transition-colors ${
              isActive("/contact")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC] pb-1"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-gray-200/80 dark:border-[#2B364D] bg-white dark:bg-[#161F33] text-secondary dark:text-[#F8FAFC] hover:bg-gray-50 dark:hover:bg-[#1C2740] transition-colors focus:outline-none shadow-sm cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              // Moon Icon
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              // Sun Icon
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.95 4.95l1.591 1.59M16.718 16.718l1.591 1.591M3 12h2.25m13.5 0H21M6.54 16.718l-1.59 1.591M18.309 4.95l-1.591 1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
              </svg>
            )}
          </button>
          <Link
            href="/contact"
            className="font-sans text-sm font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] px-6 py-2.5 rounded-full hover:bg-primary dark:hover:bg-primary dark:hover:text-white hover:scale-[1.03] transition-all duration-200 shadow-md hover:shadow-indigo-500/10"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-secondary dark:text-[#F8FAFC] hover:text-primary transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white dark:bg-[#0B1020] border-b border-gray-100 dark:border-[#2B364D] shadow-xl transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col space-y-6 bg-[#f8f9ff] dark:bg-[#0B1020]">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-sans text-base font-bold transition-colors ${
              isActive("/") ? "text-primary" : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-sans text-base font-bold transition-colors ${
              isActive("/about") ? "text-primary" : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC]"
            }`}
          >
            About
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-sans text-base font-bold transition-colors ${
              isActive("/products") ? "text-primary" : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC]"
            }`}
          >
            Products
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`font-sans text-base font-bold transition-colors ${
              isActive("/contact") ? "text-primary" : "text-[#565e74] dark:text-[#CBD5E1] hover:text-secondary dark:hover:text-[#F8FAFC]"
            }`}
          >
            Contact
          </Link>

          {/* Theme Toggle & CTA row */}
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-full border border-gray-200/85 dark:border-[#2B364D] bg-white dark:bg-[#161F33] text-secondary dark:text-[#F8FAFC] font-sans text-sm font-bold transition-all duration-200 cursor-pointer"
            >
              {theme === "light" ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.95 4.95l1.591 1.59M16.718 16.718l1.591 1.591M3 12h2.25m13.5 0H21M6.54 16.718l-1.59 1.591M18.309 4.95l-1.591 1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                  </svg>
                  <span>Light Mode</span>
                </>
              )}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 font-sans text-center text-sm font-bold bg-[#0f172a] dark:bg-[#F8FAFC] text-white dark:text-[#0b1c30] py-3 rounded-full hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-200"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
