"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { FloatingDock } from "@/components/ui/floating-dock";

import {
  IconBrandGithub,
  IconBrandX,
  IconTerminal2,
  IconHome,
  IconNewSection,
} from "@tabler/icons-react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleSocial = async (provider) => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Social login error:", error);
      alert("Social login failed — check console for details.");
    }
  };

  const links = [
    { title: "Home", icon: <IconHome className="h-full w-full" />, href: "/" },
    { title: "Products", icon: <IconTerminal2 className="h-full w-full" />, href: "#" },
    { title: "About", icon: <IconNewSection className="h-full w-full" />, href: "/about" },
    { title: "Change Theme", icon: <AnimatedThemeToggler className="h-full w-full" />, href: "#" },
    { title: "Twitter", icon: <IconBrandX className="h-full w-full" />, href: "#" },
    { title: "GitHub", icon: <IconBrandGithub className="h-full w-full" />, href: "https://github.com" },
  ];

  return (
    <AuroraBackground className="min-h-screen relative overflow-hidden">
      {/* AUTH PAGE CONTENT */}
      <div className="w-full max-w-4xl mx-auto p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl relative flex gap-8 items-center">

          {/* LEFT GLASS PANEL */}
          <div className="hidden md:block flex-1 rounded-2xl p-8 backdrop-blur-lg bg-black/40 border border-white/10 shadow-2xl h-96">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-semibold text-white">Welcome to Personashield</h2>
                <p className="mt-4 text-sm text-white/80">
                  Deepfake & Impersonation attack Detection Platform
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-full bg-white/10" />
                <div className="w-10 h-10 rounded-lg bg-white/10" />
                <div className="w-20 h-3 rounded-md bg-white/10" />
              </div>
            </div>
          </div>

          {/* AUTH CARD */}
          <div className="w-full md:w-96 rounded-2xl p-8 backdrop-blur-xl bg-black/60 border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">{isSignup ? "Create account" : "Login"}</h1>
                <p className="text-sm text-white/70">
                  {isSignup ? "Join Personashield" : "Welcome back — sign in."}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => setIsSignup(false)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    !isSignup ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsSignup(true)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    isSignup ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* FORM */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {isSignup && (
                <div>
                  <label className="block text-xs text-white/80 mb-2">Full name</label>
                  <input
                    className="w-full rounded-md px-3 py-2 bg-transparent border border-white/20 text-white placeholder-white/40"
                    placeholder="Jane Doe"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md px-3 py-2 bg-transparent border border-white/20 text-white placeholder-white/40"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-white/80 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full rounded-md px-3 py-2 bg-transparent border border-white/20 text-white placeholder-white/40"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-white/70">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 accent-white" />
                  <span>Remember me</span>
                </label>
                <a className="underline hover:text-white" href="#">
                  Forgot?
                </a>
              </div>

              <button className="w-full py-2 rounded-md font-semibold bg-white text-black shadow-md hover:scale-[1.01] transition">
                {isSignup ? "Create account" : "Sign in"}
              </button>

              <div className="pt-4 text-center text-xs text-white/60">or continue with</div>

              <div className="flex gap-3 justify-center pt-3">
                <button onClick={() => handleSocial("google")} className="px-3 py-2 rounded-md border border-white/20 text-white">G</button>
                <button onClick={() => handleSocial("facebook")} className="px-3 py-2 rounded-md border border-white/20 text-white">f</button>
                <button onClick={() => handleSocial("linkedin")} className="px-3 py-2 rounded-md border border-white/20 text-white">in</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center h-20">
        <FloatingDock mobileClassName="translate-y-20" items={links} />
      </div>
    </AuroraBackground>
  );
}
