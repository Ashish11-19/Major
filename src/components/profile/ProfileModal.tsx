"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Mail,
  ExternalLink,
  Shield,
  Clock,
} from "lucide-react";
import gsap from "gsap";
import { StatPill } from "./ProfileShared";
import { UserInfo, ProfileTab } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onOpenHistory: () => void;
  userInfo: UserInfo;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileModal({
  open,
  onClose,
  onOpenHistory,
  userInfo,
}: ProfileModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  // GSAP entrance animation
  useEffect(() => {
    if (open && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 32, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.38, ease: "power3.out" }
      );
    }
  }, [open]);

  // Reset tab whenever modal opens
  useEffect(() => {
    if (open) setActiveTab("overview");
  }, [open]);

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
          aria-label="User Profile"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <div
            ref={contentRef}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a]"
          >
            {/* Orange accent top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400" />

            {/* ── Header ── */}
            <div className="relative px-5 pt-5 pb-4">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close profile"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-black/60 dark:text-white/60" />
              </button>

              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-orange-500/30 bg-neutral-200 dark:bg-neutral-800">
                    <img
                      src={userInfo.profileImage}
                      alt={userInfo.name}
                      className="w-full h-full object-cover grayscale"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          userInfo.name
                        )}&background=ea580c&color=fff&size=128`;
                      }}
                    />
                  </div>
                  {/* Online dot */}
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#0a0a0a]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-black dark:text-white truncate">
                      {userInfo.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-semibold uppercase tracking-wider">
                      <Shield className="w-2.5 h-2.5" /> Pro
                    </span>
                  </div>
                  <p className="text-xs text-black/50 dark:text-white/40 mt-0.5">
                    {userInfo.handle}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-black/40 dark:text-white/30">
                    <MapPin className="w-3 h-3" />
                    <span>{userInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <StatPill label="Followers" value={userInfo.followers.toLocaleString()} />
                <StatPill label="Following" value={userInfo.following} />
                <StatPill label="Scans" value="47" />
              </div>
            </div>

            {/* ── Tab nav ── */}
            <div className="flex border-b border-black/8 dark:border-white/8 px-5">
              {(["overview", "details"] as ProfileTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 mr-6 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab
                      ? "text-orange-500"
                      : "text-black/40 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="profile-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── Tab content ── */}
            <div className="px-5 py-4 space-y-3 max-h-[40vh] overflow-y-auto scrollbar-thin">
              <AnimatePresence mode="wait">
                {activeTab === "overview" ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3"
                  >
                    {/* Bio */}
                    <div className="rounded-xl bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/30 mb-2">
                        Bio
                      </p>
                      <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed">
                        {userInfo.bio}
                      </p>
                    </div>

                    {/* Contact */}
                    <div className="rounded-xl bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 p-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/30 mb-2">
                        Contact
                      </p>
                      <a
                        href={`mailto:${userInfo.email}`}
                        className="flex items-center gap-2 text-sm text-black/60 dark:text-white/50 hover:text-orange-500 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        {userInfo.email}
                      </a>
                      <a
                        href={userInfo.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-black/60 dark:text-white/50 hover:text-orange-500 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        {userInfo.website}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-xl bg-black/3 dark:bg-white/3 border border-black/6 dark:border-white/6 divide-y divide-black/6 dark:divide-white/6"
                  >
                    {userInfo.additionalDetails.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-xs text-black/40 dark:text-white/30 uppercase tracking-wider">
                          {d.label}
                        </span>
                        <span className="text-sm font-medium text-black dark:text-white">
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer ── */}
            <div className="px-5 pb-5 pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenHistory();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-medium text-black/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <Clock className="w-4 h-4" />
                View History
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-500 active:scale-[0.98] transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}