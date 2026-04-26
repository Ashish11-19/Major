"use client";

import { motion } from "framer-motion";

// ─── ConfidenceBar ────────────────────────────────────────────────────────────

interface ConfidenceBarProps {
  value: number;
  fake: boolean;
}

export function ConfidenceBar({ value, fake }: ConfidenceBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${fake ? "bg-red-500" : "bg-emerald-500"}`}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-black/60 dark:text-white/60 w-8 text-right">
        {value}%
      </span>
    </div>
  );
}

// ─── StatPill ─────────────────────────────────────────────────────────────────

interface StatPillProps {
  label: string;
  value: string | number;
}

export function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8">
      <span className="text-lg font-bold text-black dark:text-white">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 mt-0.5">
        {label}
      </span>
    </div>
  );
}