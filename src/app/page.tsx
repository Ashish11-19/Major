"use client";
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
  IconExchange,
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
import { useRef } from "react";
import { NamePreloader } from "@/components/ui/NamePreloader";
import { AnimatePresence } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { link } from "fs";
import WrapButton from "@/components/ui/Wrap-button";
import { Globe } from "lucide-react";

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
    icon: (
      <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/about",
  },
  {
    title: "Aceternity UI",
    icon: (
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
      />
    ),
    href: "#",
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
    href: "Github.com",
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
      "Instead of just a “real or fake” label, we provide a trust score so you know how likely the media is manipulated.",
  },
  {
    icon: "🔐",
    title: "Privacy First",
    description:
      "Your uploads are processed securely. We don’t store or share your files — your data stays yours.",
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

export default function Home() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -150]); // moves up when scrolling

  return (
    <>
      {/* Preloader */}
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
        durationPerWord={250} // speed up cycle
        totalDuration={2500} // total time before hiding preloader
      />
      <SmoothCursor />
      {/* HERO Section with parallax */}
      <div
        ref={ref}
        className="relative flex min-h-[80vh] w-full flex-col items-start justify-start overflow-hidden"
      >
        <BackgroundRippleEffect />
        <motion.div style={{ y }} className="mt-60 w-full text-center">
          <div className="fixed top-5 right-5 z-50">
  <a href="/signupandlogin">
    <button
      type="button"
      className="relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold px-4 py-2 text-sm tracking-wide select-none bg-orange-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.05] active:scale-95"
    >
      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/40 to-transparent opacity-50 blur-md -translate-x-3 skew-x-6"></span>

      <span className="absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(circle,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0)_70%)] opacity-40 blur-xl"></span>

      <span className="relative z-10 mr-2 text-base drop-shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
          stroke="white"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
        </svg>
      </span>

      <span className="relative z-10 drop-shadow-sm font-bold">Login</span>

      <span className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500">
        <span className="block w-[40px] h-[200%] bg-white/40 skew-x-[-30deg] translate-x-[-30px] animate-sweep blur-md"></span>
      </span>
    </button>
  </a>
</div>


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

      {/* INTRODUCTION Section */}
      <div className="w-full text-center mt-0 px-6">
        <HyperText>INTRODUCTION</HyperText>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-3xl text-lg text-neutral-700 dark:text-neutral-400"
        >
          Deepfakes are reshaping the digital world—blurring the line between
          real and fake. From scams and political misinformation to online
          blackmail, manipulated media is a growing threat. Our platform
          empowers you to stay safe by detecting fake videos, audio, and images
          in real time. With a simple, user-friendly interface and AI-powered
          accuracy, we make deepfake detection accessible to everyone.
        </motion.p>
      </div>

      {/* Animated divider text */}
      <ScrollVelocityContainer className="text-4xl md:text-7xl font-bold mt-8 px-6">
        <ScrollVelocityRow baseVelocity={20} direction={1}>
          Shield Persona
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={20} direction={-1}>
          Shield Persona
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* FEATURES Section */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 py-20">
        <HyperText className="w-full text-center  text-5xl">FEATURES</HyperText>
        <p className="text-center mt-4 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
          Explore what makes PersonaShield the most powerful deepfake detection
          platform.
        </p>

        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 }, // delay each card
            },
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

      {/* TEAM SECTION */}
      <div>
        <HyperText className="w-full text-center mt-0 px-6 text-5xl md:text-6xl">
          DEVELOPERS
        </HyperText>
        <div className="flex flex-row items-center justify-center mt-2 mb-30 w-full scale-100 ">
          <AnimatedTooltip items={people} />
        </div>
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center h-20 z-50">
        <FloatingDock mobileClassName="translate-y-20" items={links} />
      </div>
    </>
  );
}
