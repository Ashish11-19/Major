"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Calendar,
  BarChart2,
  FileVideo,
  FileImage,
  Mic,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { ConfidenceBar, StatPill } from "./ProfileShared";
import { HISTORY_ITEMS } from "./data";
import {
  HistoryItem,
  MediaType,
  ResultFilter,
  TypeFilter,
} from "./types";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const TYPE_ICON: Record<MediaType, JSX.Element> = {
  video: <FileVideo className="w-4 h-4" />,
  image: <FileImage className="w-4 h-4" />,
  audio: <Mic className="w-4 h-4" />,
};

const TYPE_COLOR: Record<MediaType, string> = {
  video: "bg-purple-500/10 text-purple-500",
  image: "bg-blue-500/10 text-blue-500",
  audio: "bg-amber-500/10 text-amber-500",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional: pass pre-seeded history items; defaults to static sample data */
  initialItems?: HistoryItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HistoryModal({
  open,
  onClose,
  initialItems = HISTORY_ITEMS,
}: HistoryModalProps) {
  const [filter, setFilter] = useState<ResultFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [items, setItems] = useState<HistoryItem[]>(initialItems);

  // Derived
  const filtered = items.filter((item) => {
    const resultMatch = filter === "all" || item.result === filter;
    const typeMatch = typeFilter === "all" || item.type === typeFilter;
    return resultMatch && typeMatch;
  });

  const fakeCount = items.filter((i) => i.result === "fake").length;
  const realCount = items.filter((i) => i.result === "real").length;

  const deleteItem = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          aria-modal="true"
          role="dialog"
          aria-label="Scan History"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 32, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] flex flex-col max-h-[90vh]"
          >
            {/* Accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 shrink-0" />

            {/* ── Header ── */}
            <div className="px-5 pt-5 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-black dark:text-white">
                    Scan History
                  </h2>
                  <p className="text-xs text-black/40 dark:text-white/30 mt-0.5">
                    All your deepfake detection sessions
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close history"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-black/60 dark:text-white/60" />
                </button>
              </div>

              {/* Summary pills */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <StatPill label="Total" value={items.length} />
                <StatPill label="Fake" value={fakeCount} />
                <StatPill label="Real" value={realCount} />
              </div>

              {/* Result filter */}
              <div className="flex gap-1.5 flex-wrap">
                {(["all", "fake", "real"] as ResultFilter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all capitalize ${
                      filter === f
                        ? f === "fake"
                          ? "bg-red-500 border-red-500 text-white"
                          : f === "real"
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-orange-500 border-orange-500 text-white"
                        : "border-black/10 dark:border-white/10 text-black/50 dark:text-white/40 hover:border-black/20 dark:hover:border-white/20"
                    }`}
                  >
                    {f}
                  </button>
                ))}

                <div className="w-px bg-black/10 dark:bg-white/10 mx-1" />

                {(["all", "video", "image", "audio"] as TypeFilter[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
                      typeFilter === t
                        ? "bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 text-black dark:text-white"
                        : "border-black/8 dark:border-white/8 text-black/40 dark:text-white/30 hover:border-black/15 dark:hover:border-white/15"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Item list ── */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-2.5 scrollbar-thin">
              <AnimatePresence initial={false}>
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-black/30 dark:text-white/20"
                  >
                    <BarChart2 className="w-8 h-8 mb-2" />
                    <p className="text-sm">No results match your filters</p>
                  </motion.div>
                ) : (
                  filtered.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="group rounded-xl border border-black/8 dark:border-white/8 bg-black/2 dark:bg-white/2 hover:bg-black/4 dark:hover:bg-white/4 p-4 transition-colors"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Type badge */}
                          <div
                            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${TYPE_COLOR[item.type]}`}
                          >
                            {TYPE_ICON[item.type]}
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-black dark:text-white truncate">
                              {item.file}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-black/40 dark:text-white/30">
                                {item.label}
                              </span>
                              <span className="text-[11px] text-black/20 dark:text-white/15">
                                ·
                              </span>
                              <span className="text-[11px] text-black/40 dark:text-white/30">
                                {item.size}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Result badge */}
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              item.result === "fake"
                                ? "bg-red-500/10 border-red-500/20 text-red-500"
                                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                            }`}
                          >
                            {item.result === "fake" ? (
                              <AlertTriangle className="w-2.5 h-2.5" />
                            ) : (
                              <CheckCircle2 className="w-2.5 h-2.5" />
                            )}
                            {item.result}
                          </span>

                          {/* Delete */}
                          <button
                            onClick={() => deleteItem(item.id)}
                            title="Remove entry"
                            className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-500/10 text-black/30 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Confidence bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-wider text-black/30 dark:text-white/25">
                            Confidence
                          </span>
                        </div>
                        <ConfidenceBar
                          value={item.confidence}
                          fake={item.result === "fake"}
                        />
                      </div>

                      {/* Date/time */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <Calendar className="w-3 h-3 text-black/25 dark:text-white/20" />
                        <span className="text-[11px] text-black/35 dark:text-white/25">
                          {item.date} at {item.time}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer ── */}
            <div className="px-5 pb-5 pt-2 shrink-0 border-t border-black/6 dark:border-white/6">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-500 active:scale-[0.98] transition-all"
              >
                Close History
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}