"use client";

import { useEffect, useRef, useState } from "react";

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Manages open/close state for ProfileModal and HistoryModal together,
 * including scroll-lock logic so the page doesn't scroll behind open modals.
 */
export function useProfileModal() {
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollLockRef = useRef<number | null>(null);

  const anyOpen = showProfile || showHistory;

  // Scroll lock
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (anyOpen) {
      scrollLockRef.current =
        window.scrollY ?? window.pageYOffset ?? 0;
      const top = scrollLockRef.current;
      document.body.style.position = "fixed";
      document.body.style.top = `-${top}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const prev = scrollLockRef.current ?? 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, prev);
      scrollLockRef.current = null;
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [anyOpen]);

  return {
    showProfile,
    showHistory,
    openProfile: () => setShowProfile(true),
    closeProfile: () => setShowProfile(false),
    openHistory: () => setShowHistory(true),
    closeHistory: () => setShowHistory(false),
  };
}