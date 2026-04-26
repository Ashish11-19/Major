"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Shield,
  Scan,
  FileVideo,
  FileImage,
  Mic,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Type,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// ─── Profile feature ───────────────────────────────────────────────────────────
import {
  ProfileModal,
  HistoryModal,
  ViewProfileButton,
  useProfileModal,
  DEFAULT_USER_INFO,
} from "@/components/profile";

/* ─────────────────────────────────────
   Floating Dock links
───────────────────────────────────── */
const links = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-neutral-700 dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "Products",
    icon: <IconTerminal2 className="h-full w-full text-neutral-700 dark:text-neutral-300" />,
    href: "#",
  },
  {
    title: "About",
    icon: <img src="/favicon.ico" width={20} height={20} alt="App Logo" />,
    href: "/about",
  },
  {
    title: "Change Theme",
    icon: <AnimatedThemeToggler className="h-full w-full text-neutral-700 dark:text-neutral-300" />,
    href: "#",
  },
  {
    title: "Twitter",
    icon: <IconBrandX className="h-full w-full text-neutral-700 dark:text-neutral-300" />,
    href: "#",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-full w-full text-neutral-700 dark:text-neutral-300" />,
    href: "https://github.com",
  },
];

/* ─────────────────────────────────────
   Stars Background (GSAP, unchanged)
───────────────────────────────────── */
const STAR_COUNT = 180;

function StarsBackground() {
  const starsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const stars = starsRef.current.filter(Boolean);
    if (!stars.length) return;

    const twinkle = gsap.to(stars, {
      opacity: () => gsap.utils.random(0.15, 1),
      duration: () => gsap.utils.random(1.5, 3.5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { amount: 4, from: "random" },
    });

    const floatAnim = gsap.to(stars, {
      x: () => gsap.utils.random(-4, 4),
      y: () => gsap.utils.random(-4, 4),
      duration: () => gsap.utils.random(6, 10),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { amount: 6, from: "random" },
    });

    return () => {
      twinkle.kill();
      floatAnim.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-white dark:bg-black transition-colors duration-700">
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        return (
          <div
            key={i}
            ref={(el) => {
              if (el) starsRef.current[i] = el;
            }}
            className="absolute rounded-full bg-black dark:bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 dark:via-white/5 dark:to-white/5" />
    </div>
  );
}

/* ─────────────────────────────────────
   Result Badge
───────────────────────────────────── */
function ResultBadge({
  result,
  confidence,
}: {
  result: "fake" | "real" | null;
  confidence: number;
}) {
  if (!result) return null;
  const isFake = result === "fake";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex flex-col items-center gap-3 rounded-2xl border p-5 ${
        isFake
          ? "bg-red-500/5 border-red-500/20"
          : "bg-emerald-500/5 border-emerald-500/20"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isFake ? "bg-red-500/10" : "bg-emerald-500/10"
        }`}
      >
        {isFake ? (
          <AlertTriangle className="w-6 h-6 text-red-500" />
        ) : (
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        )}
      </div>
      <div className="text-center">
        <p
          className={`text-lg font-bold ${
            isFake ? "text-red-500" : "text-emerald-500"
          }`}
        >
          {isFake ? "Likely Deepfake" : "Likely Authentic"}
        </p>
        <p className="text-sm text-black/50 dark:text-white/40 mt-0.5">
          {confidence}% confidence
        </p>
      </div>
      {/* Confidence bar */}
      <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full ${isFake ? "bg-red-500" : "bg-emerald-500"}`}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   Main Page
───────────────────────────────────── */
export default function StartPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<"file" | "text">("file");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    result: "fake" | "real";
    confidence: number;
  } | null>(null);

  const loginRef = useRef<HTMLAnchorElement | null>(null);
  const signupRef = useRef<HTMLAnchorElement | null>(null);

  // ── Profile modal state (scroll-lock included) ────────────────────────────
  const {
    showProfile,
    showHistory,
    openProfile,
    closeProfile,
    openHistory,
    closeHistory,
  } = useProfileModal();

  /* GSAP hover helpers */
  const hoverGrow = (el: Element | null) =>
    gsap.to(el, {
      scale: 1.05,
      duration: 0.18,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    });
  const hoverShrink = (el: Element | null) =>
    gsap.to(el, { scale: 1, duration: 0.18, boxShadow: "none" });

  const handleFileUpload = (f: File[]) => {
    setFiles(f);
    setResult(null);
  };

  const handleAnalyze = () => {
    if (
      (activeTab === "file" && !files.length) ||
      (activeTab === "text" && !text.trim())
    )
      return;
    setIsAnalyzing(true);
    setResult(null);
    // Simulate AI analysis
    setTimeout(() => {
      const isFake = Math.random() > 0.5;
      setResult({
        result: isFake ? "fake" : "real",
        confidence: Math.floor(Math.random() * 20 + 78),
      });
      setIsAnalyzing(false);
    }, 2200);
  };

  const canAnalyze =
    (activeTab === "file" && files.length > 0) ||
    (activeTab === "text" && text.trim().length > 0);

  const fileTypeHint = files[0]
    ? files[0].type.startsWith("video")
      ? { icon: <FileVideo className="w-3.5 h-3.5" />, label: "Video" }
      : files[0].type.startsWith("image")
      ? { icon: <FileImage className="w-3.5 h-3.5" />, label: "Image" }
      : files[0].type.startsWith("audio")
      ? { icon: <Mic className="w-3.5 h-3.5" />, label: "Audio" }
      : null
    : null;

  return (
    <>
      <SmoothCursor />
      <StarsBackground />

      {/* ── Top-left: View Profile button ── */}
      <div className="fixed top-5 left-5 z-50">
        <ViewProfileButton onClick={openProfile} />
      </div>

      {/* ── Top-right: Login / Sign Up ── */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-3">
        <a
          ref={loginRef}
          href="/signupandlogin"
          onMouseEnter={() => hoverGrow(loginRef.current)}
          onMouseLeave={() => hoverShrink(loginRef.current)}
          className="px-3 py-2 rounded-md bg-transparent border border-black/10 dark:border-white/10 text-sm text-black dark:text-white hover:opacity-90 transform transition"
        >
          Login
        </a>
        <a
          ref={signupRef}
          href="/signupandlogin"
          onMouseEnter={() => hoverGrow(signupRef.current)}
          onMouseLeave={() => hoverShrink(signupRef.current)}
          className="px-3 py-2 rounded-md bg-orange-600 text-white text-sm font-semibold hover:opacity-95 transform transition"
        >
          Sign Up
        </a>
      </div>

      {/* ── Main content ── */}
      <main className="relative min-h-screen px-4 sm:px-6 pt-24 pb-36 text-black dark:text-white">
        <div className="max-w-3xl mx-auto">
          {/* ── Hero text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/8 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-4">
              <Shield className="w-3 h-3" />
              PersonaShield — Detection Engine
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
              Detect Deepfakes &<br className="hidden sm:block" /> Impersonation
            </h1>
            <p className="mt-3 text-sm sm:text-base text-black/50 dark:text-white/40 max-w-xl mx-auto leading-relaxed">
              Upload a video, image, or audio file — or paste text — to
              instantly check for AI-generated manipulation.
            </p>
          </motion.div>

          {/* ── Detection card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/3 backdrop-blur-xl shadow-xl overflow-hidden"
          >
            {/* Orange accent bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400" />

            {/* Tab switcher */}
            <div className="flex border-b border-black/6 dark:border-white/6 px-5 pt-4">
              {(
                [
                  {
                    id: "file",
                    label: "Upload File",
                    icon: <Upload className="w-3.5 h-3.5" />,
                  },
                  {
                    id: "text",
                    label: "Check Text",
                    icon: <Type className="w-3.5 h-3.5" />,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setResult(null);
                  }}
                  className={`relative flex items-center gap-1.5 pb-3 mr-6 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? "text-orange-500"
                      : "text-black/35 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="start-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab body */}
            <div className="p-5 space-y-5">
              <AnimatePresence mode="wait">
                {activeTab === "file" ? (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* File Upload zone */}
                    <div className="rounded-xl border border-dashed border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/2 overflow-hidden transition-colors hover:border-orange-500/40">
                      <FileUpload onChange={handleFileUpload} />
                    </div>

                    {/* File list */}
                    <AnimatePresence>
                      {files.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-xl border border-black/6 dark:border-white/6 divide-y divide-black/4 dark:divide-white/4">
                            {files.map((f) => (
                              <div
                                key={f.name}
                                className="flex items-center gap-3 px-4 py-2.5"
                              >
                                {fileTypeHint && (
                                  <span className="text-orange-500">
                                    {fileTypeHint.icon}
                                  </span>
                                )}
                                <span className="flex-1 text-sm text-black/70 dark:text-white/60 truncate">
                                  {f.name}
                                </span>
                                <span className="text-xs text-black/30 dark:text-white/25 shrink-0">
                                  {(f.size / 1024 / 1024).toFixed(1)} MB
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        setResult(null);
                      }}
                      placeholder="Paste or type content to check for AI generation or impersonation..."
                      rows={6}
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/3 px-4 py-3 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/25 focus:outline-none focus:border-orange-500/50 resize-none transition-colors leading-relaxed"
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-[11px] text-black/25 dark:text-white/20">
                        {text.length} characters
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result display */}
              <AnimatePresence>
                {result && (
                  <ResultBadge
                    result={result.result}
                    confidence={result.confidence}
                  />
                )}
              </AnimatePresence>

              {/* Analyze button */}
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || isAnalyzing}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  canAnalyze && !isAnalyzing
                    ? "bg-orange-600 text-white hover:bg-orange-500 active:scale-[0.98] shadow-md shadow-orange-500/20"
                    : "bg-black/5 dark:bg-white/5 text-black/30 dark:text-white/25 cursor-not-allowed"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4" />
                    Run Detection
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ── Feature hint pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {[
              { icon: <FileVideo className="w-3 h-3" />, label: "Video" },
              { icon: <FileImage className="w-3 h-3" />, label: "Image" },
              { icon: <Mic className="w-3 h-3" />, label: "Audio" },
              { icon: <Type className="w-3 h-3" />, label: "Text" },
              { icon: <Sparkles className="w-3 h-3" />, label: "AI-Powered" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/8 dark:border-white/8 bg-black/3 dark:bg-white/3 text-xs text-black/50 dark:text-white/40"
              >
                {icon} {label}
              </span>
            ))}
          </motion.div>
        </div>
      </main>

      {/* ── Floating Dock ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-6xl">
          <FloatingDock mobileClassName="translate-y-20" items={links} />
        </div>
      </div>

      {/* ── Profile Modal ── */}
      <ProfileModal
        open={showProfile}
        onClose={closeProfile}
        onOpenHistory={openHistory}
        userInfo={DEFAULT_USER_INFO}
      />

      {/* ── History Modal ── */}
      <HistoryModal open={showHistory} onClose={closeHistory} />
    </>
  );
}