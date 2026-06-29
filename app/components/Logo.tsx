import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-[50px] md:h-[60px] scale-[1.8] md:scale-[2.2] origin-left -ml-2" }: LogoProps) {
  return (
    <div className="flex items-center select-none relative group">
      {/* Light Mode Logo */}
      <img
        src="/Registered symbol  image.png"
        alt="FINNOVO Logo"
        className={`object-contain dark:hidden block mix-blend-multiply ${className}`}
      />
      {/* Dark Mode Logo */}
      <img
        src="/darkmode6.png"
        alt="FINNOVO Logo"
        className={`object-contain hidden dark:block mix-blend-screen contrast-200 ${className}`}
      />
    </div>
  );
}

