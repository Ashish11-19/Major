"use client";

import Link from "next/link";
import Image from "next/image";
import { TextReveal } from "@/components/magicui/text-reveal";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity";
import {
  TypingText,
  TypingTextCursor,
} from "@/components/animate-ui/primitives/texts/typing";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HyperText } from "@/components/magicui/hyper-text";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { NamePreloader } from "@/components/ui/NamePreloader";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import WrapButton from "@/components/ui/Wrap-button";
import { Globe } from "lucide-react";
import gsap from "gsap";

// ─── Profile feature – single import from the component folder ─────────────────
import {
  ProfileModal,
  HistoryModal,
  ViewProfileButton,
  useProfileModal,
  DEFAULT_USER_INFO,
} from "@/components/profile";

/* ─── Static data ──────────────────────────────────────────────────────────── */

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "Products",
    icon: (
      <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "About",
    icon: <img src="/favicon.ico" width={20} height={20} alt="App Logo" />,
    href: "/about",
  },
  {
    title: "Change Theme",
    icon: (
      <AnimatedThemeToggler className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Twitter",
    icon: (
      <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com",
  },
];

const features = [
  {
    icon: "🔍",
    title: "Real-Time Detection",
    description:
      "Our AI engine analyzes videos, audio, and images instantly, giving you results within seconds — no waiting, no delays.",
  },
  {
    icon: "🎥",
    title: "Works Across Media",
    description:
      "Detect manipulation in videos, images, and voice recordings — all from a single platform.",
  },
  {
    icon: "🖥️",
    title: "Simple & Accessible",
    description:
      "No technical expertise needed. Upload a file or paste a link, and let our system do the rest.",
  },
  {
    icon: "📊",
    title: "Confidence Scoring",
    description:
      "Instead of just a 'real or fake' label, we provide a trust score so you know how likely the media is manipulated.",
  },
  {
    icon: "🔐",
    title: "Privacy First",
    description:
      "Your uploads are processed securely. We don't store or share your files — your data stays yours.",
  },
  {
    icon: "🌍",
    title: "Cross-Platform Support",
    description:
      "Use it on web or mobile, anytime, anywhere. Perfect for journalists, students, and everyday users.",
  },
  {
    icon: "⚡",
    title: "Lightweight & Fast",
    description:
      "Optimized for speed, our system runs efficiently without requiring heavy downloads or setups.",
  },
];

const people = [
  {
    id: 1,
    name: "Ashish Pathak",
    designation: "Frontend Developer",
    image: "/Ashish.jpg",
  },
  {
    id: 2,
    name: "Abhay Sharma",
    designation: "Backend Developer",
    image: "/abhay.jpg",
  },
  {
    id: 3,
    name: "Abhinav Birla",
    designation: "CyberSecurity Engineer",
    image: "/Abhinav.jpg",
  },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function Home(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -150]);

  const loginRef = useRef<HTMLAnchorElement | null>(null);
  const signupRef = useRef<HTMLAnchorElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // ── Profile modal state (scroll-lock included) ──────────────────────────────
  const {
    showProfile,
    showHistory,
    openProfile,
    closeProfile,
    openHistory,
    closeHistory,
  } = useProfileModal();

  // Preloader timeout
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  // Page fade-in after preloader
  useEffect(() => {
    if (!isLoading && pageContentRef.current) {
      gsap.fromTo(
        pageContentRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  // GSAP hover helpers for login / signup links
  const hoverGrow = (el: Element | null) =>
    gsap.to(el, {
      scale: 1.05,
      duration: 0.18,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    });
  const hoverShrink = (el: Element | null) =>
    gsap.to(el, { scale: 1, duration: 0.18, boxShadow: "none" });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      [loginRef, signupRef, pageContentRef].forEach((r) => {
        if (r.current) gsap.set(r.current, { clearProps: "all" });
      });
    };
  }, []);

  return (
    <>
      <NamePreloader
        nameWords={[
          "Detection",
          "Security",
          "Valuablility",
          "Information",
          "Data",
          "Identity",
          "PersonaShield",
        ]}
        durationPerWord={250}
        totalDuration={2500}
        // @ts-ignore
        onFinish={() => setIsLoading(false)}
      />

      <SmoothCursor />

      {/* Floating dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-6xl">
          <FloatingDock mobileClassName="translate-y-20" items={links} />
        </div>
      </div>

      {/* ── View Profile button (top-left) ─────────────────────────────────── */}
      <div className="fixed top-5 left-5 z-50">
        <ViewProfileButton onClick={openProfile} />
      </div>

      {/* ── Login / Sign Up (top-right) ────────────────────────────────────── */}
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
          className="px-3 py-2 rounded-md bg-orange-600 text-white dark:bg-orange-600 dark:text-black text-sm font-semibold hover:opacity-95 transform transition"
        >
          Sign Up
        </a>
      </div>

      {/* ── Page content ───────────────────────────────────────────────────── */}
      {!isLoading ? (
        <div ref={pageContentRef} className="page-content">
          {/* HERO */}
          <div
            ref={ref}
            className="relative flex min-h-[80vh] w-full flex-col items-start justify-start overflow-hidden"
          >
            <BackgroundRippleEffect />
            <motion.div style={{ y }} className="mt-60 w-full text-center">
              <h2 className="relative z-10 mx-auto max-w-4xl text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
                PersonaShield
              </h2>
              <TypingText
                className="relative z-10 mx-auto mt-2 max-w-2xl text-neutral-800 dark:text-neutral-500"
                text="Deepfake & Impersonation attack Detection Platform"
              />
              <WrapButton
                href="/start"
                className="mt-8 relative z-10 block mx-auto flex flex-row items-center justify-center mb-10"
              >
                <Globe className="animate-spin" />
                Get Started
              </WrapButton>
            </motion.div>
          </div>

          {/* INTRODUCTION */}
          <div className="w-full text-center mt-0 px-6">
            <HyperText>INTRODUCTION</HyperText>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mx-auto mt-6 max-w-3xl text-lg text-neutral-700 dark:text-neutral-400"
            >
              Deepfakes are reshaping the digital world—blurring the line
              between real and fake. From scams and political misinformation to
              online blackmail, manipulated media is a growing threat. Our
              platform empowers you to stay safe by detecting fake videos,
              audio, and images in real time. With a simple, user-friendly
              interface and AI-powered accuracy, we make deepfake detection
              accessible to everyone.
            </motion.p>
          </div>

          {/* Animated divider */}
          <ScrollVelocityContainer className="text-4xl md:text-7xl font-bold mt-8 px-6">
            <ScrollVelocityRow baseVelocity={20} direction={1}>
              Shield Persona
            </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={20} direction={-1}>
              Shield Persona
            </ScrollVelocityRow>
          </ScrollVelocityContainer>

          {/* FEATURES */}
          <section className="relative z-20 max-w-6xl mx-auto px-6 py-20">
            <HyperText className="w-full text-center text-5xl">
              FEATURES
            </HyperText>
            <p className="text-center mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
              Explore what makes PersonaShield the most powerful deepfake
              detection platform.
            </p>
            <motion.div
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                    transition: { duration: 0.3 },
                  }}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm cursor-pointer"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* DEVELOPERS */}
          <div>
            <HyperText className="w-full text-center mt-0 px-6 text-5xl md:text-6xl">
              DEVELOPERS
            </HyperText>
            <div className="flex flex-row items-center justify-center mt-2 mb-30 w-full scale-100">
              <AnimatedTooltip items={people} />
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Profile Modal ──────────────────────────────────────────────────── */}
      <ProfileModal
        open={showProfile}
        onClose={closeProfile}
        onOpenHistory={openHistory}
        userInfo={DEFAULT_USER_INFO}
      />

      {/* ── History Modal ──────────────────────────────────────────────────── */}
      <HistoryModal open={showHistory} onClose={closeHistory} />
    </>
  );
}