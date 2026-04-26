"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconShieldCheck,
  IconLoader2,
} from "@tabler/icons-react";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  /* ── Social login ── */
  const handleSocial = async (provider) => {
    if (loadingProvider) return;
    setLoadingProvider(provider);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });
      if (result?.error) {
        console.error(`${provider} login error:`, result.error);
        alert(`${provider} login failed: ${result.error}`);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Social login error:", error);
      alert("Social login failed — check console for details.");
    } finally {
      setLoadingProvider(null);
    }
  };

  /* ── Credential submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      // Handle signup — wire to your API here
      console.log("Signup payload:", formData);
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        remember: rememberMe,
      });
      if (result?.error) {
        alert("Invalid credentials — please try again.");
      } else {
        router.push("/");
      }
    }
  };

  const socialButtons = [
    {
      provider: "google",
      label: "Google",
      icon: <IconBrandGoogle className="w-4 h-4" />,
      color: "hover:bg-red-500/10 hover:border-red-400/40",
    },
    {
      provider: "facebook",
      label: "Facebook",
      icon: <IconBrandFacebook className="w-4 h-4" />,
      color: "hover:bg-blue-500/10 hover:border-blue-400/40",
    },
    {
      provider: "linkedin",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="w-4 h-4" />,
      color: "hover:bg-sky-500/10 hover:border-sky-400/40",
    },
  ];

  return (
    <AuroraBackground className="min-h-screen relative overflow-hidden">
      <SmoothCursor />

      {/* ── Main layout ── */}
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-20 sm:px-6">
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6 items-stretch">

          {/* ── LEFT PANEL (hidden on mobile) ── */}
          <div className="hidden md:flex flex-1 rounded-2xl p-7 backdrop-blur-lg bg-black/40 border border-white/10 shadow-2xl flex-col justify-between min-h-[460px]">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-5 group w-fit">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <IconShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-white/60 uppercase group-hover:text-white/90 transition-colors">
                  Personashield
                </span>
              </Link>
              <h2 className="text-3xl font-semibold text-white leading-snug">
                Protect your<br />digital identity.
              </h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
                AI-powered deepfake & impersonation attack detection. Stay safe across every platform.
              </p>
            </div>

            {/* decorative badges */}
            <div className="space-y-2 mt-6">
              {["Real-time deepfake detection", "Identity threat alerts", "Cross-platform monitoring"].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs text-white/70 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {feat}
                </div>
              ))}
            </div>

            {/* decorative shapes */}
            <div className="flex gap-3 items-center mt-6">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="w-8 h-8 rounded-lg bg-white/10" />
              <div className="w-16 h-2.5 rounded-md bg-white/10" />
            </div>
          </div>

          {/* ── AUTH CARD ── */}
          <div className="w-full md:w-80 rounded-2xl p-6 backdrop-blur-xl bg-black/60 border border-white/10 shadow-xl flex flex-col gap-5">

            {/* Header + toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {isSignup ? "Create account" : "Sign in"}
                </h1>
                <p className="text-xs text-white/50 mt-0.5">
                  {isSignup ? "Join Personashield today" : "Welcome back — sign in."}
                </p>
              </div>
              <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5 gap-0.5">
                <button
                  onClick={() => setIsSignup(false)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    !isSignup ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsSignup(true)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    isSignup ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  Sign up
                </button>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-3 gap-2">
              {socialButtons.map(({ provider, label, icon, color }) => (
                <button
                  key={provider}
                  onClick={() => handleSocial(provider)}
                  disabled={!!loadingProvider}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/15 text-white text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${color}`}
                  title={`Continue with ${label}`}
                >
                  {loadingProvider === provider ? (
                    <IconLoader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    icon
                  )}
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {isSignup && (
                <div>
                  <label className="block text-[11px] font-medium text-white/60 mb-1">Full name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition"
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-white/60 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/60 mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>

              {!isSignup && (
                <div className="flex items-center justify-between text-xs text-white/50">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 accent-white rounded"
                    />
                    <span>Remember me</span>
                  </label>
                  <a className="underline underline-offset-2 hover:text-white transition" href="#">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-150 shadow-md mt-1"
              >
                {isSignup ? "Create account" : "Sign in"}
              </button>
            </form>

            {/* Footer switch */}
            <p className="text-center text-xs text-white/40">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-white/70 underline underline-offset-2 hover:text-white transition"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom-right theme toggler */}
      <div className="fixed bottom-5 right-5 z-50">
        <div className="w-10 h-10 rounded-full backdrop-blur-md bg-black/40 border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg">
          <AnimatedThemeToggler className="w-5 h-5" />
        </div>
      </div>
    </AuroraBackground>
  );
}