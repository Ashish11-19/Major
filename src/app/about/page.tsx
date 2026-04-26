"use client";

import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { SparklesCore } from "@/components/ui/sparkles";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  ProfileModal,
  HistoryModal,
  ViewProfileButton,
  useProfileModal,
  DEFAULT_USER_INFO,
} from "@/components/profile";
import gsap from "gsap";
import {
  Shield,
  Zap,
  Eye,
  Lock,
  Globe,
  Target,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

/* ─── Static data ─────────────────────────────────────────────────────────── */

const pillars = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Real-Time Detection",
    desc: "Millisecond-grade analysis pipeline that catches manipulations the moment media is uploaded — no queuing, no delays.",
    accent: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
    iconBg: "bg-orange-500/10 text-orange-400",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Multi-Modal Coverage",
    desc: "One engine for video, image, audio, and text. Every vector of impersonation attack — covered by a single platform.",
    accent: "from-sky-500/20 to-blue-500/10",
    border: "border-sky-500/20",
    iconBg: "bg-sky-500/10 text-sky-400",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Privacy by Design",
    desc: "Zero data retention. Your files are analyzed in-memory and discarded immediately. We see nothing. We store nothing.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Confidence Scoring",
    desc: "Binary verdicts are worthless. We surface calibrated probability scores so you always know *how sure* the model is.",
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/10 text-violet-400",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Accessible Everywhere",
    desc: "Web-first, mobile-ready. Built for journalists, researchers, everyday users — no technical background required.",
    accent: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/10 text-rose-400",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Continuously Trained",
    desc: "Our models are retrained weekly on new deepfake techniques. As adversaries evolve, so does PersonaShield.",
    accent: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/10 text-amber-400",
  },
];

const stats = [
  { value: "99.2%", label: "Detection Accuracy" },
  { value: "<2s", label: "Avg. Analysis Time" },
  { value: "3+", label: "Media Types Supported" },
  { value: "0", label: "Files Stored" },
];

const team = [
  {
    name: "Ashish Pathak",
    role: "Frontend Engineer",
    image: "/Ashish.jpg",
    bio: "Crafts the interfaces that make complex AI feel approachable. Obsessed with motion, micro-interactions, and pixel-perfect detail.",
    links: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Abhay Sharma",
    role: "Backend Engineer",
    image: "/abhay.jpg",
    bio: "Architects the detection pipeline and API infrastructure that processes media at scale without breaking a sweat.",
    links: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Abhinav Birla",
    role: "Cybersecurity Engineer",
    image: "/Abhinav.jpg",
    bio: "Keeps the platform honest — red-teaming our own models, hardening the stack, and staying three steps ahead of adversarial attacks.",
    links: { github: "#", twitter: "#", linkedin: "#" },
  },
];

const timeline = [
  {
    year: "2024 Q1",
    title: "Idea & Research",
    desc: "Three CS students noticed a gap — no accessible deepfake detector for non-technical users. Research began.",
  },
  {
    year: "2024 Q2",
    title: "First Prototype",
    desc: "A rough video-only classifier trained on public datasets. 78% accuracy. Promising enough to keep going.",
  },
  {
    year: "2024 Q3",
    title: "Multi-Modal Engine",
    desc: "Extended coverage to images and audio. Rebuilt the backend from scratch for sub-2-second latency.",
  },
  {
    year: "2024 Q4",
    title: "Beta Launch",
    desc: "Opened access to 500 beta users. Gathered real-world feedback. Accuracy climbed to 97.4%.",
  },
  {
    year: "2025",
    title: "PersonaShield v1",
    desc: "Full public launch. Text analysis added. Confidence scoring introduced. The fight against deepfakes, democratised.",
  },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
      <span className="w-1 h-1 rounded-full bg-orange-400" />
      {children}
    </div>
  );
}

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  return (
    <FadeUp delay={index * 0.12}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/80 transition-all duration-500" />
        <div className="p-6">
          <div className="relative w-16 h-16 mb-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-orange-500/40 transition-all duration-300 bg-neutral-800">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=ea580c&color=fff&size=128`;
                }}
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-black" />
          </div>
          <h3 className="text-base font-bold text-white">{member.name}</h3>
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mt-0.5 mb-3">
            {member.role}
          </p>
          <p className="text-sm text-white/50 leading-relaxed">{member.bio}</p>
          <div className="flex items-center gap-3 mt-5">
            {[
              { icon: <Github className="w-3.5 h-3.5" />, href: member.links.github },
              { icon: <Twitter className="w-3.5 h-3.5" />, href: member.links.twitter },
              { icon: <Linkedin className="w-3.5 h-3.5" />, href: member.links.linkedin },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-white/8 text-white/40 hover:text-orange-400 hover:border-orange-500/30 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function About() {
  const { showProfile, showHistory, openProfile, closeProfile, openHistory, closeHistory } =
    useProfileModal();

  return (
    <>
      <SmoothCursor />

      {/* ── View Profile (top-left) ── */}
      <div className="fixed top-5 left-5 z-50">
        <ViewProfileButton onClick={openProfile} />
      </div>

      {/* ── Theme toggle only — bottom-right corner ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-black/70 backdrop-blur-md shadow-xl hover:border-orange-500/40 hover:bg-black/90 transition-all duration-200 cursor-pointer">
          <AnimatedThemeToggler className="w-5 h-5 text-neutral-400" />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <div className="h-[35rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 text-center px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Shield className="w-3 h-3" /> About PersonaShield
          </div>
          <h1 className="md:text-7xl text-4xl lg:text-8xl font-bold text-white leading-none tracking-tight">
            PersonaShield
          </h1>
          <p className="mt-4 text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            A deepfake & impersonation detection platform built by three students who believed truth deserved a defender.
          </p>
        </motion.div>

        {/* Sparkles */}
        <div className="w-[40rem] h-40 relative mt-4">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="bg-black text-white pb-24">

        {/* MISSION */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mt-2">
                Truth is worth<br />
                <span className="text-orange-400">fighting for.</span>
              </h2>
              <p className="mt-6 text-white/55 leading-relaxed">
                Synthetic media is the fastest-growing vector for misinformation, fraud, and identity abuse. A manipulated video of a politician, a cloned voice on a scam call, a doctored photo in a court case — these are no longer hypotheticals.
              </p>
              <p className="mt-4 text-white/55 leading-relaxed">
                PersonaShield was built to put the power of detection in everyone's hands. No subscription tiers that gate accuracy. No black-box verdicts. Just honest, fast, accessible analysis — for free.
              </p>
              <div className="mt-8 flex items-center gap-2 text-orange-400 text-sm font-semibold">
                <span>Start detecting now</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col gap-1"
                  >
                    <span className="text-3xl font-bold text-orange-400">{s.value}</span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-white/6 bg-white/[0.02] py-24">
          <div className="max-w-5xl mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <SectionLabel>How It Works</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Three steps. Zero friction.
              </h2>
            </FadeUp>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Upload or Paste", desc: "Drop a video, image, audio file, or paste text directly into the detection engine.", icon: "⬆️" },
                { step: "02", title: "AI Analysis", desc: "Our multi-modal model inspects frequency artifacts, temporal inconsistencies, and semantic anomalies.", icon: "🔬" },
                { step: "03", title: "Confidence Score", desc: "Get a calibrated verdict with a probability score — not just 'real' or 'fake', but how sure we are.", icon: "📊" },
              ].map((step, i) => (
                <FadeUp key={step.step} delay={i * 0.1}>
                  <div className="relative rounded-2xl border border-white/8 bg-white/3 p-6 h-full">
                    <div className="absolute -top-3 left-5 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold tracking-widest">
                      {step.step}
                    </div>
                    <div className="text-3xl mt-3 mb-4">{step.icon}</div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <FadeUp className="text-center mb-14">
            <SectionLabel>What Sets Us Apart</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Built different,<br />
              <span className="text-orange-400">by design.</span>
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl border ${p.border} bg-gradient-to-br ${p.accent} p-6 h-full`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${p.iconBg} mb-4`}>
                    {p.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{p.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="border-y border-white/6 bg-white/[0.02] py-24">
          <div className="max-w-3xl mx-auto px-6">
            <FadeUp className="text-center mb-14">
              <SectionLabel>Our Journey</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                From idea to platform.
              </h2>
            </FadeUp>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />
              <div className="space-y-10 pl-8">
                {timeline.map((item, i) => (
                  <FadeUp key={item.year} delay={i * 0.1}>
                    <div className="relative">
                      <div className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-orange-500 bg-black" />
                      <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">{item.year}</span>
                      <h3 className="text-base font-bold text-white mt-1 mb-1.5">{item.title}</h3>
                      <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <FadeUp className="text-center mb-14">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Three builders.<br />
              <span className="text-orange-400">One mission.</span>
            </h2>
            <p className="mt-4 text-white/45 max-w-lg mx-auto text-sm leading-relaxed">
              We're computer science students who got fed up watching deepfakes spread unchallenged. So we built something about it.
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 pb-8">
          <FadeUp>
            <div className="relative rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent overflow-hidden p-10 sm:p-14 text-center">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <Shield className="w-10 h-10 text-orange-400 mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Ready to detect the truth?
                </h2>
                <p className="mt-3 text-white/45 text-sm max-w-md mx-auto">
                  It's free. It's fast. It works. Upload your first file and see PersonaShield in action.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="/start"
                    className="px-6 py-3 rounded-xl bg-orange-600 text-white text-sm font-bold hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/20"
                  >
                    Start Detecting →
                  </a>
                  <a
                    href="/"
                    className="px-6 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:border-white/20 transition-colors"
                  >
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>
      </div>

      {/* ── Modals ── */}
      <ProfileModal
        open={showProfile}
        onClose={closeProfile}
        onOpenHistory={openHistory}
        userInfo={DEFAULT_USER_INFO}
      />
      <HistoryModal open={showHistory} onClose={closeHistory} />
    </>
  );
}