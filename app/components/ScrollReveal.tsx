"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Accessibility Check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Instantly reveal everything
      document.querySelectorAll(
        ".reveal-section, .reveal-element, .reveal-heading, .reveal-paragraph, .reveal-button, .reveal-card, .reveal-image"
      ).forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    // 2. Set dynamic staggers for card lists
    const staggerContainers = document.querySelectorAll(".stagger-cards-container");
    staggerContainers.forEach((container) => {
      const cards = container.querySelectorAll(".reveal-card");
      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        // Apply staggering transition delays (between 80ms and 120ms; we'll use 100ms)
        htmlCard.style.transitionDelay = `${index * 100}ms`;
      });
    });

    // 3. Scroll-Triggered Reveal Animations using IntersectionObserver
    // We observe sections and elements independently
    const revealTargets = document.querySelectorAll(
      ".reveal-section, .reveal-element, .reveal-heading, .reveal-paragraph, .reveal-button, .reveal-card, .reveal-image"
    );

    const observerOptions = {
      // Trigger when approximately 15% of the element enters the viewport
      threshold: 0.15,
      rootMargin: "0px 0px -5% 0px", // Trigger slightly before hitting exact bounds
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        } else {
          entry.target.classList.remove("revealed");
        }
      });
    }, observerOptions);

    revealTargets.forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
