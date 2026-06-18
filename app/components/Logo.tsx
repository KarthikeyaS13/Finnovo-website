import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <div className="flex items-center select-none">
      {/* Light Mode Logo */}
      <img
        src="/Website header [Horizontal layout] - [250x150] pixels.png"
        alt="FINNOVO Logo"
        className={`object-contain dark:hidden block ${className}`}
      />
      {/* Dark Mode Logo */}
      <img
        src="/Website header [Horizontal layout] - [250x150] pixels dark.png"
        alt="FINNOVO Logo"
        className={`object-contain hidden dark:block ${className}`}
      />
    </div>
  );
}

