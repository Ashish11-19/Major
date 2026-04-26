"use client";

import { useRef } from "react";
import gsap from "gsap";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ViewProfileButtonProps {
  onClick: () => void;
  /** Additional Tailwind classes for positioning */
  className?: string;
  label?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ViewProfileButton({
  onClick,
  className = "",
  label = "View Profile",
}: ViewProfileButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () =>
    gsap.to(btnRef.current, {
      scale: 1.05,
      duration: 0.18,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    });

  const handleMouseLeave = () =>
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.18,
      boxShadow: "none",
    });

  const handleClick = () => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }
      );
    }
    onClick();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={label}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold px-3 py-2 text-sm tracking-wide select-none bg-orange-600 text-white shadow-lg transition-all duration-200 transform ${className}`}
    >
      {/* User icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.6"
        stroke="white"
        className="w-4 h-4 mr-2"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
        />
      </svg>
      {label}
    </button>
  );
}