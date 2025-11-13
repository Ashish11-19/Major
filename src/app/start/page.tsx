"use client";
import Image from "next/image";
import React, { useState } from "react";
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
import { SparklesCore } from "@/components/ui/sparkles";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { FileUpload } from "@/components/ui/file-upload";

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
export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
} // ✅ properly closed

export default function About() {
  return (
    <>
      <SmoothCursor />
      <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
        PersonaShield
      </h2>

      <div className="my-8 mb-10">
        <FileUploadDemo /> {/* you can reuse your component here */}
      </div>

      <h2 className="text-center text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
        Put the text to check
      </h2>

      <div className="w-full flex items-center justify-center mt-10 mb-22">
        <div className="flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md px-4 py-3 shadow-sm">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter text to check..."
            className="flex-1 bg-transparent placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none text-neutral-800 dark:text-neutral-100 text-base"
          />

          {/* Button */}
          <button
            className="rounded-xl px-5 py-2 font-semibold bg-black text-white dark:bg-white dark:text-black
                 transition-all duration-300 hover:opacity-80 active:scale-95"
          >
            Check Text
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center h-20 z-50">
        <FloatingDock mobileClassName="translate-y-20" items={links} />
      </div>
    </>
  );
}
