// components/ui/NamePreloader.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NamePreloaderProps {
  nameWords: string[];        // list of words to animate
  durationPerWord?: number;    // milliseconds per word visible
  totalDuration?: number;      // total time before hiding preloader
}

export function NamePreloader({
  nameWords,
  durationPerWord = 800,
  totalDuration = 2500,
}: NamePreloaderProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) =>
        prev + 1 < nameWords.length ? prev + 1 : 0
      );
    }, durationPerWord);

    const totalTimer = setTimeout(() => {
      setShowPreloader(false);
    }, totalDuration);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(totalTimer);
    };
  }, [nameWords.length, durationPerWord, totalDuration]);

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          key="name-preloader"
          className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.h1
            key={nameWords[currentWordIndex]}
            className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {nameWords[currentWordIndex]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
